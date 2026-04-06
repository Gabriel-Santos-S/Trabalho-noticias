import { Cidade } from "../../domain/cidade/cidade-interface"
import { Uf } from "../../domain/uf/interface"



export const CidadeDrizzleValidation = (data: Cidade): boolean => {

    const campoInvalido = !data.nome.trim() || !data.ufId

    if (campoInvalido) {
        return false
    } else {
        return true
    }
}