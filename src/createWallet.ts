import { fromSeed } from "bip32";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { networks, payments } from "bitcoinjs-lib";

/**
 * Create a new wallet in testnet
 * @returns walletValues
 */
function createWallet(){
    //Set the network
    //bitcoin - main network - mainnet
    //testnet - test net
    const network = networks.testnet

    //HD wallet derivation
    const path = `m/49'/1'/0'/0` 

    //Creating the mnemonic for the seed
    let mnemonic = generateMnemonic()
    const seed = mnemonicToSeedSync(mnemonic)

    //Creating the root of the HD wallet
    let root = fromSeed(seed, network)

    //Creating an account - pair private and public keys
    let account = root.derivePath(path)
    let node = account.derive(0).derive(0)

    const { address } = payments.p2pkh({
        pubkey: node.publicKey,
        network: network,
    })
    const outPut = `New Wallet: ${address}\nPrivate key: ${node.toWIF()}\nSeed: ${mnemonic}`
    console.log(outPut)
    return { "New Wallet": address, "Private key": node.toWIF(), "Seed": mnemonic}
}

export { createWallet }