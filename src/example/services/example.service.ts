import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { Example } from "../models";

const write = async (req: Request) => {
  return Example.write({ ...req.body });
};

const readAll = async () => {
  return Example.readAll();
};

const readOne = async (params: ParamsDictionary) => {
  return Example.readOne(params.id);
};

const erase = async (params: ParamsDictionary) => {
  return Example.erase(params.id);
};

export default {
  write,
  readAll,
  readOne,
  erase,
};
