import express from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export async function createApp() {
  const app = express();
  app.use(express.json());

  // Initialize Supabase
  const supabaseUrlRaw = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  let supabase: any = null;
  if (supabaseUrlRaw && supabaseKey && supabaseUrlRaw.startsWith('http') && !supabaseUrlRaw.includes('your-project')) {
    try {
      const supabaseUrl = supabaseUrlRaw.trim().replace(/\/$/, "").replace(/\/rest\/v1$/, "");
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log("Supabase client initialized");
    } catch (err) {
      console.error("Failed to initialize Supabase:", err);
    }
  }

  // API Routes - Using a router or flexible paths to avoid 404s in different environments
  const api = express.Router();

  api.post("/waitlist", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Email is required" });
      
      if (supabase) {
        const { error } = await supabase.from('waitlist').insert([{ email, created_at: new Date().toISOString() }]);
        if (error) {
          console.error("Supabase Error:", error);
          return res.status(error.code === '23505' ? 400 : 500).json({ 
            error: error.code === '23505' ? "Already on the list!" : (error.message || "Database write failed"),
            code: error.code 
          });
        }
      } else {
        console.log("Demo Mode: email captured:", email);
      }
      res.json({ success: true });
    } catch (err: any) {
      console.error("Waitlist API Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  api.get("/health", (req, res) => {
    res.json({ 
      status: "ok", 
      supabase: !!supabase,
      time: new Date().toISOString()
    });
  });

  app.use("/api", api);

  // Vite placement logic
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!process.env.VERCEL) {
    // Traditional production (not Vercel)
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
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}
