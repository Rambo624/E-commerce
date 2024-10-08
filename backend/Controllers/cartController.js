const Cart=require("../Models/cartSchema")
const Order=require("../Models/orderSchema")
const Product= require("../Models/productSchema")
const User= require("../Models/userSchema")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const addToCart = async (req, res) => {
  const user = req.user;
  console.log(user)
  const { productId, quantity } = req.body;

  try {
    // Check user role
    if (user.role !== "user") {
      return res.status(400).json("Only users can add to cart");
    }

    // Validate input
    if (!productId || !quantity) {
      return res.status(400).json("Product ID and quantity are required");
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    // Find or create the cart for the user
    let cart = await Cart.findOne({ user: user.id });

    if (!cart) {
      // Create a new cart if one doesn't exist
      cart = new Cart({ user: user.id, products: [], totalPrice: 0 });
      await cart.save();
      await User.findOneAndUpdate(
        { _id: user.id }, // Query by user ID
        { $set: { cart: cart._id } }, // Update the cart field with the new cart ID
        { new: true, upsert: true } // Create if it doesn't exist
      );
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (existingProductIndex > -1) {
      // Update quantity if the product is already in the cart
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add the new product to the cart
      cart.products.push({ product: productId, quantity });
    }

    // Retrieve the latest product prices from the database for total price calculation
    const productPrices = await Product.find({
      _id: { $in: cart.products.map(p => p.product) },
    }).select('price');

    // Calculate the total price based on updated cart
    let totalPrice = 0;
    for (let item of cart.products) {
      const productData = productPrices.find(p => p._id.toString() === item.product.toString());
      if (productData) {
        totalPrice += productData.price * item.quantity;
      }
    }

    cart.totalPrice = totalPrice;
    const updatedCart = await cart.save();

    // Find and return the added or updated product in the cart
    const addedProduct = updatedCart.products.find(p => p.product.toString() === productId);

    // Send the updated cart back to the client
    res.status(200).json({ status: true, message: "Product added successfully", data: addedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

  
  
  const getCartDetails = async (req, res) => {
    try {
        const user=req.user
      // Find the cart and populate the 'product' field in the 'products' array
      const cart = await Cart.findOne({ user: user.id })
        .populate('products.product').populate({path:'user', select:'-password'})  // Populate the 'product' field
        .exec();
  
      if (!cart) return res.status(404).json("Cart not found");
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  };
  
 // Controllers/cartUpdateController.js
 const productQuantity = async (req, res) => {
  try {
    const user = req.user;
    const { cartId, productId, quantity } = req.body;
    console.log(quantity);
    console.log(cartId);
    console.log(productId);

    // Update the quantity of the product in the cart
    const productDetails = await Cart.findOneAndUpdate(
      { _id: cartId, "products._id": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true } // To return the updated document
    );

    // If productDetails is null, it means no cart was found
    if (!productDetails) {
      return res.status(404).json("Cart not found or product does not exist in the cart.");
    }

    // Retrieve the latest product prices from the database
    const productPrices = await Product.find({
      _id: { $in: productDetails.products.map(p => p.product) },
    }).select('price');

    // Calculate the new total price based on updated cart
    let totalPrice = 0;
    for (let item of productDetails.products) {
      const productData = productPrices.find(p => p._id.toString() === item.product.toString());
      if (productData) {
        totalPrice += productData.price * item.quantity;
      }
    }

    // Update the total price in the cart
    productDetails.totalPrice = totalPrice;
    await productDetails.save(); // Save the updated cart

    // Return the updated cart details
    res.status(200).json({
      status: true,
      message: "Product quantity updated successfully.",
      data: productDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};



const updateCart = async (req, res) => {
  const user = req.user;
  const { productId, quantity } = req.body;

  if (user.role !== 'user') {
    return res.status(400).json("Only users can update the cart");
  }

  try {
    // Validate the product ID and quantity
    if (!productId || quantity <= 0) {
      return res.status(400).json("Invalid product ID or quantity");
    }

    // Find the product to ensure it exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("Product not found");
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: user.id });

    if (cart) {
      // Check if the product is already in the cart
      const existingProductIndex = cart.products.findIndex(
        item => item.product.toString() === productId
      );

      if (existingProductIndex > -1) {
        // Product exists, update quantity
        const oldQuantity = cart.products[existingProductIndex].quantity;
        cart.products[existingProductIndex].quantity = quantity;

        // Update total price
        cart.totalPrice += (quantity - oldQuantity) * product.price;
      } else {
        // Product does not exist, add new product
        cart.products.push({ product: productId, quantity });

        // Update total price
        cart.totalPrice += product.price * quantity;
      }

      // Save the updated cart
      await cart.save();
    } else {
      // Create a new cart if one does not exist
      cart = new Cart({
        user: user.id,
        products: [{ product: productId, quantity }],
        totalPrice: product.price * quantity,
      });

      // Save the new cart
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};




const removeCart= async (req,res)=>{

const user=req.user
const {productId}=req.params

const cart= await Cart.findOne({user:user.id})
if(!user){
  return res.status(401).json({status:false,message:"user not found"})
}
const productIndex = cart.products.findIndex(
  (item) => item.product.toString() === productId
);


if (productIndex === -1) {
  return res.status(404).json({ message: "Product not found in cart." });
}

const product = await Product.findById(productId);

if (!product) {
  return res.status(404).json({ message: "Product not found." });
}

  // Update the total price by subtracting the removed product's price multiplied by its quantity
  const removedProduct = cart.products[productIndex];
  cart.totalPrice -= removedProduct.quantity * product.price;

  // Remove the product from the cart's products array
  cart.products.splice(productIndex, 1);

  // Save the updated cart
  await cart.save();

  return res.status(200).json({ message: "Product removed from cart.", cart });

}


/*
const payment= async(req,res,next)=>{
  try {
    const {products}=req.body
console.log(products)
const lineItems = products.map((product) => ({
  price_data: {
    currency: 'inr',
    product_data: {
      name: product.name,
      images: [product.image]
    }
  },
  // Optionally, you might want to include a quantity field
  quantity: product.quantity || 1
}));


const session=await stripe.checkout.sessions.create({
  payment_method_types:["cards"],
  line_items:lineItems,
  mode:"payment",
  success_url:`${process.env.CLIENT_DOMAIN}/user/payment/success`,
    cancel_url:`${process.env.CLIENT_DOMAIN}/user/payment/success`
})
res.json({success:true, sessionId:session.id})
  } catch (error) {
    next(error)
  }
}
*/

const payment = async (req, res, next) => {
  try {
    const { products } = req.body;
    console.log(products,"product");

    // Ensure products array is valid
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'No products provided' });
    }

    const lineItems = products.map(({ product, quantity }) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.title,
          images: [product.thumbnail] // Use the thumbnail URL for images
        },
        unit_amount: ((product.price+100) * 100), // Stripe expects amount in cents
      },
      quantity: quantity || 1 // Default to 1 if quantity is not specified
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/user/payment/success`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/user/payment/cancel`
    });
console.log(session,"session")
if(session){
  const order =new Order({
    user:req.user.id,
    sessionId:session.id,
    products: products.map(({ product, quantity }) => ({
      product: product._id, // Store the product's ObjectId
      stock: quantity || 1,  // Store the quantity as 'stock'
    })),
    totalamount: products.reduce((total, { product, quantity }) => total + product.price * (quantity || 1), 0), // Calculate total amount
  })
await order.save()

const stockUpdatePromises = products.map(async ({ product, quantity }) => {
  // Assuming you have a Product model with a `stock` field
  await Product.findByIdAndUpdate(
    product._id,
    { $inc: { stock: -(quantity || 1) } }, // Decrease stock by quantity
    { new: true } // Return the updated document
  );
});

// Execute all stock update promises
await Promise.all(stockUpdatePromises);

res.json({ success: true, sessionId: session.id, url: session.url });
}
  
}

   catch (error) {
    console.error('Error creating checkout session:', error);
    next(error);
  }
};


const getSession=async(req,res)=>{
try {
  const user=req.user.id
  const orderDetails= await Order.find({user:user})
  const session = await Promise.all(
    orderDetails.map(order => stripe.checkout.sessions.retrieve(order.sessionId))
  );

  res.json({message:"successfully fetched orderDetails",success:true,data:session})
} catch (error) {
  console.log(error)
}
}


const clearCart=async(req,res)=>{
  try {
const user=req.user
console.log("this is clear cart")
    const cart= await Cart.findOneAndUpdate({user:user.id},{$set:{products:[]}},{new:true})
  
    
    res.json({success:true,message:"cart cleared",data:cart})
  } catch (error) {
    console.log(error)
  }
}



module.exports={addToCart,getCartDetails,updateCart,removeCart,payment,getSession,productQuantity,clearCart}