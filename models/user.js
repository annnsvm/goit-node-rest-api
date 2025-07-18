import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const User = sequelize.define(
  'user',
  {
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ['starter', 'pro', 'business'],
      defaultValue: 'starter',
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    avatarURL: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

//User.sync({alter: true})

export default User;
