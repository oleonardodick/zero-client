/*
  Warnings:

  - You are about to drop the `Resposta` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `nome` on table `requisicoes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Resposta_requisicao_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Resposta";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "resposta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requisicao_id" TEXT NOT NULL,
    "json_retorno" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "status_text" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "time" REAL NOT NULL,
    CONSTRAINT "resposta_requisicao_id_fkey" FOREIGN KEY ("requisicao_id") REFERENCES "requisicoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_requisicoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "jsonEnvio" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL
);
INSERT INTO "new_requisicoes" ("data", "id", "jsonEnvio", "nome", "tipo", "url") SELECT "data", "id", "jsonEnvio", "nome", "tipo", "url" FROM "requisicoes";
DROP TABLE "requisicoes";
ALTER TABLE "new_requisicoes" RENAME TO "requisicoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "resposta_requisicao_id_key" ON "resposta"("requisicao_id");
