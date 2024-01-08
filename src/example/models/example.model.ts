import * as SQLZ_TS from "sequelize-typescript";
import * as SQLZ from "sequelize";

export interface ExampleAttributes {
  id: number;
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ExampleOmitAttributes = "id" | "createdAt" | "updatedAt";
export type ExampleCreationAttributes = SQLZ.Optional<
  ExampleAttributes,
  ExampleOmitAttributes
>;

@SQLZ_TS.Table({ tableName: "cf_example", modelName: "example" })
export class Example extends SQLZ_TS.Model<
  ExampleAttributes,
  ExampleCreationAttributes
> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Unique("name_unique")
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly name!: string;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly address!: string;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  static async write(
    values: ExampleCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<Example>>
  ) {
    return this.create(values, {
      returning: true,
      ...options,
    }).catch((error) => {
      console.error(error);
      throw error;
    });
  }

  static async readAll(
    this: typeof Example,
    options?: SQLZ.FindOptions<ExampleAttributes>
  ) {
    return this.findAll(options);
  }

  static async readOne(
    id: number,
    options?: Omit<SQLZ.FindOptions<ExampleAttributes>, "where">
  ) {
    return this.findByPk(id, {
      ...options,
    });
  }

  static async erase(
    id: number,
    options?: Omit<SQLZ.DestroyOptions<ExampleAttributes>, "where">
  ) {
    return this.destroy({
      where: { id },
      ...options,
    });
  }
}
