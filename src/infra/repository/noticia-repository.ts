
import { Noticia } from "../../domain/noticia/noticia-interface";
import { db } from "../../drizzle/db";
import { noticia } from "../../drizzle/db/schema";
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
}