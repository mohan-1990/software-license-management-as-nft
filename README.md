# software license-management-as-nft

This project aims bring software and mobile apps license management onto a public blockchain platform. Software and mobile apps license could be represented as ERC721 - non fungible tokens and this approach is already gaining popularity among software product vendors (Reference- https://medium.com/spendee/nfts-the-future-of-software-licensing-digital-ownership-6bc42568cb72)

Roadmap (Technical and Product)
==================================================

                                                                                            |
                                                                                            |
                                                                                        (Current)  

#### Smart contract (Completed) ----------> Smart Contract Middleware (Completed) ----------> Database Integration -----------> API Service ----------> User Interface -----------> Crypto Wallet Integration ----------> Contract and API Integration Tests -----------> Support multiple software product vendors



Architecture
==================================================

![Architecture](https://user-images.githubusercontent.com/7190454/165429415-29a14075-f498-477d-bb8f-aaadad103c96.png)

Tech Stack
==================================================

##### Smart Contract:- Open Zeppelin ERC721 Pausable with customization for provenance (Reference:- https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)
##### Smart Contract Middleware:- Node.js
##### Database:- Sqlite, Sequelize ORM
##### API Service:- Node.js
##### User Interface:- Vue.js
##### Crypto Wallet:- Metamask


Steps to run project (Linux)
==================================================
1) Install dependencies 
  a) Ganache - https://www.trufflesuite.com/ganache
  b) Truffle suite - https://trufflesuite.com/docs/truffle/getting-started/installation/
  c) Node.js - https://nodejs.org/en/download/
  d) Sqlite3 - https://www.sqlite.org/download.html
2) Start Ganache GUI
3) Clone this project - git clone https://github.com/mohan-1990/software-license-management-as-nft.git
4) Open terminal and run below commands 
5) truffle migrate
6) cd app_server
7) npm install
8) npm start
