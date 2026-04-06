
import { AgrupamentoNoticias, Noticia } from "../../domain/noticia/noticia-interface";
import { db } from "../../drizzle/db";
import { cidade, noticia, uf } from "../../drizzle/db/schema";
import { asc, desc, eq } from "drizzle-orm";

export class NoticiaRepository {

    async create(data: Noticia) {
        const { id, dataCriacao, ...props } = data

        const result = await db.insert(noticia).values(props);

        return result;
    }

    async findAll(): Promise<Noticia[]> {
        const result = await db.query.noticia.findMany({
            with: {
                cidade: true,
            },
        })

        return result.map(item => new Noticia(item));
    }

    async findAllDecres(): Promise<Noticia[]> {
        const result = await db.query.noticia.findMany({
            orderBy: (noticia) => [desc(noticia.dataCriacao)],
        })

        return result.map(item => new Noticia(item));
    }

    async findAllCres(): Promise<Noticia[]> {
        const result = await db.query.noticia.findMany({
            orderBy: (noticia) => [asc(noticia.dataCriacao)],
        })

        return result.map(item => new Noticia(item));
    }

    async findById(id: number): Promise<Noticia | null> {
        const result = await db.query.noticia.findFirst({
            where: (noticia) => eq(noticia.id, id),
        })

        if (!result) return null;

        return new Noticia(result);
    }

    async findNoticiasByUf(idUf: number, isDesc: boolean): Promise<Noticia[]> {
        const result = await db
            .select({
                id: noticia.id,
                titulo: noticia.titulo,
                texto: noticia.texto,
                cidadeId: noticia.cidadeId,
                dataCriacao: noticia.dataCriacao,
                nomeCidade: cidade.nome,
            })
            .from(noticia)
            .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
            .innerJoin(uf, eq(cidade.ufId, uf.id))
            .where(eq(uf.id, idUf))
            .orderBy(isDesc
                ? desc(noticia.dataCriacao)
                : asc(noticia.dataCriacao)
            );

        return result.map(item => new Noticia(item));

    }

    async listarAgrupadoPorUf() {
        const result = await db
            .select({
                titulo: noticia.titulo,
                cidade: cidade.nome,
                uf: uf.sigla,
            })
            .from(noticia)
            .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
            .innerJoin(uf, eq(cidade.ufId, uf.id))
            .orderBy(asc(uf.sigla));

        const grupos: Record<string, typeof result> = {};

        result.forEach(item => {
            if (!grupos[item.uf]) grupos[item.uf] = [];
            grupos[item.uf].push(item);
        });

        let i = 1;

        Object.entries(grupos).forEach(([uf, noticias]) => {
            console.log(`# ${uf}\n`);

            noticias.forEach(n => {
                console.log(`${i} - ${n.titulo} - ${n.cidade}`);
                i++;
            });

            console.log("");
        });

        return result
    }
}