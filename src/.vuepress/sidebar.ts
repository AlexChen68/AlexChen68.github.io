
import { sidebar } from "vuepress-theme-hope";
import { java} from "./sidebar/java";
import { springSidebar } from "./sidebar/spring";
import { advanced, design} from "./sidebar/advanced";
import { dbSidebar } from "./sidebar/db";

export const sidebarConig = sidebar({
  "/md/java/": java,
  "/md/spring/": springSidebar,
  "/md/advanced/": advanced,
  "/md/advanced/design/": design,  
  // "/md/db/": "structure",
  // "/md/book/": "structure",
  // "/md/tool/": "structure"
})