import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scarlet Vertigo API Documentation",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
  },
  apis: [path.join(__dirname, "../api/routes/*.ts")],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
