import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import multer from "multer";
import app from "../../index.js";
import connectDatabase from "../../../database/connectDatabase";
import User from "../../../database/models/User";
import { type UserStructure } from "../../../types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given the POST '/users/register' endpoint", () => {
  describe("When it receives a request with username 'Manolo' with an image and user doesn't exists", () => {
    test("Then it responds with status 201 and the user with its image", async () => {
      User.create = jest.fn();

      await request(app)
        .post("/users/register")
        .set("Content-type", "multipart/form-data")
        .attach(
          "image",
          Buffer.from("/Users/anapaulacoronel/Downloads/avatarcito.png"),
          { filename: "avatarcito.png" }
        )
        .field("username", "Manolo")
        .field("email", "loli@lola93.com")
        .field("password", "manolo82lola93")
        .expect(201);
    });
  });

  describe("When it receives a request with username 'Manolo' with an email 'loli@lola93.com' and user exists", () => {
    const existentUser: UserStructure = {
      password: "manolo82lola93",
      username: "Manolo",
      email: "loli@lola93.com",
    };
    beforeAll(async () => {
      await User.create(existentUser);
    });
    test("Then it responds with status 500", async () => {
      User.create = jest.fn();

      await request(app).post("/users/register").send(existentUser).expect(500);
    });
  });
});
