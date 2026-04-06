import { UfRepository } from "../../infra/repository/uf-repository";
import { UfDrizzleValidation } from "../../infra/validation/uf-drizzle-validation";
import { input } from "../../main";
import { Uf } from "./interface";


const ufRepository = new UfRepository()

export async function ufCadastro() {

    let isValido = false
    const form = new Uf({
        nome: "",
        sigla: ""
    })


    while (!isValido) {
        form.nome = await input("Nome do UF: ")
        form.sigla = await input("Sigla do UF: ")

        isValido = UfDrizzleValidation(form)
        if (!isValido) console.error("Todos os campos devem ser preenchidos");
    }

    return await cadastro(form)
}

async function cadastro(data: Uf) {
    try {
        const response = await ufRepository.create(data)
        return response
    } catch (erro) {
        console.error("⛔ Erro ao criar UF:", erro);
    }
}