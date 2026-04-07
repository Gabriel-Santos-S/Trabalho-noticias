import { NoticiaRepository } from "../../infra/repository/noticia-repository";
import { UfRepository } from "../../infra/repository/uf-repository";
import { input } from "../../main";
import { Uf } from "../uf/interface";

interface Condicoes {
    idUf: number,
    isDesc: boolean
}

const noticiaRepository = new NoticiaRepository()
const ufRepository = new UfRepository()

export async function FindNoticiaUfAll() {

    const ufs = await ufRepository.findAll()
    if (ufs.length < 1) {
        console.log("**Sem ufs registrados**");
        return null
    }
    const condicoes = await inputCondicoes(ufs)
    const noticias = await noticiaRepository.findNoticiasByUf(condicoes.idUf, condicoes.isDesc)

    if (!noticias) {
        throw new Error(`Falha ao buscar noticias`)
    }
    if (noticias.length < 1) {
        console.log("**Noticias não encontradas**");
        return null
    }

    return noticias
}

async function inputCondicoes(ufs: Uf[]): Promise<Condicoes> {
    let opicao = ""
    let ufSelectValid = false
    let voltarValido = false
    let form: Condicoes = {
        idUf: 0,
        isDesc: false
    }

    while (!ufSelectValid) {
        console.log("\n==============\nSelecione a UF da cidade\n==============");
        ufs.map((uf, index) => console.log(`${index + 1} - ${uf.msg()}`));
        const ufSelect = Number(await input("=> "));

        if (ufSelect < 1 || ufSelect > ufs.length) {
            console.error("Seleção inválida. Tente novamente.");
            continue;
        }

        form.idUf = ufs[ufSelect - 1].id!;
        ufSelectValid = true
    }



    while (!voltarValido) {
        console.log("(a) Ordenar por mais recentes\n");
        console.log("(b) Ordenar por mais antigas\n");
        console.log("(z) Voltar");
        opicao = await input("=> ")

        switch (opicao.toLocaleLowerCase()) {
            case "a":
                form.isDesc = true
                voltarValido = true
                break;
            case "b":
                form.isDesc = false
                voltarValido = true
                break;
            case "z":
                voltarValido = true
                break;
            default:
                console.log("Valor invalido");
        }
    }

    return form
}

