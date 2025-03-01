import { sqliteTable, text, real, index, integer } from "drizzle-orm/sqlite-core";

// Tabla de empresas
export const empresas = sqliteTable("empresa", {
    id: text("id").primaryKey().notNull(),
    nombre: text("nombre").notNull(),
    estado: integer("estado", { mode: "boolean" }).notNull().default(true), // Estado activo/inactivo
}, (t) => [
    index("empresa_pk").on(t.id)
]);

// Tabla de materiales
export const aluminios = sqliteTable("aluminio", {
    id: text("id").primaryKey().notNull(),
    nombre: text("nombre").notNull(),
    precio: real("precio").notNull(),
    tipo: text("tipo").notNull(),
    color: text("color").notNull(),
    linea: text("linea").notNull(),
    empresaId: text("empresaId").notNull().references(() => empresas.id, { onDelete: "cascade" }),
    estado: integer("estado", { mode: "boolean" }).notNull().default(true), // Estado activo/inactivo
    createdAt: integer("created_at"), // Fecha de creación automática (timestamp en segundos)
}, (t) => [
    index("aluminio_pk").on(t.id),
    index("empresa_fk1").on(t.empresaId),

]);

export const vidrios = sqliteTable("vidrio", {
    id: text("id").primaryKey().notNull(),
    nombre: text("nombre").notNull(),
    tipo: text("tipo").notNull(),
    precio: real("precio").notNull(),
    color: text("color").notNull(), // Tipo de material
    empresaId: text("empresaId").notNull().references(() => empresas.id, { onDelete: "cascade" }),
    estado: integer("estado", { mode: "boolean" }).notNull().default(true), // Estado activo/inactivo
    createdAt: integer("created_at")
}, (t) => [
    index("vidrio_pk").on(t.id),
    index("empresa_fk2").on(t.empresaId),

]);

