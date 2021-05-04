# Autarkis, a game utility for Vampire the Masquerade 5e

## About

[Autarkis](https://autarkis.herokuapp.com/) is an **unofficial** web application that helps players save, upload, download, and view their [Vampire the Masquerade 5th Edition](https://worldofdarkness.com/) characters. All characters created can be exported as a `.autarkis` (internally `json`) file, or can be stored in the server-side database.

## Features

-   Players may login and save their character to a database, or import/export as they wish.
-   Storytellers can create chronicles, and add characters to those chronicles.
-   Roll dice on the website or send the roll results to the configured discord server.

## Usage

### Characters

-   **Character Sheet:** Players may create, edit, and delete characters. A character name must be provided for it to be saved to the database. Character names cannot be changed after the character is saved to the database.

-   **Exporting/Importing:** Players may download their character data by clicking the `Export Character` button, and they may upload it back via the `Import Character` button.

-   **In-Chronicle Characters:** If a character is added to a Chronicle, editing feature will be disabled but viewing feature will replace it. You may roll dice via the viewing feature. If the chronicle that the character is added has discord features enabled and configured, dice roll will be sent to the channel that is provided.

### Chronicles

-   **Chronicle Sheet:** Storytellers may create, edit and delete chronicles. A chronicle name is required to save it to the database. Chronicle names cannot be changed after it is saved to the database.

-   **Character-Chronicle Connection:** Storytellers may add and remove characters from their chronicles. Navigate to the chronicle editing mode to enable these functionality. You may add or remove a character by providing their keys, which are accessed via the key icons on the left.

-   **Discord Integration:** Discord functionality may also be enabled to send the dice rolls of the chronicle-added characters to a discord server. This requires both the bot to be added to the server and storyteller to enable and enter required info on their chronicle sheet. You can visit the link below for the Autarkis Bot Server to learn more.

## Attributions & Links

[World of Darkness](https://worldofdarkness.com/)

[Vampire the Masquerade 5th Edition Discord Server](https://discord.gg/cdjXp27V)

[Autarkis Bot Discord Server](https://discord.gg/w23ayKCKKZ)

[Petrona font by Ringo R. Seeber](https://fonts.google.com/specimen/Petrona)

[Icons by Google](https://fonts.google.com/icons)

Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission. All rights reserved. For more information please visit [worldofdarkness.com](https://www.worldofdarkness.com/).

## Self-hosting

This package is created for Heroku, with React, Expressjs and PostgreSQL. Go through the classic `npm i` routine and such after installing PostgreSQL database and node. You can configure your development environment variables in `./server/.env`. You can find the variables you need in `./server/environment.ts` or in example `.env` file.

### Scripts

#### npm run build

Builds both Client and Server-side code. This is also used by Heroku.

#### npm run start

This is used by Heroku to start the application.

#### npm run dev

This is used during development. This starts both the server (on port `4000`), and the client (on port `3000`).

## Development

### Plans

-   **NPC Sheets**
    -   Ability to add NPC sheets to the Chronicle.
    -   Storytellers would be able to roll dice from these sheets.
-   **Character Creation**
    -   Playset-dependent character creation rules, point limits, etc.
-   **Experience Spending**
    -   Rules for spending experience.
    -   Storyteller oversees this spending and is able to allow/reject.

### Known Issues

Please submit your issues to the [issues](https://github.com/yigitlevent/autarkis/issues) page.

-   None yet, but I'm sure the server will go down ~~eventually~~ soon.
