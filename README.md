# software license-management-as-nft

This project aims bring software and mobile apps license management onto a public blockchain platform. Software and mobile apps license could be represented as ERC721 - non fungible tokens and this approach is already gaining popularity among software product vendors (Reference- https://medium.com/spendee/nfts-the-future-of-software-licensing-digital-ownership-6bc42568cb72)


Architecture
==================================================


![Architecture](https://user-images.githubusercontent.com/7190454/165480247-4b21e54f-e515-4391-804a-82933dc83bab.png)


Tech Stack
==================================================

##### Smart Contract:- Open Zeppelin ERC721 Pausable with customization for provenance (Reference:- https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)
##### Smart Contract Middleware:- Node.js
##### Database:- Sqlite, Sequelize ORM
##### API Service:- Node.js
##### User Interface:- Flutter
##### Crypto Wallet:- Metamask


Roadmap (Technical and Product) As on 27 Apr 2022
==================================================

![Roadmap](https://user-images.githubusercontent.com/7190454/165434811-d009a711-7583-42d1-ac9e-f39d7834c64d.png)


FAQ
==================================================
#### 1) How would the software vendor pay for minting licenses? (Monetization plan)
The platform (api server) will keep an account of number of successful license mints, the timestamp and the gas used to mint. This information can be used to bill the software vendor on a monthly basis
#### 2) What is the cost of transfering the software license from one person to other? (Monetization plan)
Gas used to send tranfer request + 1% of license value as plaftorm fee
#### 3) What is the cost of reading the license transfer history?
Free
