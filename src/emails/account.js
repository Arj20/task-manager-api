const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = function (email, name) {
  sgMail.send({
    to: email,
    from: "arihant.jain67@gmail.com",
    subject: `Welcome Aboard! 🥳 ${name}`,
    text: "Welcome to fais-le",
  });
};

const sendCancelationMail = function (email, name) {
  sgMail.send({
    to: email,
    from: "arihant.jain67@gmail.com",
    subject: `Don't Leave Us!! 😥 ${name}`,
    text: "fais-le will miss you!!",
  });
};

module.exports = {
  sendWelcomeMail,
  sendCancelationMail,
};
