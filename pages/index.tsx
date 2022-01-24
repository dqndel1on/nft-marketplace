import type { NextPage } from 'next';
import Seo from '../components/SEO/Seo';

let window = global.window;
const Home: NextPage = () => {
  console.log(window?.innerHeight);
  return (
    <div>
      <Seo title="Gokyo NFT | Lake of NFT's" subtitle="Lake of NFT's"></Seo>
      <main className="text-red-500" style={{ minHeight: window?.innerHeight }}>
        Hello World
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
