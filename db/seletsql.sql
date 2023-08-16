-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.33 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para seletimportados
CREATE DATABASE IF NOT EXISTS `seletimportados2` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `seletimportado2s`;

-- Copiando estrutura para tabela seletimportados.cabecalho_pedido
CREATE TABLE IF NOT EXISTS `cabecalho_pedido` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `cliente` int NOT NULL,
  `endereco_auxiliar` int NOT NULL,
  `data_pedido` date NOT NULL,
  `hora_pedido` time NOT NULL,
  `forma_de_pagamento` int NOT NULL,
  `forma_de_entrega` int NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `pedido_via` varchar(45) NOT NULL,
  `situacao` varchar(45) NOT NULL,
  `sub_total` decimal(10,0) DEFAULT NULL,
  `taxa_entrega` decimal(10,0) NOT NULL DEFAULT '0',
  `total` decimal(10,0) NOT NULL,
  `troco` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.cabecalho_pedido: ~0 rows (aproximadamente)
DELETE FROM `cabecalho_pedido`;

-- Copiando estrutura para tabela seletimportados.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cpfcnpj` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `telefone` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tipo` enum('PF','PJ') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `endereco` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cep` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `numero` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `complemento` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cidade` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `estado` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.clientes: ~7 rows (aproximadamente)
DELETE FROM `clientes`;
INSERT INTO `clientes` (`id`, `nome`, `cpfcnpj`, `telefone`, `email`, `tipo`, `endereco`, `cep`, `numero`, `complemento`, `cidade`, `estado`) VALUES
	(2, 'João da Silva', '123.456.789-00', '(11) 98765-4321', 'joao@example.com', 'PF', 'Rua das Flores', '12345-678', '123', 'Apto 101', 'São Paulo', 'SP'),
	(3, 'João da Silva', '123.456.789-00', '(11) 98765-4321', 'joao@example.com', 'PF', 'Rua das Flores', '12345-678', '123', 'Apto 101', 'São Paulo', 'SP'),
	(4, 'João da Silva', '123.456.789-00', '(11) 98765-4321', 'joao@example.com', 'PF', 'Rua das Flores', '12345-678', '123', 'Apto 101', 'São Paulo', 'SP'),
	(5, 'João da Silva', '123.456.789-00', '(11) 98765-4321', 'joao@example.com', 'PF', 'Rua das Flores', '12345-678', '123', 'Apto 101', 'São Paulo', 'SP'),
	(6, 'João da Silva', '123.456.789-00', '(11) 98765-4321', 'joao@example.com', 'PF', 'Rua das Flores', '12345-678', '123', 'Apto 101', 'São Paulo', 'SP'),
	(7, 'João da Silva3', '123.456.789-00', '(11) 98765-4321', 'joao@example.com', 'PF', 'Rua das Flores', '12345-678', '123', 'Apto 101', 'São Paulo', 'SP'),
	(8, 'dad', '342', '0000', '', 'PF', '', '', '', '', '', '');

-- Copiando estrutura para tabela seletimportados.consumo_pedido
CREATE TABLE IF NOT EXISTS `consumo_pedido` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `codigo_pedido` int NOT NULL,
  `codigo_produto` int NOT NULL,
  `quantidade` decimal(10,0) NOT NULL,
  `valor_unitario` decimal(10,0) NOT NULL,
  `valor_total` decimal(10,0) NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `data_venda` date NOT NULL,
  `hora_venda` time NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.consumo_pedido: ~0 rows (aproximadamente)
DELETE FROM `consumo_pedido`;

