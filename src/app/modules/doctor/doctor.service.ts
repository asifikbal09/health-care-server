import { Doctor, Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { DoctorSearchableFields } from "./doctor.constent";
import { prisma } from "../../shared/prisma";
import { IDoctorUpdatePayload } from "./doctor.interface";

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


const updateIntoDB = async (id:string, payload:Partial<IDoctorUpdatePayload>)=>{
    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where:{
            id
        }
    })

    const{specialties, ...doctorData} = payload;

    if(specialties && specialties.length > 0){
        const deleteSpecialties = specialties.filter(specialty => specialty.isDeleted)

        for (const specialty of deleteSpecialties) {
            await prisma.doctorSpecialties.deleteMany({
                where:{
                    doctorId: doctorInfo.id,
                    specialitiesId: specialty.specialtyId
                }
            })
        }

        const createSpecialties = specialties.filter(specialty => !specialty.isDeleted)
        
        for (const specialty of createSpecialties) {
            await prisma.doctorSpecialties.create({
                data:{
                    doctorId: doctorInfo.id,
                    specialitiesId: specialty.specialtyId
                }
            })
        }
    }

    const updatedData = await prisma.doctor.update({
        where:{
            id: doctorInfo.id
        },
        data:doctorData,
        include:{
            doctorSpecialties:{
                include:{
                    specialities:true
                }
            }
        }
    })

    return updatedData;
}


export const DoctorService = {
    getAllFromDB,
    updateIntoDB
}