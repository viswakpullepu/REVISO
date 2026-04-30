import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Supabase (Lazy load if keys are missing to prevent crash)
  const supabaseUrlRaw = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  let supabase: any = null;
  // Only initialize if keys are present and doesn't contain placeholders
  if (supabaseUrlRaw && supabaseKey && supabaseUrlRaw.startsWith('http') && !supabaseUrlRaw.includes('your-project')) {
    try {
      // Normalize URL: remove trailing slash and ensure no /rest/v1 suffix which some users mistakenly add
      const supabaseUrl = supabaseUrlRaw.trim().replace(/\/$/, "").replace(/\/rest\/v1$/, "");
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log("Supabase client successfully initialized with URL:", supabaseUrl);
    } catch (err) {
      console.error("Failed to initialize Supabase client constructor:", err);
    }
  } else {
    console.log("Supabase credentials missing, malformed, or using placeholders. Running in Demo Mode.");
    if (supabaseUrlRaw) console.log("Current URL value starts with:", supabaseUrlRaw.substring(0, 10));
  }

  // API Routes
  app.post("/api/waitlist", async (req, res) => {
    console.log("POST /api/waitlist request received");
    try {
      const { email } = req.body;
      if (!email) {
        console.log("Registration failed: Missing email");
        return res.status(400).json({ error: "Email is required" });
      }
      
      if (supabase) {
        console.log("Attempting Supabase insertion for:", email);
        const { error } = await supabase
          .from('waitlist')
          .insert([{ email, created_at: new Date().toISOString() }]);
        
        if (error) {
          console.error("Supabase Insertion Error:", error);
          // 42P01: Table missing
          if (error.code === '42P01') {
            return res.status(500).json({ 
              error: "Database table 'waitlist' not found. Please create it in your Supabase dashboard." 
            });
          }
          // 23505: Unique violation (Email already registered)
          if (error.code === '23505') {
            return res.status(400).json({ 
              error: "This email is already on the waitlist!" 
            });
          }
          return res.status(500).json({ error: error.message || "Database error" });
        }
        console.log("Supabase insertion successful");
      } else {
        console.log(`[Demo Mode] Registration recorded for: ${email}`);
      }
      
      res.json({ success: true });
    } catch (err: any) {
      console.error("Unexpected Server Error:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  app.get("/api/admin/waitlist", async (req, res) => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('waitlist')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Supabase Fetch Error:", error);
          return res.status(500).json({ error: error.message || "Database error" });
        }
        return res.json(data || []);
      }
      res.json([]);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      supabase: !!supabase,
      env: process.env.NODE_ENV
    });
  });

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("GLOBAL SERVER ERROR:", err);
    res.status(500).json({ 
      error: "Critical server error", 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
