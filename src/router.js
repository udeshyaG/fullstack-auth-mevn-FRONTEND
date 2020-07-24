import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";

Vue.use(VueRouter);

function loggedInRedirect(to, from, next) {
  if (localStorage.token) {
    next("/dashboard");
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next("/login");
  }
}

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/signup",
      name: "signup",
      component: Signup,
      beforeEnter: loggedInRedirect,
    },

    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: loggedInRedirect,
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: isLoggedIn,
    },
  ],
});
