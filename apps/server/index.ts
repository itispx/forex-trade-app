import * as http from "http";
import app from "./src/app";

import connectDB from "./src/middleware/connect-db";

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  await connectDB();
});
