import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { email } from "zod";
import config from "../../../config";
import { JwtHelpers } from "../../helper/jwtHelpers";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid credentials");
  }

  const accessToken = JwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwt.accessSecret as string,
    config.jwt.accessExpiresIn as string,
  );

  const refreshToken = JwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwt.refreshSecret as string,
    config.jwt.refreshExpiresIn as string,
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const AuthService = {
  login,
};
