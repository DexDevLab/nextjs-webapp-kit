import { ColorModeManager } from "@/components/layouts/ColorModeManager";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import NavigationLayout from "@/components/layouts/NavigationLayout";
import CustomToastContainer from "@/components/toasts/CustomToastContainer";
import "@/styles/toasts/customToast.css";
import "@/styles/toasts/customToastTransitions.css";
import { config } from "@/utils/webappconfig";
import { CacheProvider } from "@chakra-ui/next-js";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { lockScroll, pageTitle, session, cookies, ...pageProps },
}) {
  return (
    <CacheProvider>
      <ColorModeManager cookies={cookies}>
        {/* <ChakraProvider theme={theme}> */}
        <CustomToastContainer />
        <SessionProvider session={session}>
          {Component.auth ? (
            <Auth>
              <DefaultLayout
                lockScroll={lockScroll}
                pageTitle={pageTitle}
                config={config}
                session={session}
              >
                <NavigationLayout>
                  <Component {...pageProps} />
                </NavigationLayout>
              </DefaultLayout>
            </Auth>
          ) : (
            <DefaultLayout
              lockScroll={lockScroll}
              pageTitle={pageTitle}
              config={config}
              session={session}
            >
              <Component {...pageProps} />
            </DefaultLayout>
          )}
        </SessionProvider>
      </ColorModeManager>
      {/* </ChakraProvider> */}
    </CacheProvider>
  );
}

function Auth({ children, ...props }) {
  const { auth, profile } = config;
  const { data: session } = useSession({
    required: !profile.allowGuest && auth.hasAuth && !profile.allowGuest,
  });
  const hasUser = !!session?.user;
  if (hasUser || !auth.hasAuth || profile.allowGuest) {
    return  React.cloneElement(children, {session, ...props })
  }
  return null;
}
