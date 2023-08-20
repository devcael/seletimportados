-- --------------------------------------------------------
-- Servidor:                     localhost
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
CREATE DATABASE IF NOT EXISTS `seletimportados` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `seletimportados`;

-- Copiando estrutura para tabela seletimportados.adicionais
CREATE TABLE IF NOT EXISTS `adicionais` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `codigo_adicional` int DEFAULT NULL,
  `codigo_produto` int DEFAULT NULL,
  `quantidade_maxima` int DEFAULT NULL,
  `grupo_adicionais_id` int DEFAULT NULL,
  PRIMARY KEY (`codigo`) USING BTREE,
  KEY `FKn5q3h09bra2quv51y6suneweq` (`grupo_adicionais_id`) USING BTREE,
  KEY `FKpeimpd7tm83dvgjldbeobb6wq` (`codigo_adicional`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela seletimportados.adicionais: 0 rows
DELETE FROM `adicionais`;
/*!40000 ALTER TABLE `adicionais` DISABLE KEYS */;
/*!40000 ALTER TABLE `adicionais` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.clientes: ~0 rows (aproximadamente)
DELETE FROM `clientes`;

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

-- Copiando estrutura para tabela seletimportados.consumo_pedido_adicionais
CREATE TABLE IF NOT EXISTS `consumo_pedido_adicionais` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `cod_produto_adicional` int DEFAULT NULL,
  `codigo_consumo` int DEFAULT NULL,
  `quantidade` decimal(10,2) DEFAULT NULL,
  `valor_total` decimal(10,2) DEFAULT NULL,
  `valorunitario` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`codigo`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela seletimportados.consumo_pedido_adicionais: 0 rows
DELETE FROM `consumo_pedido_adicionais`;
/*!40000 ALTER TABLE `consumo_pedido_adicionais` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumo_pedido_adicionais` ENABLE KEYS */;

-- Copiando estrutura para tabela seletimportados.contas_a_pagar
CREATE TABLE IF NOT EXISTS `contas_a_pagar` (
  `idcontas_a_pagar` int NOT NULL AUTO_INCREMENT,
  `data_do_pagamento` date DEFAULT NULL,
  `data_vencimento` date DEFAULT NULL,
  `data_emissao` date DEFAULT NULL,
  `situacao` varchar(45) NOT NULL,
  `valorpago` decimal(10,2) NOT NULL,
  `valortotal` decimal(10,2) NOT NULL,
  `troco` decimal(10,2) DEFAULT NULL,
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
  `valor_pago` decimal(10,2) NOT NULL,
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

-- Copiando dados para a tabela seletimportados.fornecedor: ~0 rows (aproximadamente)
DELETE FROM `fornecedor`;

-- Copiando estrutura para tabela seletimportados.grupo_adicionais
CREATE TABLE IF NOT EXISTS `grupo_adicionais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `obrigatorio` bit(1) NOT NULL,
  `quantidade_maxima` int NOT NULL,
  `tipo` enum('FIXO','SEMIFIXO','SOBREPOR') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'SEMIFIXO',
  `produto_codigo` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FKevw22g66tg6kcdewu92bbsq9o` (`produto_codigo`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela seletimportados.grupo_adicionais: 0 rows
DELETE FROM `grupo_adicionais`;
/*!40000 ALTER TABLE `grupo_adicionais` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupo_adicionais` ENABLE KEYS */;

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
  `preco_produto` decimal(10,2) NOT NULL,
  `custo_produto` decimal(10,2) NOT NULL,
  `quantidade` decimal(10,2) NOT NULL,
  `acrescimo` decimal(10,2) DEFAULT NULL,
  `desconto` decimal(10,2) DEFAULT NULL,
  `valortotal` decimal(10,2) NOT NULL,
  `id_moeda_custo_produto` int NOT NULL,
  `taxa_moeda_custo_produto` decimal(10,2) NOT NULL,
  `id_moeda_preco_produto` int NOT NULL,
  `taxa_moeda_preco_produto` decimal(10,2) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.items_venda: ~0 rows (aproximadamente)
DELETE FROM `items_venda`;

-- Copiando estrutura para tabela seletimportados.moedasconversao
CREATE TABLE IF NOT EXISTS `moedasconversao` (
  `id_taxa` int NOT NULL AUTO_INCREMENT,
  `nome_da_moeda` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `taxa_de_conversao_real` decimal(10,2) NOT NULL,
  `simbolo` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id_taxa`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.moedasconversao: ~2 rows (aproximadamente)
DELETE FROM `moedasconversao`;
INSERT INTO `moedasconversao` (`id_taxa`, `nome_da_moeda`, `taxa_de_conversao_real`, `simbolo`) VALUES
	(4, 'DOLAR', 4.78, '$'),
	(5, 'REAL', 1.00, 'R$');

-- Copiando estrutura para tabela seletimportados.pagamento_venda
CREATE TABLE IF NOT EXISTS `pagamento_venda` (
  `idpagamento_venda` int NOT NULL AUTO_INCREMENT,
  `id_venda` int NOT NULL,
  `id_tipo_pagamento` int NOT NULL,
  `valorpago` decimal(10,2) NOT NULL,
  `troco` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`idpagamento_venda`),
  KEY `fk_pagamento_venda_idx` (`id_venda`),
  KEY `fk_pagamento_tipo_de_pagamento_idx` (`id_tipo_pagamento`),
  CONSTRAINT `fk_pagamento_tipo_de_pagamento` FOREIGN KEY (`id_tipo_pagamento`) REFERENCES `tiposdepagamento` (`idtiposdepagamento`),
  CONSTRAINT `fk_pagamento_venda` FOREIGN KEY (`id_venda`) REFERENCES `venda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.pagamento_venda: ~0 rows (aproximadamente)
DELETE FROM `pagamento_venda`;

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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.produtos: ~0 rows (aproximadamente)
DELETE FROM `produtos`;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.tiposdepagamento: ~2 rows (aproximadamente)
DELETE FROM `tiposdepagamento`;
INSERT INTO `tiposdepagamento` (`idtiposdepagamento`, `tipo`, `nome_tipo`) VALUES
	(3, 'AV', 'DINHEIRO'),
	(4, 'AP', 'CARTAO DE CREDITO');

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.usuario: ~1 rows (aproximadamente)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`idusuario`, `nome`, `senha`) VALUES
	(19, '001', '001');

-- Copiando estrutura para tabela seletimportados.venda
CREATE TABLE IF NOT EXISTS `venda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `totalvenda` decimal(10,2) NOT NULL,
  `situacao` enum('ABERTA','PENDENTE','FINALIZADA') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `id_cliente` int NOT NULL,
  `desconto` decimal(10,2) DEFAULT NULL,
  `acrescimo` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `totalcomdescontoeacrescimo` decimal(10,2) DEFAULT NULL,
  `tipo` enum('VENDA','ORCAMENTO') DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_venda_cliente_idx` (`id_cliente`) USING BTREE,
  KEY `fk_venda_usuario_idx` (`id_usuario`) USING BTREE,
  CONSTRAINT `fk_venda_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `fk_venda_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.venda: ~0 rows (aproximadamente)
DELETE FROM `venda`;

-- Copiando estrutura para tabela seletimportados.vincular_imei
CREATE TABLE IF NOT EXISTS `vincular_imei` (
  `id_imei` int NOT NULL AUTO_INCREMENT,
  `id_itemvenda` int NOT NULL,
  `numeroimei` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imei`),
  UNIQUE KEY `id_itemvenda_UNIQUE` (`id_itemvenda`),
  CONSTRAINT `fk_item_venda_mei` FOREIGN KEY (`id_itemvenda`) REFERENCES `items_venda` (`id_itens_venda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Copiando dados para a tabela seletimportados.vincular_imei: ~0 rows (aproximadamente)
DELETE FROM `vincular_imei`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
