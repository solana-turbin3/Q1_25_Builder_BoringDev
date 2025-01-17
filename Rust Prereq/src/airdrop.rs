use solana_client::rpc_client::RpcClient;
use solana_sdk::{signature::{Keypair, Signer, read_keypair_file}};

const RPC_URL: &str = "https://api.devnet.solana.com";

fn main() {
    // Read the keypair from the specified wallet file
    let keypair = read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");

    // Create the RPC client to interact with Solana's Devnet
    let client = RpcClient::new(RPC_URL);

    // Request an airdrop to the specified wallet
    match client.request_airdrop(&keypair.pubkey(), 2_000_000_000u64) {
        Ok(s) => {
            println!("Success! Check out your TX here:");
            println!("https://explorer.solana.com/tx/{}?cluster=devnet", s.to_string());
        },
        Err(e) => {
            println!("Oops, something went wrong: {}", e.to_string());
        },
    }
}
