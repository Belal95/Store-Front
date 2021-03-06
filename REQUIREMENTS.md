## Database schema

![Database schema](/schema.png)

## API Endpoints

#### Authintication

[Register by POST request](http://localhost:3000/api/user/register)

- json body required:

  ```
  {
    "firstName": "",
    "lastName": "",
    "username": "",
    "password": ""
  }
  ```

[Login by POST request](http://localhost:3000/api/user/login)

- json body required:

  ```
  {
    "username": "",
    "password": ""
  }
  ```

---

#### Users

[Users Index by GET request](http://localhost:3000/api/users)

[Show user by id GET request](http://localhost:3000/api/users/show/:id)

---

#### Products

[Products index by GET request](http://localhost:3000/api/products)

[Show a product by id GET request](http://localhost:3000/api/products/show/:id)

[List products by category GET request](http://localhost:3000/api/products/category)

[Create a product by POST request](http://localhost:3000/api/products/create)

- json body required:

  ```
  {
    "name": "",
    "price": "",
    "category": "",
  }
  ```

---

#### Orders

[Create order by POST request](http://localhost:3000/api/orders/create)

- json body required:

  ```
  {
    "userId": "",
    "status": ""
  }
  ```

[Add a product to an order POST request](http://localhost:3000/api/orders/:id/add)

- json body required:

  ```
  {
    "productId": "",
    "quantity": ""
  }
  ```

[Show an order by id GET request](http://localhost:3000/api/orders/show/:id)

[Show products in an orders GET request](http://localhost:3000/api/orders/:id/products)

[Show completed orders GET request](http://localhost:3000/api/orders/completed)
