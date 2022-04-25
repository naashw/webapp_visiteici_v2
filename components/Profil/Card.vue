<template>
  <div class="h-screen" v-if="user">
    <div class="card h-fit w-96 bg-base-100 shadow-xl mx-auto">
      <figure class="px-10 pt-10 avatar">
        <div class="w-24 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=92310" />
        </div>
      </figure>
      <div class="card-body items-center text-center">
        <h2 v-if="user.name_public" class="card-title">{{ user.name_public }}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<
<script>
export default {
  props: {
    user: Object,
  },
};
</script>
