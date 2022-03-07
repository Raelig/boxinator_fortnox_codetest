DROP DATABASE IF EXISTS `sql_boxes`;
CREATE DATABASE `sql_boxes`;
USE `sql_boxes`;

CREATE TABLE `boxes`(
	`box_id` int(10) NOT NULL AUTO_INCREMENT, 
    `name` varchar(50) NOT NULL, 
    `weight` int(10) NOT NULL, 
    `colour` varchar(50) NOT NULL, 
	`shipping_cost` double(10,2) NOT NULL,
    `country`  ENUM('SWEDEN', 'BRAZIL', 'CHINA', 'AUSTRALIA') NOT NULL, 
    PRIMARY KEY(`box_id`)
    );
    
INSERT INTO `boxes` VALUES(1, 'Ali express', 90, 'rgba(17,87,45,1)', 360,  'CHINA');
INSERT INTO `boxes` VALUES(2, 'Fortnox', 50, 'rgba(199,225,237,1)', 430, 'BRAZIL');
