import express, { NextFunction } from "express";
import Routes from "./Routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 3001;

const MongoStore = MongoDBStore(session);
const store = new MongoStore({
	uri: process.env.DB_URL as string,
	collection: "sessions",
});

store.on("error", (error) => {
	console.error("Session store error:", error);
});

app.use(
	session({
		secret: process.env.SECRET_KEY as string,
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(Routes);

app.listen(port, async () => {
	console.log(`Server is running on port ${port}.`);
});