import { NoticiaRepository } from "../../infra/repository/noticia-repository";
import { input } from "../../main";


const noticiaRepository = new NoticiaRepository()

export async function FindNoticiaDecreAll() {

    const noticia = await noticiaRepository.findAllDecres()
    if (!noticia) {
        throw new Error(`Falha ao buscar noticias`)
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

