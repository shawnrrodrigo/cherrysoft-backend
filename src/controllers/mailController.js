const nodemailer = require("nodemailer");

exports.sendQuoteRequest = async (req, res) => {
  const { companyName, contactPerson, email, phone, service, projectDetails } =
    req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ Gmail SMTP connection verified");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Quote Request from ${companyName}`,
      html: `
        <h2>New IT Quote Request</h2>
        <p><b>Company:</b> ${companyName}</p>
        <p><b>Contact Person:</b> ${contactPerson}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service Interested:</b> ${service}</p>
        <p><b>Project Details:</b></p>
        <p>${projectDetails}</p>
      `,
    });

    res.status(200).json({ message: "Quote request sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send request", error });
  }
};

exports.sendEnrollRequest = async (req, res) => {
  const { firstName, lastName, email, phone, course, message } = req.body;

  try {
    // transporter inside function ensures fresh credentials each time
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Course Enrollment from ${firstName} ${lastName}`,
      html: `
        <h2>New Course Enrollment</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Course:</b> ${course}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Enrollment request sent successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to send enrollment request", error });
  }
};
