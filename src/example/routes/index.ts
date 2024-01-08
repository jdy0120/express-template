import { Router } from "express";

import * as v1Router from "./v1";

const router = Router();

router.use("/example/v1", [
  ...Object.entries(v1Router).map(([_, value]) => value),
]);

export default router;
