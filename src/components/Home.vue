<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3 pb-4">Basic auth 🚀</h1>
      <p
        class="lead pb-3"
      >This app uses Vuejs (front-end), NodeJS (back-end) and Mongo Db(database) and Bootswatch (for styling)</p>
      <hr class="my-4" />
      <p
        class="pb-3"
      >This app is very basic but it is a very covers very important topics. Authentication feature can be useful for any website</p>
      <p class="lead">
        <router-link
          class="btn btn-primary btn-lg mr-4"
          v-bind:to="{name: 'signup'}"
          role="button"
        >Sign Up</router-link>

        <router-link class="btn btn-success btn-lg" v-bind:to="{name: 'login'}" role="button">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>