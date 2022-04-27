# software license-management-as-nft

This project aims bring software and mobile apps license management onto a public blockchain platform. Software and mobile apps license could be represented as ERC721 - non fungible tokens and this approach is already gaining popularity among software product vendors (Reference- https://medium.com/spendee/nfts-the-future-of-software-licensing-digital-ownership-6bc42568cb72)

Roadmap (Technical and Product)
==================================================

![Roadmap](https://user-images.githubusercontent.com/7190454/165434811-d009a711-7583-42d1-ac9e-f39d7834c64d.png)


Architecture
==================================================

![Architecture](https://user-images.githubusercontent.com/7190454/165433245-4667356b-77d1-4224-afe7-11a2a25c0b70.png)


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
