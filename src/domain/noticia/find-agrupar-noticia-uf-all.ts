import { NoticiaRepository } from "../../infra/repository/noticia-repository";
import { UfRepository } from "../../infra/repository/uf-repository";
import { input } from "../../main";


const noticiaRepository = new NoticiaRepository()

export async function FindAgruparNoticiaUfAll() {

    let voltar = false
    const noticias = await noticiaRepository.listarAgrupadoPorUf()

    while (!voltar) {
        console.log("(d) Detalhar notícia\n(z) Voltar");
        const opicaoSelect = await input("=> ")

        switch (opicaoSelect.toLocaleLowerCase()) {
            case "d":
                const numEscolha = Number(await input("Informe o numero da notícia: "))
                if (numEscolha < 1 || numEscolha > noticias.length) {
                    console.log("Valor invalido");
                    continue
                }

                const noticiaId = noticias[numEscolha - 1].id
                const noticia = await noticiaRepository.findById(noticiaId)
                console.log(noticia?.msg());
                break;

            case "z":
                voltar = true
                break;

            default:
                console.log("Valor invalido");
        }

    }

}


