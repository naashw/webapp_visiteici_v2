<template>
  <div class="w-full h-full">
    <div
      class="badge badge-success inline-block h-full w-full text-center"
      v-if="critere == 1"
    >
      {{ name }}
    </div>
    <div class="badge badge-error h-full w-full text-center" v-else>{{ name }}</div>
  </div>
</template>
<script>
export default {
  props: {
    critere: Number,
    name: String,
    type: 1,
  },
};
</script>
