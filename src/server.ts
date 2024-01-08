import { connectPostgres } from "./shared/configs/postgres.config";
import { configDotenv } from "./shared/configs/dotenv.config";

const showMemoryUsage = () => {
  type Unit = keyof typeof convertBytesTo;

  const convertBytesTo = {
    KB: (bytes: number) => bytes / 1024, // 10^3 Bytes
    MB: (bytes: number) => convertBytesTo.KB(bytes) / 1024, // 10^6 Bytes
    GB: (bytes: number) => convertBytesTo.MB(bytes) / 1024, // 10^9 Bytes
    TB: (bytes: number) => convertBytesTo.GB(bytes) / 1024, // 10^12 Bytes
    PB: (bytes: number) => convertBytesTo.TB(bytes) / 1024, // 10^15 Bytes
    EB: (bytes: number) => convertBytesTo.PB(bytes) / 1024, // 10^18 Bytes
    ZB: (bytes: number) => convertBytesTo.EB(bytes) / 1024, // 10^21 Bytes
    YB: (bytes: number) => convertBytesTo.ZB(bytes) / 1024, // 10^24 Bytes
  };

  const toHuman = (bytes: number, unit: Unit) =>
    `${convertBytesTo[unit](bytes).toFixed(2)}${unit}`;
  const memory = process.memoryUsage();
  const usedHeap = toHuman(memory.heapUsed, "MB");
  const totalHeap = toHuman(memory.heapTotal, "MB");
  const rss = toHuman(memory.rss, "MB"); // RSS: Resident Set Size

  return `Used ${usedHeap} of ${totalHeap} - RSS: ${rss}`;
};

const bootstrap = async () => {
  const app = (await import("./shared/configs/express.config"))
    .default;
  const port = process.env.PORT || 8080;

  const seq = await connectPostgres();
  const server = app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
    console.log(`🚀 Starting server... ${showMemoryUsage()}`);
  });

  // graceful shutdown
  const shutdown = async (signal: "SIGINT" | "SIGTERM") => {
    console.info(`👻 Server is shutting down... ${signal}`);
    await seq.close();
    server.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown.bind(null, "SIGINT"));
  process.on("SIGTERM", shutdown.bind(null, "SIGTERM"));
};

configDotenv();
bootstrap();
