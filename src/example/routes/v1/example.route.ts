import { Router, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import exampleController from "../../controllers/example.controller";
import { ListQuery } from "../../../shared/dtos/common.dto";

export const router = Router();

// GET - users
router.get(
  "/users",
  async (
    req: Request<unknown, unknown, unknown, ListQuery>,
    res: Response
  ) => {
    const { query } = req;

    const data = await exampleController.readAll(query);
    res.status(200).json({ users: data });
  }
);
// GET - users/:id
router.get(
  "/user/:id",
  async (
    req: Request<ParamsDictionary, unknown, unknown, unknown>,
    res: Response
  ) => {
    const { params } = req;

    const data = await exampleController.readOne(params);
    res.status(200).json({ user: data });
  }
);

router.delete(
  "/user/:id",
  async (
    req: Request<ParamsDictionary, unknown, unknown, unknown>,
    res: Response
  ) => {
    const { params } = req;

    const data = await exampleController.erase(params);

    res.status(204).json({
      message: data,
    });
  }
);

// POST - users
router.post("/user", async (req: Request, res: Response) => {
  const data = await exampleController.write(req);
  // TO DO
  res.status(201).json({
    user: {
      name: data.name,
      address: data.address,
    },
  });
});
