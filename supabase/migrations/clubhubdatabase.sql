DROP DATABASE clubhub;
CREATE DATABASE clubhub;
USE clubhub;

-- Table: Users
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    major VARCHAR(100),
    year VARCHAR(10),
    profile_picture_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Table: Clubs
CREATE TABLE Clubs (
    club_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    privacy_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Club Link
CREATE TABLE Club_Link (
    link_id INT PRIMARY KEY
    link_name VARCHAR(50),
    link_url varchar(50),
    club_id INT NOT NULL,
    FOREIGN KEY club_id REFERENCES Clubs(club_id)
);

-- Table: Club Admin
CREATE TABLE Club_Admin (
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    FOREIGN KEY user_id references Users(user_id),
    FOREIGN KEY club_id references Clubs(club_id)
);

show create database clubhub;
show tables;