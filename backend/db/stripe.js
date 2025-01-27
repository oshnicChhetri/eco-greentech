import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with the correct secret key from environment variables
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
