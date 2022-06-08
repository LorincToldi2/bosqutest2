const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')

const UserModel = require('./model/authModel')
const ProductModel = require('./model/Product')
const WishlistModel = require('./model/Wishlist')
const CartModel = require('./model/Cart')
const OrderModel = require('./model/Order')

const app = express()

app.listen(process.env.PORT || 4003, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Server started successfully")
        }
    }
)

mongoose
    .connect('mongodb+srv://lorinc_toldi:eXrt739kq4@cluster0.fllxp.mongodb.net/mern?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connection successful!')
    })
    .catch((err) => {
        console.log(err.message)
    })

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use(express.json())

app.use(cookieParser())

app.use("/", authRoutes)

app.get('/', (req, res) => { res.send('Hello from Express!')})

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err )
        } else {
            res.json(result)
        }
    })
})

app.get("/getProducts", (req, res) => {
    ProductModel.find({}, (err, result) => {
        if (err) {
            res.json(err )
        } else {
            res.json(result)
        }
    })
})

/* {
    "slug": "piros-feher"
} */
app.get("/getProductsBySlug/:slugQuery", (req, res) => {
    ProductModel.find({"slug" : req.params.slugQuery}, (err, result) => {
        if (err) {
            res.json(err )
        } else {
            res.json(result)
        }
    })
})


app.post("/createProducts", async (req, res) => {
    const product = req.body
    const newProduct = new ProductModel(product);
    await newProduct.save()

    res.json(product)
})


app.post("/addWish", async (req, res) => {
    const wish = req.body
    const newWish = new WishlistModel(wish);
    await newWish.save()

    res.json(wish)
})

// id
app.post("/deleteWish", async (req, res) => {
    const itemToDelete = req.body
    WishlistModel.deleteOne(itemToDelete, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})


app.get("/getWishlist", (req, res) => {
    WishlistModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})




app.post("/addCart", async (req, res) => {
    const cart = req.body
    const newCart = new CartModel(cart);
    await newCart.save()

    res.json(cart)
})

app.get("/getCart", (req, res) => {
    CartModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

//id
app.post("/deleteCartItem", async (req, res) => {
    const itemToDelete = req.body
    CartModel.deleteOne(itemToDelete, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
}
)

//email
app.post("/deleteCartItems", async (req, res) => {
    const itemsToDelete = req.body
    CartModel.deleteMany(itemsToDelete, (err, result) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
}
)

app.post("/order", async (req, res) => {
    const order = req.body
    const newOrder = new OrderModel(order);
    await newOrder.save()

    res.json(order)
}
)


app.get("/getOrders", (req, res) => {
    OrderModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})