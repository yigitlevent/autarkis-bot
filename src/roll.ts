import { Channel, Guild, GuildMember, TextChannel, MessageEmbed, EmbedFieldData } from "discord.js";

import { Emojis, Roll } from "./_types";
import { DiscordClient } from "./index";

export function SendRollResult(guildID: string, channelName: string, rollResult: Roll): void {
	const guild = DiscordClient.guilds.cache.get(guildID);
	if (guild) {
		guild.members.fetch()
			.then((value) => {
				const member = value.find((member: GuildMember) => { return member.nickname === rollResult.charName; });
				const channel = guild.channels.cache.find((channel: Channel) => { return (channel.type === "text" && ((channel as TextChannel).name === channelName)); }) as TextChannel;
				if (channel) {
					const embedMessage = CreateEmbedMessage(guild, member, rollResult);
					channel.send(embedMessage)
						.catch((error) => { console.log(error); });
				}
			})
			.catch((reason) => { console.log(reason); });
	}
}

function CreateEmbedMessage(guild: Guild, member: GuildMember | undefined, rollResult: Roll) {
	const memberID = (member) ? `<@${member.user.id}>` : rollResult.charName;

	const emojis = GetEmojis(guild);

	const diceNormal = GetNormalArray(rollResult, emojis);
	const diceHunger = GetHungerArray(rollResult, emojis);

	const fieldData: EmbedFieldData[] = [];

	if (diceNormal.length > 0) fieldData.push({ name: "Normal Dice", value: `${diceNormal.join(" ")}`, inline: true });
	if (diceHunger.length > 0) fieldData.push({ name: "Hunger Dice", value: `${diceHunger.join(" ")}`, inline: true });

	if (rollResult.infoRouse.length > 0) fieldData.push({ name: "Rouse", value: `${rollResult.infoRouse}` });
	if (rollResult.infoWillpower.length > 0) fieldData.push({ name: "Willpower", value: `${rollResult.infoWillpower}` });

	return new MessageEmbed()
		.setColor("#6D0000")
		.setTitle(`${rollResult.title}: ${rollResult.results}!`)
		.setDescription(`${memberID} ${GetDescription(rollResult)}.`)
		.addFields(fieldData)
		.setTimestamp()
		.setFooter("https://discord.gg/w23ayKCKKZ", "https://i.imgur.com/o0fmcai.png");
}

function GetDescription(rollResult: Roll) {
	const diceAmount = CleanArray(rollResult.hungerResults).length + CleanArray(rollResult.normalResults).length;

	const ending = (rollResult.title === "Rouse Check" || rollResult.title === "Compulsion Roll")
		? "" : ` against the difficulty of ${rollResult.difficulty}`;

	return `rolled ${diceAmount} dice${ending}`;
}

function GetNormalArray(rollResult: Roll, emojis: Emojis) {
	return CleanArray(rollResult.normalResults).map((value) => {
		const i = parseInt(value);

		if (i === 10 && emojis.nTen) {
			return `<:${emojis.nTen.name}:${emojis.nTen.id}>`;
		}
		else if (i > 5 && emojis.nSuccess) {
			return `<:${emojis.nSuccess.name}:${emojis.nSuccess.id}>`;
		}
		else if (emojis.nFailure) {
			return `<:${emojis.nFailure.name}:${emojis.nFailure.id}>`;
		}
		else {
			return value;
		}
	});
}

function GetHungerArray(rollResult: Roll, emojis: Emojis) {
	return CleanArray(rollResult.hungerResults).map((value) => {
		const i = parseInt(value);

		if (i === 10 && emojis.hTen) {
			return `<:${emojis.hTen.name}:${emojis.hTen.id}>`;
		}
		else if (i > 5 && emojis.hSuccess) {
			return `<:${emojis.hSuccess.name}:${emojis.hSuccess.id}>`;
		}
		else if (i > 1 && emojis.hFailure) {
			return `<:${emojis.hFailure.name}:${emojis.hFailure.id}>`;
		}
		else if (emojis.hOne) {
			return `<:${emojis.hOne.name}:${emojis.hOne.id}>`;
		}
		else {
			return value;
		}
	});
}

function CleanArray(string: string): string[] {
	return string.split(", ").filter((el: string) => { return el !== ""; });
}

function GetEmojis(guild: Guild): Emojis {
	return {
		nTen: guild.emojis.cache.find(emoji => emoji.name === "v5crit"),
		nSuccess: guild.emojis.cache.find(emoji => emoji.name === "v5sux"),
		nFailure: guild.emojis.cache.find(emoji => emoji.name === "v5fail"),
		hTen: guild.emojis.cache.find(emoji => emoji.name === "v5redcrit"),
		hSuccess: guild.emojis.cache.find(emoji => emoji.name === "v5redsux"),
		hFailure: guild.emojis.cache.find(emoji => emoji.name === "v5redfail"),
		hOne: guild.emojis.cache.find(emoji => emoji.name === "v5redbotch")
	};
}
