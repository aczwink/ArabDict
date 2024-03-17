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
-- Table structure for table `dialects`
--

DROP TABLE IF EXISTS `dialects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dialects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `emojiCodes` varchar(10) NOT NULL,
  `parent` int(10) unsigned DEFAULT NULL,
  `iso639code` varchar(100) NOT NULL,
  `glottoCode` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dialects_parent` (`parent`),
  CONSTRAINT `dialects_parent` FOREIGN KEY (`parent`) REFERENCES `dialects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `flags` tinyint(3) unsigned NOT NULL,
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
  `flags` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rootId` (`rootId`,`stem`,`stem1MiddleRadicalTashkil`,`stem1MiddleRadicalTashkilPresent`) USING BTREE,
  CONSTRAINT `verbs_rootId` FOREIGN KEY (`rootId`) REFERENCES `roots` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verbs_relations`
--

DROP TABLE IF EXISTS `verbs_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verbs_relations` (
  `verb1Id` int(10) unsigned NOT NULL,
  `verb2Id` int(10) unsigned NOT NULL,
  `relationship` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`verb1Id`,`verb2Id`),
  KEY `verbs_relations_verb2Id` (`verb2Id`),
  CONSTRAINT `verbs_relations_verb1Id` FOREIGN KEY (`verb1Id`) REFERENCES `verbs` (`id`),
  CONSTRAINT `verbs_relations_verb2Id` FOREIGN KEY (`verb2Id`) REFERENCES `verbs` (`id`)
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
  `dialectId` int(10) unsigned NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`verbId`,`ordering`),
  KEY `verbs_translations_dialectId` (`dialectId`),
  CONSTRAINT `verbs_translations_dialectId` FOREIGN KEY (`dialectId`) REFERENCES `dialects` (`id`),
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
  `word` text NOT NULL,
  `isMale` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_derivations`
--

DROP TABLE IF EXISTS `words_derivations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_derivations` (
  `derivedWordId` int(10) unsigned NOT NULL,
  `sourceWordId` int(10) unsigned NOT NULL,
  `relationship` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`derivedWordId`) USING BTREE,
  KEY `words_relations_toWordId` (`sourceWordId`),
  CONSTRAINT `words_relations_fromWordId` FOREIGN KEY (`derivedWordId`) REFERENCES `words` (`id`),
  CONSTRAINT `words_relations_toWordId` FOREIGN KEY (`sourceWordId`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_functions`
--

DROP TABLE IF EXISTS `words_functions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_functions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `wordId` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `words_functions_wordId` (`wordId`),
  CONSTRAINT `words_functions_wordId` FOREIGN KEY (`wordId`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_functions_translations`
--

DROP TABLE IF EXISTS `words_functions_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_functions_translations` (
  `wordFunctionId` int(10) unsigned NOT NULL,
  `ordering` tinyint(3) unsigned NOT NULL,
  `dialectId` int(10) unsigned NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`wordFunctionId`,`ordering`),
  KEY `words_translations_dialectId` (`dialectId`),
  CONSTRAINT `words_translations_dialectId` FOREIGN KEY (`dialectId`) REFERENCES `dialects` (`id`),
  CONSTRAINT `words_translations_wordFunctionId` FOREIGN KEY (`wordFunctionId`) REFERENCES `words_functions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_relations`
--

DROP TABLE IF EXISTS `words_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_relations` (
  `word1Id` int(10) unsigned NOT NULL,
  `word2Id` int(10) unsigned NOT NULL,
  `relationship` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`word1Id`,`word2Id`),
  KEY `words_relations_word2Id` (`word2Id`),
  CONSTRAINT `words_relations_word1Id` FOREIGN KEY (`word1Id`) REFERENCES `words` (`id`),
  CONSTRAINT `words_relations_word2Id` FOREIGN KEY (`word2Id`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words_roots`
--

DROP TABLE IF EXISTS `words_roots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words_roots` (
  `wordId` int(10) unsigned NOT NULL,
  `rootId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`wordId`),
  KEY `words_roots_rootId` (`rootId`),
  CONSTRAINT `words_roots_rootId` FOREIGN KEY (`rootId`) REFERENCES `roots` (`id`),
  CONSTRAINT `words_roots_wordId` FOREIGN KEY (`wordId`) REFERENCES `words` (`id`)
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
  `type` tinyint(1) NOT NULL,
  PRIMARY KEY (`wordId`),
  KEY `words_verbs_verbId` (`verbId`),
  CONSTRAINT `words_verbs_verbId` FOREIGN KEY (`verbId`) REFERENCES `verbs` (`id`),
  CONSTRAINT `words_verbs_wordId` FOREIGN KEY (`wordId`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'arabdict'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP FUNCTION IF EXISTS `AR_TRIM` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
DELIMITER ;;
CREATE FUNCTION `AR_TRIM`(`s` TEXT) RETURNS text CHARSET utf8mb4 COLLATE utf8mb4_general_ci
    NO SQL
    DETERMINISTIC
BEGIN
  DECLARE tmp TEXT;
  SET tmp = REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(
            	REPLACE(s, "ٰ", "")
            , "ُ", ""),
            "َ", ""),
          "ِ", ""),
        "ّ", ""),
      "ْ", "");

  SET tmp = REPLACE(
    REPLACE(tmp, "أ", "ا"),
    "إ", "ا"
  );

  SET tmp = REPLACE(
    REPLACE(tmp, "ئ", "ي"),
    "ى", "ي"
  );

    RETURN tmp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17 23:02:43
