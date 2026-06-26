import express from "express";

const router: express.Router = express.Router();

router.get("/categories", () => {});

router.get("/recipes", () => {});

router.get("/recipes/:id", () => {});

router.post("/recipes", () => {});

export default router;
