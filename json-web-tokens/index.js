import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import router from "./src/routes/router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
