import BackgroundLayout from "@/components/layouts/BackgroundLayout";
import { Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

export default function Home({config, ...props }) {

  const { data: session } = useSession();
  return (
    <>
      <BackgroundLayout pl={config.ux.menu.useSidebar && 10} imgSrc={"/background3.jpg"}>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Hello World
        </Button>
      </BackgroundLayout>
    </>
  );
}

Home.auth = true;

export async function getServerSideProps(context) {
  return {
    props: {
      lockScroll: false,
      cookies: context.req.headers.cookie ?? "",
      pageTitle: "Home",
    },
  };
}
