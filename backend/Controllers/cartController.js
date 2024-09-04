const Cart=require("../Models/cartSchema")
const Product= require("../Models/productSchema")

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
  
      // Send the updated cart back to the client
      res.status(200).json(updatedCart);
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
        .populate('products.product')  // Populate the 'product' field
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



module.exports={addToCart,getCartDetails,updateCart}