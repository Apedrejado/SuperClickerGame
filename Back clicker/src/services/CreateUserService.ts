import prismaClient from "../prisma";

interface createUserProps{
    name: string;
    email: string;
    power: number;
    value: number;
}


class CreateUserService{
    async execute({name,email,power,value}: createUserProps){
        if(!name || !email){
            throw new Error("coloque nome e email")
        }
        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                power,
                value
            }
        })
        return user;
    }
}

export { CreateUserService }