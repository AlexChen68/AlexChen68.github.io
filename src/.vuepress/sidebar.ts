
import { sidebar } from "vuepress-theme-hope";
import { javaSidebar, concurrencySidebar } from "./sidebar/java";
import { springSidebar} from "./sidebar/spring";
import { advanceSidebar, desginSidebar } from "./sidebar/advance";
import { databaseSidebar } from "./sidebar/database";
import { devopsSidebar } from "./sidebar/devops";
import { middlewareSidebar } from "./sidebar/middleware";
import { frontendSidebar } from "./sidebar/frontend";

export const sidebarConig = sidebar({
  "/md/java/": javaSidebar,
  "/md/java/concurrency/": concurrencySidebar,
  "/md/spring/": springSidebar,
  "/md/database/": databaseSidebar,
  "/md/middleware/": middlewareSidebar,
  "/md/advance/": advanceSidebar,
  "/md/advance/design/": desginSidebar,
  "/md/devops/": devopsSidebar,
  "/md/frontend/": frontendSidebar,
  "/md/resource/": "structure", 
})