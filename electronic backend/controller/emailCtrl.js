import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

// FUNCION PARA MANDAR CORREOS ELECTRONICOS
const enviarEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "luduenacristian2@gmail.com",
      pass: "ociy nysc ljxn lwla",
    },
  });
  // enviar correo con objeto de transporte definido
  const info = await transporter.sendMail({
    from: "luduenacristian2@gmail.com", // Quien lo manda
    to: "luduenacristian2@gmail.com", // Quien lo recibe
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));
});

export default enviarEmail;
