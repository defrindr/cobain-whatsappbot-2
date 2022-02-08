import { MessageType } from "@adiwajshing/baileys"

export default async function (sock, id) {
    console.error(`mengirim pesan ke ${id}`);
    // send a simple text!
    await sock.sendMessage(id, { text: 'oh hello there' })
    // send a location!
    await sock.sendMessage(
        id,
        { location: { degreesLatitude: 24.121231, degreesLongitude: 55.1121221 } }
    )
    // send a contact!
    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
        + 'VERSION:3.0\n'
        + 'FN:Jeff Singh\n' // full name
        + 'ORG:Ashoka Uni;\n' // the organization of the contact
        + 'TEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\n' // WhatsApp ID + phone number
        + 'END:VCARD'
    await sock.sendMessage(
        id,
        {
            contacts: {
                displayName: 'Jeff',
                contacts: [{ vcard }]
            }
        }
    )

    // send a buttons message!
    const buttons = [
        { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
        { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 },
        { buttonId: 'id3', buttonText: { displayText: 'Button 3' }, type: 1 }
    ]

    const buttonMessage = {
        text: "Hi it's button message",
        footer: 'Hello World',
        buttons: buttons,
        headerType: 1
    }

    await sock.sendMessage(id, buttonMessage)

    //send a template message!
    const templateButtons = [
        { index: 1, urlButton: { displayText: '⭐ Star Baileys on GitHub!', url: 'https://github.com/adiwajshing/Baileys' } },
        { index: 2, callButton: { displayText: 'Call me!', phoneNumber: '+1 (234) 5678-901' } },
        { index: 3, quickReplyButton: { displayText: 'This is a reply, just like normal buttons!', id: 'id-like-buttons-message' } },
    ]

    const templateMessage = {
        text: "Hi it's a template message",
        footer: 'Hello World',
        templateButtons: templateButtons
    }

    await sock.sendMessage(id, templateMessage)

    // send a list message!
    const sections = [
        {
            title: "Section 1",
            rows: [
                { title: "Option 1", rowId: "option1" },
                { title: "Option 2", rowId: "option2", description: "This is a description" }
            ]
        },
        {
            title: "Section 2",
            rows: [
                { title: "Option 3", rowId: "option3" },
                { title: "Option 4", rowId: "option4", description: "This is a description V2" }
            ]
        },
    ]

    const listMessage = {
        text: "This is a list",
        footer: "nice footer, link: https://google.com",
        title: "Amazing boldfaced list title",
        buttonText: "Required, text on the button to view the list",
        sections
    }

    await sock.sendMessage(id, listMessage)
}