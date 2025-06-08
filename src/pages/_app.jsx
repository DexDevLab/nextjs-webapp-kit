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
            <AuthProvider validator={config.auth.hasAuth}>
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
            </AuthProvider>
          ) : Component.guest ? (
            <AuthProvider validator={!config.profile.allowGuest}>
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
            </AuthProvider>
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

function AuthProvider({ validator, children, ...props }) {
  const { data: session } = useSession({
    required: validator,
  });
  const hasUser = !!session?.user;
  if (hasUser || !validator) {
    return React.cloneElement(children, { session, ...props });
  }
}
