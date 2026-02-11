import { JwtPayload } from "jsonwebtoken"
import { prisma } from "../../shared/prisma"

const insertIntoDB = async(user: JwtPayload , payload:{
    scheduleIds: string[]
})=>{
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where:{
            email: user.email
        }
    })

    const doctorScheduleData = payload.scheduleIds.map(scheduleId =>({
        doctorId: doctorData.id,
        scheduleId
    }))

    return await prisma.doctorSchedule.createMany({
        data: doctorScheduleData
    })
}

export const DoctorScheduleService = {
    insertIntoDB
}