"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../../utils/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) setOpenProp(openState);
    else _setOpen(openState);
  }, [setOpenProp, open]);

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev);
  }, [isMobile, setOpen]);

  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(() => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }), [state, open, setOpen, isMobile, openMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div style={style} className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)} {...props}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent className="bg-sidebar w-[18rem] p-0" side={side}>
          <SheetHeader className="sr-only"><SheetTitle>Sidebar</SheetTitle></SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="group peer hidden md:block" data-state={state} data-variant={variant} data-side={side}>
      <div className={cn("bg-sidebar flex h-full w-[16rem] flex-col", className)} {...props}>
        {children}
      </div>
    </div>
  );
}

function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" className={cn("size-7", className)} onClick={(e) => { onClick?.(e); toggleSidebar(); }} {...props}>
      <PanelLeftIcon /><span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarMenuButton({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
  const Comp = asChild ? Slot : "button";
  const button = <Comp data-active={isActive} className={cn("flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent", className)} {...props} />;
  if (!tooltip) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" children={typeof tooltip === 'string' ? tooltip : tooltip.children} />
    </Tooltip>
  );
}

export { Sidebar, SidebarProvider, SidebarTrigger, SidebarMenuButton, useSidebar };