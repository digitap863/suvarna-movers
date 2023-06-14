const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//  form

const config = {
  service: "gmail",
  host: "smpt.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: process.env.serviceEmail,
    pass: process.env.serviceEmailPW,
  },
};

function send(data) {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(info.response);
      return info.response;
    }
  });
}

app.post("/contact-form", async (req, res) => {
  let {
    move_from,
    move_to,
    your_date,
    user_name,
    email_user,
    user_phone,
    user_text,
  } = req.body;

  const output = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">You have a new Appointment request</h2>
        <p style="font-size: 16px;">Name: ${user_name}</p>
        <p style="font-size: 16px;">Email: ${email_user}</p>
        <p style="font-size: 16px;">Phone: ${user_phone}</p>
        <p style="font-size: 16px;">From: ${move_from} &nbsp; &nbsp;   To: ${move_to}</p>
        <p style="font-size: 16px;">Date: ${your_date}</p>
        <p style="font-size: 16px;">Message: ${user_text}</p>
      </div>`;

  const data = {
    from: "mailserviceSensRes@gmail.com",
    to: "marketing@tapclone.in",
    subject: "New Appointment Request",
    html: output,
  };

  send(data);
  // res.status(200).json({ success: true });
  res.status(200).send({ success: true });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
