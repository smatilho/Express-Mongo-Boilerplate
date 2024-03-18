const express = require('express');
const router = express.Router();
const axios = require('axios');
const puppeteer = require('puppeteer');

const validateRequestStructure = require('../../../middleware/validateRequestStructure');
const { infoLogger } = require('../../../helpers/logger');

router.route("/message").post(validateRequestStructure, async (req, res, next) => {
    try {
        const usermessage = req.body.data.message;
        const client = req.discordClient; // Get the Discord client from the request object

        if (!client.isReady()) {
            return res.error({ message: "Discord client is not ready" });
        }
        
        const channel = await client.channels.fetch(process.env.channelid)
        
        // Send a message
        channel.send(usermessage)
            .then(() => {
                res.success({ message: "Message sent" });
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(error);
    }
});

router.post('/ping-and-message', async (req, res, next) => {
    try {
        const guildId = process.env.guildId; // Get guild ID from environment variables
        const memberId = req.body.data.memberId; // Get member ID from request body
        const message = req.body.data.message; // Get message from request body
        const client = req.discordClient; // Get the Discord client from the request object

        if (!client.isReady()) {
            return res.error({ message: "Discord client is not ready" });
        }

        const guild = await client.guilds.fetch(guildId);
        const member = await guild.members.fetch(memberId);
        const channel = await client.channels.fetch(process.env.channelid)

        infoLogger.info(member.id)

        if (!channel) throw new Error('No suitable channel found.');

        // Send a message that includes a ping and a message
        channel.send(`<@${member.id}> ${message}`)
            .then(() => {
                res.success({ message: "Ping and message sent" });
            })
            .catch(error => {
                next(error);
            });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
