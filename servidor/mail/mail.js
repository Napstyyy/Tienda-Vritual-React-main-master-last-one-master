import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'JerkyDock05045@gmail.com',
        pass: 'bklpxvueuamnibaz'
    }
});

export const sendMail = prod => {
    transporter.sendMail({
        from: "ecommerce <ecommerce@gmail.com",
        to: "mateo.giraldo1@utp.edu.co",
        subject: "Stock at its minimun",
        text: `The following product's stock which id's is${prod.id}. is almost empty`
    }).then(console.info)
    .catch(console.catch)
}

