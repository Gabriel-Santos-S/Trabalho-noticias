import { NoticiaRepository } from "../../infra/repository/noticia-repository";


const noticiaRepository = new NoticiaRepository()

export async function FindNoticiaAll() {

    const noticia = await noticiaRepository.findAll()

    if (!noticia) {
        throw new Error(`Falha ao buscar noticias`)
    }
    return noticia
}

