<template>
  <div class="form-control py-4">
    <div class="input-group">
      <input
        @keyup.enter="search"
        type="text"
        v-model="inputText"
        placeholder="Que recherchez-vous ?"
        class="input input-bordered w-full"
      />

      <NuxtLink
        :to="{ path: 'annonces', query: { text: inputText } }"
        class="btn btn-square"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    search() {
      this.$router.push({
        path: "/annonces",
        query: { text: this.inputText },
      });
    },
  },

  data() {
    return {
      inputText: this.$route.query.text  || "",
    };
  },
};
</script>
