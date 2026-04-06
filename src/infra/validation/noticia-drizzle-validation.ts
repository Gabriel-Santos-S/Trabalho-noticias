import { Noticia } from "../../domain/noticia/noticia-interface"



export const NoticiaDrizzleValidation = (data: Noticia): boolean => {

    const campoInvalido = !data.titulo.trim() || !data.texto.trim() || !data.cidadeId

    if (campoInvalido) {
        return false
    } else {
        return true
    }
}