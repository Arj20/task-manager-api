//SENDING WELCOME EMAIL TO NEW USER AND EXITING USER.

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Welcome mail
const sendWelcomeMail = function (email, name) {
  sgMail.send({
    to: email,
    from: "arihant.jain67@gmail.com",
    subject: `Welcome Aboard! 🥳 ${name}`,
    text: "Welcome to fais-le",
  });
};

//Acoount Deactivation mail.
const sendCancelationMail = function (email, name) {
  sgMail.send({
    to: email,
    from: "arihant.jain67@gmail.com",
    subject: `We will miss you!! 😥 ${name}`,
    text: "fais-le will miss you!!",
  });
};

module.exports = {
  sendWelcomeMail,
  sendCancelationMail,
};
