import { NoticiaRepository } from "../../infra/repository/noticia-repository";
import { input } from "../../main";


const noticiaRepository = new NoticiaRepository()

export async function FindNoticiaCresAll() {

    const noticia = await noticiaRepository.findAllCres()
    if (!noticia) {
        throw new Error(`Falha ao buscar noticias`)
    }
     if (noticia.length < 1) {
        console.log("**Sem noticias registradas**");
        return null
    }

    let opicao = ""
    let isValido = false
    while (!isValido) {
        noticia.map(n => console.log(n.msg()))
        console.log("(z) Voltar");
        opicao = await input("=> ")

        isValido = opicao.toLocaleUpperCase().includes("Z")
        if (!isValido) console.error("Entrada invalida");
    }
    return noticia
}

