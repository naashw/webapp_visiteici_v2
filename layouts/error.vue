<template>
  <div class="">
    <div class="flex justify-center mt-48">
      <div class="justify-center text-center ">

        <h1 class="text-xl font-bold my-2" v-if="error.statusCode === 404">Erreur 404 : page introuvable</h1>
        <h1 v-else>Une erreur est apparu</h1>
        <NuxtLink class="btn btn-secondary" to="/">Revenir à l'accueil</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>
