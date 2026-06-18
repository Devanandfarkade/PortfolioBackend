# Portfolio Backend (MongoDB Standalone Project)

This is a standalone, fully decoupled version of the portfolio backend. It operates identically to the original PostgreSQL backend but utilizes **MongoDB** via the Mongoose ODM.

---

## 💡 MongoDB Collection Creation & Behavior

Unlike PostgreSQL and other SQL databases where you must run structured `CREATE TABLE` and `INSERT` query scripts beforehand to establish schema tables, **MongoDB is schema-less and collection auto-creating**:

1.  **Auto-Initialization**: MongoDB will automatically create the database (e.g. `portfolio_db`) and individual collections (e.g. `skills`, `projects`) the moment the application first writes data to them.
2.  **Mongoose Schema Enforcement**: In the code, Mongoose defines the schemas and structures the documents on the application side. You do not need to pre-define them inside the database server.
3.  **Automatic Seeding**: We have provided a `seed.js` script that wipes the database and populates it with all the initial portfolio records. Running this script will automatically create the collections and insert the seed documents.

---

## 🛠️ Step-by-Step Setup Instructions

### 1. Start MongoDB Server

#### Option A: Running MongoDB Locally
*   **Windows**: If you installed MongoDB community server locally, start the service:
    *   Open PowerShell as Admin and run: `Start-Service MongoDB` (or run `mongod` directly in terminal).
*   **Default Connection URI**: `mongodb://127.0.0.1:27017/portfolio_db`

#### Option B: MongoDB Atlas (Cloud)
1.  Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  In the Atlas console, configure Network Access to allow your IP address.
3.  Add a Database User and copy your Connection String.
4.  Use this Connection String inside your `.env` file.

---

### 2. Configure Environment Variables

Create a file named `.env` in the `PortfolioBackend-MongoDB` root directory (template provided as `.env` in the folder):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=supersecretcyberpunkkeychangeinproduction
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

### 3. Install Dependencies and Seed the Database

Open a terminal inside the `PortfolioBackend-MongoDB` directory and run:

```bash
# 1. Install packages
npm install

# 2. Run the seeding script to create collections and load initial records
npm run seed
```

---

### 4. Start the Server

```bash
# Run in development watch mode
npm run dev

# Run in production mode
npm start
```

---

## 🗄️ MongoDB Collection Schemas & Manual Creation Queries

If you prefer to manually initialize the database, collections, and indices from a MongoDB shell (`mongosh`), you can run the following queries:

### 1. Create and Index Collections

```javascript
// Switch to the database
use portfolio_db;

// 1. Users
db.createCollection("users");
db.users.createIndex({ username: 1 }, { unique: true });

// 2. Profile Settings
db.createCollection("profile_settings");

// 3. Hero Roles
db.createCollection("hero_roles");

// 4. Hero Stats
db.createCollection("hero_stats");

// 5. About Highlights
db.createCollection("about_highlights");

// 6. Technical Skills
db.createCollection("skills");
db.skills.createIndex({ category: 1, display_order: 1 });

// 7. Projects
db.createCollection("projects");

// 8. Experience Timeline
db.createCollection("experiences");

// 9. Education History
db.createCollection("education");

// 10. Certifications
db.createCollection("certifications");

// 11. Messages Inbox
db.createCollection("messages");
db.messages.createIndex({ created_at: -1 });
```

---

### 2. Mappings: SQL Tables to MongoDB Collections

Here is the exact schema mapping between the original PostgreSQL database and the new MongoDB collections:

| SQL Table | MongoDB Collection | Key Fields & Types |
| :--- | :--- | :--- |
| `users` | `users` | `username` (String), `password_hash` (String), `email` (String), `role` (String), `created_at` (Date) |
| `profile_settings` | `profile_settings` | `name` (String), `status` (String), `core_stack` (String), `about_text` (String), `email` (String), `phone` (String), `location` (String), `resume_url` (String), `github_url` (String), `linkedin_url` (String), `updated_at` (Date) |
| `hero_roles` | `hero_roles` | `role_name` (String), `display_order` (Number) |
| `hero_stats` | `hero_stats` | `value` (String), `label` (String), `display_order` (Number) |
| `about_highlights` | `about_highlights` | `icon_name` (String), `label` (String), `description` (String), `delay_offset` (Number), `display_order` (Number) |
| `skills` | `skills` | `name` (String), `icon_name` (String), `level` (Number), `color_hex` (String), `category` (String: FRONTEND/BACKEND/TOOLS), `display_order` (Number) |
| `projects` | `projects` | `title` (String), `description` (String), `category` (String), `repo_url` (String), `live_url` (String), `status` (String), `color_hex` (String), `tags` (Array of Strings) |
| `experiences` | `experiences` | `role` (String), `company` (String), `location` (String), `period` (String), `type` (String), `description` (String), `points` (Array of Strings), `tech` (Array of Strings), `color_hex` (String), `display_order` (Number) |
| `education` | `education` | `degree` (String), `institution` (String), `location` (String), `period` (String), `grade` (String), `highlights` (Array of Strings), `color_hex` (String), `display_order` (Number) |
| `certifications` | `certifications` | `title` (String), `issuer` (String), `date` (String), `credential_id` (String), `link` (String), `skills` (Array of Strings), `icon_emoji` (String), `color_hex` (String), `display_order` (Number) |
| `messages` | `messages` | `name` (String), `email` (String), `subject` (String), `message` (String), `ip_address` (String), `status` (String: READ/UNREAD), `created_at` (Date) |

---

## ⚡ Key Architectural Adapters (Backward Compatibility)

*   **Identical Endpoints**: All REST routes and controller handling remain unchanged.
*   **Schema Property Mapping**: Keep database fields in snake_case (e.g. `display_order`, `color_hex`) to support exact request parameter parsing in controllers.
*   **Sequential IDs Mapping**: The frontend parses the ID parameter as a property (`item.id`). PostgreSQL returns integer IDs, while MongoDB returns `ObjectId` hex strings. We solved this by defining Mongoose schema transforms:
    ```javascript
    const schemaOptions = {
      toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
          ret.id = ret._id ? ret._id.toString() : ret.id;
          delete ret._id;
          delete ret.__v;
          return ret;
        }
      }
    };
    ```
    This virtual getter extracts `_id` and serializes it as `id` string on JSON conversion, ensuring **zero changes** are required on the React frontend!
