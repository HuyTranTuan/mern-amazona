# This is the project that I learned from youtube.
[Link tutorial of this project](https://www.youtube.com/watch?v=CDtPMR5y0QU).

## For backend:
### .env file
1. First you have to create a file named .env in the back-end folder
2. In .env file, you have to create these variables:
- MONGODB_URI=mongodb+srv://"username":"password"@cluster0.k8xkkka.mongodb.net/"database name"?retryWrites=true&w=majority
- JWT_SECRET_KEY="replace this with whatever you want"
- PAYPAL_CLIENT_ID="This is the client id in your paypal account for developer"
3. If you don't know how to get these variables, watch the tutorial:
- MONGODB_URI at 2:54:11
- JWT_SECRET_KEY at 3:27:15
- PAYPAL_CLIENT_ID at 4:49:35

### Commands
```
1. npm install
2. npm start
```
### generate data
1. After you run the command **npm start**, go to [http://localhost:5000/api/seed](http://localhost:5000/api/seed) and press *enter*
2. Then go to [http://localhost:3000](http://localhost:3000) to check the result (remember to start frontend project right after you generate the data)

## For frontend:

### Commands
```
1. npm i
2. npm start
```

### some picture about this website:

1. Home page
![This is an image](./img/home.png)

2. Cart page
![This is an image](./img/cart.png)

3. Get shipping info
![This is an image](./img/)

4. sign in
![This is an image](./img/signin.png)

5. Sign up
![This is an image](./img/sign-up.png)

6. Select payment method
![This is an image](./img/select-payment-method.png)

7. Place order
![This is an image](./img/place-order.png)

8. Order info
![This is an image](./img/place-order.png)

9. PayPal payment<br />
![This is an image](./img/paypal-payment.png)

10. Search page
![This is an image](./img/search.png)
