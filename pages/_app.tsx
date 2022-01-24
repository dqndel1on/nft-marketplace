import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { link } from 'fs';

const LINKS: { title: string; link: string }[] = [
  { title: 'Home', link: '/' },
  { title: 'Sell Digital Assets', link: 'create-item' },
  { title: 'My Digital Assets', link: 'my-assets' },
  { title: 'Creator Dashboard', link: 'creator-dashboard' },
];
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto px-10">
      <nav className="border-b p-6">
        <p>Gokyo NFT's</p>
        <div className="flex justify-between mt-10">
          {LINKS.map((link, i: number) => (
            <Link key={i} href={link.link}>
              <a className="text-pink-600">{link.title}</a>
            </Link>
          ))}
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
