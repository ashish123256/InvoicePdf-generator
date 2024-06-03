"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const generatePdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received request to generate pdf");
    const { htmlContent } = req.body;
    try {
        const browser = yield puppeteer_1.default.launch({
            headless: true,
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
        const page = yield browser.newPage();
        // Log console messages
        page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
        page.on("pageerror", (error) => console.log(`PAGE ERROR: ${error.message}`));
        // Increase the timeout for waiting for the network to be idle
        yield page.setContent(htmlContent, { waitUntil: "networkidle2" });
        yield page.emulateMediaType("screen");
        const pdfBuffer = yield page.pdf({
            format: "A4",
            printBackground: true,
        });
        yield browser.close();
        res.setHeader("Content-Disposition", 'attachment; filename="mypdf.pdf"');
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error("Error generating PDF:", error);
        next(error);
    }
});
exports.generatePdf = generatePdf;
