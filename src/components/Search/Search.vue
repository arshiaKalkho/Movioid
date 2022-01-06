<template>
  <div class="search-box-container">
    <input class="search-box" placeholder="Search for movies and tv shows" />
    <button class="search-button button">Search</button>
    <div class="search-buttons">
      <button class="LoginRegister-button button">
        <span class="login-inner-text">Login</span>
        /
        <span class="register-inner-text">Register</span>
      </button>
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
.LoginRegister-button {
  color: white;
  transition: 200ms ease-in-out;
}
.LoginRegister-button:hover {
  border-image: linear-gradient(
      to right,
      var(--color-accent),
      var(--color-text)
    )
    1;

  transition: 100ms ease-in-out;
}
.login-inner-text {
  color: var(--color-text);
  transition: 200ms ease-in-out;
}
.register-inner-text {
  color: var(--color-accent);
  transition: 200ms ease-in-out;
}
.LoginRegister-button:hover .login-inner-text {
  color: var(--color-accent);
  transition: 200ms ease-in-out;
}
.LoginRegister-button:hover .register-inner-text {
  color: var(--color-text);
  transition: 200ms ease-in-out;
}
.LoginRegister-button:active,
.search-button:active {
  background: var(--color-primary);
}
</style>
