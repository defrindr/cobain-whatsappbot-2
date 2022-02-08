import Brainly from 'brainly-scraper';
import { delay } from '@adiwajshing/baileys'
import { MessageType } from "@adiwajshing/baileys"

export default async function (sock, id, params = {
    text: ''
}) {
    const messageTyping = async (jid: string) => {
        await sock.presenceSubscribe(jid)
        await delay(500)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(2000)

        await sock.sendPresenceUpdate('paused', jid)
    }

    const result = await Brainly(params.text);

    for (let i = 0; i < result.data.length; i++) {
        let element = result.data[i];
        let jawab = element.jawaban.map(item => item.text).join("\n\n---------------------\n\n");
        let template = `Pertanyaan : ${element.pertanyaan} \n\n${jawab}`;
        const templateMessage = {
            text: template,
            footer: 'powered by Defri Indra M',
        }

        await messageTyping(id)
        await sock.sendMessage(id, templateMessage)
    }
}