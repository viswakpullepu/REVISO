// ============================================================
//  REVISO — CLIENT CONFIGURATION FILE
//  ============================================================
//  👋 Hi! This is the ONLY file you need to edit to connect
//  Reviso to your own Supabase project.
//
//  Steps:
//  1. Go to https://supabase.com and create a free account
//  2. Create a new project
//  3. Go to: Project Settings → API
//  4. Copy your Project URL and keys into the fields below
//  5. Create a `waitlist` table (see SETUP.md for the SQL)
//  6. Save this file and deploy
// ============================================================

const REVISO_CONFIG = {

  // ----------------------------------------------------------
  // 1. SUPABASE CREDENTIALS
  //    Found at: Supabase Dashboard → Project Settings → API
  // ----------------------------------------------------------

  supabase: {
    /** Your Supabase project URL
     *  e.g. "https://abcdefghij.supabase.co"
     */
    url: "https://YOUR-PROJECT-ID.supabase.co",

    /** Your Supabase `service_role` secret key  (keep this private!)
     *  e.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *  ⚠️  NEVER expose this key on the frontend. It is only used
     *      server-side inside /api/waitlist.ts
     */
    serviceRoleKey: "YOUR-SERVICE-ROLE-KEY",

    /** The table name where waitlist emails are stored.
     *  Default: "waitlist" — change only if you renamed the table.
     */
    tableName: "waitlist",
  },

  // ----------------------------------------------------------
  // 2. BRANDING  (optional — tweak to match your brand)
  // ----------------------------------------------------------

  branding: {
    /** The name shown in the Navbar and Footer */
    appName: "Reviso",

    /** Short tagline shown in the browser tab */
    tagline: "Master Your Memory",

    /** Support / contact email shown in footer or emails */
    supportEmail: "hello@reviso.app",
  },

  // ----------------------------------------------------------
  // 3. APP URL  (required for production deployments)
  //    Set this to your Vercel / custom domain URL.
  //    e.g. "https://reviso.vercel.app" or "https://reviso.com"
  // ----------------------------------------------------------

  appUrl: "https://YOUR-DOMAIN.com",

};

export default REVISO_CONFIG;
