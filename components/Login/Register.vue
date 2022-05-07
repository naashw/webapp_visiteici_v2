<template>
  <div>
    <div class="w-full">
      <form class="bg-white px-8 pt-6 pb-8 mb-4" @submit.prevent="userRegister">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Nom d'utilisateur
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nickname"
            type="text"
            v-bind:class="{ 'border-error': errors.name }"
            v-model="register.name"
          />
          <p v-if="errors.name" class="text-error text-sm italic">
            {{ this.errors.name[0] }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            v-bind:class="{ 'border-error': errors.email }"
            v-model="register.email"
          />
          <p v-if="errors.email" class="text-error text-sm italic">
            {{ this.errors.email[0] }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mot de passe
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-bind:class="{ 'border-error': errors.password }"
            v-model="register.password"
            placeholder="**********"
          />

          <p v-if="errors.password" class="text-error text-sm italic">
            {{ this.errors.password[0] }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Confirmer le mot de passe
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password_confirmation"
            type="password"
            v-bind:class="{ 'border-error': errors.password_confirmation }"
            v-model="register.password_confirmation"
            placeholder="**********"
          />

          <p v-if="errors.password_confirmation" class="text-error text-sm italic">
            {{ this.errors.password_confirmation[0] }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="btn btn-secondary font-bold py-2 px-4 rounded"
            type="submit"
          >
            Crée un compte
          </button>
           <p v-if="errors.message" class="text-center text-error text-sm italic">
          {{ this.errors.message }}
        </p>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2022 Visite'ici. Tout droit réservé.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      register: {
        name: undefined,
        email: undefined,
        password: undefined,
        confirm_password: undefined,
      },
      errors: {
        message: undefined,
        email: undefined,
        password: undefined,
      },
    };
  },
  methods: {
    async userRegister() {
      try {
        await this.$axios.get("/sanctum/csrf-cookie");
        const apiUrl = "/register";

        // register user with api url
        await this.$axios.post(apiUrl, this.register).then((res) => res.data);

        await this.$auth.loginWith("laravelSanctum", {
          data: {
            email: this.register.email,
            password: this.register.password,
          },
        });

        this.$router.push("/profil");
      } catch (err) {
         if (err.response === undefined) {
          this.errors.message = "Erreur de connexion au serveur";
        } else {
          this.errors = err.response.data.errors;
        }
      }
    },
  },
};
</script>
