<template>
  <div class="flex flex-wrap bg-base-200 my-2" v-if="annonces">
    <div
      v-for="(annonce, index) in annonces"
      :key="annonce.id"
      class="w-1/3 max-h-96 p-2"
    >
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

    const userId = "?userId=" + this.$auth.user.id;
    const apiUrl = "/api/annonces" + userId;

    // fetch annonces in api url with axios
    this.annonces = await this.$axios.get(apiUrl).then((res) => res.data);
  },
};
</script>
