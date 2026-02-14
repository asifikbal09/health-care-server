import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { DoctorSearchableFields } from "./doctor.constent";

const getAllFromDB = async (filters:any, options:IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filtersData } = filters;

    const andConditions:Prisma.DoctorWhereInput[] = [];
    
    if (searchTerm) {
        OR: DoctorSearchableFields.map((field)=>({
            [field]:{
                contains: searchTerm,
                mode: "insensitive"
            }
        }))
    }

    if(Object.keys(filtersData).length>0){
        const filtersConditions = Object.keys(filtersData).map((key)=>({
            [key]:{
                equals: filtersData[key]
            }
        }))
        andConditions.push(...filtersConditions)
    }

}

export const DoctorService = {
    getAllFromDB
}