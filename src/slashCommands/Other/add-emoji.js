const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`addemoji`)
        .setDescription('Tambahkan emoji ke server')
        .addAttachmentOption(option =>
            option
                .setName('emoji')
                .setDescription('Unggah emoji dalam format png/jpeg')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('nama')
                .setDescription('The name of the emoji')
                .setRequired(true)
        ),

    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers))
            return await interaction.reply({
                content: "Maaf, Anda tidak memiliki izin untuk menggunakan perintah ini",
                ephemeral: true
            });

        const upload = interaction.options.getAttachment('emoji');
        const name = interaction.options.getString('nama');

        await interaction.reply({
            content: `<a:mimo_typing:1128646448758661311> Memuat emoji Anda...`,
            ephemeral: true
        });

        const emoji = await interaction.guild.emojis.create({ attachment: `${upload.attachment}`, name: `${name}` }).catch(err => {
            setTimeout(() => {
                console.log(err);
                return interaction.editReply({ content: `${err.rawError.message}` });
            }, 2000);
        })

        setTimeout(() => {
            if (!emoji) return;

            const embed = new EmbedBuilder()
                .setColor(0x2B2D30)
                .setDescription(`<a:mimo_success:1128687664795766884> Emoji Anda telah ditambahkan ${emoji}`)

            interaction.editReply({ content: ``, embeds: [embed] });
        }, 3000);

    }
}