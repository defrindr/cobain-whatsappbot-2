
export default async function (sock, id, text) {
    await sock.sendMessage(id, { text });
}