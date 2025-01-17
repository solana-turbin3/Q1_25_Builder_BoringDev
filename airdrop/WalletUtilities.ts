import bs58 from "bs58";
import prompt from "prompt-sync"; // Correct import

// Function to decode Base58 to wallet (byte array)
function base58ToWallet() {
  const promptSync = prompt({}); // Pass an empty object as argument (TypeScript expects this)

  console.log("Enter your Base58 string:");

  // Read the Base58 string input from the user
  const base58String = promptSync({}); // Now it will work

  try {
    // Decode Base58 string into a buffer (wallet)
    const wallet = bs58.decode(base58String);
    console.log("Decoded wallet:", wallet);
  } catch (error) {
    console.error("Error decoding Base58 string:", error);
  }
}

// Function to encode wallet (byte array) to Base58 string
function walletToBase58() {
  const wallet: number[] = [
    84, 204, 158, 112, 117, 238, 99, 200, 4, 105, 1, 219, 244, 215, 145, 56,
    122, 251, 163, 18, 47, 235, 207, 73, 206, 191, 32, 12, 139, 182, 133, 70,
    60, 208, 177, 236, 34, 253, 120, 162, 106, 113, 199, 60, 212, 220, 246, 43,
    144, 246, 81, 31, 186, 109, 116, 121, 100, 134, 207, 173, 193, 247, 80, 185,
  ];

  // Encode the wallet array into a Base58 string
  const base58String = bs58.encode(Buffer.from(wallet));
  console.log("Base58 Encoded string:", base58String);
}

// Test function for base58ToWallet (decode)
base58ToWallet();

// Test function for walletToBase58 (encode)
walletToBase58();
