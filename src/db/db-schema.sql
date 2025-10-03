-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bftcesp6gst9qexlnvot-mysql.services.clever-cloud.com:3306
-- Generation Time: Aug 25, 2024 at 01:17 AM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.21
CREATE DATABASE `tiendita_db`;

use `tiendita_db`;

SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
    time_zone = "+00:00";

-- Database: `tiendita_db`
-- --------------------------------------------------------
-- Table structure for table `type_transactions`
CREATE TABLE if NOT EXISTS `type_transactions` (
    `id_type_transaction` int NOT NULL AUTO_INCREMENT,
    `type_transaction_name` varchar(100) NOT NULL,
    PRIMARY KEY (`id_type_transaction`)
);

-- --------------------------------------------------------
-- Table structure for table `transactions`
CREATE TABLE if NOT EXISTS `transactions` (
    `id_transaction` int NOT NULL AUTO_INCREMENT,
    `id_type_transaction` int NOT NULL,
    PRIMARY KEY (`id_transaction`),
    KEY `id_type_transaction` (`id_type_transaction`),
    FOREIGN KEY (`id_type_transaction`) REFERENCES `type_transactions` (`id_type_transaction`)
);

-- --------------------------------------------------------
-- Table structure for table `products`
CREATE TABLE if NOT EXISTS `products` (
    `id_product` int NOT NULL AUTO_INCREMENT,
    `product_name` varchar(50) NOT NULL,
    `product_description` varchar(200) NOT NULL,
    `stock` int NOT NULL,
    `price` float NOT NULL,
    PRIMARY KEY (`id_product`)
);

-- --------------------------------------------------------
-- Table structure for table `clients`
CREATE TABLE if NOT EXISTS `clients` (
    `id_client` int NOT NULL AUTO_INCREMENT,
    `client_name` varchar(45) DEFAULT NULL,
    `active` BOOLEAN,
    PRIMARY KEY (`id_client`)
);

-- --------------------------------------------------------
-- Table structure for table `client_orders`
CREATE TABLE if NOT EXISTS `client_orders` (
    `id_client_order` int NOT NULL AUTO_INCREMENT,
    `id_transaction` int NOT NULL,
    `id_client` int NOT NULL,
    `id_product` int NOT NULL,
    `client_order_quantity` int NOT NULL,
    `client_order_total` float NOT NULL,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `cancelled` tinyint(1) NOT NULL,
    PRIMARY KEY (`id_client_order`),
    KEY `id_transaction` (`id_transaction`),
    KEY `id_client` (`id_client`),
    KEY `id_product` (`id_product`),
    FOREIGN KEY (`id_transaction`) REFERENCES `transactions` (`id_transaction`),
    FOREIGN KEY (`id_client`) REFERENCES `clients` (`id_client`),
    FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
);

-- --------------------------------------------------------
-- Table structure for table `employees`
CREATE TABLE if NOT EXISTS `employees` (
    `id_employee` int NOT NULL AUTO_INCREMENT,
    `employee_name` varchar(45) DEFAULT NULL,
    `active` BOOLEAN,
    PRIMARY KEY (`id_employee`)
);

