import { Uf } from "../../domain/uf/interface";
import { db } from "../../drizzle/db";
import { uf } from "../../drizzle/db/schema";
import { eq } from "drizzle-orm";

export class UfRepository {

    async create(data: Uf) {
        const { id, ...props } = data

        const result = await db.insert(uf).values(props);

        return result;
    }

    async findAll(): Promise<Uf[]> {
        const result = await db.query.uf.findMany()

        return result.map(item => new Uf(item));
    }

    async findById(id: number): Promise<Uf | null> {
        const result = await db.query.uf.findFirst({
            where: (uf) => eq(uf.id, id),
        })

        if (!result) return null;

        return new Uf(result);
    }
}