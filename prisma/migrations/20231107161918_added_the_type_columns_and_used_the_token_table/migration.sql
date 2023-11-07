/*
  Warnings:

  - Added the required column `type` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tokens" ("createdAt", "expiredAt", "id", "token", "userId") SELECT "createdAt", "expiredAt", "id", "token", "userId" FROM "tokens";
DROP TABLE "tokens";
ALTER TABLE "new_tokens" RENAME TO "tokens";
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
