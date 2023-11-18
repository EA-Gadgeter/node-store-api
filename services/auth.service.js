const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const UserService = require("./users.service");

const { jwtSecret, recoveryEmail, recoveryPassword } = require("../config/config")

const userService = new UserService();

class AuthService {
  async GetUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
     throw boom.unauthorized();
    }

    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }
  
  async SignToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, jwtSecret);

    return {
      user,
      token
    }
  }
  
  async SendRecovery(email) {
    const user = await userService.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }
    
    // Creando token para recuperacion de la contrasenia
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "15min" });
    const link = `http://myfrontend.com/recovery?token=${token}`;

    // Actualizamos la columna en la base datos para este usuario
    await userService.Update(user.id, { recoveryToken: token })
    
    const mail = {
      from: recoveryEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email tu recover password", // Subject line
      text: "Correo prueba desde node 2", // plain text body
      html: `<b>Ingresa a este link => ${link}</b>`, // html body
    };
    
    return await this.SendMail(mail);
  }
  
  async SendMail(infoMail) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: recoveryEmail,
        pass: recoveryPassword
      }
    });
    
    await transporter.sendMail(infoMail);
    
    return { message: "Mail sent" };
  }

  async ChangePassword(token, newPassword) {
    try {
      // No traemos los datos del usuario,
      // No podemos usar el middleware porque esta ruta
      // no debe estar protegida, por lo que lo verificamos a mano
      const payload = jwt.verify(token, jwtSecret);
      const user = await userService.FindOne(payload.sub);

      // Puede que el token en si sea valido, por lo que debemos verificar
      // que sean el mismo tanto el de la base como el enviado sea el mismo
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      
      // Hasheamos y guardamos la nueva contrasenia
      // Al actualizar es importante tanto cambiar el password
      // COMO PONER NULL el recoveryToken
      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      await userService.Update(user.id, 
        {
          password: hashNewPassword,
          recoveryToken: null,
        }
      );

      return { message: "Password changed succesfully" };
    } catch (error) {
      // Lo unico que podria tronar aqui es que el jwt este mal
      // o haya expirado
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;