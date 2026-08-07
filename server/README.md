# BlackQuill Backend

Express API for the contact form and admin dashboard. Deployed independently
on your VPS — the React frontend (in the repo root) stays on Vercel and
calls this API over HTTPS. No database server or native build tools
required — submissions are stored in a plain JSON file on disk.

## What it does
- `POST /api/contact` — validates and stores a contact form submission,
  then emails a notification to `CONTACT_NOTIFY_EMAIL` (and a short
  confirmation to the person who submitted) via [Resend](https://resend.com).
- `POST /api/admin/login` / `POST /api/admin/logout` — single shared admin
  password, session stored server-side, session id in an httpOnly cookie.
- `GET /api/admin/submissions` — list/search/filter submissions (admin only).
- `GET/PATCH/DELETE /api/admin/submissions/:id` — view, change status, delete.

## Local development
```bash
cd server
npm install
cp .env.example .env   # fill in ADMIN_PASSWORD at minimum
npm run dev
```
The API listens on `http://localhost:4000` by default.

## Deploying on your VPS

This lives in its own folder and its own process — it will not conflict with
anything else already running on the box.

### 1. Get the code onto the server
```bash
# on the VPS, anywhere you like, separate from your other project(s)
git clone <your-repo-url> blackquill
cd blackquill/server
npm install --omit=dev
cp .env.example .env
nano .env   # fill in ADMIN_PASSWORD, RESEND_API_KEY, EMAIL_FROM,
            # CONTACT_NOTIFY_EMAIL, FRONTEND_URL (your Vercel domain)
```

### 2. Run it with PM2 (keeps it alive, restarts on crash/reboot)
```bash
npm install -g pm2   # once, if not already installed
pm2 start index.js --name blackquill-api --cwd ~/blackquill/server
pm2 save
pm2 startup          # follow the printed instructions once, for reboot survival
```
Useful commands: `pm2 logs blackquill-api`, `pm2 restart blackquill-api`.

### 3. Point Nginx at it
Pick a subdomain (e.g. `api.blackquill.ng`) and point its DNS A record at
your VPS. Then add a server block — this does not touch any existing sites'
config as long as the `server_name` and port are unique:

```nginx
server {
    listen 80;
    server_name api.blackquill.ng;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/blackquill-api /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.blackquill.ng   # free HTTPS cert
```

### 4. Point the frontend at it
In your Vercel project settings, set the env var:
```
VITE_API_URL=https://api.blackquill.ng
```
and redeploy the frontend.

### 5. Redeploying after code changes
```bash
cd ~/blackquill
git pull
cd server && npm install --omit=dev
pm2 restart blackquill-api
```

## Data
Submissions are stored in `server/data/submissions.json` on disk — back this
file up periodically (`cp` it, or add it to your existing backup routine).
It is gitignored, so it persists across `git pull` and is never committed.

## Resend setup
1. Create a free account at resend.com.
2. Verify a sending domain (or use their test domain while developing).
3. Create an API key, put it in `.env` as `RESEND_API_KEY`.
4. Set `EMAIL_FROM` to an address on your verified domain.
