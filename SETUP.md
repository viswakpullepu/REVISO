# 🚀 Reviso — Client Setup Guide

Welcome! This guide walks you through connecting **Reviso** to your own Supabase account in under 10 minutes. You only need to edit **one file**.

---

## Step 1 — Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com) and sign up for a free account.
2. Click **"New Project"** and fill in:
   - **Project name**: `reviso` (or anything you like)
   - **Database password**: choose a strong password and save it somewhere safe
   - **Region**: pick the one closest to your users
3. Wait ~2 minutes for the project to initialise.

---

## Step 2 — Create the Waitlist Table

In your Supabase dashboard, go to **SQL Editor** and run this query:

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow the server (service_role key) to insert rows
CREATE POLICY "service_role insert"
  ON waitlist FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow the server to read rows (for the admin dashboard)
CREATE POLICY "service_role select"
  ON waitlist FOR SELECT
  TO service_role
  USING (true);
```

Click **Run** ▶️ — you should see "Success".

---

## Step 3 — Copy Your API Keys

1. In your Supabase dashboard go to **Project Settings → API**.
2. Copy two values:
   - **Project URL** — looks like `https://abcdefghij.supabase.co`
   - **service_role secret** — the long JWT under "Project API keys" labelled `service_role`

> ⚠️ **Never share your `service_role` key publicly.** It is only used server-side.

---

## Step 4 — Edit the Config File

Open **`reviso.config.ts`** (in the root of the project) and replace the placeholder values:

```ts
supabase: {
  url: "https://YOUR-PROJECT-ID.supabase.co",   // ← paste Project URL
  serviceRoleKey: "YOUR-SERVICE-ROLE-KEY",        // ← paste service_role key
  tableName: "waitlist",                          // leave as-is
},
```

You can also update the **branding** section with your app name, tagline, and support email.

---

## Step 5 — Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push the project to GitHub (already done if you received this as a repo).
2. Go to [https://vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo.
3. Add these **Environment Variables** in Vercel (Settings → Environment Variables):

   | Variable | Value |
   |---|---|
   | `SUPABASE_URL` | Your Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your service_role key |

4. Click **Deploy**. Done!

> ✅ Using Vercel env vars is more secure than putting keys directly in `reviso.config.ts`. The config file works as a fallback for local development or if you don't use Vercel.

### Option B — Local Development

Create a `.env` file in the project root (copy from `.env.example`):

```env
SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

Then run:

```bash
npm install
npm run dev
```

---

## Step 6 — Test It

1. Open your deployed site.
2. Enter any email address in the waitlist form and click **Join the Waitlist**.
3. Go to **Supabase → Table Editor → waitlist** — you should see the email appear instantly. ✅

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Form says "Something went wrong" | Double-check your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` |
| Duplicate email error | Expected behaviour — each email can only join once |
| Table not found | Make sure you ran the SQL in Step 2 |
| Still in "demo mode" | Your credentials still contain placeholder text — check `reviso.config.ts` |

---

## File Reference

| File | Purpose |
|---|---|
| `reviso.config.ts` | ⭐ **Edit this** — all credentials and branding in one place |
| `.env` / `.env.example` | Alternative: set credentials as environment variables |
| `api/waitlist.ts` | Server-side API — reads from config or env vars automatically |
| `src/components/` | All UI components — edit these to change the design |

---

*Built with ❤️ by Reviso. Questions? Reach out at the email in `reviso.config.ts`.*
