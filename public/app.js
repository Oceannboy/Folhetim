// ===== Funções usadas por todas as telas do Folhetim =====

// Evita que texto vindo do banco quebre o HTML
function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// "Coração de Cerrado" -> "coracao-de-cerrado" (nome do arquivo da imagem)
function slug(texto) {
  return texto
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// 14.9 -> "14,90"
function preco(valor) {
  return Number(valor).toFixed(2).replace('.', ',');
}

// "2027-11-19" -> "19/11/2027"
function dataBR(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Imagem da novela (arquivos .jpg em public/img). Se o arquivo não existir, mostra o título.
// tipo: 'destaque' (banner grande), 'capa' (vertical) ou 'banner' (largo da lista)
function imagem(tipo, titulo) {
  const nome = slug(titulo);
  return `<div class="img">
    <img src="/img/${tipo}/${nome}.jpg" alt="${esc(titulo)}" data-tipo="${tipo}" data-nome="${nome}"
         onerror="imagemFalhou(this)">
    <span class="fallback">${esc(titulo)}</span>
  </div>`;
}

// Chamada quando a imagem não é encontrada
function imagemFalhou(img) {
  // Novela sem banner próprio na lista? Tenta a imagem de destaque dela
  if (img.dataset.tipo === 'banner') {
    img.dataset.tipo = 'destaque';
    img.classList.add('topo'); // mostra a parte de cima, onde fica o título
    img.src = `/img/destaque/${img.dataset.nome}.jpg`;
    return;
  }
  // Sem nenhuma imagem: mostra o título sobre um fundo bordô
  img.parentNode.classList.add('sem-img');
  img.remove();
}

// Seta de voltar: volta para a tela anterior (ou para o endereço padrão)
function seta(padrao) {
  return `<a class="seta" href="${padrao}" aria-label="Voltar"
             onclick="if (history.length > 1) { history.back(); return false; }">←</a>`;
}

// Cabeçalho: logo + (busca ou título "ASSINATURA") + perfil
function montarCabecalho() {
  const el = document.getElementById('cabecalho');
  if (!el) return;

  const logo = `<a class="logo" href="index.html" aria-label="Folhetim - Início"><span>F</span><i></i></a>`;
  const perfil = `<span class="perfil" aria-label="Perfil">
    <svg viewBox="0 0 54 54"><circle cx="27" cy="20" r="9" fill="#5B7FA3"/>
    <path d="M10 50c0-10 8-16 17-16s17 6 17 16z" fill="#5B7FA3"/></svg></span>`;

  if (el.dataset.modo === 'busca') {
    const busca = new URLSearchParams(location.search).get('busca') || '';
    el.className = 'cab';
    el.innerHTML = `${logo}
      <input class="busca" id="campo-busca" type="search" value="${esc(busca)}"
             placeholder="Busque por novela, ator ou autor...">
      ${perfil}`;
    document.getElementById('campo-busca').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const texto = e.target.value.trim();
        location.href = 'catalogo.html' + (texto ? '?busca=' + encodeURIComponent(texto) : '');
      }
    });
  } else {
    el.className = 'cab cab-assinatura';
    el.innerHTML = `${logo}<span class="titulo-pilula">ASSINATURA</span>${perfil}`;
  }
}

// Monta o cabeçalho quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', montarCabecalho);
