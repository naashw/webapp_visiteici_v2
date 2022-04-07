<template>
  <div class="">
    <!-- item card -->
    <div v-if="annonces" v-for="(annonce, index) in annonces" :key="annonce.id">
      <NuxtLink
        :to="`/annonces/${annonce.id}`"
        tag="a"
        class="md:flex shadow-lg mx-6 md:container md:mx-auto my-4 max-w-lg md:max-w-6xl h-64 bg-base-100 rounded-lg"
      >
        <LazyAnnoncesHero v-if="annonce" :annonceProp="annonce" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    "$route.query": "$fetch",
  },

  data() {
    return {
      annonces: [],
    };
  },

  async fetch() {
    // assign url for cors error
    const apiUrl = process.env.API_URL;
    const queryText = this.$route.query.text ? "?text=" + this.$route.query.text : "";
    // fetch annonces in api url
    /* this.annonces = await fetch("https://api.visiteici.fr/api/annonces").then((res) =>
      res.json()
    ); */

    // fetch annonces in api url with axios
    this.annonces = await this.$axios
      .get("https://api.visiteici.fr/api/annonces" + queryText)
      .then((res) => res.data);
  },
};
</script>

<style></style>
