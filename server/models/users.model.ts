import { DataTypes, ModelAttributes, Model, Sequelize } from 'sequelize';
import { BaseSchema } from './base';

const UsersSchema: ModelAttributes = {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'user_id',
  },
  name: {
    type: DataTypes.STRING,
    field: 'user_name',
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_email',
  },
};

class UsersModel extends Model {
  public readonly userId!: string;

  public name!: string;

  public email!: string;

  public sys1!: string;

  public sys2!: string;

  public sys3!: string;

  public sys4!: number;

  public sys5!: number;

  public isActive!: boolean;

  public static initialize(sequelize: Sequelize): void {
    UsersModel.init(
      {
        ...UsersSchema,
        ...BaseSchema,
      },
      {
        sequelize,
        modelName: 'users',
        tableName: 'users',
      },
    );
  }
}

export default UsersModel;
