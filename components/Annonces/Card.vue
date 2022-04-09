<template>
  <div v-if="annonceProp" class="card card-compact w-full h-full shadow-xl">
    <figure>
      <img
        :src="annonceProp.photos.split(',')[0]"
        loading="lazy"
        alt="image de l'annonce"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-base group-hover:text-warning">{{ annonceProp.nom }}</h2>
      <div class="pt-4 mt-auto">
        <p class="text-sm">{{ annonceProp.ville }} {{ annonceProp.code_postal }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    annonceProp: Object,
  },
};
</script>
