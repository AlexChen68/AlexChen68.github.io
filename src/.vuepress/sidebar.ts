
import { sidebar } from "vuepress-theme-hope";
import { java} from "./sidebar/java";
import { spring} from "./sidebar/spring";
import { advance} from "./sidebar/advance";
import { database } from "./sidebar/database";

export const sidebarConig = sidebar({
  // java
  "/md/java/": java,
  // spring
  "/md/spring/": spring,
  "/md/spring/spring/": "structure",
  "/md/spring/springboot/": "structure",
  "/md/spring/springcloud/": "structure",
  // advance
  "/md/advance/": advance,
  "/md/advance/ds/": "structure",
  "/md/advance/algo/": "structure",
  "/md/advance/design/": "structure",
  // database
  "/md/database/": database,
  "/md/book/": "structure", 
  // tool
  "/md/tool/": "structure",
})