CREATE DATABASE  IF NOT EXISTS `rebolledo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rebolledo`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: rebolledo
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bodegas_materiales`
--

DROP TABLE IF EXISTS `bodegas_materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bodegas_materiales` (
  `id_bodegas_materiales` int NOT NULL,
  `id_material` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  `cantidad_comprometida` int NOT NULL DEFAULT '0',
  `cantidad_comprometida_real` decimal(4,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_bodegas_materiales`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodegas_materiales`
--

LOCK TABLES `bodegas_materiales` WRITE;
/*!40000 ALTER TABLE `bodegas_materiales` DISABLE KEYS */;
/*!40000 ALTER TABLE `bodegas_materiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiales`
--

DROP TABLE IF EXISTS `materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materiales` (
  `id_materiales` int NOT NULL AUTO_INCREMENT,
  `codigo_material` varchar(50) NOT NULL,
  `nombre_material` varchar(45) NOT NULL,
  `descripcion_material` varchar(200) NOT NULL,
  `tipo_material` varchar(45) NOT NULL,
  `precio_material` decimal(3,0) NOT NULL,
  `foto_material` varchar(100) NOT NULL,
  `modificar_precio` tinyint NOT NULL DEFAULT '0',
  `valor_iva` decimal(2,0) NOT NULL DEFAULT '0',
  `descuento_maximo` decimal(2,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_materiales`),
  UNIQUE KEY `codigo_material_UNIQUE` (`codigo_material`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiales`
--

LOCK TABLES `materiales` WRITE;
/*!40000 ALTER TABLE `materiales` DISABLE KEYS */;
INSERT INTO `materiales` VALUES (2,'11134323ABCD','Tornillo de Cruz Modificado','Un tornillo pero de cruz','Tornillo',11,'www.linkfoto.com',0,0,0),(3,'MAT001','Material 1','Descripción 1','Tipo A',100,'url1.jpg',1,0,0),(4,'MAT002','Material 2','Descripción 2','Tipo B',150,'url2.jpg',0,0,1);
/*!40000 ALTER TABLE `materiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recetas`
--

DROP TABLE IF EXISTS `recetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recetas` (
  `id_recetas` int NOT NULL,
  `nombre_receta` varchar(45) NOT NULL,
  `materiales` json NOT NULL,
  `precio_producto_unitario` int NOT NULL,
  `foto_producto` varchar(100) NOT NULL,
  `notas_recetas` varchar(45) NOT NULL,
  `fecha_creacion_receta` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_bodega` int NOT NULL,
  PRIMARY KEY (`id_recetas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recetas`
--

LOCK TABLES `recetas` WRITE;
/*!40000 ALTER TABLE `recetas` DISABLE KEYS */;
/*!40000 ALTER TABLE `recetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuarios` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(45) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `apellido_usuario` varchar(45) NOT NULL,
  `rol_usuario` int NOT NULL DEFAULT '0',
  `rut_usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'test@test.com','1234','TestN','TestA',0,'11.111.111-1'),(2,'test2@test2.com','$2a$05$fPdNEvB/AxxQ6dsaGuko8e19p8vRvAF7naZ5EiEZ5FcxQID9WD.ai','TestN2','TestA2',0,'11.111.111-2'),(3,'test3@test.com','$2a$05$nhRX16a78LVgUuCjPKJRje.mjITvZhWos0UaRG.tRVxQWRdRSkmhS','TestN3','TestA3',0,'11.111.111-3');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 23:20:18
