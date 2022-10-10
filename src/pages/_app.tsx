import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { ModalProvider } from '../providers';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
