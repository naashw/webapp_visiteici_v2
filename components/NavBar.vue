<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <NuxtLink to="/" tag="a" class="btn btn-ghost normal-case text-xl"
        >Visite'ici</NuxtLink
      >
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div v-if="this.$auth.loggedIn">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <NuxtLink to="/profil" class="justify-between">
                Profile
                <span class="badge">New</span>
              </NuxtLink>
            </li>
            <li><a>Settings</a></li>
            <li><a @click="logout">Logout</a></li>
          </ul>
        </div>
        <div v-if="!this.$auth.loggedIn">
          <label for="my-modal-4" tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
        </div>
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
  },
};
</script>
