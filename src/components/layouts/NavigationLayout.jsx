import React from "react";
import { useCustomBreakpointProvider } from "../hooks/useCustomBreakpointProvider";
import DesktopNavbar from "../navbar/DesktopNavbar";
import MobileNavbar from "../navbar/MobileNavbar";
import Sidebar from "../navbar/Sidebar";
import TabletNavbar from "../navbar/TabletNavbar";

export default function NavigationLayout({
  config,
  session,
  children,
  ...props
}) {
  const breakpoint = useCustomBreakpointProvider();

  return (
    <>
      {config.ux.menu.useSidebar ? (
        <Sidebar session={session} config={config}>
          {React.cloneElement(children, { config, session, ...props })}
        </Sidebar>
      ) : breakpoint == "lg" ? (
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
}
