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
    const { page = 1, limit = 10,searchTerm = "",sortBy,sortOrder} = req.query;

    const result = await UserService.getAllUserFromDB({
        page: Number(page),
        limit: Number(limit),
        searchTerm: searchTerm as string,
        sortBy: sortBy as string,
        sortOrder: sortOrder as string
    });

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result
    })
})

export const UserController ={
    createPatient,
    createAdmin,
    createDoctor,
    getAllUser
}
