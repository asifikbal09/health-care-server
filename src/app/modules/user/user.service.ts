import bcrypt from 'bcryptjs';
import { prisma } from '../../shared/prisma';
import { Request } from 'express';
import { fileUploader } from '../../helper/fileUploader';
import { UserRole } from '@prisma/client';

const createPatientIntoDB = async (req: Request)=>{

    if(req.file){
      const uploadResult =  await fileUploader.uploadToCloudinary(req.file);
      req.body.patient.profilePhoto = uploadResult?.secure_url;
    }
    

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email: req.body.patient.email,
                password:hashedPassword
            }
        });

        return tnx.patient.create({
            data:req.body.patient
        });
    })
    return result;
    
}
const createAdminIntoDB = async (req: Request)=>{

    if(req.file){
      const uploadResult =  await fileUploader.uploadToCloudinary(req.file);
      req.body.admin.profilePhoto = uploadResult?.secure_url;
    }
    console.log(req.body)

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email: req.body.admin.email,
                password:hashedPassword,
                role: UserRole.ADMIN
            }
        });

        return tnx.admin.create({
            data:req.body.admin
        });
    })
    return result;
    
}

export const UserService = {
    createPatientIntoDB,
    createAdminIntoDB
}