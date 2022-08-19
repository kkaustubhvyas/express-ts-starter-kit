import { DataTypes, ModelAttributes, ModelOptions } from 'sequelize';

export const BaseSchema: ModelAttributes = {
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active',
  },
  sys1: {
    type: DataTypes.STRING,
  },
  sys2: {
    type: DataTypes.STRING,
  },
  sys3: {
    type: DataTypes.STRING,
  },
  sys4: {
    type: DataTypes.INTEGER,
  },
  sys5: {
    type: DataTypes.INTEGER,
  },
};

export const BaseOptions: ModelOptions = {
  timestamps: true,
  underscored: true,
  version: true,
  defaultScope: {
    attributes: {
      exclude: ['sys1', 'sys2', 'sys3', 'sys4', 'sys5'],
    },
  },
};
