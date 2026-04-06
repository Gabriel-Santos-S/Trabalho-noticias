import { Uf } from "../../domain/uf/interface";


export const UfDrizzleValidation = (data: Uf): boolean => {

    const campoInvalido = !data.nome.trim() || !data.sigla.trim()

    if (campoInvalido) {
        return false
    } else {
        return true
    }
}