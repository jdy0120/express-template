import compression from "compression";
import requestTracer from "cls-rtracer";
import cors from "cors";
import express from "express";

import userRoute from "../../example/routes/example.route";

const app = express();

app.use(compression());
app.use(
  cors({ origin: "*", credentials: true, optionsSuccessStatus: 200 })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request tracer depending on AsyncLocalStorage API. (released in Node.js v12.17.0)
app.use(requestTracer.expressMiddleware());

app.use("/users", userRoute);
app.use("/", (_req, res) => {
  res.status(200).send("<h1>Express + TypeScript Server</h1>");
});

export default app;
