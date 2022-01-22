import Head from 'next/head';
import React from 'react';

interface SeoProps {
  title: string;
  subtitle: string;
}

const Seo: React.FC<SeoProps> = ({ title, subtitle }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <link rel="icon" href="/GokyoNFT.png" />
      </Head>
    </div>
  );
};

export default Seo;
