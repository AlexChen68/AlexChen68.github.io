
import { sidebar } from "vuepress-theme-hope";
import { javaSidebar } from "./java/index.js";
import { springSidebar } from "./spring/index.js";

export const sidebarConig = sidebar({
  "/md/java": javaSidebar,
  "/md/spring": springSidebar
})