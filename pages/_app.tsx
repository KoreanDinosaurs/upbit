import { Provider } from "mobx-react";
import type { AppProps } from "next/app";

import { useStore } from "@stores/store";
import { CssBaseline } from "@mui/material";

import "../styles/globals.css";
import createEmotionCache from "@styles/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const store = useStore(pageProps.initialState);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <CssBaseline />
        <Component {...pageProps} />
      </CacheProvider>
    </Provider>
  );
}
