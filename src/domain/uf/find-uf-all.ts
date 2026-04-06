import { UfRepository } from "../../infra/repository/uf-repository";


const ufRepository = new UfRepository()

export async function FindUfAll() {

    const uf = await ufRepository.findAll()

    if (!uf) {
        throw new Error(`Falha ao buscar UFs`)
    }
    return uf
}

