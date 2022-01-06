<template>
  <div class="search-box-container">
    <input class="search-box" />
    <button class="search-button button">Search</button>
    <div class="search-buttons">
      <button class="Login-button button">Login / Register</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
};
</script>
<style>
.search-box-container {
  padding-bottom: 3rem;
  padding-left: 5rem;
}
.search-box {
  text-align: center;
  width: 40vw;
}
.search-buttons {
  margin-top: 1rem;
}
.button {
  color: var(--color-text);
  border: none;
  border-radius: 3px;
  height: 1.5rem;
  background: var(--color-HeaderFooter);
  border: 1px solid grey;
}
.button:hover {
  border: 1px solid var(--color-text);
}
.search-button {
  margin-left: 0.5rem;
  width: 5rem;
}
</style>
