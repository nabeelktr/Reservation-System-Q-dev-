import cors from "cors";
import express from "express";
import { Application } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "@nabeelktr/error-handler";
import { limiter } from "./utils/rateLimitter";
import "dotenv/config"
import adminRoute from "./routes/adminRoute";
import bodyParser from "body-parser";


class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.applyMiddleware();
    this.routes();
  }

  private applyMiddleware(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true
      })
    );
    this.app.use(logger("dev"));
    this.app.use(cookieParser());
    this.app.use(errorHandler);
    this.app.use(limiter)
  }

  private routes(): void {
    this.app.use("/api", adminRoute);
  }

  public startServer(port: number): void {
    this.app.listen(port, () => {
      console.log(`server started on ${port}`);
    });
  }
}

export default App;
