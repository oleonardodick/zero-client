-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_requisicoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL DEFAULT '',
    "tipo" TEXT NOT NULL DEFAULT '',
    "jsonEnvio" TEXT NOT NULL DEFAULT '',
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL DEFAULT '',
    "colecao_id" TEXT,
    "pasta_id" TEXT,
    CONSTRAINT "requisicoes_colecao_id_fkey" FOREIGN KEY ("colecao_id") REFERENCES "colecoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "requisicoes_pasta_id_fkey" FOREIGN KEY ("pasta_id") REFERENCES "pastas_colecao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_requisicoes" ("colecao_id", "data", "id", "jsonEnvio", "nome", "pasta_id", "tipo", "url") SELECT "colecao_id", "data", "id", "jsonEnvio", "nome", "pasta_id", "tipo", "url" FROM "requisicoes";
DROP TABLE "requisicoes";
ALTER TABLE "new_requisicoes" RENAME TO "requisicoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
