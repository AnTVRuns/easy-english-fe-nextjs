'use client';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode, useState } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [cache] = useState(() => {
    const emotionCache = createCache({ key: 'css', prepend: true });
    emotionCache.compat = true;
    return emotionCache;
  });

  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted).filter((name) => typeof cache.inserted[name] === 'string');

    if (names.length === 0) {
      return null;
    }

    const styles = names
      .map((name) => cache.inserted[name])
      .filter((style): style is string => typeof style === 'string')
      .join('');

    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
