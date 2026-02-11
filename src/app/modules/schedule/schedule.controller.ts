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

export const ScheduleController = {
  scheduleInsertData,
};
