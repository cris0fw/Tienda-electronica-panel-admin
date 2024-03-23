import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Cart from "../models/cartModel.js";

const stripe = new Stripe(
  "sk_test_51Orlx8084kcS2PofNsyFBAxp6JAzBhYzce5psbhjsQGYXodVc5vF3Tidd2DdCyuDgd2GsHb23QTgDkRzK5EhqQwl00S5C9l94T"
);

// Aplicar el metodo de pago
const createOrderPayment = asyncHandler(async (req, res) => {
  try {
    const userId = req.user;
    const { id } = req.user;

    const itemsCarrito = await Cart.find({ userId }).populate("productId");

    let totalAmount = 0;

    const lineItems = itemsCarrito.map((item) => {
      const totalPrice = item.price * item.quantity;
      totalAmount += totalPrice;

      return {
        price_data: {
          currency: "ars",
          product_data: {
            name: item.productId.title,
            description: item.productId.description,
            images: item.productId.images.map((image) => image.url),
          },
          unit_amount: Math.round(item.price * 100), // Convertir a centavos
        },
        quantity: item.quantity,
      };
    });

    // Asegurarse de que el total sea al menos 50 centavos
    if (totalAmount < 50) {
      throw new Error(
        "El monto total de la orden debe ser al menos 50 centavos."
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/cart",
    });

    return res.json(session);
  } catch (error) {
    throw new Error(error);
  }
});

export { createOrderPayment };
