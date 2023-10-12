const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Lihat semua daftar perintah`),

    async execute(interaction, client) {

        const embedPanel = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setDescription(`Selamat datang di pusat bantuan ${client.user}, dan terima kasih telah menggunakan ${client.user.username}. Anda akan menemukan di sini semua perintah yang tersedia. \n\n Gunakan perintah </invite:1157753603054903318> untuk menambahkan **${client.user.username}** ke server Anda!`)
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setFooter({ text: `Silakan pilih kategori untuk melihat semua perintah.`, iconURL: interaction.client.user.displayAvatarURL() })

        const embedUtama = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setTitle('Menu Utama')
            .setDescription(`> Berikut ini adalah daftar perintah dari ${client.user} untuk kategori **Utama**`)
            .addFields({ name: `<:mimo_terminal:1128871214794936390> </help:1157756271169114122>`, value: `<:mimo_file:1128871315433078796> \`Daftar perintah dari ${client.user.username}\`` })
            .addFields({ name: `<:mimo_terminal:1128871214794936390> </invite:1157753603054903318>`, value: `<:mimo_file:1128871315433078796> \`Undang bot ke server Anda\`` })
            .addFields({ name: `<:mimo_terminal:1128871214794936390> </addemoji:1157900202259255336>`, value: `<:mimo_file:1128871315433078796> \`Menambahkan emoji ke dalam server\`` })
            .addFields({ name: `<:mimo_terminal:1128871214794936390> </addstiker:1157901295475232779>`, value: `<:mimo_file:1128871315433078796> \`Menambahkan stiker ke dalam server\`` })
            .addFields({ name: `<:mimo_terminal:1128871214794936390> </infoserver:1157902142896611430>`, value: `<:mimo_file:1128871315433078796> \`Dapatkan informasi server saat ini\`` })

            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setFooter({ text: `Silakan pilih kategori untuk melihat semua perintah.`, iconURL: interaction.client.user.displayAvatarURL() })

        const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Silakan Pilih Kategori')
                    .addOptions(
                        {
                            label: 'Beranda',
                            description: 'Kembali ke halaman beranda',
                            emoji: '1129763572583510138',
                            value: 'home'
                        },
                        {
                            label: 'Menu Utama',
                            description: 'Lihat semua perintah Utama!',
                            emoji: '1129763572583510138',
                            value: 'utama'
                        },
                    )
            )

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Website`)
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("1128692932036280501")
                    .setURL(`https://muhamdaily.com`),
            )

        interaction.reply({ embeds: [embedPanel], components: [menu, button] }).then(() => {
            interaction.channel.createMessageComponentCollector().on('collect', async c => {
                let selectMenu = c.values[0];

                if (selectMenu === "home") {
                    if (c.user.id !== interaction.user.id) {
                        return await c.reply({ content: `Hanya **${interaction.user.username}** yang dapat memilih!`, ephemeral: true })
                    }
                    c.update({ embeds: [embedPanel] })
                } else if (selectMenu === "utama") {
                    if (c.user.id !== interaction.user.id) {
                        return await c.reply({ content: `Hanya **${interaction.user.username}** yang dapat memilih!`, ephemeral: true })
                    }
                    c.update({ embeds: [embedUtama] })
                }
            });

        });

    }
}