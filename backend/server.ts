import App from "./src/app";
import 'dotenv/config';

const port = Number(3000)
new App().startServer(port);
