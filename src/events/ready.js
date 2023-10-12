const { ActivityType } = require('discord.js');
const terminal = require('../terminal')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        terminal.success(`Berhasil Login Sebagai ${client.user.tag}`);

        setInterval(() => {
            const memberCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
            const status = `${memberCount} Member`;
            client.user.setPresence({ activities: [{ name: `${status}`, type: ActivityType.Watching }] });
        }, 5000);

        async function pickPresence() {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },

                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};