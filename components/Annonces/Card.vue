<template>
  <div v-if="annonceProp" class="card card-compact bg-base-100 shadow-xl flex h-full">
    <div class="h-2/3">
      <img
        v-if="annonceProp.photos"
        :src="annonceProp.photos.split(',')[0]"
        loading="lazy"
        class="h-full w-full object-cover rounded-lg rounded-b-none"
        alt="image de l'annonce"
      />
      <img
        v-else
        src="https://via.placeholder.com/500"
        loading="lazy"
        class="h-full w-full object-cover rounded-lg rounded-b-none"
        alt="image de l'annonce"
      />
    </div>
    <div class="card-body h-1/3">
      <h2 class="card-title text-sm truncate  group-hover:text-secondary">
        {{ annonceProp.nom }} dzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadazadzdz zad dazazd azddazazddazad 
      </h2>
      <div class="mt-auto">
        <p class="text-xs truncate">{{ annonceProp.ville }} {{ annonceProp.code_postal }}</p>
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
