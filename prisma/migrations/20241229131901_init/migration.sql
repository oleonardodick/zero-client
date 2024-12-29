-- CreateTable
CREATE TABLE "variaveis_ambiente" (
    "nome" TEXT NOT NULL,
    "valor" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "variaveis_ambiente_nome_key" ON "variaveis_ambiente"("nome");
