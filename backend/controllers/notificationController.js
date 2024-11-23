const nodemailer = require('nodemailer');
const Vulnerability = require('../models/Vulnerability');
const Organization = require('../models/Organization');

exports.notifyOrganizations = async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.find();
        const organizations = await Organization.find();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'your-email@gmail.com', pass: 'your-password' },
        });

        organizations.forEach(org => {
            const matchedVulns = vulnerabilities.filter(vuln =>
                org.subscriptions.includes(vuln.cveId)
            );

            if (matchedVulns.length > 0) {
                const mailOptions = {
                    from: 'your-email@gmail.com',
                    to: org.email,
                    subject: 'Vulnerability Alerts',
                    html: `<h1>New Vulnerabilities</h1>${matchedVulns.map(v => `
                        <p><b>${v.cveId}</b>: ${v.description} (Severity: ${v.severity})</p>`).join('')}`,
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.error('Error sending email:', err);
                    else console.log('Email sent:', info.response);
                });
            }
        });

        res.status(200).json({ message: 'Notifications sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error sending notifications', details: err.message });
    }
};
