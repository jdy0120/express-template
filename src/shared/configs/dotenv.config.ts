import dotenv from "dotenv";
import { path } from "app-root-path";
import { join } from "path";

/**
 * Environment lists
 * - production: cloud (for real users)
 * - development: cloud (for developers)
 * - stage: cloud (for QA/QC, pending)
 * - local: developer's local machine
 * - test: developer's local machine
 */
export const configDotenv = () => {
  const { NODE_ENV: env } = process.env;
  let envPath = "";

  switch (env) {
    case "production":
      // use environment variables injected by hashicorp vault.
      return;

    case "development":
      // use environment variables injected by hashicorp vault.
      return;

    case "stage":
      // use environment variables injected by hashicorp vault.
      return;

    case "local":
      envPath = join(path, ".env.local");
      break;

    case "test":
      envPath = join(path, ".env.test");
      break;

    default:
      console.error(`${env} is not a valid environment`);
      throw new Error();
  }

  dotenv.config();
  dotenv.config({ path: envPath });
};
