<template>
  <section>
    <h1>Dashboard</h1>
    <hr />
    <h2 class="mb-5">Hello {{user.username}}! 😁</h2>

    <button class="btn btn-primary mr-3" v-on:click="logout">Logout</button>

    <button
      class="btn btn-info mr-3"
      v-on:click="toggleForm"
    >{{showForm ? 'Hide' : 'Show'}} Notes Form</button>

    <button
      class="btn btn-danger"
      v-show="user.roles === 'admin'"
      v-on:click="getUsersList"
    >Show Users</button>

    <form v-show="showForm" class="mt-5" v-on:submit.prevent="addNote">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Enter Note Title 🍜"
          v-model="newNote.title"
          required
        />
      </div>

      <div class="form-group">
        <textarea
          class="form-control"
          id="note"
          rows="3"
          placeholder="Enter your Note 📜"
          v-model="newNote.note"
          required
        ></textarea>
      </div>

      <button type="submit" class="btn btn-success">Add Note ✒</button>
    </form>

    <section id="usersList" class="mt-3" v-show="toggleUsersList">
      <h3>
        This List is only visible to ADMIN
        <span
          class="closeUserList"
          v-on:click="toggleUsersList = false"
        >❌</span>
      </h3>
      <ul>
        <li v-for="user in usersList" v-bind:key="user._id">{{user.username}}</li>
      </ul>
    </section>

    <section id="notes" class="row mt-4">
      <div
        class="card text-white bg-success mt-4 col-6 mr-3"
        style="max-width: 20rem;"
        v-for="note in notes"
        v-bind:key="note._id"
      >
        <h4 class="card-header">{{note.title}}</h4>
        <div class="card-body">
          <p class="card-text">{{note.note}}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import axios from "axios";
const API_URL = "https://gentle-peak-06970.herokuapp.com";

export default {
  data() {
    return {
      showForm: false,
      user: {},
      newNote: {
        title: "",
        note: "",
      },
      notes: [],
      usersList: [],
      toggleUsersList: false,
    };
  },

  async mounted() {
    const response = await axios.get(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    });

    if (response.data.user) {
      this.user = response.data.user;
      this.getNotes();
    } else {
      this.logout();
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },

    toggleForm() {
      this.showForm = !this.showForm;
    },

    async addNote() {
      try {
        const response = await axios.post(
          `${API_URL}/api/v1/notes`,
          this.newNote,
          {
            headers: {
              authorization: `Bearer ${localStorage.token}`,
            },
          }
        );
        console.log(response.data);

        this.notes.push(response.data);

        this.newNote.note = "";
        this.newNote.title = "";
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    },

    async getNotes() {
      const response = await axios.get(`${API_URL}/api/v1/notes`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });

      this.notes = response.data.reverse();
    },

    async getUsersList() {
      this.toggleUsersList = true;
      const response = await axios.get(`${API_URL}/api/v1/users`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });

      this.usersList = response.data;
    },
  },
};
</script>

<style scoped>
.closeUserList {
  cursor: pointer;
}
</style>