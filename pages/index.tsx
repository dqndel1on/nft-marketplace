import type { NextPage } from 'next';
import Seo from '../components/SEO/Seo';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMaeketplace.sol/NFTMarketplace.json';
import React from 'react';
import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';
import axios from 'axios';
import Web3Modal from 'web3Modal';

let window = global.window;
let rpcEndpoint = null;

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}

const Home: NextPage = () => {
  const [nfts, setNfts] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState('not-loaded');

  React.useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);

    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState('loaded');
  };

  const buyNft = async (nft) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  };
  console.log(nfts);
  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10">No items in marketplace.</h1>;
  return (
    <div>
      <Seo title="Gokyo NFT | Lake of NFT's" subtitle="Lake of NFT's"></Seo>
      <main className="text-black" style={{ minHeight: window?.innerHeight }}>
        <div>
          {nfts.map((nft, i) => {
            return (
              <div key={i}>
                <img src={nft.image} />
                <p>{nft.name}</p>
                <p>{nft.description}</p>
                <div>
                  <p>{nft.price} Matic</p>
                  <button onClick={() => buyNft(nft)}>BUY</button>
                </div>
                <div>{i}</div>
              </div>
            );
          })}
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
