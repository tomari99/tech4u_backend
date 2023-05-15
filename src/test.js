const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "newpathwaymyanmar@outlook.com",
    pass: "pexicmbnlvuxnnhc",
  },
});

transporter.verify((err, succ) => {
  if (err) console.log(err);
  console.log("success" + succ);
});

// const options = {
//   from: "newpathwaymyanmar@outlook.com",
//   to: "tomaribibi@gmail.com",
//   subject: "nodemailer testing",
//   text: "ok bro",
// };

// transporter.sendMail(options, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("sent" + info.response);
//   }
// });
