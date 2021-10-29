# Chatbot Governance

1 - get a token at:
https://discord.com/developers/applications/

Then, set it in the .env file. 

2- deploy in heroku:
You need to set the dyno type to "worker", under the "resources" tab.

3 - change node version (package.json)

"engines": {
    "node": "16.x"
  }