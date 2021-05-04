import path from "path";
import { createServer } from "http";
import express, { json, urlencoded } from "express";
import { createClient } from "@supabase/supabase-js";
import { Client, Intents } from "discord.js";

import { Router } from "./router";

// APP
export const App: express.Application = express();

App.set("publicPath", path.join(__dirname, "../../client/build"));

App.use(urlencoded({ extended: false }));
App.use(json());

App.use(express.static(App.get("publicPath")));
App.use("/", Router);

// DATABASE
export const DatabaseClient = createClient(process.env.DATABASE_URL as string, process.env.DATABASE_KEY as string);

// BOT
export const DiscordClient = new Client({ ws: { intents: new Intents([Intents.NON_PRIVILEGED, "GUILD_MEMBERS"]) } });
DiscordClient.once("ready", () => { console.log("discord ready"); });
DiscordClient.login(process.env.BOT_TOKEN);

// SERVER
const Server = createServer(App);
Server.listen(3000);

Server.on("listening", () => {
	const addr: any = Server.address();
	console.log(`Server listening at http://${addr.address}:${addr.port} (${addr.family})`);
});

Server.on("error", (error: any) => {
	const addr: any = Server.address();
	if (error.syscall !== "listen") { throw error; }
	switch (error.code) {
		case "EACCES":
			console.error(addr.port + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(addr.port + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
			break;
	}
});
