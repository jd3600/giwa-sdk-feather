// index.js - Cœur modulaire de la suite GIWA SDK Feather
const { ethers } = require("ethers");

class GiwaSdkFeather {
    constructor(rpcUrl, privateKey) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        // Le wallet est optionnel si on fait uniquement de la lecture (comme vérifier un GIWA ID)
        if (privateKey) {
            this.wallet = new ethers.Wallet(privateKey, this.provider);
        }
        
        // Adresses des contrats sur GIWA Sepolia (à mettre à jour après vos déploiements)
        this.ESCROW_CONTRACT = "0x0000000000000000000000000000000000000000";
        this.NOTARY_CONTRACT = "0x0000000000000000000000000000000000000000";
        this.GIWA_ID_REGISTRY = "0x0000000000000000000000000000000000000000"; 
    }

    // 1 & 3. Escrow Fintech & Commissionnement
    get escrow() {
        return {
            createProject: async (providerAddress, amountInEth) => {
                const abi = ["function createProject(address _provider) external payable returns (uint256)"];
                const contract = new ethers.Contract(this.ESCROW_CONTRACT, abi, this.wallet);
                const tx = await contract.createProject(providerAddress, { value: ethers.parseEther(amountInEth) });
                return await tx.wait();
            }
        };
    }

    // 2. Notariat / Ancrage Dojang-Style
    get notary() {
        return {
            anchorData: async (rawData) => {
                const dataHash = ethers.keccak256(ethers.toUtf8Bytes(rawData));
                const abi = ["function registerHash(bytes32 _hash) external payable"];
                const contract = new ethers.Contract(this.NOTARY_CONTRACT, abi, this.wallet);
                const tx = await contract.registerHash(dataHash, { value: ethers.parseEther("0.0001") });
                return await tx.wait();
            }
        };
    }

    // 4. Filtre Compliance GIWA ID (Soulbound Token)
    get identity() {
        return {
            hasValidGiwaId: async (userAddress) => {
                const abi = ["function balanceOf(address account) external view returns (uint256)"];
                const contract = new ethers.Contract(this.GIWA_ID_REGISTRY, abi, this.provider);
                try {
                    const balance = await contract.balanceOf(userAddress);
                    return balance > 0;
                } catch (e) {
                    return false; // Si le contrat n'est pas encore déployé
                }
            }
        };
    }

    // 5. Paiements Micro-agents IA (Vitesse OP Stack 1s)
    get aiAgent() {
        return {
            payMicroFee: async (targetAgentAddress, amountInEth) => {
                const tx = await this.wallet.sendTransaction({
                    to: targetAgentAddress,
                    value: ethers.parseEther(amountInEth)
                });
                return await tx.wait();
            }
        };
    }
}

module.exports = GiwaSdkFeather;