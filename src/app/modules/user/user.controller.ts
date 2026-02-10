import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";

const createPatient = catchAsync(async (req, res) => {

    const result = await UserService.createPatientIntoDB(req);


    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'Patient created successfully',
        data: result
    })
});
const createAdmin = catchAsync(async (req, res) => {

    const result = await UserService.createAdminIntoDB(req);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'Admin created successfully',
        data: result
    })
});
const createDoctor = catchAsync(async (req, res) => {

    const result = await UserService.createDoctorIntoDB(req);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'Doctor created successfully',
        data: result
    })
});

const getAllUser = catchAsync(async (req, res) => {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pick(req.query,["searchTerm","role","email","status"]);

    const result = await UserService.getAllUserFromDB(filters, options);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        meta:result.meta,
        data: result.data
    })
})

export const UserController ={
    createPatient,
    createAdmin,
    createDoctor,
    getAllUser
}
