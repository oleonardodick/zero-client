-- CreateTable
CREATE TABLE "query_params" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selecionado" BOOLEAN NOT NULL,
    "query" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "requisicao_id" TEXT NOT NULL,
    CONSTRAINT "query_params_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "headers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selecionado" BOOLEAN NOT NULL,
    "header" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "requisicao_id" TEXT NOT NULL,
    CONSTRAINT "headers_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "autenticacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL DEFAULT 'NENHUM',
    "requisicao_id" TEXT NOT NULL,
    CONSTRAINT "autenticacao_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "autenticacao_bearer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prefix" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "autenticacao_id" TEXT NOT NULL,
    CONSTRAINT "autenticacao_bearer_autenticacao_id_fkey" FOREIGN KEY ("autenticacao_id") REFERENCES "autenticacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "autenticacao_basic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "autenticacao_id" TEXT NOT NULL,
    CONSTRAINT "autenticacao_basic_autenticacao_id_fkey" FOREIGN KEY ("autenticacao_id") REFERENCES "autenticacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "requisicoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "jsonEnvio" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "autenticacao_requisicao_id_key" ON "autenticacao"("requisicao_id");

-- CreateIndex
CREATE UNIQUE INDEX "autenticacao_bearer_autenticacao_id_key" ON "autenticacao_bearer"("autenticacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "autenticacao_basic_autenticacao_id_key" ON "autenticacao_basic"("autenticacao_id");
