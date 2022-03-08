import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import "./database";
import "express-async-errors";

const app = express();

app.use(express.json());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    } 

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
    }
);

app.use(router);



app.listen(3030, ()=> console.log("SERVIDOR ativo !><!><!"))