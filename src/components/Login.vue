<template>
  <section>
    <h1 class="pb-2">Login</h1>

    <div v-show="loading">
      <h2>⏳⏳⏳</h2>
    </div>

    <div class="alert alert-danger" v-show="errorMessage" role="alert">{{errorMessage}}</div>

    <form v-on:submit.prevent="login" v-show="!loading">
      <div class="form-group pb-3">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter Username"
          v-model="user.username"
        />
      </div>
      <div class="form-group pb-3">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="user.password"
        />
      </div>

      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </section>
</template>

<script>
import Joi from "joi";
import axois from "axios";

const LOGIN_URL = "https://gentle-peak-06970.herokuapp.com/auth/login";

const schema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),

  password: Joi.string().trim().min(8).required(),
});

export default {
  data() {
    return {
      errorMessage: "",
      loading: false,
      user: {
        username: "",
        password: "",
      },
    };
  },

  watch: {
    user: {
      deep: true,
      handler() {
        this.errorMessage = "";
      },
    },
  },

  methods: {
    async login() {
      //client side validation
      if (this.validUser()) {
        const reqBody = {
          username: this.user.username,
          password: this.user.password,
        };

        try {
          this.loading = true;
          const response = await axois.post(LOGIN_URL, reqBody);

          this.loading = false;

          //we got back the token from the server
          localStorage.setItem("token", response.data.token);
          this.$router.push("/dashboard");
        } catch (error) {
          this.loading = false;
          this.errorMessage = error.response.data.message;
        }
      }
    },

    validUser() {
      const result = schema.validate(this.user);

      if (result.error) {
        this.errorMessage = result.error.message;
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style></style>
