import prismaClient from "../prisma";

interface UpdateUserProp {
    id: string;
    name: string;
    email: string;
    power: number;
    value: number;
}

class UpdateUserService {
    async execute({ id, name,email,power,value }: UpdateUserProp) {
        const updatedMoto = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                power: power,
                value: value
            }
        });

        return updatedMoto;
    }
}

export { UpdateUserService };