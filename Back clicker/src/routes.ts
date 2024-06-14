import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserController } from "./controllers/ListUserController";
import { DeleteuserController } from "./controllers/DeleteUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { DeleteInativoController } from "./controllers/DeleteInativoController";
import { DeleteDuplicadoController } from "./controllers/DeleteDuplicadoController";
import { FindUserController } from "./controllers/FindUserController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
        return{ok: true}
    })
    
    fastify.post("/api/user", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new CreateUserController().handle(request,reply)
    })

    fastify.get("/api/users", async(request: FastifyRequest, reply:FastifyReply)=>{
        return new ListUserController().handle(request,reply)
    })    

    fastify.get("/api/finduser", async(request: FastifyRequest, reply:FastifyReply)=>{
        return new FindUserController().handle(request,reply)
    })    

    fastify.delete("/api/delete", async (request: FastifyRequest, reply:FastifyReply)=>{
        return new DeleteuserController().handle(request,reply)
    })

    fastify.delete("/api/deleteinativo", async (request: FastifyRequest, reply:FastifyReply)=>{
        return new DeleteInativoController().handle(request,reply)
    })

    fastify.delete("/api/deleteduplicado", async (request: FastifyRequest, reply:FastifyReply)=>{
        return new DeleteDuplicadoController().handle(request,reply)
    })

    fastify.put("/api/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateUserController().handle(request, reply);
    })
}

