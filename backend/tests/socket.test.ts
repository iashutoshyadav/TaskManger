import { Server } from "socket.io";
import Client from "socket.io-client";
import http from "http";
import jwt from "jsonwebtoken";
import { initSocket } from "../src/config/socket";

jest.mock("../src/config/env", () => ({
  env: {
    port: 7654,
    mongoUri: "mongodb://localhost:27017/test",
    jwtSecret: "test_secret",
    clientUrl: "http://localhost:3000",
    nodeEnv: "test",
  },
}));

import { env } from "../src/config/env";

let io: Server;
let server: http.Server;
let clientSocket: any;

const PORT = 7654;

// 🔐 create JWT
const createToken = (userId: string) =>
  jwt.sign({ userId }, env.jwtSecret);

describe("Socket.io Task Events", () => {
  jest.setTimeout(15000);

  beforeAll((done) => {
    server = http.createServer();
    io = initSocket(server);
    server.listen(PORT, done);
  });

  afterAll((done) => {
    io.close();
    server.close(done);
  });

  beforeEach((done) => {
    const token = createToken("user123");

    clientSocket = Client(`http://localhost:${PORT}`, {
      transports: ["websocket"],

      // ✅ MATCH BACKEND COOKIE NAME
      extraHeaders: {
        Cookie: `token=${token}`,
      },
    });

    clientSocket.on("connect", () => done());

    clientSocket.on("connect_error", (err: any) => {
      done(err);
    });
  });

  afterEach(() => {
    if (clientSocket && clientSocket.connected) {
      clientSocket.disconnect();
    }
  });

  it("should receive task updated event", (done) => {
    clientSocket.on("task:updated", (task: any) => {
      try {
        expect(task.title).toBe("Test Task");
        done();
      } catch (err) {
        done(err);
      }
    });

    io.emit("task:updated", { title: "Test Task" });
  });

  it("should receive task assigned event", (done) => {
    clientSocket.on("task:assigned", (data: any) => {
      try {
        expect(data.message).toBe("You have been assigned a new task");
        done();
      } catch (err) {
        done(err);
      }
    });

    io.emit("task:assigned", {
      message: "You have been assigned a new task",
    });
  });
});
