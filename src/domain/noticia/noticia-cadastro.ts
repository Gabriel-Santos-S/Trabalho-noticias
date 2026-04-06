import { CidadeRepository } from "../../infra/repository/cidade-repository";
import { NoticiaRepository } from "../../infra/repository/noticia-repository";
import { NoticiaDrizzleValidation } from "../../infra/validation/noticia-drizzle-validation";
import { input } from "../../main";
import { Noticia } from "./noticia-interface";


const noticiaRepository = new NoticiaRepository()
const cidadeRepository = new CidadeRepository()

export async function noticiaCadastro() {

    let isValido = false
    const cidades = await cidadeRepository.findAll()
    const form = new Noticia({
        titulo: "",
        texto: "",
        cidadeId: 0,
    })


    while (!isValido) {
        form.titulo = await input("Titulo da noticia: ")
        form.texto = await input("Texto da noticia: ")

        console.log("\n==============\nSelecione a cidade\n==============");
        cidades.map((cidade, index) => console.log(`${index + 1} - ${cidade.msg()}`));
        const cidadeselect = Number(await input("=> "));

        if (cidadeselect < 1 || cidadeselect > cidades.length) {
            console.error("Seleção inválida. Tente novamente.");
            continue;
        }

        form.cidadeId = cidades[cidadeselect - 1].id!;

        isValido = NoticiaDrizzleValidation(form)
        if (!isValido) console.error("Todos os campos devem ser preenchidos");
    }

    return await cadastro(form)
}

async function cadastro(data: Noticia) {
    try {
        const response = await noticiaRepository.create(data)
        return response
    } catch (erro) {
        console.error("⛔ Erro ao criar noticia:", erro);
    }
}