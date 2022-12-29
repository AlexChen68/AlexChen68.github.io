import { arraySidebar, blog, sidebar } from "vuepress-theme-hope";

export const advance = arraySidebar([
  {
    text: "数据结构",
    icon: "structure",
    prefix: "ds/",
    children: "structure"
  },
  {
    text: "算法基础",
    icon: "function",
    prefix: "algo/",
    children: "structure"
  },
  {
    text: "设计模式",
    icon: "blog",
    prefix: "design/",
    children: "structure"
  }
]); 

// export const datastructure = arraySidebar([
//   {
//     text: "数据结构",
//     icon: "structure",
//     prefix: "ds/",
//     children: "structure"
//   }
// ]);

// export const algo = arraySidebar([
//   {
//     text: "算法基础",
//     icon: "function",
//     collapsable: true,
//     prefix: "algo/",
//     children: "structure"
//   }
// ]);

// export const design = arraySidebar([
//   "principle",
//   {
//     text: "创建型模式",
//     icon: "stack",
//     prefix: "creational/",
//     children: ["Singleton", "FactoryMethod", "AbstractFactory", "Builder", "Prototype"]
//   },
//   {
//     text: "结构型模式",
//     icon: "stack",
//     prefix: "structural/",
//     children: ["Facade", "Adapter"]
//   },
//   {
//     text: "行为型模式",
//     icon: "stack",
//     prefix: "behavioural/",
//     children: ["chain"]
//   },
// ]);