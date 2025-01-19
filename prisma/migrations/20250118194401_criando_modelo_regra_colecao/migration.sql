-- CreateTable
CREATE TABLE "colecoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pastas_colecao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "colecao_id" TEXT NOT NULL,
    CONSTRAINT "pastas_colecao_colecao_id_fkey" FOREIGN KEY ("colecao_id") REFERENCES "colecoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "nome" TEXT NOT NULL,
    "colecao_id" TEXT,
    CONSTRAINT "requisicoes_colecao_id_fkey" FOREIGN KEY ("colecao_id") REFERENCES "colecoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_requisicoes" ("data", "id", "jsonEnvio", "nome", "tipo", "url") SELECT "data", "id", "jsonEnvio", "nome", "tipo", "url" FROM "requisicoes";
DROP TABLE "requisicoes";
ALTER TABLE "new_requisicoes" RENAME TO "requisicoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
