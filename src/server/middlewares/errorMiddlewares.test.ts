import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = {} as Request;
const next = jest.fn() as NextFunction;

describe("Given a notFoundError function", () => {
  describe("When it receives a response object", () => {
    test("Then it should call its next method", async () => {
      notFoundError(req, res as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError function", () => {
  describe("When it receives a response object and an error with status 500 and error publicMessage 'There has been an error'", () => {
    test("Then it should call its status method with 500 and the errpr publicMessaje 'There has been an error'", () => {
      const statusCode = 500;
      const publicMessage = "There has been an error";
      const error = new CustomError(
        "There was an error",
        statusCode,
        publicMessage
      );
      generalError(error, req, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({
        error: publicMessage,
      });
    });
  });
});
