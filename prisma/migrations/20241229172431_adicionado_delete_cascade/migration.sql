-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_autenticacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL DEFAULT 'NENHUM',
    "requisicao_id" TEXT NOT NULL,
    CONSTRAINT "autenticacao_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_autenticacao" ("id", "requisicao_id", "tipo") SELECT "id", "requisicao_id", "tipo" FROM "autenticacao";
DROP TABLE "autenticacao";
ALTER TABLE "new_autenticacao" RENAME TO "autenticacao";
CREATE UNIQUE INDEX "autenticacao_requisicao_id_key" ON "autenticacao"("requisicao_id");
CREATE TABLE "new_autenticacao_basic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "autenticacao_id" TEXT NOT NULL,
    CONSTRAINT "autenticacao_basic_autenticacao_id_fkey" FOREIGN KEY ("autenticacao_id") REFERENCES "autenticacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_autenticacao_basic" ("autenticacao_id", "id", "senha", "usuario") SELECT "autenticacao_id", "id", "senha", "usuario" FROM "autenticacao_basic";
DROP TABLE "autenticacao_basic";
ALTER TABLE "new_autenticacao_basic" RENAME TO "autenticacao_basic";
CREATE UNIQUE INDEX "autenticacao_basic_autenticacao_id_key" ON "autenticacao_basic"("autenticacao_id");
CREATE TABLE "new_autenticacao_bearer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prefix" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "autenticacao_id" TEXT NOT NULL,
    CONSTRAINT "autenticacao_bearer_autenticacao_id_fkey" FOREIGN KEY ("autenticacao_id") REFERENCES "autenticacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_autenticacao_bearer" ("autenticacao_id", "id", "prefix", "token") SELECT "autenticacao_id", "id", "prefix", "token" FROM "autenticacao_bearer";
DROP TABLE "autenticacao_bearer";
ALTER TABLE "new_autenticacao_bearer" RENAME TO "autenticacao_bearer";
CREATE UNIQUE INDEX "autenticacao_bearer_autenticacao_id_key" ON "autenticacao_bearer"("autenticacao_id");
CREATE TABLE "new_headers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selecionado" BOOLEAN NOT NULL,
    "header" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "requisicao_id" TEXT NOT NULL,
    CONSTRAINT "headers_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_headers" ("header", "id", "requisicao_id", "selecionado", "valor") SELECT "header", "id", "requisicao_id", "selecionado", "valor" FROM "headers";
DROP TABLE "headers";
ALTER TABLE "new_headers" RENAME TO "headers";
CREATE TABLE "new_query_params" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selecionado" BOOLEAN NOT NULL,
    "query" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "requisicao_id" TEXT NOT NULL,
    CONSTRAINT "query_params_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_query_params" ("id", "query", "requisicao_id", "selecionado", "valor") SELECT "id", "query", "requisicao_id", "selecionado", "valor" FROM "query_params";
DROP TABLE "query_params";
ALTER TABLE "new_query_params" RENAME TO "query_params";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
