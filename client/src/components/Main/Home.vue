<template>
  <div class="main">
    <Search></Search>
  </div>
</template>

<script>
import Search from "../Search/Search.vue";
export default {
  name: "Home",
  components: {
    Search,
  },
};
</script>

<sytle lang="css">
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../../assets/movioid-main-page-background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 0;
}
</sytle>
