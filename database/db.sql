-- MariaDB dump 10.19  Distrib 10.11.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: arabdict
-- ------------------------------------------------------
-- Server version	10.11.2-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roots`
--

DROP TABLE IF EXISTS `roots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roots` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `radicals` char(4) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verbs`
--

DROP TABLE IF EXISTS `verbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verbs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rootId` int(10) unsigned NOT NULL,
  `stem` tinyint(3) unsigned NOT NULL,
  `stem1MiddleRadicalTashkil` char(1) NOT NULL,
  `stem1MiddleRadicalTashkilPresent` char(1) NOT NULL,
  `soundOverride` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rootId` (`rootId`,`stem`,`stem1MiddleRadicalTashkil`,`stem1MiddleRadicalTashkilPresent`) USING BTREE,
  CONSTRAINT `verbs_rootId` FOREIGN KEY (`rootId`) REFERENCES `roots` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verbs_translations`
--

DROP TABLE IF EXISTS `verbs_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verbs_translations` (
  `verbId` int(10) unsigned NOT NULL,
  `ordering` tinyint(3) unsigned NOT NULL,
  `dialect` char(3) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`verbId`,`ordering`),
  CONSTRAINT `verbs_translations_verbId` FOREIGN KEY (`verbId`) REFERENCES `verbs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(3) unsigned NOT NULL,
  `word` text NOT NULL,
  `isMale` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_relations`
--

DROP TABLE IF EXISTS `words_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_relations` (
  `fromWordId` int(10) unsigned NOT NULL,
  `toWordId` int(10) unsigned NOT NULL,
  `relationship` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`fromWordId`,`toWordId`),
  KEY `words_relations_toWordId` (`toWordId`),
  CONSTRAINT `words_relations_fromWordId` FOREIGN KEY (`fromWordId`) REFERENCES `words` (`id`),
  CONSTRAINT `words_relations_toWordId` FOREIGN KEY (`toWordId`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_translations`
--

DROP TABLE IF EXISTS `words_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_translations` (
  `wordId` int(10) unsigned NOT NULL,
  `ordering` tinyint(3) unsigned NOT NULL,
  `dialect` char(3) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`wordId`,`ordering`),
  CONSTRAINT `words_translations_wordId` FOREIGN KEY (`wordId`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_verbs`
--

DROP TABLE IF EXISTS `words_verbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_verbs` (
  `wordId` int(10) unsigned NOT NULL,
  `verbId` int(10) unsigned NOT NULL,
  `isVerbalNoun` tinyint(1) NOT NULL,
  PRIMARY KEY (`wordId`),
  KEY `words_verbs_verbId` (`verbId`),
  CONSTRAINT `words_verbs_verbId` FOREIGN KEY (`verbId`) REFERENCES `verbs` (`id`),
  CONSTRAINT `words_verbs_wordId` FOREIGN KEY (`wordId`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-05 22:39:38
