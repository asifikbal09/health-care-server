import { Gender } from "@prisma/client";

export type IDoctorUpdatePayload ={
    email: string;
    contactNumber: string | null;
    gender: Gender;
    appointmentFee: number;
    name: string;
    address: string | null;
    registrationNumber: string;
    experience: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    isDeleted: boolean;
    specialties:{
        specialtyId: string;
        isDeleted:boolean;
    }[]
}