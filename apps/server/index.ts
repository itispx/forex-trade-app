import * as http from "http";
import app from "./src/app";

// TODO Fix this in Turborepo
// eslint-disable-next-line turbo/no-undeclared-env-vars
const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);
