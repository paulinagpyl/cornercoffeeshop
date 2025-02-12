import { jwtVerify } from "../../util/auth/jwt.js";

export const authToken = (req, res, next) => {
    const authorization = req.header('Authorization')

    if (authorization === undefined){
       return res.status(401).json({ status: false, code: 401, message: 'Token no proporcionado' }) // valida que viene el jwt, sin validar aún
    }

    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer'){
        return res.status(401).json({ status: false, code: 401, message: 'Formato de token inválido' }) //mal sintaxis en token
    }

    try {
        jwtVerify(token) && next() //si falla es error, sino no devuelve nada
    } catch (error) {
        res.status(401).json({ status: false, code: 401, message: 'Token inválido' })
    }
}

