import { sql } from './db.js'; // Importa a conexão SQL

// Cria a tabela videos
await sql`
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL
);
`;
console.log("Tabela 'videos' criada com sucesso!");