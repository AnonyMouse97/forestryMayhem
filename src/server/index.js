/* becodeorg/TimberMayhem
 *
 * /src/server/index.js - Server entry point
 *
 * coded by samuel & charlotte @BeCode
 * started on 05/2021
 */

//import
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { use } from "./routes/user.routes";

require("dotenv").config();

const app = express();
const { APP_PORT, ATLAS_URI } = process.env;

const userRoutes = require("./routes/user.routes");
const treeRoutes = require("./routes/tree.routes");
const leaderRoutes = require("./routes/leader.routes")
const historyRoutes = require("./routes/history.routes")

// connection to db
mongoose
    .connect(ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("🤡 MongoDB database connected succesfully !"))
    .catch(err => console.warn(`👮 Failed to connect to MongoDB : \n ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../../bin/client")));

//routes
app.use("/api/user", userRoutes);
app.use("/api/tree", treeRoutes);
app.use("/api/leaderboard", leaderRoutes);
app.use("/api/history", historyRoutes)


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../bin/client/'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// listening on port
app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
