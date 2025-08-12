

---

```markdown
# 💰 Expense Tracker API

A **Node.js + Express** backend for managing transactions with **PostgreSQL (Neon)**, **Upstash Redis rate limiting**, and **CORS** support.  
This API powers an expense tracker application with user-specific transaction storage and retrieval.

---

## 🚀 Features

- **User-specific transactions**: Create, read, and delete transactions by user.
- **PostgreSQL database** with Neon serverless.
- **Rate limiting** with Upstash Redis.
- **RESTful API endpoints**.
- **CORS enabled** for cross-origin requests.
- **Environment configuration** with `dotenv`.

---

## 📂 Project Structure

```

├── config/
│   ├── db.config.js         # Database connection and initialization
│   ├── upstash.config.js    # Upstash Redis configuration
├── controllers/
│   └── transaction.controller.js  # Business logic for transactions
├── middlewares/
│   └── rateLimiter.middlewares.js # Rate limiting middleware
├── routes/
│   └── transaction.routes.js      # Transaction routes
├── .env.example              # Example environment variables
├── package.json
├── server.js (index file)

````

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (Neon serverless)
- **Upstash Redis** (Rate limiting)
- **dotenv**
- **CORS**

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TarunPal0812/expense-tracker-server.git
   cd expense-tracker-api
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** based on `.env.example`

   ```env
   PORT=5000
   DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>
   UPSTASH_REDIS_REST_URL=<your-upstash-redis-url>
   UPSTASH_REDIS_REST_TOKEN=<your-upstash-token>
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

   The API will run on:

   ```
   http://localhost:8080
   ```

---

## 📌 API Endpoints

Base URL:

```
http://localhost:8080/api/v1
```

| Method   | Endpoint               | Description                   | Body Params                              |
| -------- | ---------------------- | ----------------------------- | ---------------------------------------- |
| `POST`   | `/transaction`         | Create a new transaction      | `title`, `amount`, `category`, `user_id` |
| `GET`    | `/transaction/:userId` | Get all transactions for user | None                                     |
| `DELETE` | `/transaction/:id`     | Delete transaction by ID      | None                                     |
| `GET`    | `/getBalance/:userId`  | Get balance, income, expenses | None                                     |

---

## 📝 Request & Response Examples

### Create Transaction

**POST** `/transaction`

```json
{
  "title": "Grocery",
  "amount": -150.50,
  "category": "Food",
  "user_id": "user123"
}
```

**Response**

```json
{
  "success": true,
  "transaction": {
    "id": 1,
    "user_id": "user123",
    "title": "Grocery",
    "amount": -150.50,
    "category": "Food",
    "created_at": "2025-08-12"
  }
}
```

---

## 🛡️ Rate Limiting

The API is protected with **Upstash Redis sliding window rate limiting**:

* **100 requests per 60 seconds** per IP.
* If exceeded:

```json
{
  "message": "Too many request, Please try again later."
}
```

---

## 📦 Deployment

You can deploy this backend to:

* **Railway.app**
* **Render**
* **Vercel** (Serverless functions)


Make sure your database and Upstash Redis credentials are set in your deployment environment variables.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✨ Author

**Your Name**
GitHub: [@TaunPal0812](https://github.com/TarunPal0812)

```


