<template>
  <div v-if="!this.$auth.loggedIn">
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="modal modal-bottom sm:modal-middle cursor-pointer">
      <label class="modal-box relative mt-24 mb-auto">
        <div class="btn-group grid grid-cols-2">
          <label
            class="btn"
            :class="{ 'btn-secondary': !whichForm, ' btn-outline': !whichForm }"
            @click.prevent="whichForm = true"
          >
            Se connecter
          </label>
          <label
            class="btn"
            :class="{ 'btn-secondary': whichForm, ' btn-outline': whichForm }"
            @click.prevent="whichForm = false"
          >
            Crée un compte
          </label>
        </div>

        <LoginForm v-if="whichForm" />
        <LoginRegister v-if="!whichForm" />
      </label>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whichForm: true,
    };
  },
};
</script>
