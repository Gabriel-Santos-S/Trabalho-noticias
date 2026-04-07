import 'dotenv/config';
import * as readline from "readline";
import { FindNoticiaByID } from './domain/noticia/find-noticia-by-id';
import { FindNoticiaDecreAll } from './domain/noticia/find-noticia-decre-all';
import { noticiaCadastro } from './domain/noticia/noticia-cadastro';
import { db } from './drizzle/db';
import { UfRepository } from './infra/repository/uf-repository';
import { FindNoticiaCresAll } from './domain/noticia/find-noticia-cres-all';
import { FindNoticiaUfAll } from './domain/noticia/find-noticia-uf-all';
import { FindAgruparNoticiaUfAll } from './domain/noticia/find-agrupar-noticia-uf-all';
import { FindNoticiaAll } from './domain/noticia/find-noticia-all';
import { cidadeCadastro } from './domain/cidade/cidade-cadastro';
import { ufCadastro } from './domain/uf/uf-cadastro';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export function input(pergunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}


async function main() {

    if (!db) return null
    let opcao: number;

    do {
        console.log("\n===MENU PRINCIPAL===");
        console.log("\n0-Cadastrar notícia");
        console.log("\n1 - Exibir todas as notícias (mais recentes primeiro)");
        console.log("\n2 - Exibir todas as notícias (mais antigas primeiro)");
        console.log("\n3 - Exibir notícias de um estado específico");
        console.log("\n4 - Exibir todas as notícias agrupadas por estado");
        console.log("\n5 - Cadastrar UF");
        console.log("\n6 - Cadastrar cidade");
        console.log("\n7 - Sair");

        opcao = Number(await input("Escolha: "))

        switch (opcao) {
            case 0:
                await noticiaCadastro()
                break;
            case 1:
                const nDecr = await FindNoticiaDecreAll()
                nDecr.map(n => console.log(n.msg()))
                break;
            case 2:
                const nCresc = await FindNoticiaCresAll()
                nCresc.map(n => console.log(n.msg()))
                break;
            case 3:
                const nUfEspecifc = await FindNoticiaUfAll()
                nUfEspecifc.map(n => console.log(n.msg()))
                break;
            case 4:
                await FindAgruparNoticiaUfAll()
                break;
            case 5:
                await ufCadastro()
                break;
            case 6:
                await cidadeCadastro()
                break;
            case 7:
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida");
        }

    } while (opcao !== 7);
    rl.close();
    console.log("\n✅ Fim");
}

main()