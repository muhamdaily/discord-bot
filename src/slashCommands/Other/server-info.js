const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType, GuildExplicitContentFilter, GuildNSFWLevel, GuildVerificationLevel, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('infoserver')
        .setDescription('Dapatkan informasi tentang server'),

    async execute(interaction) {
        const { guild } = interaction;
        const { members, channels, emojis, roles, stickers } = guild;

        const sortRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles = sortRoles.filter(role => !role.managed);
        const managedRoles = sortRoles.filter(role => role.managed);
        const botCount = members.cache.filter(member => member.user.bot).size;

        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for (const role of roles) {
                const roleString = `<@&${role.id}>`;

                if (roleString.length + totalLength > maxFieldLength)
                    break;

                totalLength += roleString.length + 1;
                result.push(roleString);
            }

            return result.length;
        };

        const splitPascal = (string, separator) => string.split(/(?=[A-Z])/).join(separator);
        const toPascalCase = (string, separator = false) => {
            const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());

            return separator ? splitPascal(pascal, separator) : pascal;
        };

        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;
        const totalChannels = getChannelTypeSize([
            ChannelType.GuildText,
            ChannelType.GuildNews,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildForum,
            ChannelType.GuildPublicThread,
            ChannelType.GuildPrivateThread,
            ChannelType.GuildNewsThread,
            ChannelType.GuildCategory
        ]);

        const embed = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setTitle(`Informasi Server ${guild.name}`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setImage(guild.bannerURL({ size: 1024 }))
            .addFields(
                {
                    name: 'Deskripsi Server',
                    value: `_${guild.description || 'None'}_`
                },
                {
                    name: 'Informasi Umum',
                    value: [
                        `<:mimo_home:1128698517842567240> **Nama server** ${guild.name} | \`${guild.id}\``,
                        `<:mimo_information:1128697725492396043> **Server Dibuat** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                        `<:mimo_crown:1128698312841756732> **Pemilik Server** <@${guild.ownerId}> | \`${guild.ownerId}\``,
                        `<:mimo_links:1128698997616410744> **URL Kostum** ${guild.vanityURLCode || 'None'}`,
                    ].join('\n')
                },
                {
                    name: 'Fitur',
                    value: guild.features?.map(feature => `- ${toPascalCase(feature, '')}`).join('\n') || 'None',
                    inline: false
                },
                {
                    name: 'Keamanan',
                    value: [
                        `<:mimo_dotblue:1128566101891092511> **Filter Eksplisit** \`${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], '')}\``,
                        `<:mimo_dotblue:1128566101891092511> **Tingkat NSFW** \`${splitPascal(GuildNSFWLevel[guild.nsfwLevel], ' ')}\``,
                        `<:mimo_dotblue:1128566101891092511> **Tingkat Verifikasi** \`${splitPascal(GuildVerificationLevel[guild.verificationLevel], ' ')}\``,
                    ].join('\n'),
                    inline: false
                },
                {
                    name: `Anggota Server (${guild.memberCount})`,
                    value: [
                        `<:mimo_dotblue:1128566101891092511> **Pengguna** \`${guild.memberCount - botCount}\``,
                        `<:mimo_dotblue:1128566101891092511> **Bot** \`${botCount}\``,
                    ].join('\n'),
                    inline: false
                },
                {
                    name: `Role Pengguna (${maxDisplayRoles(userRoles)} of ${userRoles.length})`,
                    value: `<:mimo_dotblue:1128566101891092511> ${userRoles.slice(0, maxDisplayRoles(userRoles)).join(' ') || 'None'}`,
                    inline: false
                },
                {
                    name: `Role Bot (${maxDisplayRoles(managedRoles)} of ${managedRoles.length})`,
                    value: `<:mimo_dotblue:1128566101891092511> ${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(' ') || 'None'}`,
                    inline: false
                },
                {
                    name: `Channels (${totalChannels})`,
                    value: [
                        `<:mimo_dotblue:1128566101891092511> **Saluran Teks** \`${getChannelTypeSize([
                            ChannelType.GuildText,
                            ChannelType.GuildForum,
                            ChannelType.GuildNews
                        ])}\``,
                        `<:mimo_dotblue:1128566101891092511> **Saluran Suara** \`${getChannelTypeSize([
                            ChannelType.GuildVoice,
                            ChannelType.GuildStageVoice
                        ])}\``,
                        `<:mimo_dotblue:1128566101891092511> **Threads** \`${getChannelTypeSize([
                            ChannelType.GuildPublicThread,
                            ChannelType.GuildPrivateThread,
                            ChannelType.GuildNewsThread
                        ])}\``,
                    ].join('\n'),
                    inline: true
                },
                {
                    name: `Emoji $ Sticker (${emojis.cache.size + stickers.cache.size})`,
                    value: [
                        `<:mimo_dotblue:1128566101891092511> **Animasi** \`${emojis.cache.filter(emoji => emoji.animated).size}\``,
                        `<:mimo_dotblue:1128566101891092511> **Statis** \`${emojis.cache.filter(emoji => !emoji.animated).size}\``,
                        `<:mimo_dotblue:1128566101891092511> **Stiker** \`${stickers.cache.size}\``,
                    ].join('\n'),
                    inline: true
                },
                {
                    name: 'Server Booster',
                    value: [
                        `<:mimo_dotblue:1128566101891092511> **Level** \`${guild.premiumTier || 'None'}\``,
                        `<:mimo_dotblue:1128566101891092511> **Boosts** \`${guild.premiumSubscriptionCount}\``,
                        `<:mimo_dotblue:1128566101891092511> **Boosters** \`${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}\``,
                    ].join('\n'),
                    inline: true
                },
                { name: 'Spanduk Server', value: guild.bannerURL() ? '** **' : '`None`' }
            );

        await interaction.reply({ embeds: [embed] });
    }
};
