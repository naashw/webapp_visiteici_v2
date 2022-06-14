<template>
  <div>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <img
          v-if="imagesProps[0]"
          :src="imagesProps[0].url"
          alt=""
          class="h-full w-full aspect-square rounded-lg object-cover"
        />
        <img
          v-else
          src="https://via.placeholder.com/500"
          class="w-full rounded-lg"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <img
          v-if="imagesProps[1]"
          :src="imagesProps[1].url"
          class="rounded-lg aspect-square object-fill"
        />
        <img v-else src="https://via.placeholder.com/500" class="rounded-lg" />

        <img
          v-if="imagesProps[2]"
          :src="imagesProps[2].url"
          class="rounded-lg aspect-square object-cover"
        />
        <img v-else src="https://via.placeholder.com/500" class="rounded-lg" />

        <img
          v-if="imagesProps[3]"
          :src="imagesProps[3].url"
          class="rounded-lg aspect-square object-cover"
        />
        <img v-else src="https://via.placeholder.com/500" class="rounded-lg" />

        <img
          v-if="imagesProps[4]"
          :src="imagesProps[4].url"
          class="rounded-lg aspect-square object-cover"
        />
        <img v-else src="https://via.placeholder.com/500" class="rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagesProps: Array,
  },
};
</script>
