<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="stylus" scoped>
@import "~@/style/palette.styl";
#app
  font-family Ubuntu, Avenir, Helvetica, Arial, sans-serif
  margin-top 2rem
  display flex
  flex-flow column nowrap

#nav
  text-align center

#nav a
  font-weight bold
  color $mainColor

#nav a.router-link-exact-active
  color darken($mainColor, 50%)
</style>
