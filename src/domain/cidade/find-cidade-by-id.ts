import { CidadeRepository } from "../../infra/repository/cidade-repository";


const cidadeRepository = new CidadeRepository()

export async function FindCidadeByID(id: number) {

    const cidade = await cidadeRepository.findById(id)

    if (!cidade) {
        throw new Error(`Falha ao buscar cidade pelo id ${id}`)
    }
    return cidade
}

