import Joi from "joi";

import { CommonParams } from "../types";

export type ListQuery = {
  page?: number;
  count?: number;
  sort?: string;
  dir?: string;
  q?: string;
  [key: string]: any;
};

const readAll = {
  query: Joi.object<ListQuery>().keys({
    page: Joi.number().integer().min(1).default(1),
    count: Joi.number().integer().min(1).max(100).default(30),
    sort: Joi.string().valid("id", "name").default("createdAt"),
    dir: Joi.string().valid("ASC", "DESC").default("DESC"),
    q: Joi.string().allow(null, "").default(""),
  }),
};

const readOne = {
  params: Joi.object<CommonParams>().required().keys({
    id: Joi.number().required(),
  }),
};

const erase = {
  params: Joi.object<CommonParams>().required().keys({
    id: Joi.number().required(),
  }),
};

export default {
  readAll,
  readOne,
  erase,
};
