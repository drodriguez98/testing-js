import { DataTypes } from "sequelize";

import { sequelize } from "../database/database.js";

// Sequelize creará la tabla en la base de datos automáticamente.

export const Task = sequelize.define(

  "task",

  {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },

    name: { type: DataTypes.STRING, },

    done: {

      type: DataTypes.BOOLEAN,
      defaultValue: false,

    },

  },

  { timestamps: false, }

);