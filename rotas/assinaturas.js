const express = require('express');
const db = require('../banco/conexao');
const router = express.Router();

const FORMAS = ['Pix', 'Boleto', 'Cartão'];

// Data no formato AAAA-MM-DD, no horário do computador
function formatar(d) {
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// Soma 1 mês ou 1 ano à data de início (plano mensal ou anual)
function renovacao(inicio, periodo) {
  const r = new Date(inicio);
  if (periodo === 'ano') {
    r.setFullYear(r.getFullYear() + 1);
  } else {
    const dia = r.getDate();
    r.setDate(1);
    r.setMonth(r.getMonth() + 1);
    const ultimoDia = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
    r.setDate(Math.min(dia, ultimoDia));
  }
  return r;
}

// Ainda não existe login: usamos um usuário de teste até criarmos o cadastro
function usuarioDeTeste() {
  db.prepare(
    `INSERT OR IGNORE INTO usuarios (id, nome, email, senha)
     VALUES (1, 'Usuário de teste', 'teste@folhetim.com', 'teste')`
  ).run();
  return 1;
}

// POST /api/assinaturas  { plano_id, forma_pagamento } -> cria a assinatura (tela Assinatura)
router.post('/', (req, res) => {
  const { plano_id, forma_pagamento } = req.body || {};
  const plano = db.prepare('SELECT * FROM planos WHERE id = ?').get(plano_id);
  if (!plano) return res.status(400).json({ erro: 'Plano inválido' });
  if (!FORMAS.includes(forma_pagamento)) {
    return res.status(400).json({ erro: 'Forma de pagamento inválida' });
  }

  const inicio = new Date();
  const resultado = db.prepare(
    `INSERT INTO assinaturas (usuario_id, plano_id, forma_pagamento, data_inicio, data_renovacao)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    usuarioDeTeste(),
    plano.id,
    forma_pagamento,
    formatar(inicio),
    formatar(renovacao(inicio, plano.periodo))
  );
  res.status(201).json({ id: Number(resultado.lastInsertRowid) });
});

// GET /api/assinaturas/1 -> dados da assinatura (tela Confirmação)
router.get('/:id', (req, res) => {
  const assinatura = db.prepare(
    `SELECT a.id, a.forma_pagamento, a.data_inicio, a.data_renovacao,
            p.nome AS plano, p.preco, p.periodo
     FROM assinaturas a JOIN planos p ON p.id = a.plano_id WHERE a.id = ?`
  ).get(req.params.id);
  if (!assinatura) return res.status(404).json({ erro: 'Assinatura não encontrada' });
  res.json(assinatura);
});

module.exports = router;
