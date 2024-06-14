import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../services/ListUserService";

class FindUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listUserService = new ListUserService();
        const users = await listUserService.execute();
        const { name, email } = request.query as { name: string, email: string }; 
        const foundUser = users.filter(user => user.name === name && user.email === email);
        if (foundUser.length > 0) {
            reply.send(foundUser);
        } else {
            reply.send({ message: "Usuário não encontrado" });
        }
    }
}

export { FindUserController };
