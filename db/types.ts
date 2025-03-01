import { InferSelectModel } from "drizzle-orm";
import { empresas, vidrios, aluminios } from "./schema";

export type Empresa = InferSelectModel<typeof empresas>;
export type Aluminio = InferSelectModel<typeof aluminios>;
export type Vidrio = InferSelectModel<typeof vidrios>;