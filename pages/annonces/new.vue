<template>
  <div>
    <div class="w-4/5 mx-auto min-h-screen bg-base-100 my-4 p-6">
      <div class="">
        <div class="mx-auto">
          <FormAppartement />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
};
</script>
