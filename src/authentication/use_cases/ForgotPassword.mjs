import nodemailer from 'nodemailer';
import crypto from 'crypto';
import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'
import Application from '../../support/Application.mjs'
import UUIDGenerator from '../../support/UUIDGenerator.mjs'


class CreateUsers {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(param) {

    let {    
      HOST_EMAIL,  
      PORT_EMAIL,  
      USER_EMAIL,  
      PASS_EMAIL,
      ENVIRONMENT 
    } = process.env
    // Check if the user exists
    const user = await this.repository.getUserByEmail(param.email);

    if (user.length < 1) {
      throw new DataNotFoundException('User not found.');
    }

    
    const token = crypto.randomBytes(4).toString('hex');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);

    const params ={
      pass : PASS_EMAIL,
      user: USER_EMAIL
    } 

    if(!Application.isInProductionMode()) param.email = 'rcunha@live.com'   
      
    const portEmail = Number(PORT_EMAIL)
    const hostEmail = HOST_EMAIL
    var transport = nodemailer.createTransport(
      {
      host: hostEmail,
      port: portEmail,
      logger: true,
      debug: true,
      auth: {
        ...params
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 100000,
      }
    );
 
    
    transport.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('SMTP connection is ready');
      }
    });   
    

  
   const message = {
     from: 'User - Api <rcunha@live.com>',
     to: param.email,
     subject: 'Código para cadastrar nova senha',
     html: `<p> Olá ${user[0].name}, utilize o código <strong> ${token} </strong> para cadastrar a nova senha.</p>`
   };

    const dataCode = {
      _id : UUIDGenerator.generate(),
      idUser: user[0]._id,
      code: token,
      codeExpires: now,
      message,      
      created_at : new Date()
    }
    
    await this.repository.saveCode(dataCode);
    try {
     const response = await transport.sendMail(message);
      await this.repository.saveCode(dataCode);
      console.log('E-mail enviado:', response);     
      
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      throw new InvalidParameterException(JSON.stringify({ "message": "Failed to send email, try later", error}));
      
    }
  }
}

export default CreateUsers;
