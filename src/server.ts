import express from "express";

import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.get("/healthcheck", (request, response) => {
  return response.json({
    message: "Olá NLW 05! - Healthcheck route",
  });
});


app.listen(3333, () => console.log(`Server is running on port 3333`));
