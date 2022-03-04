import { Boom } from '@hapi/boom'
import P from 'pino'
import makeWASocket, { delay, DisconnectReason, makeInMemoryStore, useSingleFileAuthState } from '@adiwajshing/baileys'
// import brainly from './features/brainly'
import chatwithadmin from './features/chatwithadmin'
import { ListProduct } from './features/product'
import { promoteword } from './features/desc'
import { boom } from './features/boom'

// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = makeInMemoryStore({ logger: P().child({ level: 'debug', stream: 'store' }) })
store.readFromFile('./baileys_store_multi.json')
// save every 10s
setInterval(() => {
    store.writeToFile('./baileys_store_multi.json')
}, 10_000)

const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json')

// start a connection
const startSock = () => {
    const sock = makeWASocket({
        logger: P({ level: 'info' }),
        printQRInTerminal: true,
        auth: state,
        version: [2, 2204, 13],

        // implement to handle retries
        getMessage: async key => {
            return {
                conversation: 'hello'
            }
        }
    })

    store.bind(sock.ev)

    const messageTyping = async (jid: string) => {
        await sock.presenceSubscribe(jid)
        await delay(500)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(500)

        await sock.sendPresenceUpdate('paused', jid)
    }

    // sock.ev.on('chats.set', item => console.log(`recv ${item.chats.length} chats (is latest: ${item.isLatest})`))
    // sock.ev.on('messages.set', item => console.log(`recv ${item.messages.length} messages (is latest: ${item.isLatest})`))
    // sock.ev.on('contacts.set', item => console.log(`recv ${item.contacts.length} contacts`))

    sock.ev.on('messages.upsert', async m => {
        console.log(JSON.stringify(m, undefined, 2))

        const msg = m.messages[0]
        if (msg.key.remoteJid == "6285816982316@s.whatsapp.net") {

            if (!msg.key.fromMe && m.type === 'notify') {
                console.log('replying to', m.messages[0].key.remoteJid)
                // await sock!.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [msg.key.id])
                await messageTyping(msg.key.remoteJid)

                console.log("----------------");
                try {
                    console.log("PESAN : " + msg.message.conversation)
                    console.log("ID : " + msg.key.remoteJid)
                    // console.log("PESAN : " + msg.message.conversation.startsWith('/ping'))
                    if (msg.message.conversation.startsWith('/ping')) {
                        await sock.sendMessage(msg.key.remoteJid, { text: "pong!" });
                    } else if (msg.message.conversation.startsWith('/info')) {
                        await sock.sendMessage(msg.key.remoteJid, { text: "Elok elek!" });
                    } else if (msg.message?.conversation.startsWith('/brainly')) {
                        // await brainly(sock, msg.key.remoteJid, { text: msg.message?.conversation.replace('/brainly ', '') })
                    } else if (msg.message?.conversation.startsWith('/livechat')) {
                        await chatwithadmin(sock, msg.key.remoteJid, {})
                    } else if (msg.message?.conversation.startsWith('/listproduct')) {
                        await ListProduct(sock, msg.key.remoteJid, {})
                    } else if (msg.message?.conversation.startsWith('/promoteword')) {
                        await promoteword(sock, msg.key.remoteJid, {})
                    } else if (msg.message?.conversation.startsWith('syng pengen')) {
                        await boom(sock, msg.key.remoteJid, { maks: parseInt(msg.message?.conversation.replace('syng pengen ', '')) })
                    }
                    // 62 858-1698-2316

                } catch (error) {
                    console.error(error)
                }
            }
        }

    })

    // sock.ev.on('messages.update', m => console.log(m))
    // sock.ev.on('message-receipt.update', m => console.log(m))
    // sock.ev.on('presence.update', m => console.log(m))
    // sock.ev.on('chats.update', m => console.log(m))
    // sock.ev.on('contacts.upsert', m => console.log(m))

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            // reconnect if not logged out
            if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startSock()
            } else {
                console.log('connection closed')
            }
        }

        console.log('connection update', update)
    })
    // listen for when the auth credentials is updated
    sock.ev.on('creds.update', saveState)

    return sock
}

startSock()