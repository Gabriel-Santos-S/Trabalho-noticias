import { CidadeRepository } from "../../infra/repository/cidade-repository";


const cidadeRepository = new CidadeRepository()

export async function FindCidadeAll() {

   const cidade = await cidadeRepository.findAll()

    if (!cidade) {
        throw new Error(`Falha ao buscar Cidades`)
    }
    return cidade
}

