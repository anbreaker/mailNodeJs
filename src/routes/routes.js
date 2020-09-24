const {Router} = require('express');
const nodemailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res) => {
  const {name, email, phone, message} = req.body;

  let contentHtml = `
    <h1>User Information:</h1>
    <ul>
      <li>Username: ${name}</li>
      <li>User Email: ${email}</li>
      <li>User Phone: ${phone}</li>
    </ul>
    <p>Message: ${message}</p>
  `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.MAIL}`,
      pass: `${process.env.PASS_MAIL}`,
    },
    tls: {
      rejectUnaurhorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "'Prueba NodeMailer' <cora34@ethereal.email>",
    to: 'cora34@ethereal.email',
    subject: 'Website contact Form',
    html: contentHtml,
  });

  console.log('Message sent', info.messageId);

  res.redirect('/success.html');
});

module.exports = router;
