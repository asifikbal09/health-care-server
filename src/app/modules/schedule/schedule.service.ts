import { addHours, addMinutes, compareAsc, format } from "date-fns";
import { prisma } from "../../shared/prisma";
import { paginationHelper } from "../../helper/paginationHelper";
import { Prisma } from "@prisma/client";
import { start } from "repl";

const insertIntoDB = async (payload: any) => {
    const {startDate, endDate, startTime, endTime} = payload
    const interval = 30

    const schedules = []

    const currentData = new Date(startDate)
    const lastData = new Date(endDate)

    while(currentData <= lastData) {
        const startDateTime = new Date(
            addMinutes(

                addHours(
                    `${format(currentData, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0])
                ),
                Number(startTime.split(":")[1])
            )
        )
        const endDateTime = new Date(
            addMinutes(

                addHours(
                    `${format(currentData, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0])
                ),
                Number(endTime.split(":")[1])
            )
        )

        while(startDateTime < endDateTime) {
            const slotStartDateTime = startDateTime
            const slotEndDateTime = addMinutes(slotStartDateTime, interval)

            const scheduleData ={
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            const existingSchedule =  await prisma.schedule.findFirst({
                where:scheduleData
            })

            if(!existingSchedule) {
                const result = await prisma.schedule.create({
                    data:scheduleData
                })
                schedules.push(result)

            }

            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + interval)
        }
        currentData.setDate(currentData.getDate() + 1)
    }
    return schedules
}

const getScheduleFromDB = async (filters: any, options: any) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

    const { startDateTime:filterStartDateTime, endDateTime:filterEndDateTime } = filters;
const andConditions:Prisma.ScheduleWhereInput[] = [];

if(filterStartDateTime && filterEndDateTime){
    andConditions.push({
        AND:[
            {
                startDateTime:{
                    gte: filterStartDateTime
                }
            },
            {
                endDateTime:{
                    lte: filterEndDateTime
                }
            }
        ]
    })
}

  const whereCondition:Prisma.ScheduleWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
     const result = await prisma.schedule.findMany({
        skip,
        take: limit,
        where: whereCondition,
        orderBy: {
          [sortBy]: sortOrder as "asc" | "desc",
        },
     })

     const total = await prisma.schedule.count({ where: whereCondition });

     return {
        meta:{
            page,
            limit,
            total
         },
         data: result   
        
     }
}

export const ScheduleService = {
    insertIntoDB,
    getScheduleFromDB
}