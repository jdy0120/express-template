import { Sequelize } from "sequelize-typescript";
import { Example } from "../../example/models";

export let seq: Sequelize;

export const connectPostgres = async () => {
  try {
    console.info("🔌 Connecting to Postgres...");

    seq = new Sequelize({
      host: process.env["POSTGRES_HOST"],
      port: Number(process.env["POSTGRES_PORT"]),
      username: process.env["POSTGRES_USER"],
      password: process.env["POSTGRES_PASSWORD"],
      database: process.env["POSTGRES_DATABASE"],
      dialect: "postgres",
      timezone: process.env["TZ"],
      logging: (msg) => console.debug(msg),
      define: {
        charset: "utf8mb4_unicode_ci",
        paranoid: true,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
      },
      pool: {
        max: 3,
        min: 0,
        acquire: 30 * 1000,
        idle: 10 * 1000,
      },
    });

    await seq.authenticate();

    const models = [Example];

    seq.addModels(models);

    const syncDB = await seq.sync({ logging: false });
    console.info("✨ Synced DB:", syncDB.models);

    console.info("✨ Connected to Postgres");

    return seq;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
