import { response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({tag_id, user_receiver, user_sender, message}: IComplimentRequest) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if (user_sender === user_receiver) {
            throw new Error("Usuário não pode enviar para si mesmo")
        }
        if (!userReceiverExists) {
            throw new Error("User receiver não existe ! ")
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentsRepositories.save(compliment);

        return compliment;

    }
}

export { CreateComplimentService };