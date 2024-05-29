import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../services/ListUserService";

class ListUserController{
    async handle(request:FastifyRequest,reply:FastifyReply){
        const listUserService = new ListUserService();
        const users = await listUserService.execute();
        reply.send(users);
    }
}
export {ListUserController}