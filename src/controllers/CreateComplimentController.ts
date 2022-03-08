import { Request, response, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService"


class CreateCoplimentController {

    async handle(request: Request, responde: Response) {

        const { tag_id, user_sender, user_receiver, message } = request.body;

        const createComplimentService = new CreateComplimentService()
        
        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender,
            user_receiver,
            message
        });
        return response.json(compliment)
    }
}

export { CreateCoplimentController }