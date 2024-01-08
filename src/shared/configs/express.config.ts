import compression from "compression";
import requestTracer from "cls-rtracer";
import cors from "cors";
import express from "express";

import allRouters from "../routes";

const app = express();

app.use(compression());
app.use(
  cors({ origin: "*", credentials: true, optionsSuccessStatus: 200 })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request tracer depending on AsyncLocalStorage API. (released in Node.js v12.17.0)
app.use(requestTracer.expressMiddleware());

app.use("/", [allRouters]);
app.use("/", (_req, res) => {
  res.status(200).send("<h1>Express + TypeScript Server</h1>");
});

export default app;
