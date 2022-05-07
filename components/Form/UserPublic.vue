<template>
  <div class="" v-if="userData">
    <form enctype="multipart/form-data">
      <div class="card h-fit w-96 bg-base-100 shadow-xl mx-auto">
        <figure class="px-10 pt-10 avatar">
          <div class="w-24 rounded-full">
            <img v-if="user.photo_public" :src="userData.photo_public" />
            <img
              v-else
              src="https://via.placeholder.com/150x150.png?text=photo+de+profil"
            />
          </div>
        </figure>
        <div class="card-body items-center text-center">
          <label class="label">
            <span class="label-text">Photos de votre profil publique</span>
          </label>
          <input
            type="file"
            name="photo"
            id="file"
            ref="myFiles"
          />
          <FormInputText
            title="Nom publique"
            :placeholderInput="userData.name_public"
            @input="
              (input) => {
                userData.name_public = input;
              }
            "
            :error="errors.name_public"
          />
          <FormInputText
            title="Adresse email publique"
            :placeholderInput="userData.email_public"
            @input="
              (input) => {
                userData.email_public = input;
              }
            "
            :error="errors.email_public"
          />
          <FormInputText
            title="Numéro de télephone publique"
            :placeholderInput="userData.telephone_public"
            @input="
              (input) => {
                userData.telephone_public = input;
              }
            "
            :error="errors.telephone_public"
          />
          <FormInputText
            title="ville_public"
            :placeholderInput="userData.ville_public"
            @input="
              (input) => {
                userData.ville_public = input;
              }
            "
            :error="errors.ville_public"
          />
          <FormInputText
            title="nom_societe_public"
            :placeholderInput="userData.nom_societe_public"
            @input="
              (input) => {
                userData.nom_societe_public = input;
              }
            "
            :error="errors.nom_societe_public"
          />
          <FormInputText
            title="url_website_societe_public"
            :placeholderInput="userData.url_website_societe_public"
            @input="
              (input) => {
                userData.url_website_societe_public = input;
              }
            "
            :error="errors.url_website_societe_public"
          />

          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
            <button @click.prevent="UpdateUserData" class="btn btn-primary">
              Sauvegarder mon profil public
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      userData: this.user,
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
    UpdateUserData() {
      this.userData.photo_public = this.$refs.myFiles.files[0] ? this.$refs.myFiles.files[0] : '';

      const formData = new FormData();
      for (const data in this.userData) {
        formData.append(data, this.userData[data]);
      }

      this.$axios
        .post("/api/userPublic", formData)
        .then((response) => {
          this.userData = response.data.user;
          this.$emit("changeVisibilityUserForm", this.userData);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
