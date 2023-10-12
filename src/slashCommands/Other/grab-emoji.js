const { ContextMenuInteraction, ContextMenuCommandBuilder, ApplicationCommandType, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Tambahkan Emoji")
        .setType(ApplicationCommandType.Message)
        .setDMPermission(true),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return await interaction.reply({ content: "Anda harus menjadi **Administrator** dan peran Anda harus memiliki izin **Administrator** untuk melakukan tindakan ini.", ephemeral: true });

        let message = await interaction.channel.messages.fetch(interaction.targetId);

        let emojiRegex = /<(a?):(\w{2,}):(\d{10,})>/;
        let emoji = message.content.match(emojiRegex);

        if (!emoji) {
            return await interaction.reply({ content: `<:mimo_disable:1128688428964388864> Emoji tidak valid. Silakan gunakan perintah ini pada pesan yang berisi emoji khusus.`, ephemeral: true });
        }

        let id = emoji.pop();
        let name = emoji.pop();
        let animated = emoji.pop() === 'a' // true/false, optional use depending on your use case

        let url = `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}`

        try {
            let newEmoji = await interaction.guild.emojis.create({ attachment: url, name: name })
            let embed = new EmbedBuilder()
                .setColor(0x2B2D30)
                .setDescription(`<a:mimo_success:1128687664795766884> Berhasil menambahkan emoji ${newEmoji}, dengan nama \`${name}\``)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.log(error.stack);
            interaction.reply({ content: `<:mimo_disable:1128688428964388864> Anda tidak dapat menambahkan emoji ini karena Anda telah mencapai batas emoji server Anda`, ephemeral: true })
        }
    }
}