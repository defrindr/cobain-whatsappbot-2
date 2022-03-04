import { delay } from '@adiwajshing/baileys'
import { getAdmin } from '../query/anonymous'

export default async function (sock, id, params = {}) {
    const messageTyping = async (jid: string) => {
        await sock.presenceSubscribe(jid)
        await delay(500)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(500)

        await sock.sendPresenceUpdate('paused', jid)
    }

    const listAdmin = await getAdmin();
    let buttons = [];
    for (let i = 0; i < listAdmin.length; i++) {
        buttons[i] = { index: i, urlButton: { displayText: listAdmin[i].alias, url: 'https://wa.me/' + listAdmin[i].phone_number } }

        let adminphone = listAdmin[i].phone_number + "@s.whatsapp.net"
        let template = "Halo admin, Terdapat user yang ingin melakukan live chat. Silahkan diperiksa yaa :)";

        let templateMessage = {
            text: template,
            footer: 'powered by zoeco.store',
            headerType: 1
        }

        await messageTyping(adminphone)
        await sock.sendMessage(adminphone, templateMessage)
    }

    let template = "Tunggu sebentar ya, sedang menghubungi admin. Atau anda dapat menghubungi salah 1 dari kontak dibawah.";

    let templateMessage = {
        text: template,
        footer: 'powered by zoeco.store',
        templateButtons: buttons,
        headerType: 1
    }

    await messageTyping(id)
    await sock.sendMessage(id, templateMessage)
}