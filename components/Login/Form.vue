<template>
  <div>
    <div class="w-full">
      <form class="bg-white px-8 pt-6 pb-8 mb-4" @submit.prevent="userLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            v-bind:class="{ 'border-error': errors.email }"
            v-model="login.email"
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
            v-model="login.password"
            placeholder="**********"
          />

          <p v-if="errors.password" class="text-error text-sm italic">
            {{ this.errors.password[0] }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Connexion
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Mot de passe oublié ?
          </a>
        </div>
        <p v-if="errors.message" class="text-center text-error text-sm italic">
          {{ this.errors.message }}
        </p>
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
      login: {
        email: undefined,
        password: undefined,
      },
      errors: {
        message: undefined,
        email: undefined,
        password: undefined,
      },
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth
          .loginWith("laravelSanctum", {
            data: this.login,
          })
          .then((res) => res.data);

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
