// Abre o banco SQLite e cria as tabelas na primeira execução
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, 'folhetim.db'));
db.pragma('foreign_keys = ON');

db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

// Só insere os dados de exemplo se o banco ainda estiver vazio
const total = db.prepare('SELECT COUNT(*) AS n FROM novelas').get().n;
if (total === 0) {
  db.exec(fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8'));
}

module.exports = db;
