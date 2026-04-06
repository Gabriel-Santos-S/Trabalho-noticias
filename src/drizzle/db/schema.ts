import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";


export const uf = sqliteTable("uf", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  sigla: text("sigla").notNull(),
});

export const cidade = sqliteTable("cidade", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  ufId: integer("uf_id").notNull().references(() => uf.id),
});


export const noticia = sqliteTable("noticia", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo").notNull(),
  texto: text("texto").notNull(),
  cidadeId: integer("cidade_id").notNull().references(() => cidade.id),
  dataCriacao: integer("data_criacao", { mode: "timestamp" }).default(sql`(unixepoch())`)  
});


// Relações

export const noticiaRelations = relations(noticia, ({ one }) => ({
  cidade: one(cidade, {
    fields: [noticia.cidadeId],
    references: [cidade.id],
  }),
}));