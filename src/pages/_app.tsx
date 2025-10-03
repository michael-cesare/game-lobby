import type { AppProps } from "next/app";

import "@/styles/globals.scss";
import { wrapper } from "@/redux/createStore";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);