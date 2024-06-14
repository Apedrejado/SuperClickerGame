import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../services/ListUserService";
import { DeleteUserService } from "../services/DeleteUserService";


class DeleteInativoController{
 async handle(request:FastifyRequest, reply:FastifyReply){

    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    for (let index = 0; index <= users.length; index++) {
        const element = users[index];
            if(element.value === 0){
                const id = element.id
                const userService = new DeleteUserService();
                const user = await userService.execute({id})
                reply.send(user);
            }
    }
 }
}
export {DeleteInativoController}
