export interface CidadeInterface {
    id?: number,
    nome: string,
    ufId: number
}

export class Cidade {
    public id?: number;
    public nome: string;
    public ufId: number;

    constructor({ id, nome, ufId }: CidadeInterface) {
        this.id = id;
        this.nome = nome;
        this.ufId = ufId;
    }

    public msg(): string {
        return `==================\n Nome: ${this.nome}\n UF: ${this.ufId}`;
    }

    static create(data: CidadeInterface) {
        return new Cidade(data);
    }
}