const express = require('express');
const db = require('../banco/conexao');
const router = express.Router();

// GET /api/novelas?categoria=Romance&busca=cerrado  -> lista (tela Catálogo)
router.get('/', (req, res) => {
  const { categoria, busca } = req.query;
  let sql = `SELECT n.id, n.titulo, n.total_capitulos, n.classificacao, c.nome AS categoria
             FROM novelas n JOIN categorias c ON c.id = n.categoria_id`;
  const condicoes = [];
  const params = [];
  if (categoria) {
    condicoes.push('c.nome = ?');
    params.push(categoria);
  }
  if (busca) {
    condicoes.push('n.titulo LIKE ?');
    params.push(`%${busca}%`);
  }
  if (condicoes.length) sql += ' WHERE ' + condicoes.join(' AND ');
  res.json(db.prepare(sql).all(...params));
});

// GET /api/novelas/destaque -> novela em destaque (tela Início)
router.get('/destaque', (req, res) => {
  const novela = db.prepare('SELECT id, titulo FROM novelas WHERE destaque = 1 LIMIT 1').get();
  res.json(novela || null);
});

// GET /api/novelas/1 -> detalhes + capítulos (tela Detalhes)
router.get('/:id', (req, res) => {
  const novela = db.prepare(
    `SELECT n.*, c.nome AS categoria FROM novelas n
     JOIN categorias c ON c.id = n.categoria_id WHERE n.id = ?`
  ).get(req.params.id);
  if (!novela) return res.status(404).json({ erro: 'Novela não encontrada' });
  novela.capitulos = db.prepare(
    'SELECT numero, titulo FROM capitulos WHERE novela_id = ? ORDER BY numero'
  ).all(req.params.id);
  res.json(novela);
});

module.exports = router;
