import { createClient } from '@supabase/supabase-js';
import REVISO_CONFIG from '../reviso.config';

export default async function handler(req: any, res: any) {
  // CORS headers
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
      return res.status(400).json({ error: 'Email is required' });
    }

    // ----------------------------------------------------------------
    // Resolve credentials:
    //   Priority 1 — environment variables  (.env / Vercel dashboard)
    //   Priority 2 — reviso.config.ts       (client editable file)
    // ----------------------------------------------------------------
    const supabaseUrl =
      process.env.SUPABASE_URL?.trim() ||
      REVISO_CONFIG.supabase.url?.trim();

    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
      REVISO_CONFIG.supabase.serviceRoleKey?.trim();

    const tableName =
      process.env.SUPABASE_TABLE_NAME ||
      REVISO_CONFIG.supabase.tableName ||
      'waitlist';

    // Check if credentials are still placeholders / unconfigured
    const isUnconfigured =
      !supabaseUrl ||
      !supabaseKey ||
      supabaseUrl.includes('YOUR-PROJECT-ID') ||
      supabaseKey.includes('YOUR-SERVICE-ROLE-KEY') ||
      supabaseUrl.includes('your-project');

    if (isUnconfigured) {
      // Demo / preview mode — still return success so UI works
      console.log('[Reviso] Demo mode — email captured locally:', email);
      return res.status(200).json({ success: true, mode: 'demo' });
    }

    // Clean URL (remove trailing slash or /rest/v1 suffix)
    const cleanUrl = supabaseUrl.replace(/\/$/, '').replace(/\/rest\/v1$/, '');

    const supabase = createClient(cleanUrl, supabaseKey);

    const { error } = await supabase
      .from(tableName)
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('[Reviso] Supabase error:', error);
      if (error.code === '23505') {
        return res.status(400).json({
          error: 'This email is already on the waitlist!',
          code: error.code,
        });
      }
      return res.status(500).json({
        error: error.message || 'Database connection error',
        code: error.code,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[Reviso] Internal error:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
