<template>
  <div class="flex justify-center mx-auto bg-base-200" v-if="annonces">
    <div v-for="(annonce, index) in annonces" :key="annonce.id" class="mx-2 my-4 w-1/5 h-96">
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
    const queryText = "?nb=4";

    // fetch annonces in api url with axios
    this.annonces = await this.$axios
      .get("/api/annonces" + queryText)
      .then((res) => res.data);
  },
};
</script>

<style></style>
