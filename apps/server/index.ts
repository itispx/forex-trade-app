import * as http from "http";
import app from "./src/app";

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);
