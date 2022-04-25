<template>
  <div v-if="annonceProp" class="md:flex w-full">
    <img
      v-if="annonceProp.photos"
      :src="annonceProp.photos.split(',')[0]"
      loading="lazy"
      class="h-full w-full md:w-1/3 object-cover rounded-lg rounded-r-none"
      alt="image de l'annonce"
    />
    <img
      v-else
      src="https://via.placeholder.com/500"
      loading="lazy"
      class="h-full w-full md:w-1/3 object-cover rounded-lg rounded-r-none"
      alt="image de l'annonce"
    />
    <div
      class="flex flex-col justify-items-stretch w-full md:w-2/3 px-4 py-4 bg-white rounded-lg"
    >
      <div class="flex">
        <h2 class="text-xl text-gray-800 font-medium mr-6">
          {{ annonceProp.prix.split(".")[0] }} €
        </h2>
        <p class="text-gray-800 font-semibold tracking-tighter">
          {{ annonceProp.nom }}
        </p>
      </div>
      <p class="text-sm text-gray-500 mt-1 italic">
        {{ annonceProp.nb_chambres }} chambres - {{ annonceProp.surface }}m²
      </p>
      <p class="text-sm text-gray-500 italic">
        {{ annonceProp.ville }}
        <span class="font-medium">{{ annonceProp.code_postal }}</span>
      </p>
      <p class="text-sm text-gray-700 mt-3">
        lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <div class="flex mt-auto">
        <button class="bg-blue-600 text-gray-200 px-2 py-2 ml-auto rounded-md">
          Voir l'annonce
        </button>
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
