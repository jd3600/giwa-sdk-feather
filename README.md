# 🪶GIWA SDK Feather — Full Suite API

Ultra-lightweight Web3 infrastructure built to run at L2 speed (OP Stack). Exposes the 5 core modules of the Feather suite, letting legacy applications or autonomous AI micro-agents interact seamlessly with the GIWA Chain.

**Live API:** https://giwa-sdk-feather.onrender.com/

---

## The 5 Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Fintech Escrow** | Secure, programmable fund locking with no third-party involvement |
| 2 | **Dojang-Style Notary** | Permanent on-chain anchoring of cryptographic signatures (logs, audit reports, invoices) |
| 3 | **Automated Commissioning** | Instant, transparent fee splitting calculated at the transaction root |
| 4 | **GIWA ID Compliance Filter** | Identity verification gate via Soulbound Token (SBT) on the network |
| 5 | **AI Micro-payments** | High-frequency, ultra-low-fee transfers designed for machine-to-machine economies |

---

## Endpoints

### `GET /`
Returns the global API status and the list of active modules.

---

### `GET /api/my-wallet`
Returns the real-time testnet ETH balance of the configured wallet.

---

### `GET /api/compliance/:address`
Checks whether an address holds a valid GIWA ID (SBT).

```
GET /api/compliance/0xYourAddressHere
```

---

### `POST /api/notary/anchor`
Engraves an immutable cryptographic fingerprint on-chain.

```json
{ "data": "Text, log entry, or invoice fingerprint to certify" }
```

---

### `POST /api/escrow/create`
Provisions an escrow project with automatic commissioning.

```json
{ "providerAddress": "0x000...000", "amount": "0.01" }
```

---

### `POST /api/ai/pay`
Sends a micro-payment to a target AI agent.

```json
{ "targetAgent": "0x000...000", "amount": "0.001" }
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MY_WALLET_ADDRESS` | Public address used for real-time balance tracking |
| `PRIVATE_KEY` | Private key to sign write transactions. If missing, the SDK falls back to simulation mode |

---

## Local Setup

```bash
git clone https://github.com/jd3600/giwa-sdk-feather.git
cd giwa-sdk-feather
npm install
npm start
```

Server runs on `http://localhost:3000` by default.

---

## Tech Stack

- **Runtime:** Node.js + Express
- **Blockchain:** ethers.js v6
- **Network:** GIWA Chain Sepolia (OP Stack L2)
- **Deployment:** Render
