import Sequelize from "sequelize";

// Conexión Sequelize con la base de datos PostgreSQL

export const sequelize = new Sequelize ( 

    "projectsdb", // database
    'projects',  // user
    'abc123.', // password

    { 
        host: "localhost", 
        dialect:"postgres" 
    } 

)