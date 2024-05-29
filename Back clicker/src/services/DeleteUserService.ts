import prismaClient  from "../prisma";
interface DeleteUserProps{
    id: string;
}
class DeleteUserService{
    async execute({id}: DeleteUserProps){
        if(!id){
            throw new Error("solicitacao invalida")
        }
        const findUser= await prismaClient.user.findFirst({
            where:{
                id: id
            }
        })
        if(!findUser){
            throw new Error("Usuario nao existe")
        }
        await prismaClient.user.delete({
            where:{
                id: findUser.id
            }
        })
        return {message: "deletada com exito"}
    }
}
export {DeleteUserService}