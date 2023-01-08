import bcrypt from 'bcryptjs';

const data = {
    products: [
        {
            //_id: "1",
            name: "Nike Slim shirt",
            slug: "nike-slim-shirt",
            category: "Shirts",
            image: "images/p1.jpg", // 679px x 829px
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: "high-quality shirt",
        },
        {
            //_id: "2",
            name: "Adidas Slim shirt",
            slug: "adidas-slim-shirt",
            category: "Shirts",
            image: "images/p2.jpg",
            price: 120,
            countInStock: 0,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: "high-quality shirt",
        },
        {
            //_id: "3",
            name: "Adidas Slim pant",
            slug: "adidas-slim-pant",
            category: "Pants",
            image: "images/p3.jpg",
            price: 120,
            countInStock: 10,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: "high-quality pant",
        },
        {
            //_id: "4",
            name: "Nike Slim pant",
            slug: "nike-slim-pant",
            category: "Pants",
            image: "images/p4.jpg",
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: "high-quality pant",
        },
    ],
    users: [
        {
            firstName: "Huy Tuan",
            lastName: "Chan",
            email: "huychan@gmail.com",
            password: bcrypt.hashSync('123456'),
            phoneNumber: '096305801',
            dateOfBirth: '14-02-2023',
            isAdmin: true,
        },
        {
            firstName: "Huy 2",
            lastName: "Chan",
            email: "huychan2@gmail.com",
            password: bcrypt.hashSync('123456'),
            phoneNumber: '096305802',
            dateOfBirth: '22-02-2023',
            isAdmin: false,
        },
    ]
}


export default data;