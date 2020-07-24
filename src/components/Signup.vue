<template>
  <section>
    <h1 class="mb-3 mt-3">Sign Up 😎</h1>

    <div class="alert alert-danger mt-2" role="alert" v-if="errorMessage">{{ errorMessage }}</div>

    <div v-show="loading">
      <h2>⌛⏳⏳</h2>
    </div>

    <form v-show="!loading" class="pt-4" v-on:submit.prevent="signup">
      <div class="form-group pb-3">
        <input
          type="username"
          class="form-control"
          id="username"
          placeholder="Enter Username"
          v-model="user.username"
          required
        />
      </div>
      <div class="form-group pb-3">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="Confirm Password"
          v-model="user.confirmPassword"
          required
        />
      </div>

      <div class="form-group">
        <label for="exampleSelect1">Select Role</label>
        <select class="form-control" placeholder="Select" id="roles" v-model="user.roles">
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </section>
</template>

<script>
import Joi from "joi";
import axios from "axios";

const SIGNUP_URL = "https://gentle-peak-06970.herokuapp.com/auth/signup";

const schema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),

  password: Joi.string().trim().min(8).required(),

  confirmPassword: Joi.string().trim().min(8).required(),

  roles: Joi.string().trim(),
});

export default {
  data() {
    return {
      errorMessage: "",
      loading: false,
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        roles: "user",
      },
    };
  },

  watch: {
    user: {
      handler() {
        this.errorMessage = "";
      },
      deep: true,
    },
  },

  methods: {
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = "Passwords do not match 😵";
        return false;
      }

      const result = schema.validate(this.user);

      if (result.error) {
        this.errorMessage = result.error.message;
        return false;
      } else {
        return true;
      }
    },

    async signup() {
      this.errorMessage = "";

      if (this.validUser()) {
        const reqBody = {
          username: this.user.username,
          password: this.user.password,
          roles: this.user.roles,
        };

        try {
          this.loading = true;
          const response = await axios.post(SIGNUP_URL, reqBody);

          localStorage.setItem("token", response.data.token);
          this.loading = false;
          this.$router.push("/dashboard");
        } catch (error) {
          this.loading = false;
          this.errorMessage = error.response.data.message;
        }
      }
    },
  },
};
</script>

<style></style>
