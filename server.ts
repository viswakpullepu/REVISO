import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createClient } from "@supabase/supabase-js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Supabase (Lazy load if keys are missing to prevent crash)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  let supabase: any = null;
  // Only initialize if keys are present and doesn't contain placeholders
  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project')) {
    try {
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log("Supabase client initialized");
    } catch (err) {
      console.error("Failed to initialize Supabase client:", err);
    }
  }

  // API Routes
  app.post("/api/waitlist", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Email is required" });
      
      if (supabase) {
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
      } else {
        console.log(`[Demo Mode] Registration: ${email}`);
      }
      
      res.json({ success: true });
    } catch (err: any) {
      console.error("Server Error:", err);
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
