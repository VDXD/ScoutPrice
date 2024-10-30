// import Products from "@/lib/model/product.model.js";
// import { scrapAmazonProduct } from "@/lib/scraper";
// import {
//   getAveragePrice,
//   getHighestPrice,
//   getLowestPrice,
//   getEmailNotifType,
// } from "@/lib/utils.ts";
// import Product from "@/lib/model/product.model.js";
// import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
// import { connectToDB } from "@/lib/mongoose.js";

// export async function GET() {
//   try {
//     connectToDB();

//     const products = await Products.find();
//     if (!products) {
//       throw new Error("No products found");
//     }

//     const updatedProducts = await Promise.all(
//       products.map(async (currentProduct) => {
//         const scrapedProduct = await scrapAmazonProduct(currentProduct.url);

//         if (!scrapedProduct) {
//           throw new Error("No products found");
//         }

//         const updatedPriceHistory = [
//           ...currentProduct.priceHistory,
//           { price: scrapedProduct.currentPrice },
//         ];

//         const product = {
//           ...scrapedProduct,
//           priceHistory: updatedPriceHistory,
//           lowestPrice: getLowestPrice(updatedPriceHistory),
//           highestPrice: getHighestPrice(updatedPriceHistory),
//           averagePrice: getAveragePrice(updatedPriceHistory),
//         };

//         const updatedProduct = await Product.findOneAndUpdate(
//           { url: scrapedProduct.url },
//           product
//         );

//         const emailNotifType = getEmailNotifType(
//           scrapedProduct,
//           currentProduct
//         );

//         if (emailNotifType && updatedProduct.users.length > 0) {
//           const productInfo = {
//             title: updatedProduct.title,
//             url: updatedProduct.url,
//           };

//           const emailContent = await generateEmailBody(
//             productInfo,
//             emailNotifType
//           );

//           const userEmails = updatedProduct.users.map((user) => user.email);

//           await sendEmail(emailContent, userEmails);
//         }

//         return updatedProduct;
//       })
//     );

//     return NextResponse.json({
//       message: "Ok",
//       data: updatedProducts,
//     });
//   } catch (error) {
//     throw new Error(`Failed to get all products: ${error.message}`);
//   }
// }

import Products from "@/lib/model/product.model.js";
import { scrapAmazonProduct } from "@/lib/scraper";
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
  getEmailNotifType,
} from "@/lib/utils.ts";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { connectToDB } from "@/lib/mongoose.js";
import { NextResponse } from "next/server";

export const maxDuration = 300;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Ensure database connection
    await connectToDB();

    // Retrieve all products
    const products = await Products.find();
    if (!products || products.length === 0) {
      throw new Error("No products found");
    }

    // Process each product
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        try {
          // Scrape the product details
          const scrapedProduct = await scrapAmazonProduct(currentProduct.url);
          if (!scrapedProduct) {
            console.error(
              `Failed to scrape product at URL: ${currentProduct.url}`
            );
            return currentProduct; // Skip this product but continue the process
          }

          // Update price history and product info
          const updatedPriceHistory = [
            ...currentProduct.priceHistory,
            { price: scrapedProduct.currentPrice, date: new Date() },
          ];

          const product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          };

          // Update the product in the database
          const updatedProduct = await Products.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { new: true } // Return the updated product document
          );

          // Check for email notifications
          const emailNotifType = getEmailNotifType(
            scrapedProduct,
            currentProduct
          );
          if (emailNotifType && updatedProduct?.users.length > 0) {
            const productInfo = {
              title: updatedProduct.title,
              url: updatedProduct.url,
            };

            const emailContent = await generateEmailBody(
              productInfo,
              emailNotifType
            );
            const userEmails = updatedProduct.users.map((user) => user.email);

            await sendEmail(emailContent, userEmails);
          }

          return updatedProduct;
        } catch (scrapeError) {
          console.error(
            `Error processing product at URL: ${currentProduct.url}`,
            scrapeError
          );
          return currentProduct; // Continue with the rest of the products
        }
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error) {
    console.error("Failed to get all products:", error);
    return NextResponse.json(
      {
        message: `Failed to get all products: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
