import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("directory.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    rating REAL DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    address TEXT,
    phone TEXT,
    image TEXT,
    is_verified BOOLEAN DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );
`);

// Seed data if empty
const categoryCount = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
if (categoryCount.count === 0) {
  const insertCategory = db.prepare("INSERT INTO categories (name, icon) VALUES (?, ?)");
  insertCategory.run("AI Solutions", "Cpu");
  insertCategory.run("Data Analytics", "BarChart");
  insertCategory.run("Cloud Services", "Cloud");
  insertCategory.run("Software Dev", "Code");
  insertCategory.run("Cybersecurity", "Shield");
  insertCategory.run("Digital Marketing", "Globe");
  insertCategory.run("B2B Services", "Briefcase");
  insertCategory.run("Consulting", "Users");

  const insertListing = db.prepare("INSERT INTO listings (name, category_id, rating, reviews_count, address, phone, image, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insertListing.run("Nexgen AI Labs", 1, 4.8, 120, "Tech Park, Bangalore", "080-1234567", "https://picsum.photos/seed/ai1/400/300", 1);
  insertListing.run("DataFlow Systems", 2, 4.5, 85, "Cyber City, Hyderabad", "040-9876543", "https://picsum.photos/seed/data1/400/300", 1);
  insertListing.run("CloudScale Solutions", 3, 4.2, 45, "BKC, Mumbai", "022-5550123", "https://picsum.photos/seed/cloud1/400/300", 0);
  insertListing.run("SecureNet AI", 5, 4.9, 210, "Sector 62, Noida", "0120-4443322", "https://picsum.photos/seed/sec1/400/300", 1);
  insertListing.run("InnovateSoft", 4, 4.4, 67, "Whitefield, Bangalore", "080-8887776", "https://picsum.photos/seed/soft1/400/300", 1);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  });

  app.get("/api/listings", (req, res) => {
    const { categoryId, search } = req.query;
    let query = "SELECT l.*, c.name as category_name FROM listings l JOIN categories c ON l.category_id = c.id";
    const params = [];

    if (categoryId) {
      query += " WHERE l.category_id = ?";
      params.push(categoryId);
    } else if (search) {
      query += " WHERE l.name LIKE ? OR c.name LIKE ?";
      params.push(`%${search}%`, `%${search}%`);
    }

    const listings = db.prepare(query).all(...params);
    res.json(listings);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
