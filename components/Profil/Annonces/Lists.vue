<template>
  <div
    class="grid grid-cols-3 bg-base-200 my-2 "
    v-if="annonces"
  >
    <div v-for="(annonce, index) in annonces" :key="annonce.id" class=" mx-2 my-2">
      <NuxtLink :to="`/annonces/${annonce.id}`" class="bg-base-100">
        <LazyAnnoncesCard v-if="annonce" :annonceProp="annonce" class="group" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      annonces: [],
    };
  },

  async fetch() {
    // assign url for cors error
    const userId = "?userId=" + this.$auth.user.id;
    const apiUrl = "/api/annonces"+ userId;

    //test url à enlever
    const testUrl = "/api/annonces?nb=7";

    // fetch annonces in api url with axios
    this.annonces = await this.$axios
      .get(testUrl)
      .then((res) => res.data);
  },
};
</script>
