import { Router, Response } from "express";

import exampleController from "../controllers/example.controller";

const router = Router();

// GET - users
router.get("/", async (_req, res: Response) => {
  const data = await exampleController.readAll(_req);
  res.status(200).json({ users: data });
});
// GET - users/:id
router.get("/:id", async (_req, res: Response) => {
  // TO DO
  const result: string = "";
  res.status(200).json({ user: result });
});
// POST - users
router.post("/", async (_req, res: Response) => {
  const data = await exampleController.write(_req);
  // TO DO
  res.status(201).json({
    user: {
      name: data.name,
      address: data.address,
    },
  });
});
export default router;
