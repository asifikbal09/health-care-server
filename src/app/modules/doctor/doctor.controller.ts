import { Request, Response } from "express";
import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import { DoctorFilterableFields } from "./doctor.constent";
import { DoctorService } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pick(req.query,DoctorFilterableFields)
    
    const result = await DoctorService.getAllFromDB(filters, options);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Doctors data fetched successfully",
        meta:result.meta,
        data:result.data
    })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await DoctorService.updateIntoDB(id, req.body);
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Doctor data updated successfully",
        data:result
    })
})

export const DoctorController = {
    getAllFromDB,
    updateIntoDB
}