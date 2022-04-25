<template>
  <div v-if="annonceProp" class="card card-compact bg-base-100 shadow-xl flex h-full">
    <div class="">
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
    <div class="card-body h-fit">
      <h2 class="card-title text-base group-hover:text-secondary">
        {{ annonceProp.nom }}
      </h2>
      <div class="mt-auto">
        <p class="text-xs">{{ annonceProp.ville }} {{ annonceProp.code_postal }}</p>
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
