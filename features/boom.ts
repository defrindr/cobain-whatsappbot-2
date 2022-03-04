import { delay } from '@adiwajshing/baileys'
import { getWord } from '../query/kata'
export async function boom(sock, id, params = { maks: 100 }) {
    const messageTyping = async (jid: string) => {
        await sock.presenceSubscribe(jid)
        await delay(100)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(100)

        await sock.sendPresenceUpdate('paused', jid)
    }

    for (let i = 0; i < params.maks; i++) {
        let kata = await getWord()

        let templateMessage = {
            text: kata[0].teks,
            footer: 'powered by zoeco.store',
            headerType: 1
        }

        console.log(kata)

        await messageTyping("6285816982316@s.whatsapp.net")
        await sock.sendMessage("6285816982316@s.whatsapp.net", templateMessage)
    }
}