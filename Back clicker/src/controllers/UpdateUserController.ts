import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.query as { id: string };
      const { name,email,power,value } = request.body as { name: string,email: string,power: number,value: number};
      if (!id) {
        throw new Error("Solicitação inválida: ID do usuario não fornecido.");
      }
      const userService = new UpdateUserService();
      const updatedUser = await userService.execute({ id, name,email,power,value });
      reply.send(updatedUser);
    } catch (error) {
           console.error("Erro ao atualizar usuario:", error);
      reply.status(500).send({ error: "Erro ao atualizar usuario." });
    }
  }
}
export { UpdateUserController };