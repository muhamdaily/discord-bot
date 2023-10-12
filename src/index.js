const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Partials, Events } = require(`discord.js`);
const fs = require('fs');
const terminal = require('./terminal')
const client = new Client({
    allowedMentions: {
        parse: [
            'users',
            'roles'
        ],
        repliedUser: true
    },
    autoReconnect: true,
    disabledEvents: [
        "TYPING_START"
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.MessageContent
    ],
    restTimeOffset: 0
});

client.commands = new Collection();
client.prefixCommands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/slashCommands");
const prefixFolders = fs.readdirSync("./src/prefixCommands");


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    terminal.info('Logging in...')
    client.handleEvents(eventFiles);
    client.handleCommands(commandFolders);
    client.handlePrefixes(prefixFolders)
    client.login(process.env.token)
})();

// Auto Threads One
const One = process.env.channelOne;
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Mengabaikan pesan dari bot lain
    if (!message.guild) return; // Mengabaikan pesan dari DM
    if (message.channel.id !== One) return; // Mengabaikan pesan dari saluran selain target

    const channel = message.channel;
    const threadParent = message;

    try {
        const thread = await channel.threads.create({
            name: `Template pengiriman oleh ${message.author.username}`,
            autoArchiveDuration: 1440, // Menyetel durasi otomatis mengarsipkan ke 24 jam (1440 menit)
            reason: 'Create automatic threads pengiriman',
            startMessage: threadParent
        });

        const embed = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setDescription(`Template pengiriman pembelian`)
            .setTimestamp()
            .setFooter({
                text: `Shopee MuhamPedia`,
                iconURL: client.user.avatarURL()
            });

        const response = await thread.members.add(client.user.id);
        if (response) {
            const botMessage = await thread.send({ embeds: [embed] });
            console.log(`Bot mengirim pesan: ${botMessage.content}`);
        }
    } catch (error) {
        console.error('Gagal membuat thread pengiriman:', error);
    }
});

// Auto Threads Two
const Two = process.env.channelTwo;
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Mengabaikan pesan dari bot lain
    if (!message.guild) return; // Mengabaikan pesan dari DM
    if (message.channel.id !== Two) return; // Mengabaikan pesan dari saluran selain target

    const channel = message.channel;
    const threadParent = message;

    try {
        const thread = await channel.threads.create({
            name: `Template pemberitahuan oleh ${message.author.username}`,
            autoArchiveDuration: 1440, // Menyetel durasi otomatis mengarsipkan ke 24 jam (1440 menit)
            reason: 'Create automatic threads pemberitahuan',
            startMessage: threadParent
        });

        const embed = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setDescription(`Template pemberitahuan kepada pembeli`)
            .setTimestamp()
            .setFooter({
                text: `Shopee MuhamPedia`,
                iconURL: client.user.avatarURL()
            });

        const response = await thread.members.add(client.user.id);
        if (response) {
            const botMessage = await thread.send({ embeds: [embed] });
            console.log(`Bot mengirim pesan: ${botMessage.content}`);
        }
    } catch (error) {
        console.error('Gagal membuat thread pemberitahuan:', error);
    }
});

// Auto Threads Three
const Three = process.env.channelThree;
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Mengabaikan pesan dari bot lain
    if (!message.guild) return; // Mengabaikan pesan dari DM
    if (message.channel.id !== Three) return; // Mengabaikan pesan dari saluran selain target

    const channel = message.channel;
    const threadParent = message;

    try {
        const thread = await channel.threads.create({
            name: `Template customer service oleh ${message.author.username}`,
            autoArchiveDuration: 1440, // Menyetel durasi otomatis mengarsipkan ke 24 jam (1440 menit)
            reason: 'Create automatic threads career',
            startMessage: threadParent
        });

        const embed = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setDescription(`Template menghubungi CS Shopee`)
            .setTimestamp()
            .setFooter({
                text: `Shopee MuhamPedia`,
                iconURL: client.user.avatarURL()
            });

        const response = await thread.members.add(client.user.id);
        if (response) {
            const botMessage = await thread.send({ embeds: [embed] });
            console.log(`Bot mengirim pesan: ${botMessage.content}`);
        }
    } catch (error) {
        console.error('Gagal membuat thread customer service:', error);
    }
});

// Auto Threads Four
const Four = process.env.channelFour;
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Mengabaikan pesan dari bot lain
    if (!message.guild) return; // Mengabaikan pesan dari DM
    if (message.channel.id !== Four) return; // Mengabaikan pesan dari saluran selain target

    const channel = message.channel;
    const threadParent = message;

    try {
        const thread = await channel.threads.create({
            name: `Template balasan ulasan oleh ${message.author.username}`,
            autoArchiveDuration: 1440, // Menyetel durasi otomatis mengarsipkan ke 24 jam (1440 menit)
            reason: 'Create automatic threads balasan ulasan',
            startMessage: threadParent
        });

        const embed = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setDescription(`Template balasan ulasan pembelian`)
            .setTimestamp()
            .setFooter({
                text: `Shopee MuhamPedia`,
                iconURL: client.user.avatarURL()
            });

        const response = await thread.members.add(client.user.id);
        if (response) {
            const botMessage = await thread.send({ embeds: [embed] });
            console.log(`Bot mengirim pesan: ${botMessage.content}`);
        }
    } catch (error) {
        console.error('Gagal membuat thread balasan ulasan:', error);
    }
});