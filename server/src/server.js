const app = require("./app");
const connectDB = require("./config/database/data");
const { serverPort } = require("./secret");

app.listen(serverPort, async () => {
  console.log(`server is running at http://localhost:${serverPort}`);
  await connectDB();
});
