
"use client"
import { NavbarDemo, SidebarDemo } from '@/components/sidebaruser'
import { Html, Head, Main, NextScript } from 'next/document'
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export default function Document() {

  const [open, setOpen] = useState(false);

  return (
    <Html lang="en">
      <Head />
   <>
      
  
  <Main />
      
        <NextScript />
     </>
    </Html>
  )
}








