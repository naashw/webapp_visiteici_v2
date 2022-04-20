<template>
  <div>
    <div class="w-4/5 mx-auto">
      <div class="flex">
        <div class="w-1/3">
          <ProfilCard />
        </div>
        <div class="w-2/3 mt-4">
          <div class="flex items-center text-xl font-medium">
            <h2 class="mx-5">Mes annonces</h2>
            <NuxtLink to="/annonces/new/" class="btn-link"
              >+déposer une nouvelle annonce</NuxtLink
            >
          </div>
          <ProfilAnnoncesLists />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  asyncData() {
    return {
      rendering: process.server ? "server" : "client",
    };
  },
};
</script>
