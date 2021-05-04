import { GuildEmoji } from "discord.js";

export interface Roll {
	charName: string;
	charKey: string;
	title: string;
	normalResults: string;
	hungerResults: string;
	results: string;
	difficulty: string;
	infoRouse: string,
	infoWillpower: string;
}

export interface Emojis {
	nTen: GuildEmoji | undefined,
	nSuccess: GuildEmoji | undefined,
	nFailure: GuildEmoji | undefined,
	hTen: GuildEmoji | undefined,
	hSuccess: GuildEmoji | undefined,
	hFailure: GuildEmoji | undefined,
	hOne: GuildEmoji | undefined,
}
