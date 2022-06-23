<template>
  <div>
    <no-ssr>
      <file-pond
        name="pictures"
        ref="pond"
        label-idle="Partagez vos images 360 en deux clics"
        accepted-file-types="image/jpeg, image/png"
        allowMultiple="true"
        :files="myFiles"
        @init="handleFilePondInit"
        @processfile="handleProcess"
        @initfile="handleInitFile"
        :style="'--fileItem-width: calc(100% / ' + this.numberOfFiles + ')'"
      />
    </no-ssr>
    <div class="h-2/3 aspect-[2/1]">
      <VirtualTourViewer360 :virtualTour="this.virtualTour" />
    </div>
    <div v-if="myFiles.length" class="h-2/3"></div>
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond, { setOptions } from "vue-filepond";

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
      virtualTour: undefined,
      virtualTourName: "",
      virtualTourCode: "",
      numberOfFiles: 1,
    };
  },

  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized", this.$refs.pond);
      const ref = this;

      setOptions({
        instantUpload: true,
        allowMultiple: true,
        maxParallelUploads: 1,
        server: {
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
            transfer,
            options
          ) => {
            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);
            formData.append("name", ref.virtualTourName);
            formData.append("code", ref.virtualTourCode);

            const request = new XMLHttpRequest();
            request.open("POST", "http://localhost:8000/api/virtualTour");

            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total);
            };

            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = function () {
              if (request.status >= 200 && request.status < 300) {
                // the load method accepts either a string (id) or an object
                let responseData = JSON.parse(request.response);
                ref.virtualTourName = responseData.name;
                ref.virtualTourCode = responseData.code;
                ref.virtualTour = responseData.virtualTour;
                load(request.responseText);
              } else {
                // Can call the error method if something is wrong, should exit after
                console.log("oh no");
                error("oh no");
              }
            };

            request.send(formData);

            // Should expose an abort method so the request can be cancelled
            return {
              abort: () => {
                // This function is entered if the user has tapped the cancel button
                request.abort();

                // Let FilePond know the request has been cancelled
                abort();
              },
            };
          },
        },
      });
      // FilePond instance methods are available on `this.$refs.pond`
      this.$refs.pond.getFiles();
    },
    handleProcess: function () {
      console.log("handleProcess");
    },
    handleInitFile: function () {
      let r = document.querySelector("input.filepond--browser").value;
      console.log("handleInitFile", this.numberOfFiles, r);
      this.numberOfFiles++;
    },
  },
};
</script>

<style>
.filepond--item {
  width: var(--fileItem-width);
}
</style>
