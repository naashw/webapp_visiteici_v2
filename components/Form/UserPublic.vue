<template>
  <div class="" v-if="user">
    <div class="card h-fit w-96 bg-base-100 shadow-xl mx-auto">
      <figure class="px-10 pt-10 avatar">
        <div class="w-24 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=92310" />
        </div>
      </figure>
      <div class="card-body items-center text-center">
        <h2 v-if="user.name_public" class="card-title">{{ user.name_public }}</h2>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type=""
          name=""
          :placeholder="user.name_public"
          v-model="userPublic.name_public"
        />
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button @click.prevent="SaveUserPublic" class="btn btn-primary">
            Sauvegarder mon profil public
          </button>
        </div>
      </div>
      -
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
      userPublic: {
        name_public: undefined,
        email_public: undefined,
        telephone_public: undefined,
        ville_public: undefined,
        nom_societe_public: undefined,
        url_website_societe_public: undefined,
      },
      errors: {
        name_public: undefined,
        email_public: undefined,
        telephone_public: undefined,
        ville_public: undefined,
        nom_societe_public: undefined,
        url_website_societe_public: undefined,
      },
    };
  },
  methods: {
    SaveUserPublic() {
      this.$axios
        .post("/api/userPublic", this.userPublic)
        .then((response) => {
          this.userPublic = response.data.user;
          this.$emit("changeVisibilityUserForm", this.userPublic);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
