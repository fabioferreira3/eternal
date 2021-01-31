import React from 'react';
import type { AppProps /* , AppContext */ } from 'next/app';
import 'tailwindcss/tailwind.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MyApp: React.FC<any> = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="xl:container xl:mx-auto xl:p-6 sm:p-4 xs:p-2">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
