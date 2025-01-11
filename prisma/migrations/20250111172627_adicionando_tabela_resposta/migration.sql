-- CreateTable
CREATE TABLE "Resposta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requisicao_id" TEXT NOT NULL,
    "json_retorno" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "status_text" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "time" REAL NOT NULL,
    CONSTRAINT "Resposta_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Resposta_requisicao_id_key" ON "Resposta"("requisicao_id");
