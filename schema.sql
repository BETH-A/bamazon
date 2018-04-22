DROP DATABASE IF EXISTS top_songs_db;

CREATE DATABASE top_songs_db;

USE top_songs_db;

CREATE TABLE top5000(
id int auto_increment NOT NULL,
artist_name VARCHAR(100) NOT NULL,
song_name VARCHAR(500) NOT NULL,
year INTEGER (4) NOT NULL,
world_score DECIMAL(5,3) NOT NULL, 
us_score DECIMAL(5,3) NOT NULL,
uk_score DECIMAL(5,3) NOT NULL,
europe_score DECIMAL(5,3) NOT NULL,
all_others_score DECIMAL(5,3) NOT NULL,
PRIMARY KEY (id) 
);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES ('Edible Chocolate Chip Cookie Dough','Grocery', 5.00, 15000),
('Thinking Putty','Toys & Games', 2.75 , 1200);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES ('Ginger Peach Tea','Grocery', 15.00, 10000),
('Cashmere Glow Candle','Home Goods', 9.42 , 1200),
('Sea Salt Lamp','Home Goods', 47.65 , 8200);

INSERT products (product_name, department_name, price, stock_quantity)
VALUES ('Rainbow Stripped Paper Straws 150 Count','Grocery', 7.99, 4000),
('Carpeted Pet Steps, 4 steps','Pet & Pet Supplies', 39.99 , 800),
('Bamboo Sunglasses, blue lens','Clothing & Accessories', 24.45 , 400),
('Bamboo Sunglasses, bronze lens','Clothing & Accessories', 21.45 , 300),
('The Energy Bus Field Guide by Jon Gordon','Books', 14.13 , 100),
('27" LED Computer Monitor','Electronics', 124.58 , 6400);  

