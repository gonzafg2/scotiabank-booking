import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { routesConfig } from "./usuarios/routes-config";

admin.initializeApp();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true }));

routesConfig(app);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const api = functions.https.onRequest(app);