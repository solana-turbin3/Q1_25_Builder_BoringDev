import * as fs from "fs";
import bs58 from "bs58"; // Install this package: `npm install bs58`

// Replace this with your actual private key string
const privateKeyString =
  "67j77jxawEr1ziWxamEV8XrPhcnTUyagzQXSudd8AGu6YcAQ6mf6z6BxBRnGKaBsgP4qyM4pxB2W3DUepft73at2";

// Decode the private key from Base58
const privateKeyBytes = bs58.decode(privateKeyString);

// Convert private key bytes to an array of numbers
const privateKeyArray = Array.from(privateKeyBytes);

// Define the wallet object
const wallet = {
  privateKey: privateKeyArray,
};

// Save the wallet object to a JSON file
fs.writeFileSync("Turbin3-wallet.json", JSON.stringify(wallet, null, 2));

console.log("Private key saved to Turbin3-wallet.json");