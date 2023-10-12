const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, OAuth2Scopes } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`invite`)
        .setDescription('Undang bot ini ke dalam server Anda')
        .addStringOption(option =>
            option
                .setName('izin')
                .setDescription('Izin yang ingin Anda tambahkan bot (preset)')
                .addChoices(
                    { name: `Lihat Server (Tanpa izin mod)`, value: `517547088960` },
                    { name: `Moderasi Dasar (Kelola pesan, peran, dan emoji)`, value: `545195949136` },
                    { name: `Moderasi Tingkat Lanjut (Kelola Server)`, value: `545195949174` },
                    { name: `Administrator (Setiap izin)`, value: `8` },
                )
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const { options } = interaction;
        const perms = options.getString('izin');

        const link = client.generateInvite({
            scopes: [OAuth2Scopes.ApplicationsCommands, OAuth2Scopes.Bot],
            permissions: [
                perms
            ],
        });

        const embed = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setTitle(`Undang ${client.user.username} ke server Anda`)

        if (perms !== '8') embed.setDescription(`<:add_links:1128495842546950225> Saya telah membuat undangan menggunakan izin yang Anda pilih! Untuk melihat izin spesifik, klik tautan undangan dan lanjutkan dengan server yang dipilih. \n \n<:mimo_warning:1128496251135086632> Bot ini mungkin memerlukan izin **Adminstrator** agar dapat berfungsi sepenuhnya! Dengan tidak memilih izin tertinggi untuk server Anda, Anda berisiko tidak dapat menggunakan semua fitur bot ini.\n\n**Tautan undangan:** \n> ${link}`)
        else embed.setDescription(`<:add_links:1128495842546950225> Saya telah membuat undangan menggunakan izin yang Anda pilih! Untuk melihat izin spesifik, klik tautan undangan dan lanjutkan dengan server yang dipilih. \n\n**Tautan undangan:** \n> ${link}`)

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });

    }
}