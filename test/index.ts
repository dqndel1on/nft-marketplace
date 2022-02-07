const { expect } = require("chai");
//import { ethers } from "hardhat";
const { ethers } = require("hardhat")

describe("NFTMarketplace", function () {
  it("Should create and execute market sales", async () => {
    const Market = await ethers.getContractFactory("NFTMarketplace");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;
    console.log("market Address", marketAddress)

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftAddress = nft.address;
    console.log("nft Address", nftAddress)

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString(); ``

    const auctionPrice = ethers.utils.parseUnits('1', 'ether');
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");

    await market.createMarketItem(nftAddress, 1, auctionPrice, { value: listingPrice });
    await market.createMarketItem(nftAddress, 2, auctionPrice, { value: listingPrice });

    const [_, buyerAddress, thirdAddress] = await ethers.getSigners();
    await market.connect(buyerAddress).createMarketSale(nftAddress, 1, { value: auctionPrice });
    let items = await market.fetchMarketItems();

    items = await Promise.all(items.map(async (i: any) => {
      const tokenUri = await nft.tokenURI(i.tokenId);
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log("items", items)

  });
});

export { }