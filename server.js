const express = require('express');
const { ethers } = require('ethers'); // Importation d'ethers pour le formatage du solde
const GiwaSdkFeather = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialisation du SDK pointant sur le RPC public GIWA Sepolia (ChainID: 91342)
const GIWA_RPC_URL = "https://sepolia-rpc.giwa.io";
const giwaSdk = new GiwaSdkFeather(GIWA_RPC_URL);

// 1. Récupération de ton adresse configurée sur Render
const MY_WALLET_ADDRESS = process.env.MY_WALLET_ADDRESS;

// Nouvelle route pour tester ton wallet et voir ton solde en temps réel
app.get('/api/my-wallet', async (req, res) => {
    try {
        if (!MY_WALLET_ADDRESS) {
            return res.status(400).json({
                success: false,
                error: "La variable d'environnement MY_WALLET_ADDRESS n'est pas configurée sur Render."
            });
        }

        // On utilise le provider du SDK pour interroger la blockchain
        const balanceWei = await giwaSdk.provider.getBalance(MY_WALLET_ADDRESS);
        const balanceEth = ethers.formatEther(balanceWei); // Convertit les Wei en ETH

        res.json({
            status: "success",
            mon_adresse: MY_WALLET_ADDRESS,
            solde: `${balanceEth} ETH`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route API pour vérifier la compliance GIWA ID
app.get('/api/compliance/:address', async (req, res) => {
    try {
        const isVerified = await giwaSdk.identity.hasValidGiwaId(req.params.address);
        res.json({
            address: req.params.address,
            hasValidGiwaId: isVerified,
            status: isVerified ? "Compliant" : "No GIWA ID detected"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.json({ 
        status: "success", 
        message: "GIWA SDK Feather - Live API",
        wallet_configure: MY_WALLET_ADDRESS ? "Oui" : "Non" 
    });
});

app.listen(PORT, () => {
    console.log(`[GIWA L2] Serveur Feather actif sur le port ${PORT}`);
});
