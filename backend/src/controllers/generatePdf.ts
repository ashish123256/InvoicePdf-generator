import { Request, Response, NextFunction } from "express";
import puppeteer from "puppeteer";

export const generatePdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Received request to generate pdf");
  const { htmlContent } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
       executablePath: '/usr/bin/google-chrome-stable',
      args: [
        "--ignore-certificate-errors",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1920,1080",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
      ],
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    // Log console messages
    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", (error) =>
      console.log(`PAGE ERROR: ${error.message}`)
    );

    // Increase the timeout for waiting for the network to be idle
    await page.setContent(htmlContent, { waitUntil: "networkidle2" });

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.setHeader("Content-Disposition", 'attachment; filename="mypdf.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    next(error);
  }
};
