CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contact_number VARCHAR(20) DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

CREATE TABLE IF NOT EXISTS categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS savings_goals (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  target_amount DECIMAL(10, 2) NOT NULL,
  deadline DATE NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT savings_goals_user_fk
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  goal_id INT DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  KEY category_id (category_id),
  KEY goal_id (goal_id),
  CONSTRAINT transactions_user_fk
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT transactions_category_fk
    FOREIGN KEY (category_id) REFERENCES categories (id),
  CONSTRAINT transactions_goal_fk
    FOREIGN KEY (goal_id) REFERENCES savings_goals (id)
    ON DELETE SET NULL
);

INSERT INTO categories (id, name, type) VALUES
  (1, 'Salary', 'income'),
  (2, 'Freelance', 'income'),
  (3, 'Business', 'income'),
  (4, 'Allowance', 'income'),
  (5, 'Investment', 'income'),
  (6, 'Other', 'income'),
  (7, 'Food', 'expense'),
  (8, 'Rent', 'expense'),
  (9, 'School', 'expense'),
  (10, 'Health', 'expense'),
  (11, 'Shopping', 'expense'),
  (12, 'Transport', 'expense'),
  (13, 'Other', 'expense')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  type = VALUES(type);
