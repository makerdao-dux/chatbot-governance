# Chatbot Governance

1 - get a token at:
https://discord.com/developers/applications/

Then, set it in the .env file. as BOT_TOKEN
Set the server id in .env file as GUILD_ID

Invite your bot with an updated scope of application.commands which is required to register slash commands

2- deploy in heroku:
You need to set the dyno type to "worker", under the "resources" tab.

3 - change node version (package.json)

"engines": {
    "node": "16.x"
  }
