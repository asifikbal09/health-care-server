import { addHours, addMinutes, compareAsc, format } from "date-fns";
import { prisma } from "../../shared/prisma";

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

export const ScheduleService = {
    insertIntoDB
}