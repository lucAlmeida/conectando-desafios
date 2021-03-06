const nodemailer = require('nodemailer');
const transporter = require('../config/emailTransporter');
const logger = require('../shared/logger');

const sendAccountActivation = async (email, token) => {
  const info = await transporter.sendMail({
    from: 'My App <info@my-app.com>',
    to: email,
    subject: 'Account Activation',
    html: `
    <div>
      <b>Please click below link to activate your account</b>
    </div>
    <div>
      <a href="http://localhost:9876/activate/${token}">Activate</a>
    </div>`,
  });
  if (process.env.NODE_ENV === 'development') {
    logger.info('url: ' + nodemailer.getTestMessageUrl(info));
  }
};

module.exports = { sendAccountActivation };
