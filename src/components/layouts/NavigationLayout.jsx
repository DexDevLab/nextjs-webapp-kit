import React from "react";
import { useCustomBreakpointProvider } from "../hooks/useCustomBreakpointProvider";
import DesktopNavbar from "../navigation/navbar/DesktopNavbar";
import MobileNavbar from "../navigation/navbar/MobileNavbar";
import TabletNavbar from "../navigation/navbar/TabletNavbar";
import Sidebar from "../navigation/sidebar/Sidebar";

export default function NavigationLayout({
  config,
  session,
  children,
  ...props
}) {
  const breakpoint = useCustomBreakpointProvider();

  const LoadedNavbar = () => {
    return (
      <>
        {breakpoint == "lg" ? (
          <DesktopNavbar session={session} config={config}>
            {React.cloneElement(children, { config, session, ...props })}
          </DesktopNavbar>
        ) : breakpoint == "md" ? (
          <TabletNavbar session={session} config={config}>
            {React.cloneElement(children, { config, session, ...props })}
          </TabletNavbar>
        ) : (
          breakpoint == "sm" && (
            <MobileNavbar session={session} config={config}>
             {React.cloneElement(children, { config, session, ...props })}
            </MobileNavbar>
          )
        )}
      </>
    );
  };

  return (
    <>
      {config.ux.menu.useSidebar ? (
        <Sidebar session={session} config={config}>
          {React.cloneElement(children, { config, session, ...props })}
        </Sidebar>
      ) : (
        <>{LoadedNavbar()}</>
      )}
    </>
  );
}
