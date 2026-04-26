import { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import { ZodError } from "zod";

function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails = err;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorDetails = err.issues.map((issue) => ({
      field: issue.path[issue.path.length - 1],
      message: issue.message,
    }));
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 400;
      message = `Duplicate value error: ${err.meta?.target || "A record with this data already exists"}`;
    } else if (err.code === "P2003") {
      statusCode = 400;
      message = "Foreign key constraint failed. Related record not found.";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "The requested record was not found in the database.";
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message =
      "Invalid data provided. Please check your field types and required fields.";
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503; // Service Unavailable
    message =
      "Database connection failed. Please ensure the DB server is running.";
  } else if (err instanceof Error) {
    if (err.name === "UnauthorizedError") statusCode = 401;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}

export default globalErrorHandler;
