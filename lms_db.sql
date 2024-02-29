-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: learning_management_system
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_details` json NOT NULL,
  `result` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_info` json DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additional_context` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,'GuI8A8eRRGxeyPZgFu6lZSeRUvCye9jR1sOecYZ5',1,'Institute Management','Institute Data created successfully','POST api/platform/admin/institute-management/institutes/create','{\"name\": \"Thasthakir\", \"email\": null}','Success',5,'http://127.0.0.1:8000/api/platform/admin/institute-management/institutes/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"PostmanRuntime/7.36.3\"}','127.0.0.1','PostmanRuntime/7.36.3',NULL,'2024-02-26 10:28:54','2024-02-26 10:28:54'),(2,'fYzRDYXazf3cg8kXk8fHWHI0RSusrj5JHeusn18z',2,'Branch Management','InstituteBranch Data created successfully','POST api/institutes/admin/institute-management/institute-branches/create','{\"name\": \"Quiz\", \"email\": null}','Success',1,'http://127.0.0.1:8000/api/institutes/admin/institute-management/institute-branches/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:33:18','2024-02-26 10:33:18'),(3,'BeVFImeJZAL26agBKvg08YyOI8sGcyVx98jkSek0',2,'Branch Management','InstituteBranch Data updated successfully','POST api/institutes/admin/institute-management/institute-branches/update','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/institute-management/institute-branches/update','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:33:43','2024-02-26 10:33:43'),(4,'7Q2TrXV1bunIbWPyhV9nmBHdbxlcaPRHrlmq2bnR',2,'Branch Management','InstituteBranch Data created successfully','POST api/institutes/admin/institute-management/institute-branches/create','{\"name\": \"Quiz\", \"email\": null}','Success',1,'http://127.0.0.1:8000/api/institutes/admin/institute-management/institute-branches/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:35:01','2024-02-26 10:35:01'),(5,'6kOcx6601rWvaOOjiuZUpeVsE4xnaZxRbE0HG4Sr',2,'Branch Management','InstituteBranch Data updated successfully','POST api/institutes/admin/institute-management/institute-branches/update','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/institute-management/institute-branches/update','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:35:11','2024-02-26 10:35:11'),(6,'8AVS5bQlSgDYBj35cH2vsejq10EyQSmt7nUbTGzS',2,'Branch Management','InstituteBranch Data created successfully','POST api/institutes/admin/institute-management/institute-branches/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/institute-management/institute-branches/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:36:31','2024-02-26 10:36:31'),(7,'Qp5sM1PqaJcyKfauWbuS4FeeJUSgtOPHv2EaAWOT',2,'Course Management','InstituteCourseCategory Data created successfully','POST api/institutes/admin/course-management/course-categories/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/course-categories/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:53:11','2024-02-26 10:53:11'),(8,'vwzk5VM9Jd9WBrboxpXrSlwrScJow6AnBLgmOnll',2,'Course Management','InstituteCourseCategory Data created successfully','POST api/institutes/admin/course-management/course-categories/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/course-categories/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:53:33','2024-02-26 10:53:33'),(9,'gJkC6qQOIC3KZA5VEIjgFaG9kdyrJzBxO6Sx3uWW',2,'Course Management','InstituteCourseCategory Data created successfully','POST api/institutes/admin/course-management/course-categories/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/course-categories/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:54:03','2024-02-26 10:54:03'),(10,'l0JKmGths7Qvt7m3RE1NiULf76KEroUc49KIhVM9',2,'Course Management','InstituteCourseCategory Data created successfully','POST api/institutes/admin/course-management/course-categories/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/course-categories/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:54:21','2024-02-26 10:54:21'),(11,'5ChSJdbrpGXwmKsfLuhyVvxyqCbzYyAMZWdqMUKf',2,'Course Management','InstituteCourseCategory Data created successfully','POST api/institutes/admin/course-management/course-categories/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/course-categories/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:54:41','2024-02-26 10:54:41'),(12,'av0yV3PxOcxXYqvz1GOmPRmVZzLrBS0LEJdcSgf2',2,'Course Management','InstituteCourseCategory Data created successfully','POST api/institutes/admin/course-management/course-categories/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/course-categories/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-26 10:55:00','2024-02-26 10:55:00'),(13,'B6csWxprxtN68Be90nE1tY9ap1MG5NuNmY3hcwUI',2,'Course Management','InstituteCourse Data created successfully','POST api/institutes/admin/course-management/institute-courses/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-26 11:43:39','2024-02-26 11:43:39'),(14,'GBnj8b4X0B3TzLyNmQUbID8FRiqholtrdTW9XLQI',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-26 11:46:37','2024-02-26 11:46:37'),(15,'RUDiQtKw4Fy8sTsTzLrQWWPgpXFxdcmzueEe2I8e',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-26 11:47:10','2024-02-26 11:47:10'),(16,'zUS3dgt2bm9yCfjDTrYeRnPbuEpSlUiiKp6hhzXc',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:20:43','2024-02-27 00:20:43'),(17,'c5nkKXHVxNUxBVpP3I9XYsScHVQDo7aGwXqeDMMy',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:20:55','2024-02-27 00:20:55'),(18,'XZS7FHX1eMyl3dL36go7UknU8tyTCwdqgDjcn94U',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:24:09','2024-02-27 00:24:09'),(19,'GR4gUN3YrTa1dYdPUitkpckrcRU9hWXgWLnn6S4f',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:25:23','2024-02-27 00:25:23'),(20,'Op0lQMhIIBfQeR2PwGB3ate7mX7DKFgGaED4b2We',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 00:27:11','2024-02-27 00:27:11'),(21,'SIUZoUqVvGEKLyRh2MdDr4rAmPWg1DuyMa9v6FLU',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:30:01','2024-02-27 00:30:01'),(22,'ZcgztrWCxMnscyGxH0Nzmu3jkt5AdNLBjnDCli7h',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',1,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 00:30:12','2024-02-27 00:30:12'),(23,'OAyctVekGPmEv04Wqd0oA06vGcvf3LTq6HNnikJs',2,'Course Management','InstituteCourse Data created successfully','POST api/institutes/admin/course-management/institute-courses/create','{\"name\": \"Quiz\", \"email\": null}','Success',1,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:32:20','2024-02-27 00:32:20'),(24,'hsJN5ujYhK2IvF8bbUYoC5OuGWF7iXFSfIUXUZvu',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',1,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:32:33','2024-02-27 00:32:33'),(25,'CdwVmPeEY7GFfTyu65025T3QXNcaP5NwFIcDpIMF',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:45:18','2024-02-27 00:45:18'),(26,'8C35Ym41HmEMZFlpZDDEO9CHhZo9ML9yONHVAZ3w',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',1,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 00:46:14','2024-02-27 00:46:14'),(27,'JVLIZJooNo6Ornc6cwr7xN3NowHArVQWpNsCMxtz',2,'Content Management','CourseStudyMaterial Data created successfully','POST api/institutes/admin/content-management/course-study-materials/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-study-materials/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 02:04:24','2024-02-27 02:04:24'),(28,'fbDEtWFH8k7QCy6Bvk1UOgaPLf4b0hPH34IGzrRi',2,'Content Management','CourseStudyMaterial Data created successfully','POST api/institutes/admin/content-management/course-study-materials/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-study-materials/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:12:08','2024-02-27 02:12:08'),(29,'rDxmMfn2s0lSMfWR55AZcVygKVnkh3l9ja2v5MJX',2,'Content Management','CourseNotes Data created successfully','POST api/institutes/admin/content-management/course-notes/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 02:20:46','2024-02-27 02:20:46'),(30,'CGipmgaGl7gljbulTZjzZx6M4OrLiaMgUDJ1dgWX',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 02:22:44','2024-02-27 02:22:44'),(31,'iAJLyu36LYBjUGtRoD3pLSHpFv8PbbVTJTNdhsfV',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:23:04','2024-02-27 02:23:04'),(32,'3P8rJkNSXu5LjPlXw1T4jpV8oBDithM7qwvRDVJE',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:23:49','2024-02-27 02:23:49'),(33,'Siwu9HT6aTppn4jPCsvJgpg64Nqcq0PERx5TYpGg',2,'Content Management','CourseModule Data created successfully','POST api/institutes/admin/content-management/course-modules/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-modules/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 02:53:15','2024-02-27 02:53:15'),(34,'0zAD0tyoo61rwRGISVqmymhKcJWNCIkfNU6rGN2K',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:54:10','2024-02-27 02:54:10'),(35,'4XjtnqgEWC0MXTFp1AtntuRAsQLz0JnthfKS0VIb',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:54:20','2024-02-27 02:54:20'),(36,'BD675MYJ6ONCDHDCTP3JqIRjxBoMEck4NweuVELn',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:55:18','2024-02-27 02:55:18'),(37,'IJCTwBE7jq6czTZRFP7sbGBzaGg5SK7xFsFaYRVz',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:55:24','2024-02-27 02:55:24'),(38,'pNdyX4EPOgYZxZjU7mzVVnXyFHotLku1WXf9lBxN',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 02:56:07','2024-02-27 02:56:07'),(39,'shoxYj4l1RUZcrW5DzcFcdBtilzYOelund7mlA3C',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 03:23:46','2024-02-27 03:23:46'),(40,'8bsLrvSrFyzb5LvmDhSKntkeyXHM7IeXe8IB22FC',2,'Staff Management','TeachingStaff Data created successfully','POST api/institutes/admin/staff-management/staff/create','{\"name\": \"Quiz\", \"email\": null}','Success',5,'http://127.0.0.1:8000/api/institutes/admin/staff-management/staff/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 04:43:18','2024-02-27 04:43:18'),(41,'isAY7lmbRuN746e0h1JFIcrXHiI6LgZxGIuhA0in',2,'Staff Management','TeachingStaff Data created successfully','POST api/institutes/admin/staff-management/staff/create','{\"name\": \"Quiz\", \"email\": null}','Success',4,'http://127.0.0.1:8000/api/institutes/admin/staff-management/staff/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-27 04:44:43','2024-02-27 04:44:43'),(42,'f0mOB8DbaCtv9LKucmwMXwRDFPv0sorMlevzY2bO',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-study-materials/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-study-materials/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 05:24:35','2024-02-27 05:24:35'),(43,'QwSCDc5up4vSwTGuz9Doi0gj3tI6Rliafqaab9CN',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-notes/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-notes/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 05:24:38','2024-02-27 05:24:38'),(44,'ow6sGw2PNhoIhrjNiDa81tko61Ybr5hiWiIRRqAx',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-study-materials/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-study-materials/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 05:24:52','2024-02-27 05:24:52'),(45,'6HMQDwcVN2EOkveTq4VBaGQgYy5E1GkhbR0lGFUd',2,'Student Management','Student Data created successfully','POST api/institutes/admin/student-management/students/create','{\"name\": \"Quiz\", \"email\": null}','Success',4,'http://127.0.0.1:8000/api/institutes/admin/student-management/students/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-27 09:03:13','2024-02-27 09:03:13'),(46,'brStgWD3yHPXdo4s2rhq3SCDsoef8HSidVXCyhTh',2,'Batch Management','Batch Data created successfully','POST api/institutes/admin/batch-management/institute-batches/create','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/batch-management/institute-batches/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',NULL,'2024-02-28 00:07:19','2024-02-28 00:07:19'),(47,'7xJZghmdnSaLIFdMfReXPtKyYfoh64smElBKhMoy',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-study-materials/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-study-materials/read?branch_id=BRANCH0000000004','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-28 00:21:01','2024-02-28 00:21:01'),(48,'vzmJxNuMOqdp9Oiy5uLRckxgPFyXVR9beEvLLoGn',2,'Staff Management','TeachingStaff Data created successfully','POST api/institutes/admin/staff-management/staff/create','{\"name\": \"Quiz\", \"email\": null}','Success',5,'http://127.0.0.1:8000/api/institutes/admin/staff-management/staff/create','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-28 00:23:38','2024-02-28 00:23:38'),(49,'HZMciHNFoteFI6FjXeaB2VFVSnYtM6qnSCRz4dUG',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-28 00:24:52','2024-02-28 00:24:52'),(50,'9cJOAu3fYyyJwjxd4PXYv03FX7vQpEqXjuVm7Ioj',2,'Content Management','CourseNotes Data updated successfully','GET api/institutes/admin/content-management/course-study-materials/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/content-management/course-study-materials/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-28 00:25:02','2024-02-28 00:25:02'),(51,'RECcx7cwQG5QLzYm3TQ3DLF4yOeRUbcA82jKnMxR',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-28 00:26:21','2024-02-28 00:26:21'),(52,'eP0yoPDUVz8nAorZOhOfmptMxGvHak7xVAG5KafQ',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://127.0.0.1:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"127.0.0.1\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-28 00:26:36','2024-02-28 00:26:36'),(53,'9vEU7euqhKTtWAAdNC6GAM98AiGpWqbIy6JrAlHA',2,'Course Management','InstituteCourseCategory Data updated successfully','GET api/institutes/admin/course-management/institute-courses/read','{\"name\": \"Quiz\", \"email\": null}','Success',0,'http://192.168.29.200:8000/api/institutes/admin/course-management/institute-courses/read?branch_id=BRANCH00000000001','{\"ip\": \"192.168.29.200\", \"user_agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36\"}','192.168.29.200','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',NULL,'2024-02-28 00:44:31','2024-02-28 00:44:31');
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `discount_rate` double(10,2) NOT NULL,
  `discount_type` enum('price','percentage') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percentage',
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculties`
--

