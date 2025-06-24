import express from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log(`${formattedTime} [express] ${message}`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  const server = registerRoutes(app);

  // Development: Set up Vite dev server
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer } = await import("vite");
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "custom",
        root: path.resolve(__dirname, "..", "client"),
      });
      app.use(vite.ssrFixStacktrace);
      app.use(vite.middlewares);
    } catch (error) {
      log("Vite setup failed, serving static files instead");
      app.use(express.static(path.resolve(__dirname, "..", "client")));
    }
  } else {
    // Production: Serve static files
    app.use(express.static(path.resolve(__dirname, "..", "dist", "client")));
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server running on port ${PORT}`);
  });
})();