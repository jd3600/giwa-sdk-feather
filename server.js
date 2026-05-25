const express = require('express');
const GiwaSdkFeather = require('./index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialisation du SDK pointant sur le RPC public GIWA Sepolia (ChainID: 91342)
const GIWA_RPC_URL = "https://sepolia-rpc.giwa.io";
// Pas besoin de clé privée pour les routes de lecture/vérification simples
const giwaSdk = new GiwaSdkFeather(GIWA_RPC_URL);

// Route API pour vérifier le GIWA ID d'un utilisateur ou d'un agent
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
    res.json({ status: "success", message: "GIWA SDK Feather - Live API" });
});

app.listen(PORT, () => {
    console.log(`[GIWA L2] Serveur Feather actif sur le port ${PORT}`);
});