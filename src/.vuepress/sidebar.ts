
import { sidebar } from "vuepress-theme-hope";
import { javaSidebar, concurrencySidebar } from "./sidebar/java";
import { springSidebar } from "./sidebar/spring";
import { advanceSidebar, desginSidebar, algoSidebar } from "./sidebar/advance";
import { databaseSidebar } from "./sidebar/database";
import { devopsSidebar } from "./sidebar/devops";
import { middlewareSidebar } from "./sidebar/middleware";
import { frontendSidebar } from "./sidebar/frontend";
import { distributedSidebar } from "./sidebar/distributed";

export const sidebarConig = sidebar({
   "/java/": javaSidebar,
   "/spring/": springSidebar,
   "/database/": databaseSidebar,
   "/distributed/": distributedSidebar,
   "/middleware/": middlewareSidebar,
   "/advance/": advanceSidebar,
   "/advance/ds/": "structure",
   "/advance/algo/": algoSidebar,
   "/advance/design/": desginSidebar,
   "/advance/leetcode/": "structure",
   "/devops/": devopsSidebar,
   "/frontend/": frontendSidebar,
   "/resource/": "structure",
});