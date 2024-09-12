const Cart=require("../Models/cartSchema")
const Product= require("../Models/productSchema")
const User= require("../Models/userSchema")

const addToCart=async(req,res)=>{
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
  
      // Update the total price
      const updatedCart = await cart.save();
      const totalPrice = updatedCart.products.reduce((sum, item) => {
        const productPrice = product.price; // Assume the product has a price field
        return sum + productPrice * item.quantity;
      }, 0);
      
      updatedCart.totalPrice = totalPrice;
      await updatedCart.save();
  
      const addedProduct = updatedCart.products.find(p => p.product.toString() === productId);

      // Send the updated cart back to the client
      res.status(200).json({status:true,message:"Product added successfully",data:addedProduct});
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

module.exports={addToCart,getCartDetails,updateCart,removeCart}