-- Copiando estrutura para tabela seletimportados.contas_a_pagar
CREATE TABLE IF NOT EXISTS `contas_a_pagar` (
  `idcontas_a_pagar` int NOT NULL AUTO_INCREMENT,
  `data_do_pagamento` date DEFAULT NULL,
  `data_vencimento` date DEFAULT NULL,
  `data_emissao` date DEFAULT NULL,
  `situacao` varchar(45) NOT NULL,
  `valorpago` decimal(10,0) NOT NULL,
  `valortotal` decimal(10,0) NOT NULL,
  `troco` decimal(10,0) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `id_do_usuario` int NOT NULL,
  `id_fornecedor` int NOT NULL,
  PRIMARY KEY (`idcontas_a_pagar`),
  KEY `fk_ctpagar_fornecedor_idx` (`id_fornecedor`),
  KEY `fk_ctpagar_usuario_idx` (`id_do_usuario`),
  CONSTRAINT `fk_ctpagar_fornecedor` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`),
  CONSTRAINT `fk_ctpagar_usuario` FOREIGN KEY (`id_do_usuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.contas_a_pagar: ~0 rows (aproximadamente)
DELETE FROM `contas_a_pagar`;

-- Copiando estrutura para tabela seletimportados.contas_a_receber
CREATE TABLE IF NOT EXISTS `contas_a_receber` (
  `idcontas_a_receber` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_venda` int NOT NULL,
  `valor` decimal(10,0) NOT NULL,
  `tipo_de_pagamento` int NOT NULL,
  `situacao` varchar(45) DEFAULT NULL,
  `valor_pago` decimal(10,0) NOT NULL,
  `data_emissao` date DEFAULT NULL,
  `data_pagamento` date DEFAULT NULL,
  `data_vencimento` date DEFAULT NULL,
  PRIMARY KEY (`idcontas_a_receber`),
  KEY `fk_conta_a_receber_idx` (`id_venda`),
  KEY `fk_conta_a_receber_cliente_idx` (`id_cliente`),
  CONSTRAINT `fk_conta_a_receber_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `fk_conta_a_receber_venda` FOREIGN KEY (`id_venda`) REFERENCES `venda` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.contas_a_receber: ~0 rows (aproximadamente)
DELETE FROM `contas_a_receber`;

-- Copiando estrutura para tabela seletimportados.endereco_auxiliar
CREATE TABLE IF NOT EXISTS `endereco_auxiliar` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `bairro` varchar(255) DEFAULT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `codcliente` int DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `logradouro` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.endereco_auxiliar: ~0 rows (aproximadamente)
DELETE FROM `endereco_auxiliar`;

-- Copiando estrutura para tabela seletimportados.fornecedor
CREATE TABLE IF NOT EXISTS `fornecedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cpfcnpj` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `telefone` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tipo` enum('PF','PJ') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `endereco` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cep` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `numero` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `complemento` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cidade` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `estado` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `pais` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `crt` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.fornecedor: ~4 rows (aproximadamente)
DELETE FROM `fornecedor`;
INSERT INTO `fornecedor` (`id`, `nome`, `cpfcnpj`, `telefone`, `email`, `tipo`, `endereco`, `cep`, `numero`, `complemento`, `cidade`, `estado`, `pais`, `crt`) VALUES
	(1, 'Micale', '123.456.789-00', '(11) 98765-4321', 'joao@example.com', 'PF', 'Rua das Flores', '12345-678', '123', 'Apto 101', 'São Paulo', 'SP', 'daada', '32'),
	(3, 'Micael', 'da', 'da', 'da', 'PJ', 'd', 'da', 'd', 'd', 'a', 'da', 'd', 'da'),
	(4, 'Micael', '', '', '', 'PJ', '', '', '', '', '', '', '', ''),
	(5, 'adsd', '9', '', '', 'PJ', '', '', '', '', '', '', '', '');

-- Copiando estrutura para tabela seletimportados.historico_pedido
CREATE TABLE IF NOT EXISTS `historico_pedido` (
  `codigo` int NOT NULL,
  `acao` varchar(255) NOT NULL,
  `codigo_pedido` int NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `usuario_que_executou` int NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.historico_pedido: ~0 rows (aproximadamente)
DELETE FROM `historico_pedido`;

-- Copiando estrutura para tabela seletimportados.items_venda
CREATE TABLE IF NOT EXISTS `items_venda` (
  `id_itens_venda` int NOT NULL AUTO_INCREMENT,
  `id_produto` int NOT NULL,
  `nome_produto` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `preco_produto` decimal(10,0) NOT NULL,
  `custo_produto` decimal(10,0) NOT NULL,
  `quantidade` decimal(10,0) NOT NULL,
  `acrescimo` decimal(10,0) DEFAULT NULL,
  `desconto` decimal(10,0) DEFAULT NULL,
  `valortotal` decimal(10,0) NOT NULL,
  `id_moeda_custo_produto` int NOT NULL,
  `taxa_moeda_custo_produto` decimal(10,0) NOT NULL,
  `id_moeda_preco_produto` int NOT NULL,
  `taxa_moeda_preco_produto` decimal(10,0) NOT NULL,
  `id_venda` int NOT NULL,
  PRIMARY KEY (`id_itens_venda`) USING BTREE,
  KEY `fk_moeda_preco_idx` (`id_moeda_preco_produto`) USING BTREE,
  KEY `fk_taxa_custo_conversao_idx` (`id_moeda_custo_produto`) USING BTREE,
  KEY `fk_item_venda_idx` (`id_venda`) USING BTREE,
  KEY `fk_item_product` (`id_produto`) USING BTREE,
  CONSTRAINT `fk_item_product` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id`),
  CONSTRAINT `fk_item_venda` FOREIGN KEY (`id_venda`) REFERENCES `venda` (`id`),
  CONSTRAINT `fk_taxa_custo_conversao` FOREIGN KEY (`id_moeda_custo_produto`) REFERENCES `moedasconversao` (`id_taxa`),
  CONSTRAINT `fk_taxa_preco_conversao` FOREIGN KEY (`id_moeda_preco_produto`) REFERENCES `moedasconversao` (`id_taxa`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.items_venda: ~7 rows (aproximadamente)
DELETE FROM `items_venda`;
INSERT INTO `items_venda` (`id_itens_venda`, `id_produto`, `nome_produto`, `preco_produto`, `custo_produto`, `quantidade`, `acrescimo`, `desconto`, `valortotal`, `id_moeda_custo_produto`, `taxa_moeda_custo_produto`, `id_moeda_preco_produto`, `taxa_moeda_preco_produto`, `id_venda`) VALUES
	(2, 1, 'TEste', 51, 30, 303, 5, 0, 102, 1, 1, 1, 1, 1),
	(3, 1, 'TEste', 51, 30, 2, 5, 0, 102, 1, 1, 1, 1, 1),
	(4, 1, 'TEste', 51, 30, 2, 5, 0, 102, 1, 1, 1, 1, 1),
	(15, 1, 'Produto Novo', 100, 80, 3, NULL, NULL, 450, 1, 5, 1, 6, 1),
	(16, 1, 'Produto Novo', 100, 80, 3, NULL, NULL, 450, 1, 5, 1, 6, 1),
	(17, 1, 'Produto Novo', 100, 80, 3, NULL, NULL, 450, 1, 5, 1, 6, 1),
	(18, 1, 'Produto Novo', 100, 80, 3, NULL, NULL, 450, 1, 5, 1, 6, 1);

-- Copiando estrutura para tabela seletimportados.moedasconversao
CREATE TABLE IF NOT EXISTS `moedasconversao` (
  `id_taxa` int NOT NULL AUTO_INCREMENT,
  `nome_da_moeda` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `taxa_de_conversao_real` decimal(10,0) NOT NULL,
  `simbolo` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_taxa`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.moedasconversao: ~2 rows (aproximadamente)
DELETE FROM `moedasconversao`;
INSERT INTO `moedasconversao` (`id_taxa`, `nome_da_moeda`, `taxa_de_conversao_real`, `simbolo`) VALUES
	(1, 'DOLAR', 10, '$'),
	(3, 'Euro', 1, '€');

-- Copiando estrutura para tabela seletimportados.pagamento_venda
CREATE TABLE IF NOT EXISTS `pagamento_venda` (
  `idpagamento_venda` int NOT NULL AUTO_INCREMENT,
  `id_venda` int NOT NULL,
  `id_tipo_pagamento` int NOT NULL,
  `valorpago` decimal(10,0) NOT NULL,
  `troco` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`idpagamento_venda`),
  KEY `fk_pagamento_venda_idx` (`id_venda`),
  KEY `fk_pagamento_tipo_de_pagamento_idx` (`id_tipo_pagamento`),
  CONSTRAINT `fk_pagamento_tipo_de_pagamento` FOREIGN KEY (`id_tipo_pagamento`) REFERENCES `tiposdepagamento` (`idtiposdepagamento`),
  CONSTRAINT `fk_pagamento_venda` FOREIGN KEY (`id_venda`) REFERENCES `venda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.pagamento_venda: ~1 rows (aproximadamente)
DELETE FROM `pagamento_venda`;
INSERT INTO `pagamento_venda` (`idpagamento_venda`, `id_venda`, `id_tipo_pagamento`, `valorpago`, `troco`) VALUES
	(1, 1, 2, 150, 50);

-- Copiando estrutura para tabela seletimportados.produtos
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `ean` varchar(25) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `custo` decimal(10,2) NOT NULL,
  `id_fornecedor` int NOT NULL,
  `id_moeda_custo` int NOT NULL,
  `id_moeda_preco` int NOT NULL,
  `ativo` tinyint DEFAULT NULL,
  `data_de_cadastro` date DEFAULT NULL,
  `estoque` int DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_moesa_custo` (`id_moeda_custo`,`id_moeda_preco`),
  KEY `fk_products_suplier_idx` (`id_fornecedor`),
  KEY `fk_preco_moeda_idx` (`id_moeda_preco`),
  CONSTRAINT `fk_custo_moeda` FOREIGN KEY (`id_moeda_custo`) REFERENCES `moedasconversao` (`id_taxa`),
  CONSTRAINT `fk_preco_moeda` FOREIGN KEY (`id_moeda_preco`) REFERENCES `moedasconversao` (`id_taxa`),
  CONSTRAINT `fk_products_suplier` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.produtos: ~3 rows (aproximadamente)
DELETE FROM `produtos`;
INSERT INTO `produtos` (`id`, `nome`, `ean`, `preco`, `custo`, `id_fornecedor`, `id_moeda_custo`, `id_moeda_preco`, `ativo`, `data_de_cadastro`, `estoque`, `marca`) VALUES
	(1, 'Micael', '21313', 43.24, 9.00, 1, 1, 1, 1, '2023-08-14', 40, 'Apple'),
	(39, 'Iphone 13 Pro Max', '123456789', 344.23, 15000.05, 1, 1, 1, 1, '2023-08-15', 20, 'Apple'),
	(40, 'Iphone Xr', '123456789', 1800.00, 1200.00, 1, 1, 1, 1, '2023-08-14', 0, 'Apple');

-- Copiando estrutura para tabela seletimportados.system_config
CREATE TABLE IF NOT EXISTS `system_config` (
  `idsystem_config` int NOT NULL AUTO_INCREMENT,
  `empresa` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`idsystem_config`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.system_config: ~0 rows (aproximadamente)
DELETE FROM `system_config`;

-- Copiando estrutura para tabela seletimportados.tipo
CREATE TABLE IF NOT EXISTS `tipo` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `avista_aprazo` varchar(255) DEFAULT NULL,
  `imprimir_promissoria` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `tipo_nfce` varchar(255) DEFAULT NULL,
  `baixanoatodavendaap` varchar(255) DEFAULT NULL,
  `enviaauto` varchar(20) DEFAULT 'NAO',
  `enviar_valor_apartir_de` decimal(10,2) DEFAULT '0.00',
  `enviar_valor_ate` decimal(10,2) DEFAULT '0.00',
  `percentual_taxa` decimal(10,2) DEFAULT '0.00',
  `tef_ativo` varchar(3) DEFAULT 'NAO',
  `percentual_taxa_antecipacao` decimal(10,2) DEFAULT '0.00',
  `quantidade_de_vias_pedido` int DEFAULT '1',
  `quantidade_de_vias_promissoria` int DEFAULT '1',
  `sugestao_acrescimo` decimal(10,2) DEFAULT '0.00',
  `mostrar_no_comandei_delivery` varchar(3) NOT NULL DEFAULT 'NAO',
  PRIMARY KEY (`codigo`),
  KEY `avista_aprazo` (`avista_aprazo`),
  KEY `imprimir_promissoria` (`imprimir_promissoria`),
  KEY `nome` (`nome`),
  KEY `tipo_nfce` (`tipo_nfce`),
  KEY `baixanoatodavendaap` (`baixanoatodavendaap`),
  KEY `enviaauto` (`enviaauto`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela seletimportados.tipo: ~0 rows (aproximadamente)
DELETE FROM `tipo`;

-- Copiando estrutura para tabela seletimportados.tiposdepagamento
CREATE TABLE IF NOT EXISTS `tiposdepagamento` (
  `idtiposdepagamento` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('AP','AV') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nome_tipo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`idtiposdepagamento`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.tiposdepagamento: ~1 rows (aproximadamente)
DELETE FROM `tiposdepagamento`;
INSERT INTO `tiposdepagamento` (`idtiposdepagamento`, `tipo`, `nome_tipo`) VALUES
	(2, 'AV', 'DINHEIRO');

-- Copiando estrutura para tabela seletimportados.updates_comandei_delivery
CREATE TABLE IF NOT EXISTS `updates_comandei_delivery` (
  `codigo` int NOT NULL,
  `data_da_versao` date NOT NULL,
  `versao` varchar(45) NOT NULL,
  `isUpdated` tinyint NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.updates_comandei_delivery: ~0 rows (aproximadamente)
DELETE FROM `updates_comandei_delivery`;

-- Copiando estrutura para tabela seletimportados.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.usuario: ~15 rows (aproximadamente)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`idusuario`, `nome`, `senha`) VALUES
	(1, 'Micael', '123'),
	(2, 'Micael', '123'),
	(3, 'John', 'password'),
	(4, 'Jane', 'password'),
	(5, 'Mike', 'password'),
	(7, 'Robert', 'password'),
	(8, '001', '001'),
	(9, 'John', 'password'),
	(10, 'Jane', 'password'),
	(11, 'Mike', 'password'),
	(13, 'Robert', 'password'),
	(14, 'John', 'password'),
	(15, 'Jane', 'password'),
	(16, 'Mike', 'password'),
	(18, 'Robert', 'password');

-- Copiando estrutura para tabela seletimportados.venda
CREATE TABLE IF NOT EXISTS `venda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `totalvenda` decimal(10,0) NOT NULL,
  `situacao` enum('ABERTA','PENDENTE','FINALIZADA') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `id_cliente` int NOT NULL,
  `desconto` decimal(10,0) DEFAULT NULL,
  `acrescimo` decimal(10,0) DEFAULT NULL,
  `subtotal` decimal(10,0) NOT NULL,
  `totalcomdescontoeacrescimo` decimal(10,0) DEFAULT NULL,
  `tipo` enum('VENDA','ORCAMENTO') DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_venda_cliente_idx` (`id_cliente`) USING BTREE,
  KEY `fk_venda_usuario_idx` (`id_usuario`) USING BTREE,
  CONSTRAINT `fk_venda_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `fk_venda_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.venda: ~7 rows (aproximadamente)
DELETE FROM `venda`;
INSERT INTO `venda` (`id`, `data`, `hora`, `totalvenda`, `situacao`, `id_usuario`, `id_cliente`, `desconto`, `acrescimo`, `subtotal`, `totalcomdescontoeacrescimo`, `tipo`) VALUES
	(1, '2023-08-12', '02:19:05', 1, 'ABERTA', 10, 2, NULL, NULL, 1, NULL, NULL),
	(6, '2023-08-11', '14:30:00', 101, 'ABERTA', 10, 2, 10, 5, 106, 111, 'VENDA'),
	(7, '2023-08-11', '14:30:00', 101, 'FINALIZADA', 10, 2, 10, 5, 106, 111, 'VENDA'),
	(8, '2023-08-11', '14:30:00', 101, 'FINALIZADA', 10, 2, 10, 5, 106, 111, 'VENDA'),
	(9, '2023-08-11', '14:30:00', 101, 'FINALIZADA', 10, 2, 10, 5, 106, 111, 'VENDA'),
	(10, '2023-08-11', '14:30:00', 101, 'FINALIZADA', 10, 2, 10, 5, 106, 111, 'VENDA'),
	(11, '2023-08-11', '14:30:00', 101, 'FINALIZADA', 10, 2, 10, 5, 106, 111, 'VENDA');

-- Copiando estrutura para tabela seletimportados.vincular_imei
CREATE TABLE IF NOT EXISTS `vincular_imei` (
  `id_imei` int NOT NULL AUTO_INCREMENT,
  `id_itemvenda` int NOT NULL,
  `numeroimei` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imei`),
  UNIQUE KEY `id_itemvenda_UNIQUE` (`id_itemvenda`),
  CONSTRAINT `fk_item_venda_mei` FOREIGN KEY (`id_itemvenda`) REFERENCES `items_venda` (`id_itens_venda`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.vincular_imei: ~1 rows (aproximadamente)
DELETE FROM `vincular_imei`;
INSERT INTO `vincular_imei` (`id_imei`, `id_itemvenda`, `numeroimei`) VALUES
	(4, 2, '2');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;