-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2019 at 11:45 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kinductdb_players`
--

-- --------------------------------------------------------

--
-- Table structure for table `additional_info`
--

CREATE TABLE `additional_info` (
  `ID` varchar(5) NOT NULL,
  `City` varchar(20) NOT NULL,
  `Province` varchar(20) NOT NULL,
  `Country` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `additional_info`
--

INSERT INTO `additional_info` (`ID`, `City`, `Province`, `Country`) VALUES
('UudNn', 'Hali', 'NS', 'CAN'),
('KqVwH', 'Hali', 'NS', 'CAN');

-- --------------------------------------------------------

--
-- Table structure for table `primary_info`
--

CREATE TABLE `primary_info` (
  `ID` varchar(5) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Age` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `primary_info`
--

INSERT INTO `primary_info` (`ID`, `Name`, `Age`) VALUES
('KqVwH', 'test2', 123),
('UudNn', 'test', 22);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additional_info`
--
ALTER TABLE `additional_info`
  ADD KEY `ID` (`ID`);

--
-- Indexes for table `primary_info`
--
ALTER TABLE `primary_info`
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `additional_info`
--
ALTER TABLE `additional_info`
  ADD CONSTRAINT `players_fk` FOREIGN KEY (`ID`) REFERENCES `primary_info` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
