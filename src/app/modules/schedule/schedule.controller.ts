import { Request } from "express";
import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";

const scheduleInsertData = catchAsync(async (req, res) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Schedule inserted successfully",
    data: result,
  });
});

const getScheduleData = catchAsync(async (req:Request&{user?:any}, res) => {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pick(req.query,["startDateTime","endDateTime"]);

  const result = await ScheduleService.getScheduleFromDB(req.user, filters, options);

    sendResponse(res, {
      statusCode: 200,
        success: true,
        message: "Schedule fetched successfully",
      meta: result.meta,
      data: result.data,
    });
});

const deleteSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleService.deleteScheduleFromDB(req.params.id)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule deleted successfully",
      data: result,
    });
});

export const ScheduleController = {
  scheduleInsertData,
  getScheduleData,
  deleteSchedule
};
