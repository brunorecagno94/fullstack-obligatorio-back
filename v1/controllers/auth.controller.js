import { loginService, registroService } from '../services/auth.services.js';


export const loginUsuario = async (req, res) => {

  const { nombreUsuario, password } = req.validatedBody;
  const { usuario, token } = await loginService(nombreUsuario, password);
  res.status(200).json({
    message: 'Inicio de sesión exitoso!',
    token,
    usuario: {
      id: usuario._id,
      nombreUsuario: usuario.nombreUsuario,
      rol: usuario.rol,
      planUsuario: usuario.planUsuario,
      juegosComprados: usuario.juegosComprados
    }
  });
};

export const registroUsuario = async (req, res) => {
  const { usuario, token } = await registroService(req.validatedBody);
  res.status(201).json({
    message: 'Registro exitoso!',
    token,
    usuario: {
      id: usuario._id,
      nombreUsuario: usuario.nombreUsuario,
      rol: usuario.rol,
      planUsuario: usuario.planUsuario,
      juegosComprados: usuario.juegosComprados
    }
  });
};