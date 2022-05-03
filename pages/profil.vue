<template>
  <div>
    <div class="flex gap-2 mx-auto mt-4">
      <div class="md:w-1/3 sm:w-full">
        <p v-if="$fetchState.pending">Récupération du profil</p>
        <p v-else-if="$fetchState.error">
          Une erreur est apparu dans la récupération du profil
        </p>
        <div v-else>
          <ProfilCard :user="publicUser" />
        </div>
      </div>
      <div class="md:w-2/3 sm:w-full">
        <div class="flex items-center text-xl font-medium">
          <h2 class="mx-5">Mes annonces</h2>
          <NuxtLink to="/annonces/new/" class="btn-link"
            >+déposer une nouvelle annonce</NuxtLink
          >
        </div>
        <ProfilAnnoncesLists />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",

  data() {
    return {
      publicUser: {},
    };
  },
  async fetch() {
    console.log("FETCHING");
    const userPublicApi = "/api/userPublic/" + this.$auth.user.id;

    // fetch annonces in api url with axio
    const res = await this.$axios.get(userPublicApi).then((res) => res.data);
    Object.keys(res).length !== 0
      ? (this.publicUser = res)
      : (this.publicUser.name_public = this.$auth.user.name);
  },

  fetchOnServer: true,
};
</script>
