const { getWord } = require("./query/kata")

async function main() {
    let kata = await getWord()
    console.log(kata[0].teks)
}

main()