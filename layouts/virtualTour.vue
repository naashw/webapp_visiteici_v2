<template>
  <div data-theme="bumblebee" class="bg-base-200 min-h-screen">
    <div class="h-screen flex flex-col bg-base-200">
      <NavBar />
      <div class="h-full">
        <Nuxt keep-alive class="bg-base-200 h-full" />
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
