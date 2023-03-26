
import { sidebar } from "vuepress-theme-hope";
import { javaSidebar, concurrencySidebar } from "./sidebar/java";
import { springSidebar} from "./sidebar/spring";
import { advanceSidebar, desginSidebar, leetcodeSidebar } from "./sidebar/advance";
import { databaseSidebar } from "./sidebar/database";
import { devopsSidebar } from "./sidebar/devops";
import { middlewareSidebar } from "./sidebar/middleware";
import { frontendSidebar } from "./sidebar/frontend";
import { resourceSidebar } from "./sidebar/resource";

export const sidebarConig = sidebar({
  "/md/java/": javaSidebar,
  "/md/java/concurrency/": concurrencySidebar,
  "/md/spring/": springSidebar,
  "/md/database/": databaseSidebar,
  "/md/middleware/": middlewareSidebar,
  "/md/advance/": advanceSidebar,
  "/md/advance/design/": desginSidebar,
  "/md/advance/leetcode/": leetcodeSidebar,
  "/md/devops/": devopsSidebar,
  "/md/frontend/": frontendSidebar,
  "/md/resource/": resourceSidebar, 
})