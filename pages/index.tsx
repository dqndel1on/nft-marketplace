import type { NextPage } from 'next';
import Seo from '../components/SEO/Seo';

let window = global.window;
const Home: NextPage = () => {
  return (
    <div>
      <Seo title="Gokyo NFT | Lake of NFT's" subtitle="Lake of NFT's"></Seo>
      <main className="text-red-500" style={{ minHeight: window?.innerHeight }}>
        NFT Marketplace GOKYO
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
