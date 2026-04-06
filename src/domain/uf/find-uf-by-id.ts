import { UfRepository } from "../../infra/repository/uf-repository";


const ufRepository = new UfRepository()

export async function FindUfByID(id: number) {

    const uf = await ufRepository.findById(id)

    if (!uf) {
        throw new Error(`Falha ao buscar UF pelo id ${id}`)
    }
    return uf
}

