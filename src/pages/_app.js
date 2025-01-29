import i18 from "@/services/i18n";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import reactQueryClient from "@/config/react-query";
import "@/styles/globals.css";

import { UserProfileProvider } from "@/context/responseProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(() => reactQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <UserProfileProvider>
          <Component {...pageProps} />
        </UserProfileProvider>

        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
}