-- --------------------------------------------------------
-- Table structure for table `employee_payments`
CREATE TABLE if NOT EXISTS `employee_payments` (
    `id_employee_payment` int NOT NULL AUTO_INCREMENT,
    `id_transaction` int NOT NULL,
    `id_employee` int NOT NULL,
    `employee_payment_total` float NOT NULL,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `cancelled` tinyint(1) NOT NULL,
    PRIMARY KEY (`id_employee_payment`),
    KEY `id_transaction` (`id_transaction`),
    KEY `id_employee` (`id_employee`),
    FOREIGN KEY (`id_transaction`) REFERENCES `transactions` (`id_transaction`),
    FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`)
);

-- --------------------------------------------------------
-- Table structure for table `suppliers`
CREATE TABLE if NOT EXISTS `suppliers` (
    `id_supplier` int NOT NULL AUTO_INCREMENT,
    `supplier_name` varchar(50) NOT NULL,
    `email` varchar(100) NOT NULL,
    `active` BOOLEAN,
    PRIMARY KEY (`id_supplier`)
);

-- --------------------------------------------------------
-- Table structure for table `supplier_orders`
CREATE TABLE if NOT EXISTS `supplier_orders` (
    `id_supplier_order` int NOT NULL AUTO_INCREMENT,
    `id_transaction` int NOT NULL,
    `id_supplier` int NOT NULL,
    `id_product` int NOT NULL,
    `supplier_order_quantity` int NOT NULL,
    `supplier_order_total` float NOT NULL,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `cancelled` tinyint(1) NOT NULL,
    PRIMARY KEY (`id_supplier_order`),
    KEY `id_transaction` (`id_transaction`),
    KEY `id_supplier` (`id_supplier`),
    KEY `id_product` (`id_product`),
    FOREIGN KEY (`id_transaction`) REFERENCES `transactions` (`id_transaction`),
    FOREIGN KEY (`id_supplier`) REFERENCES `suppliers` (`id_supplier`),
    FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
);

-- --------------------------------------------------------
--
-- Dumping data for table `type_transactions`
--
INSERT INTO
    `type_transactions` (`id_type_transaction`, `type_transaction_name`)
VALUES
    (1, 'client_order'),
    (2, 'supplier_orders'),
    (3, 'employee_payments');

-- --------------------------------------------------------
--
-- Dumping data for table `clients`
--
INSERT INTO
    `clients` (`id_client`, `client_name`)
VALUES
    (1, 'pepito'),
    (2, 'jaunito'),
    (3, 'carla'),
    (4, 'serena morena'),
    (5, 'scatman john'),
    (6, 'seatbelts'),
    (7, 'ketchup de chapa');

-- --------------------------------------------------------
--
-- Dumping data for table `employees`
--
INSERT INTO
    `employees` (`id_employee`, `employee_name`)
VALUES
    (1, 'Gary'),
    (3, 'Arenita'),
    (4, 'Patricio');

-- --------------------------------------------------------
--
-- Dumping data for table `products`
--
INSERT INTO
    `products` (
        `id_product`,
        `product_name`,
        `product_description`,
        `stock`,
        `price`
    )
VALUES
    (1, 'Yerba Piporé', 'Paquete de yerba Piporé clásica', 500, 2150),
    (2, 'Café Cabrales', 'Paquete de café tostado molido 500g', 300, 4200),
    (3, 'Aceite Natura', 'Botella de aceite de girasol 1L', 600, 3500),
    (4, 'Arroz Gallo Oro', 'Paquete de arroz largo fino 1Kg', 800, 1900),
    (5, 'Fideos Lucchetti', 'Paquete de fideos tallarín 500g', 700, 1250),
    (6, 'Azúcar Ledesma', 'Bolsa de azúcar común 1Kg', 900, 1100),
    (7, 'Leche La Serenísima', 'Sachet de leche entera 1L', 1000, 950),
    (8, 'Harina Pureza', 'Paquete de harina de trigo 000 1Kg', 750, 1150),
    (9, 'Mermelada Arcor', 'Frasco de mermelada de frutilla 454g', 400, 1800),
    (10, 'Galletitas Oreo', 'Paquete de galletitas rellenas de chocolate 117g', 1200, 950),
    (11, 'Detergente Magistral', 'Botella de detergente concentrado limón 750ml', 500, 2200),
    (12, 'Lavandina Ayudín', 'Botella de lavandina clásica 1L', 450, 1800),
    (13, 'Jabón en Polvo Ariel', 'Bolsa de jabón en polvo 800g', 300, 4200),
    (14, 'Desodorante de Piso Poett', 'Botella fragancia primavera 900ml', 400, 2600),
    (15, 'Papel Higiénico Higienol', 'Paquete de 12 rollos doble hoja', 350, 5300),
    (16, 'Toallas de Cocina Elite', 'Paquete de 3 rollos de cocina', 250, 3100),
    (17, 'Esponja Virulana', 'Paquete de 3 esponjas multiuso', 600, 950),
    (18, 'Trapo de Piso Seco', 'Trapo absorbente de algodón', 550, 1200),
    (19, 'Guantes de Látex', 'Guantes de limpieza talla M', 400, 1500),
    (20, 'Insecticida Raid', 'Aerosol contra mosquitos y cucarachas 360ml', 300, 2800)
    ;


-- --------------------------------------------------------
--
-- Dumping data for table `transactions`
--
INSERT INTO
    `transactions` (`id_transaction`, `id_type_transaction`)
VALUES
    (1, 1),
    (5, 1),
    (9, 1),
    (3, 2),
    (8, 3);

-- --------------------------------------------------------
--
-- Dumping data for table `client_orders`
--
INSERT INTO
    `client_orders` (
        `id_client_order`,
        `id_transaction`,
        `id_client`,
        `id_product`,
        `client_order_quantity`,
        `client_order_total`,
        `date`,
        `cancelled`
    )
VALUES
    (1, 1, 2, 3, 100, 9999, '2024-08-03 01:07:13', 0),
    (2, 1, 4, 4, 2, 10000, '2024-08-22 23:23:25', 0),
    (3, 3, 4, 4, 2, 10000, '2024-08-22 23:31:55', 0),
    (4, 3, 4, 3, 4, 5000, '2024-08-22 23:32:08', 1);

-- select * from `type_transactions`;
-- select * from `transactions`;
-- select * from `products`;
-- select * from `clients`;
-- select * from `employees`;
-- select * from `suppliers`;
-- select * from `client_orders`;
-- select * from `supplier_orders`;
-- select * from `employee_payments`;