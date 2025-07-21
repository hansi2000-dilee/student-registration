const { db } = require('../firebaseAdmin');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const registerStudent = async (req, res) => {
  try {
    const { name, email, className } = req.body;

    if (!name || !email || !className) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  // Check if email already exists
    const snapshot = await db.ref('students').orderByChild('email').equalTo(email).once('value');

    if (snapshot.exists()) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    const registrationId = 'STU' + Date.now().toString().slice(-6);

    const studentData = {
      registrationId,
      name,
      email,
      className,
      registeredAt: new Date().toISOString(),
    };

  
    await db.ref('students').push(studentData);

    // Send confirmation email
    const mailOptions = {
      from: `"SIYATHRA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Registration Confirmation - Student ID #${registrationId}`,
     html: `
  <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px; font-family: 'Segoe UI', sans-serif; color: #333;">
    <div style="background-color: #4a90e2; padding: 20px; border-radius: 10px 10px 0 0; color: white;">
      <h2 style="margin: 0;">🎉 Registration Confirmed!</h2>
    </div>
    <div style="padding: 20px;">
      <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
      <p style="font-size: 15px;">Thank you for registering for a class at <strong>SIYATHRA Institute</strong>. Below are your registration details:</p>

      <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">📄 Registration ID:</td>
          <td style="padding: 8px;">${registrationId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">👤 Student Name:</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">📚 Class Name:</td>
          <td style="padding: 8px;">${className}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 15px;">We look forward to seeing you in class. If you have any questions, feel free to contact us.</p>

      <p style="margin-top: 20px;">Warm regards,<br><strong>SIYATHRA Team</strong></p>
    </div>
    <div style="background-color: #eee; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; font-size: 13px; color: #777;">
      This is an automated message. Please do not reply directly to this email.
    </div>
  </div>
`,

    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, registrationId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { registerStudent };
