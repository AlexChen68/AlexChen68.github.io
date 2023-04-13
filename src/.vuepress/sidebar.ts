
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
  "/java/": javaSidebar,
  // "/java/basic/": "structure",
  // "/java/collection/": "structure",
  // "/java/concurrency/": concurrencySidebar,
  // "/java/jvm/": "structure",
  "/spring/": springSidebar,
  "/database/": databaseSidebar,
  "/middleware/": middlewareSidebar,
  "/advance/": advanceSidebar,
  "/advance/design/": desginSidebar,
  "/advance/leetcode/": "structure",
  "/devops/": devopsSidebar,
  "/frontend/": frontendSidebar,
  "/resource/": resourceSidebar
})