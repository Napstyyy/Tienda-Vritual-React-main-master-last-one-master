import nodemailer from 'nodemailer'; //importacion de la libreria que usaremos para enviar el email cuando se llegue al stock minimo de un producto

const transporter = nodemailer.createTransport({ //se define una constante transporter que tendra lo que returna el metodo createTransport
    host: 'smtp.gmail.com',//aca se indica cual servicio se utilizara
    port: 587,//el puerto en el cual se mandara el correo
    auth: {//idica con que cuenta se mandara el correo
        user: 'JerkyDock05045@gmail.com',//el correo de origen
        pass: 'bklpxvueuamnibaz'//la contraseña dinamica
    }
});

export const sendMail = prod => { //funcion que se llamara para enviar el correo electronico 
    transporter.sendMail({
        from: "ecommerce <ecommerce@gmail.com>",//quien manda el correo
        to: "mateo.giraldo1@utp.edu.co",//a quien le manda el correo
        subject: "Stock at its minimun",//el asunto del correo
        text: `The following product's stock which id's is${prod.id}. is almost empty`//el texto del correo
    }).then(console.info)//se da informacion a la consola del estado del envio
    .catch(console.catch)//se da informaciond e cualquier posible error
}

