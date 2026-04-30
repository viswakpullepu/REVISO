import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      console.log('Registration failed: Missing email');
      return res.status(400).json({ error: 'Email is required' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
      console.log('Demo mode: email captured:', email);
      return res.status(200).json({ success: true, mode: 'demo' });
    }

    // Initialize client inside the handler
    const supabase = createClient(
      supabaseUrl.trim().replace(/\/$/, "").replace(/\/rest\/v1$/, ""),
      supabaseKey
    );

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('Supabase Error:', error);
      if (error.code === '23505') {
        return res.status(400).json({ error: 'This email is already on the waitlist!', code: error.code });
      }
      return res.status(500).json({ error: error.message || 'Database connection error', code: error.code });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Serverless Function Error:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
