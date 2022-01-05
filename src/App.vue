<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,400&family=Shippori+Antique+B1&display=swap");
:root {
  --color-primary: #cacfd2;
  --color-text: #ed8e53;
  --color-accent: #e35259;
  --color-HeaderFooter: #2e4053;
}
#app {
  font-family: "Roboto", sans-serif;
  color: var(--color-text);
}
body {
  margin: 0;
  padding: 0;
  background-color: var(--color-primary);
}
</style>
