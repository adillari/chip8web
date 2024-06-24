import express, { Application, Request, Response } from "express";
import { readdirSync } from "fs";

const app: Application = express();
const port: Number = 7000;

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public/"));

app.get("/", (req: Request, res: Response) => {
  const roms = readdirSync("public/roms/");
  res.render("index", { roms });
});

app.listen(port);
