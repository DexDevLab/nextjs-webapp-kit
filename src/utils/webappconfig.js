export const config = {
  // METADADOS DA APLICAÇÃO WEB (SEO)
  meta: {
    // TÍTULO DA APLICAÇÃO
    title: "nextjs-webapp-kit",
    // DESCRIÇÃO DO SITE
    description: "Web Application",
    // KEYWORDS PARA ENGINE DE BUSCA
    keywords:
      "dexdevlab, dex, nextjs, react, chakraui, web dev, web app, application",
    // SITENAME PARA ENGINE DE BUSCA
    siteName: "DexDevLab",
    // ENDEREÇO DO SITENAME
    url: "https://github.com/DexDevLab",
    // IMAGEM DE REFERÊNCIA PARA ENGINE DE BUSCA
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  // CONFIGURAÇÕES DE AUTENTICAÇÃO
  auth: {
    // SE AUTENTICAÇÃO NO NEXT AUTH SERÁ USADA
    hasAuth: true,
  },
  // AJUSTES DE COMPORTAMENTO DE PERFIL DE USUÁRIO
  profile: {
    // ATIVA O SISTEMA DE PERFIS
    enableProfile: true,
    // ATIVA FOTO DE PERFIL CUSTOMIZADA PARA O USUÁRIO
    profilePicture: true,
    // PERMITE CONVIDADOS
    allowGuest: true,
  },
  // AJUSTES DE INTERFACE PARA UX/UI
  ux: {
    // ATIVA ANIMAÇÃO DE TRANSIÇÃO PARA NAVEGAÇÃO ENTRE PÁGINAS
    enablePageTransitions: true,
    // IMPEDE DE MANEIRA GERAL QUE PÁGINAS POSSAM TER AJUSTE DE ZOOM
    preventZoom: true,
    // IMPEDE A ROLAGEM VERTICAL DAS PÁGINAS. ESSA CONFIGURAÇÃO PODE SER
    // SOBREPOSTA ALTERANDO A PROP PARA CADA PÁGINA
    preventScroll: false,
    // AJUSTES DE MENU DA NAVBAR
    menu: {
      // PERMITIR QUE SEJA ABERTO AO HOVER (PONTEIRO DO MOUSE SOBRE O MENU)
      hover: true,
      // SUBSTITUI O MENU PADRÃO POR UM MENU FEITO POR ACCORDION NA NAVBAR PARA CELULARES
      useAccordionOnMobile: true,
      // ATIVA O USO DA SIDEBAR AO INVÉS DA NAVBAR
      useSidebar: false,
      // OPTA POR UTILIZAR ÍCONES NOS RÓTULOS DOS MENUS NA NAVBAR
      useIconsForNavbarMenu: true,
    },
  },
  // AJUSTES DE TEMAS
  theming: {
    // TEMA DE CORES INICIAL: 'light', 'dark' ou 'system'
    initialColorMode: "light",
    // OPTA POR PRIORIZAR O MODO DE COR DO SISTEMA ANTES DO TEMA DE COR INICIAL
    useSystemColorMode: true,
    // COR PADRÃO DAS FONTES DE FUNDO PARA O TEMA CLARO
    lightModeFontColor: "gray.800",
    // COR PADRÃO DAS FONTES DE FUNDO PARA O TEMA ESCURO
    darkModeFontColor: "gray.50",
    // COR PADRÃO DOS LINKS PARA O TEMA CLARO
    lightModeLinkColor: "brand.900",
    // COR PADRÃO DOS LINKS PARA O TEMA ESCURO
    darkModeLinkColor: "brand.50",
    // COR PADRÃO DOS LINKS DOS MENUS QUANDO EM HOVER
    lightModeHoverColor: "brand.50",
    // COR PADRÃO DOS LINKS DOS MENUS QUANDO EM HOVER
    darkModeHoverColor: "brand.500",
    // CONFIGURA AS CORES A SEREM UTILIZADAS PELO GERENCIAMENTO DE TEMAS DO CHAKRA UI
    colors: {
      // 'BRAND' É O PERFIL BÁSICO PADRÃO DOS TEMAS. OUTROS PODEM SER CRIADOS LIVREMENTE.
      // PARA MAIS INFORMAÇÕES, CONFIRA A DOCUMENTAÇÃO DO CHAKRA UI.
      brand: {
        900: "#1A365D",
        800: "#2A4365",
        700: "#2C5282",
        600: "#2B6CB0",
        500: "#3182CE",
        400: "#4299E1",
        300: "#63B3ED",
        200: "#90CDF4",
        100: "#BEE3F8",
        50: "#2a69ac",
      },
    },
    // ARMAZENA OS ÍCONES SVG UTILIZADOS COMO BASE
    customIcons: {
      // UTILIZE ESTE MODELO PARA DEFINIR QUAISQUER 'path' SVG QUE VOCÊ QUEIRA
      brand: {
        path: (
          <path d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c6 0 12-3 16-7l-8-5c-2 3-5 4-8 4-5 0-9-3-11-7h28l1-3c0-11-8-18-19-18zm-10 15c2-4 5-7 10-7s8 3 9 7h-19zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10zm83-29v46h-9V5h9zM37 0l37 64H0L37 0zm92 5-27 48L74 5h10l18 30 17-30h10zm59 12v10l-3-1c-6 0-10 4-10 10v15h-9V17h9v9c0-5 6-9 13-9z" />
        ),
        viewBox: "0 0 283 64",
      },
    },
  },
  // AJUSTES DAS NOTIFICAÇÕES DO TIPO TOAST. TODOS OS AJUSTES PODEM SER SOBREPOSTOS
  // CASO AS PROPS INDIVIDUAIS DAS TOASTS FOREM UTILIZADAS.
  toasts: {
    // LIMITE DE TOASTS SIMULTÂNEOS. 0 DEFINE UMA QUANTIDADE ILIMITADA
    limit: 0,
    // OPTA POR USAR O TEMA DE CORES PARA APLICAR SOBRE AS TOASTS
    useColorModeAsTheme: false,
    // PAUSA A TOAST QUANDO ELA NÃO ESTIVER NA TELA PRINCIPAL
    pauseOnFocusLoss: false,
    // PAUSA A TOAST QUANDO O PONTEIRO DO MOUSE ESTÁ SOBRE ELA
    pauseOnHover: false,
    // INCLUI BOTÃO DE FECHAMENTO NA TOAST
    closeButton: false,
    // TEMPO EM MILISEGUNDOS PARA FECHAR AUTOMATICAMENTE UMA TOAST
    autoClose: 3000,
    // ATIVA OS ÍCONES PADRÃO NOS TOASTS
    enableDefaultIcons: true,
    // UTILIZA OS CÓDIGOS DE ERRO COMO SE FOSSEM ÍCONES PARA ERROS ESPECÍFICOS NA APLICAÇÃO
    errorCodesAsIcons: false,
    // OCULTA A BARRA DE PROGRESSO INDICANDO O TEMPO RESTANTE PARA A TOAST FECHAR
    hideProgressBar: false,
    // TRANSIÇÃO ESPECÍFICA PARA A TOAST. O CAMPO VAZIO APLICA A ANIMAÇÃO PADRÃO DA TOAST.
    // PARA UTILIZAR OUTRAS TRANSIÇÕES, VERIFIQUE A DOCUMENTAÇÃO DA BIBLIOTECA 'react-toastify'.
    toastTransition: "",
  },
};
