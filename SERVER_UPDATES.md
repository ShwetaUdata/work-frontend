# Server Updates Required

Add this signup endpoint to your `server.js` file (add it right after the login endpoint around line 114):

```javascript
// Signup endpoint
app.post("/api/signup", (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: "Username, password, and name are required" });
  }

  if (password.length < 3) {
    return res.status(400).json({ error: "Password must be at least 3 characters" });
  }

  // Check if user already exists
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (row) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Create new user
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: "Error hashing password" });

      db.run(
        "INSERT INTO users (username, password, role, name, type) VALUES (?, ?, ?, ?, ?)",
        [username, hashedPassword, "employee", name, null],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });

          res.json({
            success: true,
            user: { 
              id: this.lastID, 
              username, 
              role: "employee", 
              name, 
              type: null 
            }
          });
        }
      );
    });
  });
});
```

## ⚠️ CRITICAL DEPLOYMENT ISSUE

**Your current backend uses SQLite, which WILL NOT WORK on Vercel!**

### Why SQLite doesn't work on Vercel:
- Vercel uses serverless functions (stateless)
- Each request creates a new function instance
- SQLite needs persistent file storage
- Database file gets reset after each deployment

## 🎯 RECOMMENDED SOLUTION: Use Lovable Cloud

**Lovable Cloud** is the easiest solution that gives you:
- ✅ Built-in PostgreSQL database
- ✅ Built-in authentication (no separate login code needed)
- ✅ Automatic scaling
- ✅ No separate backend to manage
- ✅ Deploy with one click

**To enable Lovable Cloud:** Click the button below and I'll help migrate your app!

## 🔄 Alternative Solutions (if you don't use Lovable Cloud)

### Option 1: Deploy Backend Separately
Deploy your backend to a platform that supports persistent databases:
- **Railway** (recommended for Node.js + SQLite)
- **Heroku** (with PostgreSQL)
- **DigitalOcean App Platform**
- **Fly.io**

Then deploy frontend to Vercel and point `VITE_API_URL` to your backend URL.

### Option 2: Migrate to PostgreSQL on Vercel
1. Use a hosted PostgreSQL database (Supabase, Neon, PlanetScale)
2. Convert your Express server to Vercel serverless functions
3. Update all database queries from SQLite to PostgreSQL

**This is complex and time-consuming!**

## 📦 Frontend Deployment to Vercel

The frontend can be deployed to Vercel easily:

1. **Push code to GitHub** (connect your repo)
2. **Import project in Vercel**
3. **Add environment variable:**
   - `VITE_API_URL` = your backend URL
4. **Deploy!**

Build settings (auto-detected):
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

---

**💡 My strong recommendation:** Use Lovable Cloud to avoid all these deployment headaches!
