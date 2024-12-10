-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 07, 2024 at 12:28 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dicoding_motivationlearning`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievements`
--

CREATE TABLE `achievements` (
  `achievement_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `points_reward` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`achievement_id`, `name`, `description`, `points_reward`) VALUES
(1, 'acv1', 'ini adalah acv1', 20),
(2, 'acv2', 'ini adalah acv2', 30);

-- --------------------------------------------------------

--
-- Table structure for table `learning_paths`
--

CREATE TABLE `learning_paths` (
  `path_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` int DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `learning_paths_status`
--

CREATE TABLE `learning_paths_status` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `learning_path_items`
--

CREATE TABLE `learning_path_items` (
  `path_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `recommended_order` int NOT NULL,
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `learning_path_items_status`
--

CREATE TABLE `learning_path_items_status` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `learning_reminders`
--

CREATE TABLE `learning_reminders` (
  `learning_reminder_id` int NOT NULL,
  `user_id` int NOT NULL,
  `reminder_time` datetime NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `point_transactions`
--

CREATE TABLE `point_transactions` (
  `transaction_id` int NOT NULL,
  `user_id` int NOT NULL,
  `points` int NOT NULL,
  `transaction_type` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `point_transactions_transaction_type`
--

CREATE TABLE `point_transactions_transaction_type` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `redeem_items`
--

CREATE TABLE `redeem_items` (
  `item_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `points` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `redeem_items`
--

INSERT INTO `redeem_items` (`item_id`, `name`, `description`, `points`) VALUES
(1, 'item 1', 'ini adalah item 1', 200),
(2, 'item 2', 'ini adalah item 2', 400);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skills_category`
--

CREATE TABLE `skills_category` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill_radar_results`
--

CREATE TABLE `skill_radar_results` (
  `radar_id` int NOT NULL,
  `user_id` int NOT NULL,
  `radar_data` json NOT NULL,
  `generated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `github_profile` varchar(255) DEFAULT NULL,
  `points` int DEFAULT '0',
  `current_streak` int DEFAULT '0',
  `longest_streak` int DEFAULT '0',
  `last_check_in` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password_hash`, `github_profile`, `points`, `current_streak`, `longest_streak`, `last_check_in`, `created_at`, `last_login`) VALUES
(1, 'coba1@gmail.com', 'coba1', '$2a$10$xRSktfRnsj7Xyry9Rs8oQeEfxXuFxoHTSC03F6hdEC8/OrwvCIHeW', 'coba1.gitthub.com', 2, 2, 10, NULL, '2024-12-07 18:03:33', NULL),
(2, 'coba2@gmail.com', 'coba2', '$2a$10$rEGATw4mZpWfgjfG6RtxO.zqm/Cin7LnYPQoGQ9SQgP71sZwUQjeC', 'coba2.gitthub.com', 22, 22, 100, NULL, '2024-12-07 18:03:53', '2024-12-07 18:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_achievements`
--

CREATE TABLE `user_achievements` (
  `user_id` int NOT NULL,
  `achievement_id` int NOT NULL,
  `earned_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_achievements`
--

INSERT INTO `user_achievements` (`user_id`, `achievement_id`, `earned_at`) VALUES
(1, 1, '2024-12-07 18:07:18'),
(2, 2, '2024-12-07 18:07:18'),
(1, 2, '2024-12-07 18:20:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_items`
--

CREATE TABLE `user_items` (
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `redeem_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_items`
--

INSERT INTO `user_items` (`user_id`, `item_id`, `redeem_at`) VALUES
(1, 1, '2024-12-07 18:51:41'),
(2, 2, '2024-12-07 18:52:21'),
(1, 2, '2024-12-07 19:05:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_languages`
--

CREATE TABLE `user_languages` (
  `user_id` int NOT NULL,
  `language_id` int NOT NULL,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_skills`
--

CREATE TABLE `user_skills` (
  `user_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `proficiency_level` tinyint NOT NULL,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_surveys`
--

CREATE TABLE `user_surveys` (
  `survey_id` int NOT NULL,
  `user_id` int NOT NULL,
  `experience_level` int NOT NULL,
  `preferred_learning_time` varchar(50) DEFAULT NULL,
  `weekly_study_hours` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_surveys_experience_level`
--

CREATE TABLE `user_surveys_experience_level` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`achievement_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `learning_paths`
--
ALTER TABLE `learning_paths`
  ADD PRIMARY KEY (`path_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `learning_paths_status`
--
ALTER TABLE `learning_paths_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `learning_path_items`
--
ALTER TABLE `learning_path_items`
  ADD KEY `path_id` (`path_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `learning_path_items_status`
--
ALTER TABLE `learning_path_items_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `learning_reminders`
--
ALTER TABLE `learning_reminders`
  ADD PRIMARY KEY (`learning_reminder_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `point_transactions`
--
ALTER TABLE `point_transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `transaction_type` (`transaction_type`);

--
-- Indexes for table `point_transactions_transaction_type`
--
ALTER TABLE `point_transactions_transaction_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `redeem_items`
--
ALTER TABLE `redeem_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skill_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `skills_category`
--
ALTER TABLE `skills_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `skill_radar_results`
--
ALTER TABLE `skill_radar_results`
  ADD PRIMARY KEY (`radar_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `achievement_id` (`achievement_id`);

--
-- Indexes for table `user_items`
--
ALTER TABLE `user_items`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `user_languages`
--
ALTER TABLE `user_languages`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `skill_id` (`skill_id`);

--
-- Indexes for table `user_surveys`
--
ALTER TABLE `user_surveys`
  ADD PRIMARY KEY (`survey_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `experience_level` (`experience_level`);

--
-- Indexes for table `user_surveys_experience_level`
--
ALTER TABLE `user_surveys_experience_level`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `achievement_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `learning_paths`
--
ALTER TABLE `learning_paths`
  MODIFY `path_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `learning_paths_status`
--
ALTER TABLE `learning_paths_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `learning_path_items_status`
--
ALTER TABLE `learning_path_items_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `learning_reminders`
--
ALTER TABLE `learning_reminders`
  MODIFY `learning_reminder_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `point_transactions`
--
ALTER TABLE `point_transactions`
  MODIFY `transaction_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `point_transactions_transaction_type`
--
ALTER TABLE `point_transactions_transaction_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `redeem_items`
--
ALTER TABLE `redeem_items`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skills_category`
--
ALTER TABLE `skills_category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill_radar_results`
--
ALTER TABLE `skill_radar_results`
  MODIFY `radar_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_surveys`
--
ALTER TABLE `user_surveys`
  MODIFY `survey_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_surveys_experience_level`
--
ALTER TABLE `user_surveys_experience_level`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `learning_paths`
--
ALTER TABLE `learning_paths`
  ADD CONSTRAINT `learning_paths_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `learning_paths_ibfk_2` FOREIGN KEY (`status`) REFERENCES `learning_paths_status` (`id`);

--
-- Constraints for table `learning_path_items`
--
ALTER TABLE `learning_path_items`
  ADD CONSTRAINT `learning_path_items_ibfk_1` FOREIGN KEY (`path_id`) REFERENCES `learning_paths` (`path_id`),
  ADD CONSTRAINT `learning_path_items_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`),
  ADD CONSTRAINT `learning_path_items_ibfk_3` FOREIGN KEY (`status`) REFERENCES `learning_path_items_status` (`id`);

--
-- Constraints for table `learning_reminders`
--
ALTER TABLE `learning_reminders`
  ADD CONSTRAINT `learning_reminders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `point_transactions`
--
ALTER TABLE `point_transactions`
  ADD CONSTRAINT `point_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `point_transactions_ibfk_2` FOREIGN KEY (`transaction_type`) REFERENCES `point_transactions_transaction_type` (`id`);

--
-- Constraints for table `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`category`) REFERENCES `skills_category` (`id`);

--
-- Constraints for table `skill_radar_results`
--
ALTER TABLE `skill_radar_results`
  ADD CONSTRAINT `skill_radar_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_achievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`achievement_id`);

--
-- Constraints for table `user_items`
--
ALTER TABLE `user_items`
  ADD CONSTRAINT `user_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `redeem_items` (`item_id`);

--
-- Constraints for table `user_languages`
--
ALTER TABLE `user_languages`
  ADD CONSTRAINT `user_languages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`);

--
-- Constraints for table `user_surveys`
--
ALTER TABLE `user_surveys`
  ADD CONSTRAINT `user_surveys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_surveys_ibfk_2` FOREIGN KEY (`experience_level`) REFERENCES `user_surveys_experience_level` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
