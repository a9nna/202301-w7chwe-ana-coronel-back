import "../loadEnvironments.js";
import type cors from "cors";

const renderUrl = process.env.RENDER_URL!;

const allowedOrigins = [
  "http://localhost:3000",
  `${renderUrl}`,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
