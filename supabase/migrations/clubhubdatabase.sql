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

-- Table: Roles
CREATE TABLE Roles (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Club Membership
CREATE TABLE ClubMembership (
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, club_id), -- no user can join the same club
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Table: Tags
CREATE TABLE Tags (
    tag_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Tag Assignment
CREATE TABLE TagAssignment (
    tag_id INT NOT NULL,
    club_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tag_id, club_id), -- same tag cannot be associated to the same club more than once
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id)
);

-- Table: Events
CREATE TABLE Events (
    event_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    date DATE,
    category VARCHAR(100),
    privacy_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Event Ownership
CREATE TABLE EventOwnership (
    event_id INT NOT NULL,
    club_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, club_id), -- same event cannot be associated with the same club more than once
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id)
);

show create database clubhub;
show tables;
-- describe (insert table to check schema);

