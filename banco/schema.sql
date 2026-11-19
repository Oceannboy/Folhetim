-- Folhetim - estrutura do banco de dados (SQLite)

CREATE TABLE IF NOT EXISTS categorias (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS novelas (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo          TEXT NOT NULL,
  sinopse         TEXT NOT NULL,
  categoria_id    INTEGER NOT NULL,
  total_capitulos INTEGER NOT NULL,
  classificacao   TEXT NOT NULL,
  capa            TEXT,
  destaque        INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS capitulos (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  novela_id INTEGER NOT NULL,
  numero    INTEGER NOT NULL,
  titulo    TEXT NOT NULL,
  FOREIGN KEY (novela_id) REFERENCES novelas(id)
);

CREATE TABLE IF NOT EXISTS planos (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  nome    TEXT NOT NULL,
  preco   REAL NOT NULL,
  periodo TEXT NOT NULL,
  telas   INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS usuarios (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  nome  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS assinaturas (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id      INTEGER NOT NULL,
  plano_id        INTEGER NOT NULL,
  forma_pagamento TEXT NOT NULL,
  data_inicio     TEXT NOT NULL,
  data_renovacao  TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (plano_id)   REFERENCES planos(id)
);
