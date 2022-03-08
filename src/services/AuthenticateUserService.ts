import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email ou Password incorreto.");
        }

        //verificar se a senha esta correta
        const passwordMatch = await compare(password, user.password);

        if(!user) {
            throw new Error("Email ou Password incorreto.");
        }

        //gerar token
        const token = sign({
            email: user.email
        },
        "88181fb72ce6bcaea828f57b3db3df19",
        {
            subject: user.id,
            expiresIn: "1 day"
        }
        );
    }

};

export { AuthenticateUserService };