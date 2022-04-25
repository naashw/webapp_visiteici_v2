<template>
  <div data-theme="bumblebee" class="bg-base-200">
    <div class="h-full min-h-screen flex flex-col bg-base-200">
      <NavBar />
      <div class="w-3/5 mx-auto">
        <Nuxt keep-alive class="bg-base-200" />
      </div>
    </div>
  </div>
</template>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.container-snap::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.container-snap {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
