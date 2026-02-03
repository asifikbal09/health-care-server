import bcrypt from 'bcryptjs';
import { prisma } from '../../shared/prisma';

const createPatientIntoDB = async (payload:any)=>{
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email: payload.email,
                password:hashedPassword
            }
        });

        return tnx.patient.create({
            data:{
                name: payload.name,
                email: payload.email
            }
        });
    })
    return result;
}

export const UserService = {
    createPatientIntoDB
}