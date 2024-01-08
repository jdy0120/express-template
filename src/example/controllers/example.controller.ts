import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import exampleService from "../services/example.service";
import { ListQuery } from "../../shared/dtos/common.dto";

const write = async (req: Request) => {
  const data = await exampleService.write(req);

  return data;
};

const readAll = async (query: ListQuery) => {
  console.log(query);
  const data = await exampleService.readAll();

  return data;
};

const readOne = async (params: ParamsDictionary) => {
  const data = await exampleService.readOne(params);

  return data;
};

const erase = async (params: ParamsDictionary) => {
  const data = await exampleService.erase(params);

  return data;
};

export default {
  write,
  readAll,
  readOne,
  erase,
};
