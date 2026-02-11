import { Request } from "express";
import catchAsync from "../../shared/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import sendResponse from "../../shared/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.service";

const insertIntoDB  = catchAsync(async (req:Request & {user?:JwtPayload}, res) => {


    const result = await DoctorScheduleService.insertIntoDB(req.user!, req.body);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'Doctor schedule inserted successfully',
        data: result
    })
})

export const DoctorScheduleController = {
    insertIntoDB
}