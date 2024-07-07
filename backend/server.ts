import App from "./src/app";
import 'dotenv/config';

const port = Number(4000)
new App().startServer(port);
