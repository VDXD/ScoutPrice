"use server";

import { revalidatePath } from "next/cache";
import { scrapAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../model/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapAndStoreProduct(productUrl) {
  if (!productUrl) {
    return;
  }

  try {
    connectToDB();
    const scrapedProduct = await scrapAmazonProduct(productUrl);

    if (!scrapedProduct) {
      return;
    }

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

// export async function scrapAndStoreProduct(productUrl) {
//   if (!productUrl) {
//     throw new Error("Product URL is required");
//   }

//   try {
//     await connectToDB(); // Ensure connection to DB

//     // Scrape product details from Amazon
//     const scrapedProduct = await scrapAmazonProduct(productUrl);

//     if (!scrapedProduct) {
//       throw new Error("Failed to scrape product from Amazon");
//     }

//     let product = scrapedProduct;

//     // Check if product already exists in the database
//     const existingProduct = await Product.findOne({ url: scrapedProduct.url });

//     if (existingProduct) {
//       const updatedPriceHistory = [
//         ...existingProduct.priceHistory,
//         { price: scrapedProduct.currentPrice },
//       ];

//       // Update product details with new price history and stats
//       product = {
//         ...scrapedProduct,
//         priceHistory: updatedPriceHistory,
//         lowestPrice: getLowestPrice(updatedPriceHistory),
//         highestPrice: getHighestPrice(updatedPriceHistory),
//         averagePrice: getAveragePrice(updatedPriceHistory),
//       };
//     }

//     // Upsert the product in the database (update if exists, insert if not)
//     const newProduct = await Product.findOneAndUpdate(
//       { url: scrapedProduct.url },
//       product,
//       { upsert: true, new: true }
//     );

//     // Revalidate the path for the product details page
//     try {
//       revalidatePath(`/products/${newProduct._id}`);
//     } catch (error) {
//       console.error(`Revalidation error: ${error.message}`);
//     }

//     // Return the updated product details to be used in the frontend
//     return newProduct;
//   } catch (error) {
//     throw new Error(`Failed to create/update product: ${error.message}`);
//   }
// }

export async function getProductById(productId) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProduct() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId) {
  try {
    connectToDB();

    const currentProducts = await Product.findById(productId);

    if (!currentProducts) {
      return null;
    }

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(productId, userEmail) {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      console.log("Product not found");
      return;
    }

    const userExists = product.users.some((user) => user.email === userEmail);

    if (userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
