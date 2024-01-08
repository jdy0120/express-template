import { Request } from "express";
import exampleService from "../services/example.service";

const write = async (req: Request) => {
  const data = await exampleService.write(req);

  return data;
};

const readAll = async (req: Request) => {
  const data = await exampleService.readAll(req);

  return data;
};

export default {
  write,
  readAll,
};
