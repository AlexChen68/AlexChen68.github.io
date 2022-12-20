
import { sidebar } from "vuepress-theme-hope";
import { javaSidebar } from "./java";
import { springSidebar } from "./spring";
import { advancedSidebar } from "./advanced";
import { dbSidebar } from "./db";

export const sidebarConig = sidebar({
  "/md/java/": javaSidebar,
  "/md/spring/": springSidebar,
  "/md/advanced/": advancedSidebar,
  "/md/db/": "structure",
  "/md/book/": "structure",
  "/md/tool/": "structure"
})