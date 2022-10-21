import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { AuthProvider, ModalProvider } from '../providers';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
