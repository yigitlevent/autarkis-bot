import express from "express";
import { check, validationResult, ValidationError } from "express-validator";

import { Roll } from "./_types";
import { SendRollResult } from "./roll";
import { DatabaseClient, DiscordClient } from "./index";

export const Router = express.Router().post("/",
	[
		check("charName").escape().trim()
			.isLength({ min: 3, max: 32 }).withMessage("Character name must be between 3 and 32 letters.")
			.not().isEmpty().withMessage("Character name cannot be empty."),
		check("charKey", "Invalid character key.").escape().trim().not().isEmpty().isLength({ min: 36, max: 36 }),
		check("title").escape().trim().not().isEmpty().withMessage("Message cannot be empty."),
		check("results").escape().trim(),
		check("difficulty").escape().trim(),
		check("normalResults").escape().trim(),
		check("hungerResults").escape().trim(),
		check("infoRouse").escape().trim(),
		check("infoWillpower").escape().trim()
	],
	async (request: express.Request, response: express.Response) => {
		const errors: ValidationError[] = validationResult(request).array();
		if (errors?.length > 0) { return response.status(400).json({ success: "error", data: ["Auth error.", ...errors] }); }

		const { charKey } = request.body;

		const { data, error } = await DatabaseClient.from("characters").select("chronicle_uuid").is("uuid", charKey).single();

		if (error) { return response.status(400).json({ success: "error", data: ["Character is not in a Chronicle."] }); }
		else {
			const { data: chronicleData, error: chronicleError } = await DatabaseClient.from("chronicles").select().is("uuid", data).single();

			if (chronicleData) {
				if (!DiscordClient.readyAt) { return response.status(400).json({ success: "error", data: ["Discord Bot is not ready."] }); }
				else if (!chronicleData[0].discord_enabled) { return response.status(400).json({ success: "error", data: ["Discord Bot is disabled for this chronicle."] }); }
				else {
					SendRollResult(chronicleData[0].discord_server, chronicleData[0].discord_channel, request.body as Roll);
					return response.status(200).json({ success: "success", data: null });
				}
			}
			else { return response.status(400).json({ success: "error", data: ["Chronicle key for the character is invalid.", chronicleError] }); }
		}

	}
);
