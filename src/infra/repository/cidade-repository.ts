
import { Cidade } from "../../domain/cidade/cidade-interface";
import { db } from "../../drizzle/db";
import { cidade } from "../../drizzle/db/schema";
import { eq } from "drizzle-orm";

export class CidadeRepository {

    async create(data: Cidade) {
        const { id, ...props } = data

        const result = await db.insert(cidade).values(props);

        return result;
    }

    async findAll(): Promise<Cidade[]> {
        const result = await db.query.cidade.findMany()

        return result.map(item => new Cidade(item));
    }

    async findById(id: number): Promise<Cidade | null> {
        const result = await db.query.cidade.findFirst({
            where: (cidade) => eq(cidade.id, id),
        })

        if (!result) return null;

        return new Cidade(result);
    }
}