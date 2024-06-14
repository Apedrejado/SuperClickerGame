import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserService } from '../services/DeleteUserService';
import { ListUserService } from "../services/ListUserService";

class DeleteDuplicadoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();
    const { name, email } = request.body as { name: string, email: string };

    // Filtra todos os usuários com o mesmo nome e email
    const duplicatedUsers = users.filter(user => user.name === name && user.email === email);

    // Se existir mais de um usuário com o mesmo nome e email
    if (duplicatedUsers.length > 1) {
      // Encontra o usuário com o maior poder
      const userWithMorePower = duplicatedUsers.reduce((prev, current) => {
        return (prev.power > current.power) ? prev : current;
      });

      // Deleta os outros usuários com menor poder
      for (const user of duplicatedUsers) {
        if (user.id !== userWithMorePower.id) {
          const userService = new DeleteUserService();
          await userService.execute({ id: user.id });
        }
      }
    }

    reply.send({ message: "Usuários duplicados deletados com sucesso." });
  }
}

export { DeleteDuplicadoController };
