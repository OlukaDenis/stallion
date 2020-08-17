const { join } = require('path');
const { https, firestore, config } = require('firebase-functions');
const { default: next } = require('next');
const nodemailer = require('nodemailer');

const isDev = process.env.NODE_ENV !== 'production';
// const nextjsDistDir = join('src', require('./src/next.config').distDir);
const { setConfig } = require('next/config');
const nextJSConfig = require('./src/next.config');
setConfig(nextJSConfig);

console.log('isDev: ', isDev);

const nextjsServer = next({
  dev: false,
  // conf: {
  //   distDir: nextjsDistDir,
  // },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});

// Listen for any change on `email` and notify Management via email
exports.onWriteEmails = firestore.document('emails/{emailID}').onWrite(async (change, context) => {
  const emailID = context.params.emailID;

  const document = change.after.exists ? change.after.data() : null;

  if (!document) {
    return;
  }

  let mailOptions = {
    from: document.from,
    to: 'info@premar.tech',
    subject: document.username,
    html: document.message,
  };

  const gmailEmail = config().gmail.email;
  const gmailPassword = config().gmail.password;

  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  async function sendEmail(mailOptions) {
    let response = null;
    // console.log('gmailEmail: ' + gmailEmail + '; gmailPassword: ', gmailPassword + ' > CREDENTIALS');
    try {
      response = await mailTransport.sendMail(mailOptions);
      console.log('ADDRESS: ' + mailOptions.to + '; SUBJECT: ', mailOptions.subject + ' > SUCCESS');
    } catch (error) {
      console.error('ADDRESS: ' + mailOptions.to + '; SUBJECT: ', mailOptions.subject + ' > ERROR: ', error);
    }
    if (response !== null) {
      // return true if the email was sent
      return response.accepted.toString().indexOf(mailOptions.to) > -1;
    } else {
      return false;
    }
  }

  sendEmail(mailOptions);
});
