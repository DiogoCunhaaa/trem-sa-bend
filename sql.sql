-- MySQL Workbench Forward Engineering (versão corrigida)
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_sa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS train_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE train_db;

-- -----------------------------------------------------
-- Table usuarios
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  email_usuario VARCHAR(60) NOT NULL,
  nome_usuario VARCHAR(45) NOT NULL,
  cpf_usuario CHAR(11) NOT NULL,
  cnh_usuario CHAR(11) NOT NULL,
  senha_usuario VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE INDEX email_usuario_UNIQUE (email_usuario ASC),
  UNIQUE INDEX cpf_usuario_UNIQUE (cpf_usuario ASC),
  UNIQUE INDEX cnh_usuario_UNIQUE (cnh_usuario ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table notificacoesa
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS notificacoes (
  id_notificacao INT NOT NULL AUTO_INCREMENT,
  tipo_notificacao VARCHAR(45) NOT NULL,
  mensagem_notificao VARCHAR(200) NOT NULL, 
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_notificacao),
  INDEX fk_notificacoes_usuario_idx (id_usuario ASC),
  CONSTRAINT fk_notificacoes_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table trens
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS trens (
  id_trem INT NOT NULL AUTO_INCREMENT,
  modelo_trem VARCHAR(45) NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_trem),
  INDEX fk_trens_usuario_idx (id_usuario ASC),
  CONSTRAINT fk_trens_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table produtos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS produtos (
  id_produto INT NOT NULL AUTO_INCREMENT,
  nome_produto VARCHAR(45) NOT NULL,
  peso_produto INT NOT NULL,
  data_entrega DATETIME NOT NULL,
  id_trem INT NOT NULL,
  PRIMARY KEY (id_produto),
  INDEX fk_trens_produtos_idx (id_trem ASC),
  CONSTRAINT fk_trens_produtos
    FOREIGN KEY (id_trem)
    REFERENCES trens (id_trem)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table sensores
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS sensores (
  id_sensor INT NOT NULL AUTO_INCREMENT,
  tipo_sensor VARCHAR(45) NOT NULL,
  valor_sensor DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (id_sensor)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table rotas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS rotas (
  id_rota INT NOT NULL AUTO_INCREMENT,
  saida_rota DATETIME NOT NULL,
  chegada_rota DATETIME NOT NULL,
  destino_rota VARCHAR(100) NOT NULL,
  id_trem INT NOT NULL,
  PRIMARY KEY (id_rota),
  INDEX fk_trens_rotas_idx (id_trem ASC),
  CONSTRAINT fk_trens_rotas
    FOREIGN KEY (id_trem)
    REFERENCES trens (id_trem)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table alertas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS alertas (
  id_alerta INT NOT NULL AUTO_INCREMENT,
  horario_alerta DATETIME NOT NULL,
  mensagem_alerta VARCHAR(100) NOT NULL,
  nome_alerta VARCHAR(45) NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_alerta),
  INDEX fk_usuarios_alertas_idx (id_usuario ASC),
  CONSTRAINT fk_usuarios_alertas
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table relatorios
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS relatorios (
  id_relatorio INT NOT NULL AUTO_INCREMENT,
  mensagem_relatorio VARCHAR(100) NOT NULL,
  nome_relatorio VARCHAR(45) NOT NULL,
  tipo_relatorio VARCHAR(45) NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_relatorio),
  INDEX fk_usuarios_relatorios_idx (id_usuario ASC),
  CONSTRAINT fk_usuarios_relatorios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table manutencao
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS manutencao (
  id_manutencao INT NOT NULL AUTO_INCREMENT,
  mensagem_manutencao VARCHAR(100) NOT NULL,
  nome_manutencao VARCHAR(45) NOT NULL,
  tipo_manutencao VARCHAR(45) NOT NULL,
  id_trem INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_manutencao),
  INDEX fk_trens_manutencao_idx (id_trem ASC),
  INDEX fk_usuario_manutencao_idx (id_usuario ASC),
  CONSTRAINT fk_trens_manutencao
    FOREIGN KEY (id_trem)
    REFERENCES trens (id_trem)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_usuario_manutencao
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table reboque
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS reboque (
  id_reboque INT NOT NULL AUTO_INCREMENT,
  horario_reboque DATETIME NOT NULL,
  nome_reboque VARCHAR(45) NOT NULL,
  id_usuario INT NOT NULL,
  id_trem INT NOT NULL,
  PRIMARY KEY (id_reboque),
  INDEX fk_usuarios_reboque_idx (id_usuario ASC),
  INDEX fk_trens_reboque_idx (id_trem ASC),
  CONSTRAINT fk_usuarios_reboque
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_trens_reboque
    FOREIGN KEY (id_trem)
    REFERENCES trens (id_trem)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table pilota
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pilota (
  id_usuario INT NOT NULL,
  id_trem INT NOT NULL,
  PRIMARY KEY (id_usuario, id_trem),
  INDEX fk_trens_pilota_idx (id_trem ASC),
  CONSTRAINT fk_usuarios_pilota
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_trens_pilota
    FOREIGN KEY (id_trem)
    REFERENCES trens (id_trem)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS estacoes (
    id_estacao INT NOT NULL auto_increment,
    nome_estacao VARCHAR(45) NOT NULL,
    cidade_estacao VARCHAR(45) NOT NULL,
    bairro_estacao VARCHAR(45) NOT NULL,
    rua_estacao VARCHAR(45) NOT NULL,
    numero_estacao INT NOT NULL,
    PRIMARY KEY (id_estacao)
);

-- -----------------------------------------------------
-- Restore previous settings
-- -----------------------------------------------------
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;