LOCK TABLES `faculties` WRITE;
/*!40000 ALTER TABLE `faculties` DISABLE KEYS */;
/*!40000 ALTER TABLE `faculties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inst_branch_staff_id_cards`
--

DROP TABLE IF EXISTS `inst_branch_staff_id_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inst_branch_staff_id_cards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `inst_branch_staff_idcard_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inst_branch_staff_id_cards_branch_id_foreign` (`branch_id`),
  KEY `inst_branch_staff_id_cards_inst_branch_staff_idcard_id_foreign` (`inst_branch_staff_idcard_id`),
  CONSTRAINT `inst_branch_staff_id_cards_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `inst_branch_staff_id_cards_inst_branch_staff_idcard_id_foreign` FOREIGN KEY (`inst_branch_staff_idcard_id`) REFERENCES `institute_staff_id_cards` (`staff_id_card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inst_branch_staff_id_cards`
--

LOCK TABLES `inst_branch_staff_id_cards` WRITE;
/*!40000 ALTER TABLE `inst_branch_staff_id_cards` DISABLE KEYS */;
INSERT INTO `inst_branch_staff_id_cards` VALUES (1,'STAFF_CARD_ID00000000001','BRANCH00000000001','2024-02-27 04:43:15','2024-02-27 04:43:15'),(2,'STAFF_CARD_ID0000000002','BRANCH00000000001','2024-02-27 04:44:40','2024-02-27 04:44:40'),(3,'STAFF_CARD_ID0000000003','BRANCH00000000001','2024-02-27 05:13:06','2024-02-27 05:13:06'),(4,'STAFF_CARD_ID0000000004','BRANCH00000000001','2024-02-28 00:23:35','2024-02-28 00:23:35');
/*!40000 ALTER TABLE `inst_branch_staff_id_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_activity_logs`
--

DROP TABLE IF EXISTS `institute_activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_activity_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_details` json NOT NULL,
  `result` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_info` json DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additional_context` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_activity_logs`
--

LOCK TABLES `institute_activity_logs` WRITE;
/*!40000 ALTER TABLE `institute_activity_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_batch_classes`
--

DROP TABLE IF EXISTS `institute_batch_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_batch_classes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_batch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_class_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_batch_classes_institute_batch_id_foreign` (`institute_batch_id`),
  KEY `institute_batch_classes_institute_class_id_foreign` (`institute_class_id`),
  CONSTRAINT `institute_batch_classes_institute_batch_id_foreign` FOREIGN KEY (`institute_batch_id`) REFERENCES `institute_batches` (`batch_id`),
  CONSTRAINT `institute_batch_classes_institute_class_id_foreign` FOREIGN KEY (`institute_class_id`) REFERENCES `institute_classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_batch_classes`
--

LOCK TABLES `institute_batch_classes` WRITE;
/*!40000 ALTER TABLE `institute_batch_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_batch_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_batch_communities`
--

DROP TABLE IF EXISTS `institute_batch_communities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_batch_communities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_batch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_branch_comm_id` bigint unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_batch_communities_institute_batch_id_foreign` (`institute_batch_id`),
  KEY `institute_batch_communities_institute_branch_comm_id_foreign` (`institute_branch_comm_id`),
  CONSTRAINT `institute_batch_communities_institute_batch_id_foreign` FOREIGN KEY (`institute_batch_id`) REFERENCES `institute_batches` (`batch_id`),
  CONSTRAINT `institute_batch_communities_institute_branch_comm_id_foreign` FOREIGN KEY (`institute_branch_comm_id`) REFERENCES `institute_branch_communities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_batch_communities`
--

LOCK TABLES `institute_batch_communities` WRITE;
/*!40000 ALTER TABLE `institute_batch_communities` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_batch_communities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_batch_students`
--

DROP TABLE IF EXISTS `institute_batch_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_batch_students` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_batch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_batch_students_institute_batch_id_foreign` (`institute_batch_id`),
  KEY `institute_batch_students_student_id_foreign` (`student_id`),
  CONSTRAINT `institute_batch_students_institute_batch_id_foreign` FOREIGN KEY (`institute_batch_id`) REFERENCES `institute_batches` (`batch_id`),
  CONSTRAINT `institute_batch_students_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_batch_students`
--

LOCK TABLES `institute_batch_students` WRITE;
/*!40000 ALTER TABLE `institute_batch_students` DISABLE KEYS */;
INSERT INTO `institute_batch_students` VALUES (1,'STU00000000001','BATCH00000000001','2024-02-28 00:07:19','2024-02-28 00:07:19');
/*!40000 ALTER TABLE `institute_batch_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_batches`
--

DROP TABLE IF EXISTS `institute_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_batches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_batches_batch_id_unique` (`batch_id`),
  KEY `institute_batches_institute_id_foreign` (`institute_id`),
  KEY `institute_batches_branch_id_foreign` (`branch_id`),
  KEY `institute_batches_course_id_foreign` (`course_id`),
  CONSTRAINT `institute_batches_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_batches_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `institute_courses` (`course_id`),
  CONSTRAINT `institute_batches_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_batches`
--

LOCK TABLES `institute_batches` WRITE;
/*!40000 ALTER TABLE `institute_batches` DISABLE KEYS */;
INSERT INTO `institute_batches` VALUES (1,'fvgfv','BATCH00000000001','2024-02-01','2024-02-28','INS00000000001','BRANCH00000000001','COU00000000001','0','1','2024-02-28 00:07:19','2024-02-28 00:07:19');
/*!40000 ALTER TABLE `institute_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_batches`
--

DROP TABLE IF EXISTS `institute_branch_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_batches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `batch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_batches_batch_id_foreign` (`batch_id`),
  KEY `institute_branch_batches_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_batches_batch_id_foreign` FOREIGN KEY (`batch_id`) REFERENCES `institute_batches` (`batch_id`),
  CONSTRAINT `institute_branch_batches_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_batches`
--

LOCK TABLES `institute_branch_batches` WRITE;
/*!40000 ALTER TABLE `institute_branch_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_classes`
--

DROP TABLE IF EXISTS `institute_branch_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_classes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_class_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_classes_institute_class_id_foreign` (`institute_class_id`),
  KEY `institute_branch_classes_institute_branch_id_foreign` (`institute_branch_id`),
  CONSTRAINT `institute_branch_classes_institute_branch_id_foreign` FOREIGN KEY (`institute_branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_classes_institute_class_id_foreign` FOREIGN KEY (`institute_class_id`) REFERENCES `institute_classes` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_classes`
--

LOCK TABLES `institute_branch_classes` WRITE;
/*!40000 ALTER TABLE `institute_branch_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_communities`
--

DROP TABLE IF EXISTS `institute_branch_communities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_communities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_community_id` bigint unsigned NOT NULL,
  `institute_branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_communities_institute_branch_id_foreign` (`institute_branch_id`),
  KEY `institute_branch_communities_institute_community_id_foreign` (`institute_community_id`),
  CONSTRAINT `institute_branch_communities_institute_branch_id_foreign` FOREIGN KEY (`institute_branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_communities_institute_community_id_foreign` FOREIGN KEY (`institute_community_id`) REFERENCES `institute_communities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_communities`
--

LOCK TABLES `institute_branch_communities` WRITE;
/*!40000 ALTER TABLE `institute_branch_communities` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_communities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_course_categories`
--

DROP TABLE IF EXISTS `institute_branch_course_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_course_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_category_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_course_categories_branch_id_foreign` (`branch_id`),
  KEY `institute_branch_course_categories_institute_category_id_foreign` (`institute_category_id`),
  CONSTRAINT `institute_branch_course_categories_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_course_categories_institute_category_id_foreign` FOREIGN KEY (`institute_category_id`) REFERENCES `institute_course_categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_course_categories`
--

LOCK TABLES `institute_branch_course_categories` WRITE;
/*!40000 ALTER TABLE `institute_branch_course_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_course_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_course_modules`
--

DROP TABLE IF EXISTS `institute_branch_course_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_course_modules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `course_module_id` bigint unsigned NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_course_modules_course_module_id_foreign` (`course_module_id`),
  KEY `institute_branch_course_modules_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_course_modules_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_course_modules_course_module_id_foreign` FOREIGN KEY (`course_module_id`) REFERENCES `institute_course_modules` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_course_modules`
--

LOCK TABLES `institute_branch_course_modules` WRITE;
/*!40000 ALTER TABLE `institute_branch_course_modules` DISABLE KEYS */;
INSERT INTO `institute_branch_course_modules` VALUES (1,7,'BRANCH00000000001','2024-02-27 02:53:15','2024-02-27 02:53:15');
/*!40000 ALTER TABLE `institute_branch_course_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_courses`
--

DROP TABLE IF EXISTS `institute_branch_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_courses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_duration` bigint unsigned NOT NULL DEFAULT '12',
  `course_price` decimal(8,2) NOT NULL,
  `learning_format` enum('online','offline','hybrid') COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_overview` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `template` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `syllabus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_courses_branch_id_foreign` (`branch_id`),
  KEY `institute_branch_courses_course_id_foreign` (`course_id`),
  CONSTRAINT `institute_branch_courses_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_courses_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `institute_courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_courses`
--

LOCK TABLES `institute_branch_courses` WRITE;
/*!40000 ALTER TABLE `institute_branch_courses` DISABLE KEYS */;
INSERT INTO `institute_branch_courses` VALUES (1,'BRANCH00000000001','COU00000000001','React Web Development',160,50000.00,'online','vdfvfdv','vfgfvbgbb','','','','0','0','2024-02-26 11:43:39','2024-02-26 11:43:39'),(2,'BRANCH0000000002','COU00000000001','React Web Development',160,50000.00,'online','vdfvfdv','vfgfvbgbb','','','','0','0','2024-02-26 11:43:39','2024-02-26 11:43:39'),(3,'BRANCH0000000003','COU00000000001','React Web Development',160,50000.00,'online','vdfvfdv','vfgfvbgbb','','','','0','0','2024-02-26 11:43:39','2024-02-26 11:43:39'),(4,'BRANCH0000000004','COU00000000001','React Web Development',160,50000.00,'online','vdfvfdv','vfgfvbgbb','','','','0','0','2024-02-26 11:43:39','2024-02-26 11:43:39'),(5,'BRANCH00000000001','COU0000000002','React Native App Development',160,70000.00,'online','This is simple intro','LMS - Institution Admin Software','','','','0','0','2024-02-27 00:32:20','2024-02-27 00:32:20'),(6,'BRANCH0000000002','COU0000000002','React Native App Development',160,70000.00,'online','This is simple intro','LMS - Institution Admin Software','','','','0','0','2024-02-27 00:32:20','2024-02-27 00:32:20'),(7,'BRANCH0000000003','COU0000000002','React Native App Development',160,70000.00,'online','This is simple intro','LMS - Institution Admin Software','','','','0','0','2024-02-27 00:32:20','2024-02-27 00:32:20'),(8,'BRANCH0000000004','COU0000000002','React Native App Development',160,70000.00,'online','This is simple intro','LMS - Institution Admin Software','','','','0','0','2024-02-27 00:32:20','2024-02-27 00:32:20');
/*!40000 ALTER TABLE `institute_branch_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_notes`
--

DROP TABLE IF EXISTS `institute_branch_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_notes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `note_id` bigint unsigned NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_notes_note_id_foreign` (`note_id`),
  KEY `institute_branch_notes_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_notes_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_notes_note_id_foreign` FOREIGN KEY (`note_id`) REFERENCES `institute_course_notes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_notes`
--

LOCK TABLES `institute_branch_notes` WRITE;
/*!40000 ALTER TABLE `institute_branch_notes` DISABLE KEYS */;
INSERT INTO `institute_branch_notes` VALUES (1,1,'BRANCH00000000001','2024-02-27 02:20:46','2024-02-27 02:20:46');
/*!40000 ALTER TABLE `institute_branch_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_notification`
--

DROP TABLE IF EXISTS `institute_branch_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_notification` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `notification_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_notification_notification_id_foreign` (`notification_id`),
  KEY `institute_branch_notification_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_notification_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_notification_notification_id_foreign` FOREIGN KEY (`notification_id`) REFERENCES `institute_notifications` (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_notification`
--

LOCK TABLES `institute_branch_notification` WRITE;
/*!40000 ALTER TABLE `institute_branch_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_staff_salaries`
--

DROP TABLE IF EXISTS `institute_branch_staff_salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_staff_salaries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `staff_salary_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_staff_salaries_staff_salary_id_foreign` (`staff_salary_id`),
  KEY `institute_branch_staff_salaries_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_staff_salaries_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_staff_salaries_staff_salary_id_foreign` FOREIGN KEY (`staff_salary_id`) REFERENCES `institute_staff_salaries` (`salary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_staff_salaries`
--

LOCK TABLES `institute_branch_staff_salaries` WRITE;
/*!40000 ALTER TABLE `institute_branch_staff_salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_staff_salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_staff_tickets`
--

DROP TABLE IF EXISTS `institute_branch_staff_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_staff_tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `staff_ticket_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_staff_tickets_staff_ticket_id_foreign` (`staff_ticket_id`),
  KEY `institute_branch_staff_tickets_institute_branch_id_foreign` (`institute_branch_id`),
  CONSTRAINT `institute_branch_staff_tickets_institute_branch_id_foreign` FOREIGN KEY (`institute_branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_staff_tickets_staff_ticket_id_foreign` FOREIGN KEY (`staff_ticket_id`) REFERENCES `institute_staff_tickets` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_staff_tickets`
--

LOCK TABLES `institute_branch_staff_tickets` WRITE;
/*!40000 ALTER TABLE `institute_branch_staff_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_staff_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_staffs`
--

DROP TABLE IF EXISTS `institute_branch_staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_staffs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_staffs_staff_id_foreign` (`staff_id`),
  KEY `institute_branch_staffs_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_staffs_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_staffs_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_staffs`
--

LOCK TABLES `institute_branch_staffs` WRITE;
/*!40000 ALTER TABLE `institute_branch_staffs` DISABLE KEYS */;
INSERT INTO `institute_branch_staffs` VALUES (1,'STAFF00000000001','BRANCH00000000001','2024-02-27 04:43:15','2024-02-27 04:43:15'),(2,'STAFF0000000002','BRANCH00000000001','2024-02-27 04:44:40','2024-02-27 04:44:40'),(3,'STAFF0000000003','BRANCH00000000001','2024-02-27 05:13:06','2024-02-27 05:13:06'),(4,'STAFF0000000004','BRANCH00000000001','2024-02-28 00:23:35','2024-02-28 00:23:35');
/*!40000 ALTER TABLE `institute_branch_staffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_std_certificate`
--

DROP TABLE IF EXISTS `institute_branch_std_certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_std_certificate` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_certificate_id` bigint unsigned NOT NULL,
  `institute_branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_std_certificate_institute_branch_id_foreign` (`institute_branch_id`),
  KEY `institute_branch_std_certificate_student_certificate_id_foreign` (`student_certificate_id`),
  CONSTRAINT `institute_branch_std_certificate_institute_branch_id_foreign` FOREIGN KEY (`institute_branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_std_certificate_student_certificate_id_foreign` FOREIGN KEY (`student_certificate_id`) REFERENCES `institute_student_certificates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_std_certificate`
--

LOCK TABLES `institute_branch_std_certificate` WRITE;
/*!40000 ALTER TABLE `institute_branch_std_certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_std_certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_std_fee_refunds`
--

DROP TABLE IF EXISTS `institute_branch_std_fee_refunds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_std_fee_refunds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_fee_refund_id` bigint unsigned NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_std_fee_refunds_student_fee_refund_id_foreign` (`student_fee_refund_id`),
  KEY `institute_branch_std_fee_refunds_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_std_fee_refunds_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_std_fee_refunds_student_fee_refund_id_foreign` FOREIGN KEY (`student_fee_refund_id`) REFERENCES `institute_student_fee_refunds` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_std_fee_refunds`
--

LOCK TABLES `institute_branch_std_fee_refunds` WRITE;
/*!40000 ALTER TABLE `institute_branch_std_fee_refunds` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_std_fee_refunds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_std_id_card`
--

DROP TABLE IF EXISTS `institute_branch_std_id_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_std_id_card` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `inst_std_id_card_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_std_id_card_branch_id_foreign` (`branch_id`),
  KEY `institute_branch_std_id_card_inst_std_id_card_id_foreign` (`inst_std_id_card_id`),
  CONSTRAINT `institute_branch_std_id_card_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_std_id_card_inst_std_id_card_id_foreign` FOREIGN KEY (`inst_std_id_card_id`) REFERENCES `institute_student_id_cards` (`stu_card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_std_id_card`
--

LOCK TABLES `institute_branch_std_id_card` WRITE;
/*!40000 ALTER TABLE `institute_branch_std_id_card` DISABLE KEYS */;
INSERT INTO `institute_branch_std_id_card` VALUES (1,'STUID00000000001','BRANCH00000000001','2024-02-27 09:03:09','2024-02-27 09:03:09');
/*!40000 ALTER TABLE `institute_branch_std_id_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_student_fees`
--

DROP TABLE IF EXISTS `institute_branch_student_fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_student_fees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_fee_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_student_fees_student_fee_id_foreign` (`student_fee_id`),
  KEY `institute_branch_student_fees_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_student_fees_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_student_fees_student_fee_id_foreign` FOREIGN KEY (`student_fee_id`) REFERENCES `institute_student_fees` (`fee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_student_fees`
--

LOCK TABLES `institute_branch_student_fees` WRITE;
/*!40000 ALTER TABLE `institute_branch_student_fees` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_student_fees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_student_tickets`
--

DROP TABLE IF EXISTS `institute_branch_student_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_student_tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_ticket_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_student_tickets_student_ticket_id_foreign` (`student_ticket_id`),
  KEY `institute_branch_student_tickets_institute_branch_id_foreign` (`institute_branch_id`),
  CONSTRAINT `institute_branch_student_tickets_institute_branch_id_foreign` FOREIGN KEY (`institute_branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_student_tickets_student_ticket_id_foreign` FOREIGN KEY (`student_ticket_id`) REFERENCES `institute_student_tickets` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_student_tickets`
--

LOCK TABLES `institute_branch_student_tickets` WRITE;
/*!40000 ALTER TABLE `institute_branch_student_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_branch_student_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_students`
--

DROP TABLE IF EXISTS `institute_branch_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_students` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_students_student_id_foreign` (`student_id`),
  KEY `institute_branch_students_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_students_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_students_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_students`
--

LOCK TABLES `institute_branch_students` WRITE;
/*!40000 ALTER TABLE `institute_branch_students` DISABLE KEYS */;
INSERT INTO `institute_branch_students` VALUES (1,'STU00000000001','BRANCH00000000001','2024-02-27 09:03:09','2024-02-27 09:03:09');
/*!40000 ALTER TABLE `institute_branch_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_study_materials`
--

DROP TABLE IF EXISTS `institute_branch_study_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_study_materials` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `study_material_id` bigint unsigned NOT NULL,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_study_materials_study_material_id_foreign` (`study_material_id`),
  KEY `institute_branch_study_materials_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_study_materials_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_study_materials_study_material_id_foreign` FOREIGN KEY (`study_material_id`) REFERENCES `institute_course_study_materials` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_study_materials`
--

LOCK TABLES `institute_branch_study_materials` WRITE;
/*!40000 ALTER TABLE `institute_branch_study_materials` DISABLE KEYS */;
INSERT INTO `institute_branch_study_materials` VALUES (1,1,'BRANCH00000000001','2024-02-27 02:04:24','2024-02-27 02:04:24'),(2,2,'BRANCH00000000001','2024-02-27 02:12:08','2024-02-27 02:12:08');
/*!40000 ALTER TABLE `institute_branch_study_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branch_users`
--

DROP TABLE IF EXISTS `institute_branch_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branch_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_branch_users_institute_user_id_foreign` (`institute_user_id`),
  KEY `institute_branch_users_branch_id_foreign` (`branch_id`),
  CONSTRAINT `institute_branch_users_branch_id_foreign` FOREIGN KEY (`branch_id`) REFERENCES `institute_branches` (`branch_id`),
  CONSTRAINT `institute_branch_users_institute_user_id_foreign` FOREIGN KEY (`institute_user_id`) REFERENCES `institute_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branch_users`
--

LOCK TABLES `institute_branch_users` WRITE;
/*!40000 ALTER TABLE `institute_branch_users` DISABLE KEYS */;
INSERT INTO `institute_branch_users` VALUES (1,'BRANCH0000000004',2,'2024-02-26 10:45:37','2024-02-26 10:45:37'),(2,'BRANCH0000000003',2,'2024-02-26 10:45:37','2024-02-26 10:45:37'),(3,'BRANCH0000000002',2,'2024-02-26 10:45:37','2024-02-26 10:45:37'),(4,'BRANCH00000000001',2,'2024-02-26 10:45:37','2024-02-26 10:45:37'),(5,'BRANCH0000000004',3,'2024-02-26 10:46:48','2024-02-26 10:46:48'),(6,'BRANCH0000000003',3,'2024-02-26 10:46:48','2024-02-26 10:46:48'),(7,'BRANCH0000000002',3,'2024-02-26 10:46:48','2024-02-26 10:46:48'),(8,'BRANCH00000000001',3,'2024-02-26 10:46:48','2024-02-26 10:46:48'),(9,'BRANCH0000000004',4,'2024-02-26 10:47:39','2024-02-26 10:47:39'),(10,'BRANCH0000000003',4,'2024-02-26 10:47:39','2024-02-26 10:47:39'),(11,'BRANCH0000000002',4,'2024-02-26 10:47:39','2024-02-26 10:47:39'),(12,'BRANCH00000000001',4,'2024-02-26 10:47:39','2024-02-26 10:47:39'),(13,'BRANCH0000000004',5,'2024-02-26 10:50:02','2024-02-26 10:50:02'),(14,'BRANCH00000000001',5,'2024-02-26 10:50:02','2024-02-26 10:50:02'),(15,'BRANCH00000000001',6,'2024-02-26 10:51:06','2024-02-26 10:51:06');
/*!40000 ALTER TABLE `institute_branch_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_branches`
--

DROP TABLE IF EXISTS `institute_branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_branches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alternate_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landmark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_branches_branch_id_unique` (`branch_id`),
  KEY `institute_branches_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_branches_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_branches`
--

LOCK TABLES `institute_branches` WRITE;
/*!40000 ALTER TABLE `institute_branches` DISABLE KEYS */;
INSERT INTO `institute_branches` VALUES (1,'BRANCH00000000001','INS00000000001','Chennai','90754872988','890239875','velachery. No.8, 11th Main road, Vijaya nagar.','Chennai','TamilNadu','600042','Near Mosque','0','1',NULL,'2024-02-26 10:28:50','2024-02-26 10:33:43'),(2,'BRANCH0000000002','INS00000000001','KanyaKumari','8987887876','8798779878','No 34/78, Kanyakumari High road,','Kanyakumari','TamilNadu','614678','Near Tea shop','0','1',NULL,'2024-02-26 10:33:18','2024-02-26 10:35:11'),(3,'BRANCH0000000003','INS00000000001','Madhurai','8989878679','9878675647','No 567/789, Madhurai Main Road, Madhurai','Madhurai','TamilNadu','678578','Near Police stattion','0','1',NULL,'2024-02-26 10:35:00','2024-02-26 10:35:00'),(4,'BRANCH0000000004','INS00000000001','Trichy','8978989098','6567678789','No 56/78, Trichy kumbakonam road','Trichy','TamilNadu','678987','Near Bus Stop','0','1',NULL,'2024-02-26 10:36:31','2024-02-26 10:36:31');
/*!40000 ALTER TABLE `institute_branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_class_staff`
--

DROP TABLE IF EXISTS `institute_class_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_class_staff` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_class_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('instructor','coordinator') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_class_staff_institute_class_id_foreign` (`institute_class_id`),
  KEY `institute_class_staff_institute_staff_id_foreign` (`institute_staff_id`),
  KEY `institute_class_staff_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_class_staff_institute_class_id_foreign` FOREIGN KEY (`institute_class_id`) REFERENCES `institute_classes` (`class_id`),
  CONSTRAINT `institute_class_staff_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_class_staff_institute_staff_id_foreign` FOREIGN KEY (`institute_staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_class_staff`
--

LOCK TABLES `institute_class_staff` WRITE;
/*!40000 ALTER TABLE `institute_class_staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_class_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_classes`
--

DROP TABLE IF EXISTS `institute_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_classes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `class_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `class_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `class_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_date` date DEFAULT NULL,
  `start_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('offline','live') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('completed','pending','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_classes_class_id_unique` (`class_id`),
  KEY `institute_classes_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_classes_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_classes`
--

LOCK TABLES `institute_classes` WRITE;
/*!40000 ALTER TABLE `institute_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_communities`
--

DROP TABLE IF EXISTS `institute_communities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_communities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_communities_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_communities_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_communities`
--

LOCK TABLES `institute_communities` WRITE;
/*!40000 ALTER TABLE `institute_communities` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_communities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_community_messages`
--

DROP TABLE IF EXISTS `institute_community_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_community_messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_send` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_community_messages_user_id_unique` (`user_id`),
  CONSTRAINT `institute_community_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_community_messages`
--

LOCK TABLES `institute_community_messages` WRITE;
/*!40000 ALTER TABLE `institute_community_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_community_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_course_categories`
--

DROP TABLE IF EXISTS `institute_course_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_course_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_course_categories_category_id_unique` (`category_id`),
  KEY `institute_course_categories_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_course_categories_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_course_categories`
--

LOCK TABLES `institute_course_categories` WRITE;
/*!40000 ALTER TABLE `institute_course_categories` DISABLE KEYS */;
INSERT INTO `institute_course_categories` VALUES (1,'Andoid Development','CATE00000000001','','INS00000000001','0','1','2024-02-26 10:53:11','2024-02-26 10:53:11'),(2,'Web Development','CATE0000000002','','INS00000000001','0','1','2024-02-26 10:53:33','2024-02-26 10:53:33'),(3,'IOS Development','CATE0000000003','','INS00000000001','0','1','2024-02-26 10:54:03','2024-02-26 10:54:03'),(4,'FullStack Development','CATE0000000004','','INS00000000001','0','1','2024-02-26 10:54:21','2024-02-26 10:54:21'),(5,'FrontEnd Development','CATE0000000005','','INS00000000001','0','1','2024-02-26 10:54:41','2024-02-26 10:54:41'),(6,'BackEnd Development','CATE0000000006','','INS00000000001','0','1','2024-02-26 10:55:00','2024-02-26 10:55:00');
/*!40000 ALTER TABLE `institute_course_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_course_modules`
--

DROP TABLE IF EXISTS `institute_course_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_course_modules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` json NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_course_modules_course_id_foreign` (`course_id`),
  CONSTRAINT `institute_course_modules_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `institute_courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_course_modules`
--

LOCK TABLES `institute_course_modules` WRITE;
/*!40000 ALTER TABLE `institute_course_modules` DISABLE KEYS */;
INSERT INTO `institute_course_modules` VALUES (7,'React Mastery: Building Dynamic Web Applications','\"Unlock the full potential of React.js with this comprehensive course designed to take you from a beginner to an advanced level. Whether you\'re new to web development or looking to enhance your skills, this course will provide you with hands-on experience and practical knowledge to build dynamic and responsive web applications.\"','COU00000000001',NULL,'https://youtu.be/CgkZ7MvWUAA?si=cGjhHhMyAQNSkJsX','0','0','2024-02-27 02:53:15','2024-02-27 02:53:15');
/*!40000 ALTER TABLE `institute_course_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_course_notes`
--

DROP TABLE IF EXISTS `institute_course_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_course_notes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_course_notes_course_id_foreign` (`course_id`),
  CONSTRAINT `institute_course_notes_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `institute_courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_course_notes`
--

LOCK TABLES `institute_course_notes` WRITE;
/*!40000 ALTER TABLE `institute_course_notes` DISABLE KEYS */;
INSERT INTO `institute_course_notes` VALUES (1,'React Course Notes','React Course Notes','COU00000000001','','0','0','2024-02-27 02:20:46','2024-02-27 02:20:46');
/*!40000 ALTER TABLE `institute_course_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_course_study_materials`
--

DROP TABLE IF EXISTS `institute_course_study_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_course_study_materials` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_course_study_materials_course_id_foreign` (`course_id`),
  CONSTRAINT `institute_course_study_materials_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `institute_courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_course_study_materials`
--

LOCK TABLES `institute_course_study_materials` WRITE;
/*!40000 ALTER TABLE `institute_course_study_materials` DISABLE KEYS */;
INSERT INTO `institute_course_study_materials` VALUES (1,'React Course Study Material','React Course Study Material','COU00000000001','','0','0','2024-02-27 02:04:24','2024-02-27 02:04:24'),(2,'React Native Study Material','React Native Study Material','COU0000000002','','0','0','2024-02-27 02:12:08','2024-02-27 02:12:08');
/*!40000 ALTER TABLE `institute_course_study_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_courses`
--

DROP TABLE IF EXISTS `institute_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_courses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_category_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_courses_course_id_unique` (`course_id`),
  KEY `institute_courses_institute_id_foreign` (`institute_id`),
  KEY `institute_courses_institute_category_id_foreign` (`institute_category_id`),
  CONSTRAINT `institute_courses_institute_category_id_foreign` FOREIGN KEY (`institute_category_id`) REFERENCES `institute_course_categories` (`category_id`),
  CONSTRAINT `institute_courses_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_courses`
--

LOCK TABLES `institute_courses` WRITE;
/*!40000 ALTER TABLE `institute_courses` DISABLE KEYS */;
INSERT INTO `institute_courses` VALUES (3,'CATE0000000002','INS00000000001','COU00000000001','0','0','2024-02-26 11:43:39','2024-02-26 11:43:39'),(4,'CATE00000000001','INS00000000001','COU0000000002','0','0','2024-02-27 00:32:20','2024-02-27 00:32:20');
/*!40000 ALTER TABLE `institute_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_documents`
--

DROP TABLE IF EXISTS `institute_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_documents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_documents_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_documents_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_documents`
--

LOCK TABLES `institute_documents` WRITE;
/*!40000 ALTER TABLE `institute_documents` DISABLE KEYS */;
INSERT INTO `institute_documents` VALUES (1,'Template','','INS00000000001','no','2024-02-26 10:28:50','2024-02-26 10:28:50');
/*!40000 ALTER TABLE `institute_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_faq_modules`
--

DROP TABLE IF EXISTS `institute_faq_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_faq_modules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `faq_module_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_faq_modules_faq_module_id_unique` (`faq_module_id`),
  KEY `institute_faq_modules_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_faq_modules_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_faq_modules`
--

LOCK TABLES `institute_faq_modules` WRITE;
/*!40000 ALTER TABLE `institute_faq_modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_faq_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_faqs`
--

DROP TABLE IF EXISTS `institute_faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_faqs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_faq_module_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_faqs_institute_faq_module_id_foreign` (`institute_faq_module_id`),
  CONSTRAINT `institute_faqs_institute_faq_module_id_foreign` FOREIGN KEY (`institute_faq_module_id`) REFERENCES `institute_faq_modules` (`faq_module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_faqs`
--

LOCK TABLES `institute_faqs` WRITE;
/*!40000 ALTER TABLE `institute_faqs` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_notifications`
--

DROP TABLE IF EXISTS `institute_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `notification_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','send') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_notifications_notification_id_unique` (`notification_id`),
  KEY `institute_notifications_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_notifications_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_notifications`
--

LOCK TABLES `institute_notifications` WRITE;
/*!40000 ALTER TABLE `institute_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_permissions`
--

DROP TABLE IF EXISTS `institute_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `screen` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_permissions`
--

LOCK TABLES `institute_permissions` WRITE;
/*!40000 ALTER TABLE `institute_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_role_groups`
--

DROP TABLE IF EXISTS `institute_role_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_role_groups` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_role_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_role_groups_institute_role_id_foreign` (`institute_role_id`),
  KEY `institute_role_groups_user_id_foreign` (`user_id`),
  CONSTRAINT `institute_role_groups_institute_role_id_foreign` FOREIGN KEY (`institute_role_id`) REFERENCES `institute_roles` (`id`),
  CONSTRAINT `institute_role_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_role_groups`
--

LOCK TABLES `institute_role_groups` WRITE;
/*!40000 ALTER TABLE `institute_role_groups` DISABLE KEYS */;
INSERT INTO `institute_role_groups` VALUES (1,1,3,'0','2024-02-26 10:45:37','2024-02-26 10:45:37'),(2,2,4,'0','2024-02-26 10:46:48','2024-02-26 10:46:48'),(3,3,5,'0','2024-02-26 10:47:39','2024-02-26 10:47:39'),(4,4,6,'0','2024-02-26 10:50:02','2024-02-26 10:50:02'),(5,5,7,'0','2024-02-26 10:51:06','2024-02-26 10:51:06');
/*!40000 ALTER TABLE `institute_role_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_role_permissions`
--

DROP TABLE IF EXISTS `institute_role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_role_permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_role_id` bigint unsigned NOT NULL,
  `institute_permission_id` bigint unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_role_permissions_institute_role_id_foreign` (`institute_role_id`),
  KEY `institute_role_permissions_institute_permission_id_foreign` (`institute_permission_id`),
  CONSTRAINT `institute_role_permissions_institute_permission_id_foreign` FOREIGN KEY (`institute_permission_id`) REFERENCES `institute_permissions` (`id`),
  CONSTRAINT `institute_role_permissions_institute_role_id_foreign` FOREIGN KEY (`institute_role_id`) REFERENCES `institute_roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_role_permissions`
--

LOCK TABLES `institute_role_permissions` WRITE;
/*!40000 ALTER TABLE `institute_role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_roles`
--

DROP TABLE IF EXISTS `institute_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_roles_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_roles_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_roles`
--

LOCK TABLES `institute_roles` WRITE;
/*!40000 ALTER TABLE `institute_roles` DISABLE KEYS */;
INSERT INTO `institute_roles` VALUES (1,'Administrator','INS00000000001','1',NULL,'2024-02-26 10:40:06','2024-02-26 10:40:06'),(2,'Maintainer','INS00000000001','1',NULL,'2024-02-26 10:40:25','2024-02-26 10:40:25'),(3,'Supervisor','INS00000000001','1',NULL,'2024-02-26 10:40:39','2024-02-26 10:40:39'),(4,'Manager','INS00000000001','1',NULL,'2024-02-26 10:41:10','2024-02-26 10:41:10'),(5,'Moderator','INS00000000001','1',NULL,'2024-02-26 10:41:56','2024-02-26 10:41:56'),(6,'Support','INS00000000001','1',NULL,'2024-02-26 10:42:19','2024-02-26 10:42:19'),(7,'Developer','INS00000000001','1',NULL,'2024-02-26 10:42:42','2024-02-26 10:42:42'),(8,'Member','INS00000000001','1',NULL,'2024-02-26 10:43:16','2024-02-26 10:43:16');
/*!40000 ALTER TABLE `institute_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_staff_attendances`
--

DROP TABLE IF EXISTS `institute_staff_attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_staff_attendances` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `attendance_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `status` enum('present','absent') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_staff_attendances_attendance_id_unique` (`attendance_id`),
  KEY `institute_staff_attendances_institute_staff_id_foreign` (`institute_staff_id`),
  KEY `institute_staff_attendances_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_staff_attendances_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_staff_attendances_institute_staff_id_foreign` FOREIGN KEY (`institute_staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_staff_attendances`
--

LOCK TABLES `institute_staff_attendances` WRITE;
/*!40000 ALTER TABLE `institute_staff_attendances` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_staff_attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_staff_courses`
--

DROP TABLE IF EXISTS `institute_staff_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_staff_courses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_staff_courses_course_id_foreign` (`course_id`),
  KEY `institute_staff_courses_staff_id_foreign` (`staff_id`),
  CONSTRAINT `institute_staff_courses_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `institute_courses` (`course_id`),
  CONSTRAINT `institute_staff_courses_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_staff_courses`
--

LOCK TABLES `institute_staff_courses` WRITE;
/*!40000 ALTER TABLE `institute_staff_courses` DISABLE KEYS */;
INSERT INTO `institute_staff_courses` VALUES (1,'STAFF00000000001','COU00000000001','2024-02-27 04:43:15','2024-02-27 04:43:15'),(2,'STAFF00000000001','COU0000000002','2024-02-27 04:43:15','2024-02-27 04:43:15'),(3,'STAFF0000000002','COU00000000001','2024-02-27 04:44:40','2024-02-27 04:44:40'),(4,'STAFF0000000002','COU0000000002','2024-02-27 04:44:40','2024-02-27 04:44:40'),(5,'STAFF0000000003','COU00000000001','2024-02-27 05:13:06','2024-02-27 05:13:06'),(6,'STAFF0000000003','COU0000000002','2024-02-27 05:13:06','2024-02-27 05:13:06'),(7,'STAFF0000000004','COU00000000001','2024-02-28 00:23:35','2024-02-28 00:23:35'),(8,'STAFF0000000004','COU0000000002','2024-02-28 00:23:35','2024-02-28 00:23:35');
/*!40000 ALTER TABLE `institute_staff_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_staff_id_cards`
--

DROP TABLE IF EXISTS `institute_staff_id_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_staff_id_cards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `staff_id_card_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_staff_id_cards_staff_id_card_id_unique` (`staff_id_card_id`),
  KEY `institute_staff_id_cards_institute_staff_id_foreign` (`institute_staff_id`),
  CONSTRAINT `institute_staff_id_cards_institute_staff_id_foreign` FOREIGN KEY (`institute_staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_staff_id_cards`
--

LOCK TABLES `institute_staff_id_cards` WRITE;
/*!40000 ALTER TABLE `institute_staff_id_cards` DISABLE KEYS */;
INSERT INTO `institute_staff_id_cards` VALUES (1,'STAFF_CARD_ID00000000001','STAFF00000000001','0','0','2024-02-27 04:43:15','2024-02-27 04:43:15'),(2,'STAFF_CARD_ID0000000002','STAFF0000000002','0','0','2024-02-27 04:44:40','2024-02-27 04:44:40'),(3,'STAFF_CARD_ID0000000003','STAFF0000000003','0','0','2024-02-27 05:13:06','2024-02-27 05:13:06'),(4,'STAFF_CARD_ID0000000004','STAFF0000000004','0','0','2024-02-28 00:23:35','2024-02-28 00:23:35');
/*!40000 ALTER TABLE `institute_staff_id_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_staff_notifications`
--

DROP TABLE IF EXISTS `institute_staff_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_staff_notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('read','unread') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_staff_notifications_staff_id_foreign` (`staff_id`),
  KEY `institute_staff_notifications_notification_id_foreign` (`notification_id`),
  CONSTRAINT `institute_staff_notifications_notification_id_foreign` FOREIGN KEY (`notification_id`) REFERENCES `institute_notifications` (`notification_id`),
  CONSTRAINT `institute_staff_notifications_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_staff_notifications`
--

LOCK TABLES `institute_staff_notifications` WRITE;
/*!40000 ALTER TABLE `institute_staff_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_staff_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_staff_salaries`
--

DROP TABLE IF EXISTS `institute_staff_salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_staff_salaries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_amount` double(10,2) NOT NULL,
  `paid_date` timestamp NOT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_proof` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('paid','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_staff_salaries_salary_id_unique` (`salary_id`),
  KEY `institute_staff_salaries_institute_id_foreign` (`institute_id`),
  KEY `institute_staff_salaries_institute_staff_id_foreign` (`institute_staff_id`),
  CONSTRAINT `institute_staff_salaries_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_staff_salaries_institute_staff_id_foreign` FOREIGN KEY (`institute_staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_staff_salaries`
--

LOCK TABLES `institute_staff_salaries` WRITE;
/*!40000 ALTER TABLE `institute_staff_salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_staff_salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_staff_tickets`
--

DROP TABLE IF EXISTS `institute_staff_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_staff_tickets` (
  `ticket_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `query` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `solution` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('opened','closed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('high','low') COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opened_date_time` datetime DEFAULT NULL,
  `closed_date_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `institute_staff_tickets_ticket_id_unique` (`ticket_id`),
  KEY `institute_staff_tickets_staff_id_foreign` (`staff_id`),
  KEY `institute_staff_tickets_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_staff_tickets_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_staff_tickets_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `institute_staffs` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_staff_tickets`
--

LOCK TABLES `institute_staff_tickets` WRITE;
/*!40000 ALTER TABLE `institute_staff_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_staff_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_staffs`
--

DROP TABLE IF EXISTS `institute_staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_staffs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `staff_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `staff_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('teaching','non_teaching') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alternate_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `education_qualification` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_staffs_staff_id_unique` (`staff_id`),
  UNIQUE KEY `institute_staffs_email_unique` (`email`),
  KEY `institute_staffs_user_id_foreign` (`user_id`),
  KEY `institute_staffs_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_staffs_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_staffs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_staffs`
--

LOCK TABLES `institute_staffs` WRITE;
/*!40000 ALTER TABLE `institute_staffs` DISABLE KEYS */;
INSERT INTO `institute_staffs` VALUES (1,8,'INS00000000001','STAFF00000000001','React Web Development','','m@gmail.com','2024-01-15','uy66u7','male','teaching','ghh','khkhhk','765677665','87686555656','kjbjh','rt','7776666','uy66u7','0','1','2024-02-27 04:43:15','2024-02-27 04:43:15'),(2,9,'INS00000000001','STAFF0000000002','abdul@gmail.com','','jbh@gmail.com','2024-02-13','hghgghgh','male','teaching','gjghjjghhjhjg','njkjjjhjhj','87678765','8987787','jbhjbhhjb','mnmbbm','98787878','kjjjbjjh','0','1','2024-02-27 04:44:40','2024-02-27 04:44:40'),(3,10,'INS00000000001','STAFF0000000003','Addul Rahman','','abdul@gmail.com','2024-02-27','Instructor','male','teaching','No 52/104, Egmore High Road','Egmore','6369383952','7878989867','Chennai','TamilNadu','600008','BCA - Computer Application','0','1','2024-02-27 05:13:06','2024-02-27 05:13:06'),(4,14,'INS00000000001','STAFF0000000004','Ansar Ali','','ansar@gmail.com','2024-01-29','Teacher','male','teaching','No 104 Egmore High Road','Egmore','6767898789','678798998','Chennai','TamilNadu','600008','BCA','0','1','2024-02-28 00:23:35','2024-02-28 00:23:35');
/*!40000 ALTER TABLE `institute_staffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_attendances`
--

DROP TABLE IF EXISTS `institute_student_attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_attendances` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `attendance_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `status` enum('present','absent') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_student_attendances_attendance_id_unique` (`attendance_id`),
  KEY `institute_student_attendances_institute_student_id_foreign` (`institute_student_id`),
  CONSTRAINT `institute_student_attendances_institute_student_id_foreign` FOREIGN KEY (`institute_student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_attendances`
--

LOCK TABLES `institute_student_attendances` WRITE;
/*!40000 ALTER TABLE `institute_student_attendances` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_student_attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_certificates`
--

DROP TABLE IF EXISTS `institute_student_certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_certificates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `certificate_file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_student_certificates_institute_student_id_foreign` (`institute_student_id`),
  KEY `institute_student_certificates_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_student_certificates_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_student_certificates_institute_student_id_foreign` FOREIGN KEY (`institute_student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_certificates`
--

LOCK TABLES `institute_student_certificates` WRITE;
/*!40000 ALTER TABLE `institute_student_certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_student_certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_courses`
--

DROP TABLE IF EXISTS `institute_student_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_courses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_duration` bigint unsigned NOT NULL DEFAULT '12',
  `course_price` decimal(8,2) NOT NULL,
  `learning_format` enum('online','offline','hybrid') COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_overview` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_student_courses_course_id_foreign` (`course_id`),
  KEY `institute_student_courses_student_id_foreign` (`student_id`),
  CONSTRAINT `institute_student_courses_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `institute_courses` (`course_id`),
  CONSTRAINT `institute_student_courses_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_courses`
--

LOCK TABLES `institute_student_courses` WRITE;
/*!40000 ALTER TABLE `institute_student_courses` DISABLE KEYS */;
INSERT INTO `institute_student_courses` VALUES (1,'STU00000000001','COU00000000001','React Web Development',160,50000.00,'online','vdfvfdv','vfgfvbgbb','0','1','2024-02-27 09:03:09','2024-02-27 09:03:09');
/*!40000 ALTER TABLE `institute_student_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_fee_refunds`
--

DROP TABLE IF EXISTS `institute_student_fee_refunds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_fee_refunds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_student_fee_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refund_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('success','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_student_fee_refunds_refund_id_unique` (`refund_id`),
  KEY `institute_student_fee_refunds_institute_id_foreign` (`institute_id`),
  KEY `institute_student_fee_refunds_institute_student_fee_id_foreign` (`institute_student_fee_id`),
  CONSTRAINT `institute_student_fee_refunds_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_student_fee_refunds_institute_student_fee_id_foreign` FOREIGN KEY (`institute_student_fee_id`) REFERENCES `institute_student_fees` (`fee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_fee_refunds`
--

LOCK TABLES `institute_student_fee_refunds` WRITE;
/*!40000 ALTER TABLE `institute_student_fee_refunds` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_student_fee_refunds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_fees`
--

DROP TABLE IF EXISTS `institute_student_fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_fees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fee_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paid_amount` double(10,2) NOT NULL,
  `payment_date` timestamp NOT NULL,
  `student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_proof` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('paid','refunded','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_student_fees_fee_id_unique` (`fee_id`),
  KEY `institute_student_fees_institute_id_foreign` (`institute_id`),
  KEY `institute_student_fees_student_id_foreign` (`student_id`),
  CONSTRAINT `institute_student_fees_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_student_fees_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_fees`
--

LOCK TABLES `institute_student_fees` WRITE;
/*!40000 ALTER TABLE `institute_student_fees` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_student_fees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_id_cards`
--

DROP TABLE IF EXISTS `institute_student_id_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_id_cards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `stu_card_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_student_id_cards_stu_card_id_unique` (`stu_card_id`),
  KEY `institute_student_id_cards_institute_id_foreign` (`institute_id`),
  KEY `institute_student_id_cards_institute_student_id_foreign` (`institute_student_id`),
  CONSTRAINT `institute_student_id_cards_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_student_id_cards_institute_student_id_foreign` FOREIGN KEY (`institute_student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_id_cards`
--

LOCK TABLES `institute_student_id_cards` WRITE;
/*!40000 ALTER TABLE `institute_student_id_cards` DISABLE KEYS */;
INSERT INTO `institute_student_id_cards` VALUES (1,'STUID00000000001','INS00000000001','STU00000000001','0','0','2024-02-27 09:03:09','2024-02-27 09:03:09');
/*!40000 ALTER TABLE `institute_student_id_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_notifications`
--

DROP TABLE IF EXISTS `institute_student_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('read','unread') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_student_notifications_notification_id_foreign` (`notification_id`),
  KEY `institute_student_notifications_student_id_foreign` (`student_id`),
  CONSTRAINT `institute_student_notifications_notification_id_foreign` FOREIGN KEY (`notification_id`) REFERENCES `institute_notifications` (`notification_id`),
  CONSTRAINT `institute_student_notifications_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_notifications`
--

LOCK TABLES `institute_student_notifications` WRITE;
/*!40000 ALTER TABLE `institute_student_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_student_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_student_tickets`
--

DROP TABLE IF EXISTS `institute_student_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_student_tickets` (
  `ticket_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `query` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `solution` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('opened','closed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('high','low') COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opened_date_time` datetime DEFAULT NULL,
  `closed_date_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `institute_student_tickets_ticket_id_unique` (`ticket_id`),
  KEY `institute_student_tickets_institute_student_id_foreign` (`institute_student_id`),
  KEY `institute_student_tickets_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_student_tickets_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_student_tickets_institute_student_id_foreign` FOREIGN KEY (`institute_student_id`) REFERENCES `institute_students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_student_tickets`
--

LOCK TABLES `institute_student_tickets` WRITE;
/*!40000 ALTER TABLE `institute_student_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_student_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_students`
--

DROP TABLE IF EXISTS `institute_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_students` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alternate_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `education_qualification` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institute_students_email_unique` (`email`),
  UNIQUE KEY `institute_students_student_id_unique` (`student_id`),
  UNIQUE KEY `institute_students_user_id_unique` (`user_id`),
  KEY `institute_students_institute_id_foreign` (`institute_id`),
  CONSTRAINT `institute_students_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_students_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_students`
--

LOCK TABLES `institute_students` WRITE;
/*!40000 ALTER TABLE `institute_students` DISABLE KEYS */;
INSERT INTO `institute_students` VALUES (1,'Shahul','Shahul','','shahul@gmail.com','STU00000000001',13,'INS00000000001','2024-02-12','male','No 104, Egmore high road','Egmore','4943838434','4345355455','Chennai','TamilNadu','600008','12 th Pass','0','1','2024-02-27 09:03:09','2024-02-27 09:03:09');
/*!40000 ALTER TABLE `institute_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_tickets`
--

DROP TABLE IF EXISTS `institute_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ticket_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_tickets_institute_id_foreign` (`institute_id`),
  KEY `institute_tickets_ticket_id_foreign` (`ticket_id`),
  CONSTRAINT `institute_tickets_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_tickets_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_tickets`
--

LOCK TABLES `institute_tickets` WRITE;
/*!40000 ALTER TABLE `institute_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `institute_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_users`
--

DROP TABLE IF EXISTS `institute_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `institute_users_institute_id_foreign` (`institute_id`),
  KEY `institute_users_user_id_foreign` (`user_id`),
  CONSTRAINT `institute_users_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`institute_id`),
  CONSTRAINT `institute_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_users`
--

LOCK TABLES `institute_users` WRITE;
/*!40000 ALTER TABLE `institute_users` DISABLE KEYS */;
INSERT INTO `institute_users` VALUES (1,'INS00000000001',2,'yohotecnology@gmail.com','9075402988',NULL,NULL,'2024-02-26 10:28:50','2024-02-26 10:28:50'),(2,'INS00000000001',3,'mdthasthakir@gmail.com','6369383954',NULL,'','2024-02-26 10:45:37','2024-02-26 10:45:37'),(3,'INS00000000001',4,'anish@gmail.com','6746789878',NULL,'','2024-02-26 10:46:48','2024-02-26 10:46:48'),(4,'INS00000000001',5,'daaban@gmail.com','8989786787',NULL,'','2024-02-26 10:47:39','2024-02-26 10:47:39'),(5,'INS00000000001',6,'arunbalaji@gmail.com','8989789809',NULL,'','2024-02-26 10:50:02','2024-02-26 10:50:02'),(6,'INS00000000001',7,'sanjay@gmail.com','7878989809',NULL,'','2024-02-26 10:51:06','2024-02-26 10:51:06');
/*!40000 ALTER TABLE `institute_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutions`
--

DROP TABLE IF EXISTS `institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institutions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institute_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('school','college','institutes') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'institutes',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registered_date` timestamp NOT NULL,
  `address_line_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pin_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alternate_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `official_website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pinterest` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `institutions_institute_id_unique` (`institute_id`),
  UNIQUE KEY `institutions_institute_code_unique` (`institute_code`),
  UNIQUE KEY `institutions_name_unique` (`name`),
  UNIQUE KEY `institutions_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutions`
--

LOCK TABLES `institutions` WRITE;
/*!40000 ALTER TABLE `institutions` DISABLE KEYS */;
INSERT INTO `institutions` VALUES (1,'INS00000000001','QUIZ','Quiz','Quiz@gmail.com','assets/institute/logo/40b3ad017984baf0e945f97acf37877f94f82ea6c86b5864bac5851e42c3b1e7.jfif','institutes','assets/institute/image/dc3ba2379d346f9458a0c880f65a0c96a9bcb2ab6327cd655e6080c095d4a313.jfif','[\"assets/institute/gallery/0689daf294ceaa2b31a30237ca311a0bb0dc45a5d2e70139825a9013d1a22116.jfif\", \"assets/institute/gallery/905203f9168c5855d7b7fcbf1b885ff7f685910593a22a5182c2def595d893f3.jfif\"]','we are here to offer numerous placements for college students','2024-01-08 18:30:00','velachery. No.8, 11th Main road, Vijaya nagar.','Velachery, Chennai','Chennai','TamilNadu','600 042','90754872988','890239875','https://www.tcstechnologies.com/chennai-branches','tcsfacebook.com','tcslinkedin.com','tcs123','tcstwitter',NULL,'0','0','0','2024-02-26 10:28:50','2024-02-26 10:28:50');
/*!40000 ALTER TABLE `institutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2016_06_01_000001_create_oauth_auth_codes_table',1),(4,'2016_06_01_000002_create_oauth_access_tokens_table',1),(5,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(6,'2016_06_01_000004_create_oauth_clients_table',1),(7,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(8,'2019_08_19_000000_create_failed_jobs_table',1),(9,'2019_12_14_000001_create_personal_access_tokens_table',1),(10,'2024_01_05_095159_create_platform_users_table',1),(11,'2024_01_05_1012024_create_institutions_table',1),(12,'2024_01_05_1012103_create_institute_users_table',1),(13,'2024_01_05_104822_create_faculties_table',1),(14,'2024_01_05_130038_create_roles_table',1),(15,'2024_01_05_130332_create_permissions_table',1),(16,'2024_01_05_130632_create_role_permissions_table',1),(17,'2024_01_05_130811_create_role_groups_table',1),(18,'2024_01_08_042934_create_taxes_table',1),(19,'2024_01_08_050203_create_notifications_table',1),(20,'2024_01_08_070819_create_discounts_table',1),(21,'2024_01_09_041928_create_platform_faq_modules_table',1),(22,'2024_01_09_150002_create_subscription_plans_table',1),(23,'2024_01_09_150003_create_subscription_features_table',1),(24,'2024_01_10_070523_create_jobs_table',1),(25,'2024_01_11_063427_create_activity_logs_table',1),(26,'2024_01_30_052418_create_institute_branches_table',1),(27,'2024_01_31_063949_create_institute_course_categories_table',1),(28,'2024_01_31_064120_create_institute_courses_table',1),(29,'2024_01_31_064131_create_institute_branch_courses_table',1),(30,'2024_02_01_121303_create_institute_students_table',1),(31,'2024_02_01_122635_create_institute_branch_students_table',1),(32,'2024_02_01_122645_create_institute_student_courses_table',1),(33,'2024_02_02_063327_create_institute_batches_table',1),(34,'2024_02_02_063358_create_institute_batch_students_table',1),(35,'2024_02_02_135049_create_institute_course_notes_table',1),(36,'2024_02_02_135140_create_institute_course_modules_table',1),(37,'2024_02_02_135208_create_institute_course_study_materials_table',1),(38,'2024_02_03_062332_create_institute_classes_table',1),(39,'2024_02_03_092042_create_institute_student_fees_table',1),(40,'2024_02_03_150506_create_institute_student_fee_refunds_table',1),(41,'2024_02_05_063835_create_institute_student_id_cards_table',1),(42,'2024_02_05_063858_create_institute_branch_std_id_card_table',1),(43,'2024_02_05_072121_create_institute_student_certificates_table',1),(44,'2024_02_06_075045_create_institute_notifications_table',1),(45,'2024_02_06_075066_create_institute_student_notifications_table',1),(46,'2024_02_06_075155_create_institute_branch_notification_table',1),(47,'2024_02_07_064342_create_tickets_table',1),(48,'2024_02_07_072249_create_institute_tickets_table',1),(49,'2024_02_07_075250_create_institute_communities_table',1),(50,'2024_02_12_072407_create_institute_branch_course_categories_table',1),(51,'2024_02_15_064124_create_institute_documents_table',1),(52,'2024_02_15_065937_create_institute_roles_table',1),(53,'2024_02_15_070137_create_institute_role_groups_table',1),(54,'2024_02_15_070514_create_institute_permissions_table',1),(55,'2024_02_15_070840_create_institute_role_permissions_table',1),(56,'2024_02_15_071353_create_institute_branch_users_table',1),(57,'2024_02_15_092415_create_institute_staff_table',1),(58,'2024_02_15_093657_create_institute_branch_staffs_table',1),(59,'2024_02_15_095345_create_institute_branch_batches_table',1),(60,'2024_02_15_100148_create_institute_branch_study_materials_table',1),(61,'2024_02_15_101224_create_institute_branch_notes_table',1),(62,'2024_02_15_101605_create_institute_branch_course_modules_table',1),(63,'2024_02_15_103012_create_institute_staff_salaries_table',1),(64,'2024_02_15_103130_create_institute_branch_staff_salaries_table',1),(65,'2024_02_15_103445_create_institute_branch_student_fee_refunds_table',1),(66,'2024_02_15_105503_create_institute_student_attendances_table',1),(67,'2024_02_15_105935_create_institute_batch_classes_table',1),(68,'2024_02_15_110357_create_institute_branch_classes_table',1),(69,'2024_02_15_110935_create_institute_faq_modules_table',1),(70,'2024_02_15_111445_create_institute_faqs_table',1),(71,'2024_02_15_111828_create_institute_staff_tickets_table',1),(72,'2024_02_15_112715_create_institute_student_tickets_table',1),(73,'2024_02_15_112914_create_institute_branch_student_tickets_table',1),(74,'2024_02_15_113147_create_institute_branch_staff_tickets_table',1),(75,'2024_02_15_114135_create_institute_branch_student_fees_table',1),(76,'2024_02_15_114756_create_institute_activity_logs_table',1),(77,'2024_02_15_115522_create_institute_branch_communities_table',1),(78,'2024_02_15_115912_create_institute_batch_communities_table',1),(79,'2024_02_15_122317_create_institute_community_messages_table',1),(80,'2024_02_15_134828_create_institute_staff_courses_table',1),(81,'2024_02_15_140140_create_institute_class_staff_table',1),(82,'2024_02_15_141240_create_institute_staff_id_cards_table',1),(83,'2024_02_15_141417_create_inst_branch_staff_id_cards_table',1),(84,'2024_02_15_141659_create_institute_staff_notifications_table',1),(85,'2024_02_15_142101_create_institute_staff_attendances_table',1),(86,'2024_02_15_151410_create_institute_branch_std_certificate_table',1),(87,'2024_02_20_121618_create_platform_faqs_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','send') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `notifications_institute_id_foreign` (`institute_id`),
  CONSTRAINT `notifications_institute_id_foreign` FOREIGN KEY (`institute_id`) REFERENCES `institutions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `client_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
INSERT INTO `oauth_access_tokens` VALUES ('19ea6bebda1cef3707823f1166e175c8f51189551d289649e90646ee1733c46e80c605dba604761a',2,1,'AuthToken','[]',0,'2024-02-26 10:31:31','2024-02-26 10:31:31','2025-02-26 16:01:31'),('3a247b4e9c4dbc00e0cd89da6a1da46c75ee4e0ca9a429d84ef1290b8475798af4910c2b4edde162',1,1,'AuthToken','[]',0,'2024-02-26 10:19:20','2024-02-26 10:19:20','2025-02-26 15:49:20'),('55ecae0ae10c8f3b56b4a6ec4b65ab08db65c22c765dc44c8d2dcb28acc4d1c27ef4a6e1bee0ba1d',2,1,'AuthToken','[]',0,'2024-02-28 00:43:26','2024-02-28 00:43:26','2025-02-28 06:13:26'),('76e980b02a2f5e30ec58d6d53d9d91d8d722be1ad71dc92a08ebf36ad1af1278acaed0c95238367f',2,1,'AuthToken','[]',0,'2024-02-28 00:43:28','2024-02-28 00:43:28','2025-02-28 06:13:28'),('c3fad2a56fd2df0626cd0b1ba8e43f3456edb6f4f3dd659d03f6f365bca2bf4dc6e5a49b5ae5a5ec',2,1,'AuthToken','[]',0,'2024-02-27 09:01:23','2024-02-27 09:01:23','2025-02-27 14:31:23'),('ceca208556dfef9dc365db723537f066c944f8542a9879bd02447b7971872dd332d00d9ecae76120',2,1,'AuthToken','[]',0,'2024-02-28 00:43:29','2024-02-28 00:43:29','2025-02-28 06:13:29'),('e83c8d4f91a90f950e354453f34ac4cca4150a2ee9013777348ddf5dbdfb8f5285bb879f5e686014',1,1,'AuthToken','[]',0,'2024-02-26 10:24:10','2024-02-26 10:24:10','2025-02-26 15:54:10'),('f0f1934e5e8652f809866e0231b4a834201baef57dbb3fffddabdacefd0e6b48b87da8cc3676c3b4',1,1,'AuthToken','[]',0,'2024-02-26 10:20:39','2024-02-26 10:20:39','2025-02-26 15:50:39'),('fe7a57d7a266de6e5144422286f6e755e15bf2bf91471328b5e364322034493b98aaf57aa2ad7f27',2,1,'AuthToken','[]',0,'2024-02-28 00:47:23','2024-02-28 00:47:23','2025-02-28 06:17:23');
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `client_id` bigint unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` VALUES (1,NULL,'Laravel Personal Access Client','63zv4WmZN1BElCXXuNg7xhnRkVGMj0Y6Ai9mLlfd',NULL,'http://localhost',1,0,0,'2024-02-26 10:06:39','2024-02-26 10:06:39'),(2,NULL,'Laravel Password Grant Client','UieVXCTdORWzr4mOOef9VyGeh175zntctYmWiB95','users','http://localhost',0,1,0,'2024-02-26 10:06:39','2024-02-26 10:06:39');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` VALUES (1,1,'2024-02-26 10:06:39','2024-02-26 10:06:39');
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `screen` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'Groups','User Management','Read','2024-02-26 10:39:39','2024-02-26 10:39:39'),(2,'Groups','User Management','Create','2024-02-26 10:39:39','2024-02-26 10:39:39'),(3,'Groups','User Management','Update','2024-02-26 10:39:39','2024-02-26 10:39:39'),(4,'Groups','User Management','Delete','2024-02-26 10:39:39','2024-02-26 10:39:39'),(5,'Users','User Management','Read','2024-02-26 10:39:39','2024-02-26 10:39:39'),(6,'Users','User Management','Create','2024-02-26 10:39:39','2024-02-26 10:39:39'),(7,'Users','User Management','Update','2024-02-26 10:39:39','2024-02-26 10:39:39'),(8,'Users','User Management','Delete','2024-02-26 10:39:39','2024-02-26 10:39:39'),(9,'User Details','User Management','Read','2024-02-26 10:39:39','2024-02-26 10:39:39');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform_faq_modules`
--

DROP TABLE IF EXISTS `platform_faq_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform_faq_modules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `faq_module_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `platform_faq_modules_faq_module_id_unique` (`faq_module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform_faq_modules`
--

LOCK TABLES `platform_faq_modules` WRITE;
/*!40000 ALTER TABLE `platform_faq_modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `platform_faq_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform_faqs`
--

DROP TABLE IF EXISTS `platform_faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform_faqs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `platform_faq_module_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `platform_faqs_platform_faq_module_id_foreign` (`platform_faq_module_id`),
  CONSTRAINT `platform_faqs_platform_faq_module_id_foreign` FOREIGN KEY (`platform_faq_module_id`) REFERENCES `platform_faq_modules` (`faq_module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform_faqs`
--

LOCK TABLES `platform_faqs` WRITE;
/*!40000 ALTER TABLE `platform_faqs` DISABLE KEYS */;
/*!40000 ALTER TABLE `platform_faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform_users`
--

DROP TABLE IF EXISTS `platform_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `platform_users_email_unique` (`email`),
  UNIQUE KEY `platform_users_mobile_unique` (`mobile`),
  UNIQUE KEY `platform_users_designation_unique` (`designation`),
  KEY `platform_users_user_id_foreign` (`user_id`),
  CONSTRAINT `platform_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform_users`
--

LOCK TABLES `platform_users` WRITE;
/*!40000 ALTER TABLE `platform_users` DISABLE KEYS */;
INSERT INTO `platform_users` VALUES (1,1,'admin@gmail.com','6454664677','','Admin','2024-02-26 10:14:15','2024-02-26 10:14:15');
/*!40000 ALTER TABLE `platform_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_groups`
--

DROP TABLE IF EXISTS `role_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_groups` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_groups_role_id_foreign` (`role_id`),
  KEY `role_groups_user_id_foreign` (`user_id`),
  CONSTRAINT `role_groups_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_groups`
--

LOCK TABLES `role_groups` WRITE;
/*!40000 ALTER TABLE `role_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_permissions_role_id_foreign` (`role_id`),
  KEY `role_permissions_permission_id_foreign` (`permission_id`),
  CONSTRAINT `role_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `role_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_features`
--

DROP TABLE IF EXISTS `subscription_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_features` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `subscription_plan_id` bigint unsigned NOT NULL,
  `feature_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `category` enum('student','admin','teacher') COLLATE utf8mb4_unicode_ci NOT NULL,
  `limitation` int NOT NULL,
  `is_deleted` enum('1','0') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('1','0') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `subscription_features_subscription_plan_id_foreign` (`subscription_plan_id`),
  CONSTRAINT `subscription_features_subscription_plan_id_foreign` FOREIGN KEY (`subscription_plan_id`) REFERENCES `subscription_plans` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_features`
--

LOCK TABLES `subscription_features` WRITE;
/*!40000 ALTER TABLE `subscription_features` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscription_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_plans`
--

DROP TABLE IF EXISTS `subscription_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_plans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `description` text COLLATE utf8mb4_unicode_ci,
  `support_level` enum('basic','premium') COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_users` int NOT NULL,
  `plan_duration_type` enum('day','month','year') COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan_duration` decimal(10,2) NOT NULL DEFAULT '0.00',
  `is_deleted` enum('1','0') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('1','0') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subscription_plans_plan_name_unique` (`plan_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_plans`
--

LOCK TABLES `subscription_plans` WRITE;
/*!40000 ALTER TABLE `subscription_plans` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscription_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxes`
--

DROP TABLE IF EXISTS `taxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tax_rate` double(10,2) NOT NULL,
  `tax_type` enum('price','percentage') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percentage',
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxes`
--

LOCK TABLES `taxes` WRITE;
/*!40000 ALTER TABLE `taxes` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `query` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `solution` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('platform','institutes','student','staff') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('opened','closed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('high','low') COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opened_date_time` datetime DEFAULT NULL,
  `closed_date_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tickets_ticket_id_unique` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username_verified_at` timestamp NULL DEFAULT NULL,
  `user_type` enum('platform','institutes','students','faculty') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'platform',
  `is_admin` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_deleted` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `is_active` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `fcm_token` text COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Thasthakir','admin','$2y$12$unK6sV2gRcUtHRNJPU5loeb3Gs3/Wsokmq9vn.PqV64YLa4J3Jcli',NULL,'platform','1','0','1',NULL,NULL,'2024-02-26 10:14:15','2024-02-26 10:14:15'),(2,'Quiz','Quiz','$2y$12$IQUTH19aWOzus6iAwd7ye.D7rX0EGIbajc7DP6ywZt3LuhVPi6j/m',NULL,'institutes','1','0','1',NULL,NULL,'2024-02-26 10:28:50','2024-02-26 10:28:50'),(3,'Mohammed Thasthakir','mdthasthakir','$2y$12$9qiQEFS7nq4P7eIsyG3AkuYwoBHfYVL9X0WPn36z2Pn9tXeMGz8ja',NULL,'institutes','0','0','1',NULL,NULL,'2024-02-26 10:45:37','2024-02-26 10:45:37'),(4,'Anish Kumr','anishkumar','$2y$12$jAPFzA528Cwk4b1gQPIrY.dwONb.rA2Gi02tkM6E/XXEqk.ublrfm',NULL,'institutes','0','0','1',NULL,NULL,'2024-02-26 10:46:48','2024-02-26 10:46:48'),(5,'Deeban','deeban','$2y$12$jTz7oDnAti8lRWoBpy9in.tCILxf.G3G48ksL9mbw2t9PeuOeRD/q',NULL,'institutes','0','0','1',NULL,NULL,'2024-02-26 10:47:39','2024-02-26 10:47:39'),(6,'Arunbalaji','arunbalaji','$2y$12$49eLb0jLqsxqpgPL9J83SO9ffDsRaTruh01QYtM/SXkB8TAvhP19a',NULL,'institutes','0','0','1',NULL,NULL,'2024-02-26 10:50:02','2024-02-26 10:50:02'),(7,'Sanjay','sanjay','$2y$12$wq9q9Y3Zfy/y.Lt4FGfYjeFNT18eOkleQ5YKmNfI/7n/1k2h2fRDW',NULL,'institutes','0','0','1',NULL,NULL,'2024-02-26 10:51:06','2024-02-26 10:51:06'),(8,'React Web Development','React Web Development','$2y$12$YjsaW1rT8kizqzpVimqeMeRB34UH0SNQ.ybAFiT8w.uJXxAfTgD/O',NULL,'institutes','0','0','0',NULL,NULL,'2024-02-27 04:43:15','2024-02-27 04:43:15'),(9,'abdul@gmail.com','abdul@gmail.com','$2y$12$oEKuiZ6QxMTobvd3.i2cXO2aeXtoq1q7AxuDlXq7v5h4ORyrSfunu',NULL,'institutes','0','0','0',NULL,NULL,'2024-02-27 04:44:40','2024-02-27 04:44:40'),(10,'Addul Rahman','Addul Rahman','$2y$12$gpYTeyM8DgPcFIeHEV1jI.oxWWjExSqtr.95pQTCYOjTvMRAF.XDW',NULL,'institutes','0','0','0',NULL,NULL,'2024-02-27 05:13:06','2024-02-27 05:13:06'),(13,'Shahul Shahul','shahulhameed','$2y$12$hKTvYzYUO9tNIU8haZL..OJiE1Q91TAumMl2ATcxFrKTdPvijIxI2',NULL,'institutes','0','0','0',NULL,NULL,'2024-02-27 09:03:09','2024-02-27 09:03:09'),(14,'Ansar Ali','ansarali','$2y$12$Ca9ZXoxS0vol3FHHl/NF0u3luXR81mvWbx630HFDsizcrl.HhykOG',NULL,'institutes','0','0','0',NULL,NULL,'2024-02-28 00:23:35','2024-02-28 00:23:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-28 12:02:35
