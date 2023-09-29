import { CSSReset } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import CustomAnimatedPresence from "./DefaultAnimatedPresence";

export default function DefaultLayout({
  lockScroll,
  pageTitle,
  config,
  session,
  children,
  ...props
}) {
  const { meta, ux } = config;

  useEffect(() => {
    if (typeof window !== undefined) {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      window.addEventListener("resize", () => {
        const vh = window.innerHeight;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    }

    if (ux.preventZoom) {
      document.addEventListener("gesturestart", function (e) {
        e.preventDefault();
        document.body.style.zoom = 0.99;
      });

      document.addEventListener("gesturechange", function (e) {
        e.preventDefault();
        document.body.style.zoom = 0.99;
      });
      document.addEventListener("gestureend", function (e) {
        e.preventDefault();
        document.body.style.zoom = 1;
      });
    }
    if (ux.preventScroll || lockScroll) {
      document.body.style.overflow = "hidden";
    }
  }, [ux.preventZoom, ux.preventScroll, lockScroll]);

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        {ux.preventZoom ? (
          <meta
            name="viewport"
            content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
          />
        ) : (
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        )}
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <title>{`${meta.title} - ${pageTitle}`}</title>
      </Head>
      <CSSReset />
      {ux.enablePageTransitions ? (
        <CustomAnimatedPresence>
          {React.cloneElement(children, { config, session, ...props })}
        </CustomAnimatedPresence>
      ) : (
        React.cloneElement(children, { config, session, ...props })
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
