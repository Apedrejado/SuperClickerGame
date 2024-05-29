import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController{
    
    async handle(request: FastifyRequest, reply: FastifyReply){
        
        
        const {name,email,power,value} = request.body as {
            name: string,
            email: string,
            power: number,
            value: number
        }
        const userService = new CreateUserService()
        const user = await userService.execute({name,email,power,value});
        reply.send(user)
    }
}
export {CreateUserController}