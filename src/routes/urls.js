import express from "express";
import UrlsModel from "../models/urls.js";
import db from "../database/connection.js";
import { urls } from "../database/schema.js";
import Response from "../response.js";

const router = express.Router();
const urlsModel = new UrlsModel(db, urls);

router.post("/urls/", async (req, res) => {
	const { origin } = req.body; //從使用者那拿到
	const url = await urlsModel.create(origin);
	res.status(201).json(
		new Response({
			msg: "created",
			data: url,
		}),
	);
});
router.get("/:short", async (req, res) => {
	//冒號後面接甚麼 ，params.後面就接沈麼
	const short = req.params.short;
	const url = await urlsModel.getOriginFromShort(short);
	res.redirect(url.origin);
}); //不加 urls因為都已經要縮網址了

export default router;
