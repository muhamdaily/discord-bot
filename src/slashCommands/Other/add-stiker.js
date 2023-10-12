const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`addstiker`)
        .setDescription('Tambahkan stiker ke server')
        .addAttachmentOption(option =>
            option
                .setName('stiker')
                .setDescription('Unggah stiker dalam format png/jpeg')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('nama')
                .setDescription('Nama stikernya')
                .setRequired(true)
        ),

    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers))
            return await interaction.reply({
                content: "Maaf, Anda tidak memiliki izin untuk menggunakan perintah ini",
                ephemeral: true
            });

        const upload = interaction.options.getAttachment('stiker');
        const name = interaction.options.getString('nama');

        if (name.length <= 2)
            return await interaction.reply({
                content: `<:mimo_disable:1128688428964388864> Nama stiker minimal harus 2 karakter`,
                ephemeral: true
            });

        if (upload.contentType === 'image/gif')
            return await interaction.reply({
                content: `<:mimo_disable:1128688428964388864> Anda tidak dapat mengunggah file .gif saat ini`,
                ephemeral: true
            });

        await interaction.reply({
            content: `<a:mimo_typing:1128646448758661311> Memuat stiker Anda...`,
            ephemeral: true
        });

        const sticker = await interaction.guild.stickers.create({ file: `${upload.attachment}`, name: `${name}` }).catch(err => {
            setTimeout(() => {
                return interaction.editReply({ content: `${err.rawError.message}` });
            }, 2000);
        })

        const embed = new EmbedBuilder()
            .setColor(0x2B2D30)
            .setDescription(`<a:mimo_success:1128687664795766884> Stiker Anda telah ditambahkan dengan nama \`${name}\``)

        setTimeout(() => {
            if (!sticker) return;

            interaction.editReply({ content: ``, embeds: [embed] });
        }, 3000);

    }
}