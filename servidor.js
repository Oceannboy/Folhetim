const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/novelas', require('./rotas/novelas'));
app.use('/api/planos', require('./rotas/planos'));
app.use('/api/assinaturas', require('./rotas/assinaturas'));

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Folhetim rodando em http://localhost:${PORTA}`);
});
