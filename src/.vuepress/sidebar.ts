
import { sidebar } from "vuepress-theme-hope";
import { javaSidebar} from "./sidebar/java";
import { springSidebar} from "./sidebar/spring";
import { advanceSidebar, desginSidebar } from "./sidebar/advance";
import { databaseSidebar } from "./sidebar/database";
import { devopsSidebar } from "./sidebar/devops";
import { middlewareSidebar } from "./sidebar/middleware";

export const sidebarConig = sidebar({
  "/md/java/": javaSidebar,
  "/md/spring/": springSidebar,
  "/md/database/": databaseSidebar,
  "/md/middleware/": middlewareSidebar,
  "/md/advance/": advanceSidebar,
  "/md/advance/design/": desginSidebar,
  "/md/devops/": devopsSidebar,
  "/md/resource/": "structure", 
})