const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const {
  MAIL_AUTH_CREDENTIAL_PASSWORD,
  MAIL_AUTH_CREDENTIAL_USER,
  MAIL_FROM,
} = require('../config');

let transporter = nodemailer.createTransport({
  // host: MAIL_HOST,
  // port: MAIL_PORT,
  service: `SendGrid`,
  // secure: true,
  // requireTLS: true,
  auth: {
    user: MAIL_AUTH_CREDENTIAL_USER,
    pass: MAIL_AUTH_CREDENTIAL_PASSWORD,
  },
});

const handlebarsOptions = {
  viewEngine: {
    extName: '.hbs',
    partialDir: path.join(__dirname, '../views'),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, '../views'),
  extName: '.hbs',
};

transporter.use('compile', hbs(handlebarsOptions));

exports.sendMail = async (reciever, sub, mailDetails, isTicketMail = true) => {
  let mailOptions = {
    // from: `Prasanna Koirala <${MAIL_FROM}>`,
    // from: `${MAIL_FROM}`,
    from: 'prasannakkoirala@outlook.com',
    to: reciever,
    subject: sub,
    template: isTicketMail ? 'email' : 'reset-password',
    context: {
      ...mailDetails,
    },
  };

  // console.log(mailDetails);

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Mail sent to: ' + reciever);
    }
  });
};
