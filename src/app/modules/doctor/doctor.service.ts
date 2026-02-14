import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { DoctorSearchableFields } from "./doctor.constent";
import { prisma } from "../../shared/prisma";

const getAllFromDB = async (filters:any, options:IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filtersData } = filters;

    const andConditions:Prisma.DoctorWhereInput[] = [];
    
    if (searchTerm) {
       andConditions.push({
         OR: DoctorSearchableFields.map((field)=>({
            [field]:{
                contains: searchTerm,
                mode: "insensitive"
            }
        }))
       })
    }

    if(Object.keys(filtersData).length>0){
        const filtersConditions = Object.keys(filtersData).map((key)=>({
            [key]:{
                equals: filtersData[key]
            }
        }))
        andConditions.push(...filtersConditions)
    }

    const whereConditions:Prisma.DoctorWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.doctor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.doctor.count({
        where: whereConditions
    })

    return {
        meta:{
            page,
            limit,
            total
        },
        data: result
    }

}

export const DoctorService = {
    getAllFromDB
}