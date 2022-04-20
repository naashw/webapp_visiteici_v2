<template>
  <div class="card h-4/6 w-96 bg-base-100 shadow-xl mx-auto my-4">
    <figure class="px-10 pt-10 avatar">
      <div class="w-24 rounded-full">
        <img src="https://api.lorem.space/image/face?hash=92310" />
      </div>
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ this.$auth.user.name }}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<<script>
export default {

}
</script>
