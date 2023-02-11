
import { sidebar } from "vuepress-theme-hope";
import { java} from "./sidebar/java";
import { spring} from "./sidebar/spring";
import { advance} from "./sidebar/advance";
import { db } from "./sidebar/db";

export const sidebarConig = sidebar({
  // java
  "/md/java/": java,
  // "/md/java/basic/": "structure",
  // "/md/java/collection/": "structure",
  // "/md/java/juc/": "structure",
  // "/md/java/jvm/": "structure",
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
  // db
  "/md/db/": db,
  "/md/book/": "structure",
  // tool
  "/md/tool/": "structure",
})