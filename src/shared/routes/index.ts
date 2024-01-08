import { Router } from "express";

import exampleRouter from "../../example/routes";

const { APP_NAME } = process.env;
const router = Router();

router.use(`/api/${APP_NAME}`, [exampleRouter]);

export default router;
