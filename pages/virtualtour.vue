<template>
  <div>
    <no-ssr>
      <file-pond
        name="360pictures"
        ref="pond"
        label-idle="Drop files here..."
        v-bind:allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        server="/api"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"
      />
    </no-ssr>
    <div v-if="myFiles.length" class="h-2/3">
      <VirtualTourViewer360 />
    </div>
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  components: {
    FilePond,
  },

  async fetch() {},

  fetchOnServer: true,

  data() {
    return {
      myFiles: [],
    };
  },

  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
      // FilePond instance methods are available on `this.$refs.pond`
    },
  },
};
</script>

<style></style>
