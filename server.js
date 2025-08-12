    import express from "express";
    import dotenv from "dotenv";
    import { initDB } from "./config/db.config.js";
    import { transRouter } from "./routes/transaction.routes.js";
    import { rateLimiter } from "./middlewares/rateLimiter.middlewares.js";
    dotenv.config();
    import cors from "cors"
    import job from "./config/cron.js";

    const app = express();

    const port = process.env.PORT || 5000;

    if(process.env.NODE_ENV==="production") job.start()

    // Middlewares
    app.use(rateLimiter);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors())

    // Test API
    app.get("/", (req, res) => {
    res.send("Hello from server...!");
    });

    // Protected Routes
    app.use("/api/v1", transRouter);

    initDB()
    .then(() => {
        app.listen(port, () => {
        console.log(`Server Running on PORT: ${port}`);
        });
    })
    .catch(() => {
        console.log("Something went wrong");
    });
