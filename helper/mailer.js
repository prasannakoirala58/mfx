const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const {
  MAIL_AUTH_CREDENTIAL_PASSWORD,
  MAIL_AUTH_CREDENTIAL_USER,
  MAIL_FROM,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
} = require('../config');

let transporter = nodemailer.createTransport({
  // host: MAIL_HOST,
  // port: MAIL_PORT,
  service: `SendGrid`,
  // secure: true,
  // requireTLS: true,
  // host: EMAIL_HOST,
  // port: EMAIL_PORT,
  auth: {
    user: process.env.MAIL_AUTH_CREDENTIAL_USER,
    pass: process.env.MAIL_AUTH_CREDENTIAL_PASSWORD,
  },
  // auth: {
  //   user: EMAIL_USERNAME,
  //   pass: EMAIL_PASSWORD,
  // },
  // tls: {
  //   rejectUnauthorized: false,
  // },
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
