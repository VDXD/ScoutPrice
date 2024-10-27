import Products from "@/lib/model/product.model.js";
import { scarpeAmazonProduct } from "@/lib/scraper";
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
  getEmailNotifType,
} from "@/utils";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export async function GET() {
  try {
    connectToDB();

    const products = await Products.find();
    if (!products) {
      throw new Error("No products found");
    }

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scarpeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) {
          throw new Error("No products found");
        }

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.url },
          product
        );

        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
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
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
}
