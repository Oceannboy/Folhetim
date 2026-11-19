-- Folhetim - dados iniciais de exemplo

INSERT INTO categorias (nome) VALUES ('Romance'), ('Drama'), ('Suspense'), ('Época');

INSERT INTO novelas (titulo, sinopse, categoria_id, total_capitulos, classificacao, destaque) VALUES
('Coração de Cerrado', 'Helena volta à fazenda da família para vender a terra, mas reencontra Rafael, o antigo capataz, e um segredo capaz de mudar a vida de todos.', 1, 120, '14 anos', 1),
('Herança de Sangue', 'Uma disputa pela herança de uma família tradicional revela rivalidades antigas.', 2, 90, '16 anos', 0),
('A Dama do Tocantins', 'Uma jornada de resiliência e conquista no interior do Tocantins.', 4, 110, '12 anos', 0),
('Amor em Tempo de Chuva', 'Uma história de paixão e segredos em uma cidade que não para de chover.', 1, 75, '14 anos', 0),
('Rio das Promessas', 'Duas irmãs separadas na infância se reencontram em uma cidade ribeirinha, onde uma promessa antiga ameaça a herança da família.', 2, 100, '14 anos', 0),
('Véu de Esmeralda', 'Em 1920, uma jovem costureira descobre que o vestido de noiva que está fazendo guarda a pista de um crime que a alta sociedade tenta esconder.', 4, 85, '12 anos', 0);

INSERT INTO capitulos (novela_id, numero, titulo) VALUES
(1, 1, 'A volta'),
(1, 2, 'O segredo'),
(1, 3, 'A tempestade');

INSERT INTO planos (nome, preco, periodo, telas) VALUES
('Mensal', 14.90, 'mês', 1),
('Anual', 119.90, 'ano', 1),
('Família', 24.90, 'mês', 4);
