import { delay } from '@adiwajshing/baileys'
export async function promoteword(sock, id, params = {}) {
    const messageTyping = async (jid: string) => {
        await sock.presenceSubscribe(jid)
        await delay(500)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(100)

        await sock.sendPresenceUpdate('paused', jid)
    }

    let template = `Gelatin Mask Blackheads Remover with Allantoin Day Nure Beauty
✅ BPOM Certified
🌱 Non Alcohol
💐 Non Fragrance
✅ Halal
✅ All Skin Type

Varian:
- Gelatin Mask Strawberry With Allantoin
- Gelatin Mask Charcoal With Allantoin
- Gelatin Mask Green Tea With Allantoin

Cara Pemakaian:
- Tuang bubuk masker secukupnya ke dalam wadah
- Tuang air panas secukupnya aduk hingga merata
- Aduk hingga butirannya larut dan mengental, masker siap digunakan
- Aplikasikan menggunakan spatula agar lebih mudah
- Aplikasin ke daerah yang diinginkan (seperti daerah T zone)
- Tunggu hingga benar-benar kering lalu kelupas dan bilas wajah dari sisa-sisa masker yang masih menempel
- Gunakan secara rutin 1 minggu sekali untuk hasil maksimal

📌 NB: 
- Pastikan masker sudah benar-benar kering waktu di peel off ! Hasilnya tidak akan maksimal jika di peel off waktu setengah kering
- Sebelum menggunakan masker komedo, pastikan wajah telah dicuci bersih agar komedonya bisa keangkat`;
    let templateMessage = {
        text: template,
        footer: 'powered by zoeco.store',
        headerType: 1
    }

    await messageTyping(id)
    await sock.sendMessage(id, templateMessage)



    /////////////////////////////////////////
    template = `BPOM APPROVED ✅
7 varian Organic Wash Off Mask Day Nure

Brightly Milk NA18210201902
mencerahkan wajah yang kusam, melembutkan wajah

Calm Choco NA18210201900
merefleksikan kulit wajah, sebagai penenang dan refreshing, ada efek mencerahkan

Japanesse Matcha NA18210201894
menghilangkan berbagai macam jerawat seperti jerawat batu, maupun jerawat yang sudah lama tidak bisa hilang

Scrub Coffee NA18210201899
Bermanfaat untuk mengurangi mata panda dan mengandung antioksidan tinggi untuk mencegah kerusakan sel kulit yang diakibatkan oleh sinar UV

Moist Avocado NA18210201903
Bermanfaat untuk menghaluskan permukaan kulit, mencegah kerutan, menyamarkan flek hitam dan noda

Glow Kiwi NA18210201901
menggantikan sel kulit mati penyebab wajah kusam sehingga kulit tampak lebih cerah, 
mengecilkan pori pori, melindungi kulit dari sinar UV

Refreshing Banana NA18210201904
Menghaluskan kulit wajah, mencegah penuaan dini, melawan radikal bebas, menghancurkan bakteri penyebab jerawat

Kemasan:
5gr (1-2x pakai)
Cara Penggunaan ada dibalik kemasan!`;
    templateMessage = {
        text: template,
        footer: 'powered by zoeco.store',
        headerType: 1
    }

    await messageTyping(id)
    await sock.sendMessage(id, templateMessage)



    /////////////////////////////////////////
    template = `LULUR BADAN DAY NURE hadir dalam 2 varian:

1. Cinnamon (Kayu Manis)
Di formulasikan untuk membantu mengangkat sel kulit mati di kulit badan akibat polusi udara. Membantu mencerahkan dan melembabkan kulit badan.

2. Turmeric (Kunyit)
Efektif melembabkan kulit badan yang cenderung kering. Dilengkapi dengan Gluthatione yang membantu menjaga kulit tetap fresh dan sehat.


Size 25gr (1x pakai)
Size 75gr (Bisa sampai 3x pakai)

❌Tidak mengandung Alkohol, Fragrance, dan Pewarna❌

Sudah BPOM dan aman digunakan untuk semua kalangan, bumil dan busui 😊 ✅✅


Everyday Nure Every Where`;
    templateMessage = {
        text: template,
        footer: 'powered by zoeco.store',
        headerType: 1
    }

    await messageTyping(id)
    await sock.sendMessage(id, templateMessage)

}