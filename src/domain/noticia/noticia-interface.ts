import { cidade } from "../../drizzle/db/schema";
import { Cidade } from "../cidade/cidade-interface";

export interface NoticiaInterface {
    id?: number,
    titulo: string,
    texto: string,
    cidadeId: number,
    dataCriacao?: Date | null
    nomeCidade?: string | null
}

export interface AgrupamentoNoticias {
    titulo: string,
    cidade: string,
    uf: string,
} 

export class Noticia {
    public id?: number;
    public titulo: string;
    public texto: string;
    public cidadeId: number;
    public dataCriacao?: Date | null;
    public nomeCidade?: string | null


    constructor({
        id,
        titulo,
        texto,
        cidadeId,
        dataCriacao,
        nomeCidade,
    }: NoticiaInterface) {
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.cidadeId = cidadeId;
        this.dataCriacao = dataCriacao;
        this.nomeCidade = nomeCidade;
    }

    public msg(): string {
        const dataFormat = this.dataCriacao ? this.formatarData(this.dataCriacao) : ""
        return `==================\n 
        Titulo: ${this.titulo}\n 
        Texto: ${this.texto}\n 
        CidadeId: ${this.cidadeId}\n 
        Data: ${dataFormat}`;
    }

    private formatarData(data: Date) {
        return data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }

    static create(data: NoticiaInterface) {
        return new Noticia(data);
    }
}