import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { CustomRepositoryCannotInheritRepositoryError } from "typeorm";

function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {

    //receber o token
    const authToken = request.headers.authorization;
    //validar se o token esta preenchido
    //primeiro tirar o "Bearer" da resposta do token
    if(!authToken) {
        return response.status(401).end();
    }
    
    const [, token] = authToken.split(" ");
    //verificar se token é válido, se não expirou, etc
    try {
        const decode = verify(token , "88181fb72ce6bcaea828f57b3db3df19");
        
        return next();
    } catch (err) {
        return response.status(401).end();
    }
    //recuperar informacoes do usuario
}

export { ensureAuthenticated };