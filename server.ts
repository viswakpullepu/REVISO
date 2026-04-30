import express from "express";
import path from "path";
import dotenv from "dotenv";
import waitlistHandler from "./api/waitlist";

dotenv.config();

export async function createApp() {
  const app = express();
  app.use(express.json());

  // Locally handle the /api/waitlist route by passing it to our standalone handler
  // This makes the local environment behavior identical to Vercel
  app.all("/api/waitlist", (req, res) => {
    return waitlistHandler(req, res);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: "local-proxy" });
  });

  // Vite placement logic
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In local production mode (not Vercel)
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  createApp().then(app => {
    const PORT = parseInt(process.env.PORT || "3000", 10);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Preview server running on http://localhost:${PORT}`);
    });
  });
}
