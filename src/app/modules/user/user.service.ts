import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { Gender, Prisma, UserRole } from "@prisma/client";
import { ca } from "zod/v4/locales";
import { paginationHelper } from "../../helper/paginationHelper";
import { userSearchableFields } from "./user.constant";

const createPatientIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashedPassword,
      },
    });

    return tnx.patient.create({
      data: req.body.patient,
    });
  });
  return result;
};
const createAdminIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.profilePhoto = uploadResult?.secure_url;
  }
  console.log(req.body);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    return tnx.admin.create({
      data: req.body.admin,
    });
  });
  return result;
};
const createDoctorIntoDB = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.doctor.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR,
      },
    });

    return tnx.doctor.create({
      data: req.body.doctor,
    });
  });
  return result;
};

const getAllUserFromDB = async (filters:any, options:any) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { searchTerm,...filterData } = filters;
    const andConditions:Prisma.UserWhereInput[] = [];

    if(searchTerm){
        andConditions.push({
            OR: userSearchableFields.map(field =>({
                [field]:{
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0 ){
        andConditions.push({
            AND: Object.keys(filterData).map(key=>({
                [key]:{
                    equals: filterData[key],
                }
            }))
        })
    }

    const whereCondition:Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    skip,
    take: limit,

    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder as "asc" | "desc",
    },
  });
    const total = await prisma.user.count({ where: whereCondition });

  return {
    meta:{
        page,
        limit,
        total
    },
    data: result
  };        
    }


export const UserService = {
  createPatientIntoDB,
  createAdminIntoDB,
  createDoctorIntoDB,
  getAllUserFromDB,
};
