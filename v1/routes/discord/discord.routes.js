const express = require('express');
const router = express.Router();
const Discord = require('discord.js');
//const { Client, GatewayIntentBits } = require('discord.js');
//const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, , GatewayIntentBits.GuildMembers] });
const axios = require('axios');

const validateRequestStructure = require('../../../middleware/validateRequestStructure');
const { infoLogger } = require('../../../helpers/logger');

router.route("/test").post(validateRequestStructure, async (req, res, next) => {
    try {
        const usermessage = req.body.data.message;
        
        infoLogger.info(`${usermessage} received from user.`);

        // usermessage has to be a string type
        const messageResponse = await axios.post(`https://discord.com/api/channels/${process.env.channelid}/messages`, {
            content: usermessage
        }, {
            headers: {
                'Authorization': 'Bot ' + process.env.bottoken,
                'Content-Type': 'application/json',
            }
        });

        // client.on('ready', async () => {
        //     const channel = await client.channels.fetch('234509427250561024'); // Replace with your channel ID
        //     channel.send(usermessage);
        // });
        // client.login(process.env.bottoken); // BOT_TOKEN is the Client Secret
        // client.destroy();

        const userResponse = messageResponse.data;

        res.success(userResponse);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
