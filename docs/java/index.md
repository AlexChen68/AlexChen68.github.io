---
title: Java
date: 2023-10-17
---

<script setup>
import { data } from './java.data.js'
</script>

# Java

<ul>
   <li v-for="post of data">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
   </li>
</ul>


