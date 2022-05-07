<template>
  <div class="h-screen" v-if="user">
    <div
      class="card h-fit w-96 bg-base-100 shadow-xl mx-auto"
      v-show="!showUserPublicForm"
    >
      <figure class="px-10 pt-10 avatar">
        <div class="w-24 rounded-full">
          <img v-if="user.photo_public" :src="user.photo_public" />
          <img
            v-else
            src="https://via.placeholder.com/150x150.png?text=photo+de+profil"
          />
        </div>
      </figure>
      <div class="card-body items-center text-center">
        <p v-if="user.name_public" class="card-title">{{ user.name_public }}</p>
        <h3 v-if="user.email_public" class="card-text">{{ user.email_public }}</h3>
        <h3 v-if="user.telephone_public" class="card-text">
          {{ user.telephone_public }}
        </h3>
        <h3 v-if="user.ville_public" class="card-text">{{ user.ville_public }}</h3>
        <h3 v-if="user.nom_societe_public" class="card-text">
          {{ user.nom_societe_public }}
        </h3>
        <a
          :href="user.url_website_societe_public"
          v-if="user.url_website_societe_public"
          class=""
          >{{ user.url_website_societe_public }}</a
        >

        <div class="card-actions" v-if="this.$auth.user.id == user.user_id">
          <button @click.prevent="changeVisibilityUserForm" class="btn btn-primary">
            Modifier mon profil public
          </button>
        </div>
      </div>
    </div>
    <div v-if="showUserPublicForm">
      <FormUserPublic :user="user" @changeVisibilityUserForm="changeVisibilityUserForm" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },

  data() {
    return {
      showUserPublicForm: false,
    };
  },

  methods: {
    testConnexion() {
      this.$axios.post("/api/userPublic").then((res) => {});
    },
    changeVisibilityUserForm(value) {
      this.showUserPublicForm = !this.showUserPublicForm;
      value.name_public ? (this.user = value) : "";
    },
  },
};
</script>
