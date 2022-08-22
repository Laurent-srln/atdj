const nodemailer = require("nodemailer");


const passwordServices = {

passwordMail: async (token, email, firstname, lastname) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: 'contact.atdj@gmail.com',
                pass: 'sarmgsyarpohdcsg'
                },
                tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
        }
  });

  // send mail with defined transport object
    await transporter.sendMail({
      from: `"Association À Toi De Jouer" <contact.atdj@gmail.com>`, // sender address
      to: "laurents47@hotmail.com", // A remplacer par variable email
      subject: "Finalisez votre inscription !", // Subject line
      text: "https://app-osport.herokuapp.com/login", // plain text body
      html: `
      <p>Bienvenue <strong>${firstname} ${lastname}</strong> !</p><br>
      <a href="http://localhost:8080/register?token=${token}"a>Cliquez ici pour configurer votre mot de passe.</a>
      <p>Token : ${token}</p>`, // html body
  });

  console.log(`Mail envoyé à ${email}`);
},

newPasswordMail: async (token, email) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'contact.atdj@gmail.com',
          pass: 'sarmgsyarpohdcsg'
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
  });

  // send mail with defined transport object
    await transporter.sendMail({
      from: `"Association À Toi De Jouer" <contact.atdj@gmail.com>`, // sender address
      to: "laurents47@hotmail.com", // list of receivers
      subject: "Réinitialisez votre mot de passe.", // Subject line
      text: "https://app-osport.herokuapp.com/login", // plain text body
      html: `<a href="http://localhost:8080/register?token=${token}"a>Cliquez ici pour configurer votre mot de passe</a>
      <p>Token : ${token}</p>`, // html body
  });

  console.log(`Mail envoyé à ${email}`);
}



}

module.exports = passwordServices;