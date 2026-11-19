const express = require('express');
const db = require('../banco/conexao');
const router = express.Router();

// GET /api/planos -> planos disponíveis (tela Assinatura)
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM planos').all());
});

module.exports = router;
