
import { CidadeRepository } from "../../infra/repository/cidade-repository";
import { UfRepository } from "../../infra/repository/uf-repository";
import { CidadeDrizzleValidation } from "../../infra/validation/cidade-drizzle-validation";

import { input } from "../../main";
import { Cidade } from "./cidade-interface";


const cidadeRepository = new CidadeRepository()
const ufRepository = new UfRepository()

export async function cidadeCadastro() {

    let isValido = false
    const ufs = await ufRepository.findAll()
    const form = new Cidade({
        nome: "",
        ufId: 0
    })

    if (ufs.length < 1) {
        console.log("**Sem UFs registrados**");
        return null
    }


    while (!isValido) {
        form.nome = await input("Nome da Cidade: ")

        console.log("\n==============\nSelecione a UF da cidade\n==============");
        ufs.map((uf, index) => console.log(`${index + 1} - ${uf.msg()}`));
        const ufSelect = Number(await input("=> "));

        if (ufSelect < 1 || ufSelect > ufs.length) {
            console.error("Seleção inválida. Tente novamente.");
            continue;
        }

        form.ufId = ufs[ufSelect - 1].id!;

        isValido = CidadeDrizzleValidation(form)
        if (!isValido) console.error("Todos os campos devem ser preenchidos e a UF deve ser valida");
    }

    return await cadastro(form)
}

async function cadastro(data: Cidade) {
    try {
        const response = await cidadeRepository.create(data)
        return response
    } catch (erro) {
        console.error("⛔ Erro ao criar Cidade:", erro);
    }
}