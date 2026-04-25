import Stripe from "stripe";
import config from ".";

export const srtripe = new Stripe(config.STRIPE_SECRET_KEY as string);
