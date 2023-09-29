import { useMediaQuery } from "@chakra-ui/react";


export function useCustomBreakpointProvider(){
    const [sm] = useMediaQuery("(min-width: 0px)", {
        ssr: true,
        fallback: false,
      });
      const [md] = useMediaQuery("(min-width: 768px)", {
        ssr: true,
        fallback: false,
      });
      const [lg] = useMediaQuery("(min-width: 992px)", {
        ssr: true,
        fallback: false,
      });

      switch(true){
        case lg:
          return 'lg';
        case md:
          return 'md';
        case sm:
          return 'sm';
      }
      return lg || md || sm;
}