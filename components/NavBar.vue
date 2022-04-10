<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <NuxtLink to="/" tag="a" class="btn btn-ghost normal-case text-xl"
        >Visite'ici</NuxtLink
      >
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://api.lorem.space/image/face?hash=33791" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li v-if="this.$auth.loggedIn">
            <a @click="isloggin" class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li v-if="this.$auth.loggedIn"><a>Settings</a></li>
          <li v-if="this.$auth.loggedIn"><a @click="logout">Logout</a></li>
          <li v-if="!this.$auth.loggedIn">
            <label for="my-modal-4" class="">Connexion</label>
          </li>
        </ul>
      </div>
    </div>

    <LoginModal />
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      if (this.$auth.loggedIn) {
        await this.$auth.logout();
      }
    },

    isloggin() {
      console.log("is loggin ? " + this.$auth.loggedIn);
      if (this.$auth.loggedIn) {
        console.log(JSON.stringify(this.$auth.user));
      }
    },
  },
};
</script>
