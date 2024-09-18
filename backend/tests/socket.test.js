// backend/tests/socket.test.js
const io = require("socket.io-client");
const http = require("http");
const socketIo = require("socket.io");
const app = require("../server"); // Express app

let server;
let ioServer;

beforeAll((done) => {
  server = http.createServer(app);
  ioServer = socketIo(server);
  server.listen(() => {
    done();
  });
});

afterAll((done) => {
  ioServer.close();
  server.close(done);
});

test("should receive real-time updates for task assignment", (done) => {
  const socketClient = io.connect(`http://localhost:${server.address().port}`, {
    query: { token: "valid-jwt-token" }, // Assuming JWT validation for socket.io
  });

  socketClient.on("connect", () => {
    // Simulate task assignment
    ioServer.emit("taskAssigned", { taskId: "123", assignedTo: "user_abc" });

    socketClient.on("taskAssigned", (data) => {
      expect(data.taskId).toBe("123");
      expect(data.assignedTo).toBe("user_abc");
      socketClient.disconnect();
      done();
    });
  });
});
