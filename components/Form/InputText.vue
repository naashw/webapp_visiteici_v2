<template>
  <div>
    <h3>{{ title }}</h3>
    <input
      class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      type=""
      name=""
      :placeholder="placeholderInput"
      v-model="input"
    />
    <p v-if="error" class="text-error text-sm italic">
      {{ this.error[0] }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    placeholderInput: String,
    error: Object,
  },

  data() {
    return {
      input: this.placeholderInput,
    };
  },

  watch: {
    input() {
      this.$emit("input", this.input);
    },
  },
};
</script>
