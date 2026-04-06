import { NoticiaRepository } from "../../infra/repository/noticia-repository"



const noticiaRepository = new NoticiaRepository()

export async function FindNoticiaByID(id: number) {

    const noticia = await noticiaRepository.findById(id)

    if (!noticia) {
        throw new Error(`Falha ao buscar noticia pelo id ${id}`)
    }
    return noticia
}

