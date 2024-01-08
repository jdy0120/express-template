import { Request } from "express";

import { Example } from "../models";

const write = async (req: Request) => {
  return Example.write({ ...req.body });
};

const readAll = async (req: Request) => {
  return Example.readAll(req.body);
};

export default {
  write,
  readAll,
};
