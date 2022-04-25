CREATE TABLE order_products (
  order_id INT REFERENCES orders ON DELETE CASCADE,
  product_id INT REFERENCES products ON DELETE CASCADE,
  quantity INT NOT NULL,
  PRIMARY KEY (order_id , product_id) 
);