import { NoticiaRepository } from "../../infra/repository/noticia-repository";
import { UfRepository } from "../../infra/repository/uf-repository";
import { input } from "../../main";
import { Uf } from "../uf/interface";
import { AgrupamentoNoticias } from "./noticia-interface";

interface Condicoes {
    idUf: number,
    isDesc: boolean
}

const noticiaRepository = new NoticiaRepository()
const ufRepository = new UfRepository()

export async function FindAgruparNoticiaUfAll() {

    const noticias = await noticiaRepository.listarAgrupadoPorUf()


    console.log(noticias);


}


