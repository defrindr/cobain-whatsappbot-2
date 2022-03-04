import { delay } from '@adiwajshing/baileys'
import { getAdmin, getListProduct } from '../query/anonymous'

function formatRupiah(angka, prefix = "Rp. ") {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

export async function ListProduct(sock, id, params = {}) {
    const messageTyping = async (jid: string) => {
        await sock.presenceSubscribe(jid)
        await delay(500)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(100)

        await sock.sendPresenceUpdate('paused', jid)
    }

    const listProduct = await getListProduct();
    let template = "";
    for (let i = 0; i < listProduct.length; i++) {
        template = `Nama Produk : ${listProduct[i].product_name}
Harga Produk : ${formatRupiah(listProduct[i].product_price)}
Sisa Stok : ${listProduct[i].product_stock}`;
        let templateMessage = {
            text: template,
            footer: 'powered by zoeco.store',
            headerType: 1
        }

        await messageTyping(id)
        await sock.sendMessage(id, templateMessage)
    }


}