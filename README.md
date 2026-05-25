**GIWA SDK FEATHER - FULL SUITE API**


GIWA SDK Feather is an ultra-lightweight Web3 API infrastructure designed to execute at the high speed of the L2 layer (OP Stack). This service exposes the 5 core modules of the Feather suite, enabling legacy applications or autonomous AI micro-agents to interact seamlessly with the GIWA Chain.


--------------------------------------------------------------------------------
FEATURES AND ARCHITECTURE (THE 5 MODULES)
--------------------------------------------------------------------------------

The API orchestrates and exposes the 5 key functionalities of the SDK:

1. Fintech Escrow:
   Secure and programmable funds locking without third-party intervention.

2. Notary and Timestamping (Dojang-Style Anchoring):
   Permanently engraving unique cryptographic signatures (Hashes) of logs, 
   audit reports, or invoices on-chain.

3. Automated Commissioning:
   Instant and transparent splitting of fees directly at the transaction root.

4. GIWA ID Compliance Filter:
   Account identity and verification gate checking for valid Soulbound Tokens 
   (SBT) on the network.

5. AI Agent Micro-payments:
   High-frequency, ultra-low-fee value transfers designed for 
   machine-to-machine economies.


--------------------------------------------------------------------------------
API ENDPOINTS
--------------------------------------------------------------------------------

The production API is deployed and live at:  
https://giwa-sdk-feather.onrender.com/

--- 1. System Status ---
* URL: /
* Method: GET
* Description: Checks the API health status and lists all active modules.

--- 2. Wallet Tracker ---
* URL: /api/my-wallet
* Method: GET
* Description: Extracts the real-time testnet ETH balance of the configured wallet.

--- 3. Compliance Filter (GIWA ID) ---
* URL: /api/compliance/:address
* Method: GET
* Description: Verifies whether the specified address holds a valid GIWA ID.

--- 4. Notary Anchoring (Dojang-Style) ---
* URL: /api/notary/anchor
* Method: POST
* Payload Format: JSON
* Example Payload:
  {
    "data": "Text, log entry, or invoice fingerprint to certify"
  }

--- 5. Escrow Provisioning ---
* URL: /api/escrow/create
* Method: POST
* Payload Format: JSON
* Example Payload:
  {
    "providerAddress": "0x0000000000000000000000000000000000000000",
    "amount": "0.01"
  }

--- 6. AI Micro-payment ---
* URL: /api/ai/pay
* Method: POST
* Payload Format: JSON
* Example Payload:
  {
    "targetAgent": "0x0000000000000000000000000000000000000000",
    "amount": "0.001"
  }


--------------------------------------------------------------------------------
ENVIRONMENT VARIABLES (RENDER CONFIGURATION)
--------------------------------------------------------------------------------

To operate in production, the application relies on the following environment 
variables to be set up securely in your deployment dashboard:

* MY_WALLET_ADDRESS: The public address used for real-time balance tracking queries.
* PRIVATE_KEY: The private key required to sign write transactions. If missing, 
  the SDK safely falls back to structural simulation mode.


--------------------------------------------------------------------------------
LOCAL DEVELOPMENT
--------------------------------------------------------------------------------

To clone and run the project locally, execute the following commands in your 
terminal:

1. Clone the repository:
   git clone https://github.com/jd3600/giwa-sdk-feather.git

2. Go into the project directory:
   cd giwa-sdk-feather

3. Install the dependencies:
   npm install

4. Start the server:
   npm start


