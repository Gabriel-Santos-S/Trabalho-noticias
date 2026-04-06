export interface UfInterface {
    id?: number,
    nome: string,
    sigla: string
}

export class Uf {
    public id?: number;
    public nome: string;
    public sigla: string;

    constructor({ id, nome, sigla }: UfInterface) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
    }

    public msg(): string {
        return `==================\n Nome: ${this.nome}\n Sigla: ${this.sigla}`;
    }

    static create(data: UfInterface) {
        return new Uf(data);
    }
}