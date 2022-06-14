<template>
  <div class="h-full w-full">
    <button class="buttonHotSpot" @click="addHotSpot()">
      Ajouter un hotspot
    </button>

    <pano-viewer
      id="Visiteici-viewer360"
      class="viewer"
      :data-room="currentRoom.name"
      ref="pano"
      rel="preload"
      :tag="'div'"
      :image="currentRoom.image"
      @view-change="
        (e) => {
          setHotspotOffsets();
        }
      "
    >
      <div
        v-for="(hotspot, index) in this.hotspots"
        :key="index"
        class="hotspot link"
        :data-room="hotspot.room"
        :data-target-room="hotspot.target_room"
        :data-yaw="hotspot.yaw"
        :data-pitch="hotspot.pitch"
        v-show="hotspot.room === currentRoom.name"
        @click="
          (e) => {
            load(hotspot);
          }
        "
      >
        <div class="avatar-group -space-x-6">
          <img
            class="avatar w-12"
            src="https://api.lorem.space/image/face?hash=4818"
          />
        </div>
      </div>

      <div
        class="collapse absolute left-1/2 transform -translate-x-1/2 bottom-0 z-10"
      >
        <input type="checkbox" class="peer z-20" v-model="IsCollapseVisible" />
        <div
          class="w-1/6 absolute left-1/2 transform -translate-x-1/2 collapse-title bg-neutral/80 peer-checked:bg-neutral/70 text-base-100 rounded-t-lg"
        >
          <div class="absolute left-1/2 transform -translate-x-1/2">
            <svg
              v-if="IsCollapseVisible"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>
        <div
          class="w-screen collapse-content text-base-100 bg-neutral/80 peer-checked:bg-neutral/70 overflow-x-auto"
        >
          <div class="flex flex-nowrap justify-center gap-4 pt-4">
            <div
              v-for="(virtualRoom, index) in this.virtualRooms"
              class="w-1/6 shrink-0 z-10"
            >
              <div
                class="card bg-base-100 shadow-xl image-full"
                @click="changeRoom(virtualRoom)"
              >
                <figure>
                  <img
                    :src="virtualRoom.image"
                    alt="VirtualRoom"
                    class="z-20"
                  />
                </figure>
                <div class="card-body">
                  <div class="card-actions justify-center">
                    <h2 class="card-title text-base-100">
                      {{ virtualRoom.name }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </pano-viewer>
  </div>
</template>

<script>
import { PanoViewer } from "@egjs/vue-view360";

export default {
  layout: "virtualTour",

  props: {
    VirtualTour: Object,
  },

  components: {
    PanoViewer,
  },

  mounted() {
    this.setHotspotOffsets();
    this.initData();
  },

  watch: {
    hotspots: {
      handler: function (hotspots) {
        setTimeout(() => {
          this.setHotspotOffsets();
          console.log("hotspots changed");
        }, 20);
      },
      deep: true,
    },
  },

  async fetch() {
    const ref = this;
    const virtualTour = await this.$axios
      .get("http://127.0.0.1:8000/api/virtualTour/1")
      .then((res) => res.data);
    virtualTour.virtualroom.forEach((virtualroom) => {
      this.virtualRooms.push(virtualroom);

      virtualroom.virtual_hotspot.forEach((hotspot) => {
        this.hotspots.push({
          room: hotspot.room,
          target_room: hotspot.target_room,
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
        });
      });
    });
  },
  fetchOnServer: true,

  data() {
    return {
      IsCollapseVisible: 0,
      myFiles: [],
      virtualTour: [],
      virtualRooms: [],
      hotspots: [],
      currentRoom: {
        name: "",
        image: "",
      },
    };
  },

  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },
    changeRoom(newRoom) {
      this.currentRoom = newRoom;
    },
    initData() {
      this.container = document.querySelector(".view360-canvas");
      this.viewerParent = document.querySelector(".viewer");
      this.LoadingChangeRoom = false;
      this.currentRoom = structuredClone(this.virtualRooms[0]);
    },
    addHotSpot() {
      const ref = this;
      let viewer = this.$refs.pano;
      let yaw = viewer.getYaw();
      let pitch = viewer.getPitch();
      let newHotSpot = {
        room: ref.currentRoom.name,
        target_room: "cuisine",
        yaw: yaw,
        pitch: pitch,
      };
      ref.hotspots.push(newHotSpot);
    },
    toRadian(deg) {
      return (deg * Math.PI) / 180;
    },
    getHFov(fov) {
      const ref = this;
      let rect = ref.container.getBoundingClientRect();
      let width = rect.width;
      let height = rect.height;
      return (
        (Math.atan((width / height) * Math.tan(ref.toRadian(fov) / 2)) /
          Math.PI) *
        360
      );
    },
    rotate(point, deg) {
      let ref = this;
      let rad = ref.toRadian(deg);
      let cos = Math.cos(rad);
      let sin = Math.sin(rad);

      return [cos * point[0] - sin * point[1], sin * point[0] + cos * point[1]];
    },
    setHotspotOffset(hotspot) {
      let ref = this;
      let viewer = this.$refs.pano;
      let oyaw = viewer.getYaw();
      let opitch = viewer.getPitch();
      let yaw = parseFloat(hotspot.getAttribute("data-yaw"));
      let pitch = parseFloat(hotspot.getAttribute("data-pitch"));
      let deltaYaw = yaw - oyaw;
      let deltaPitch = pitch - opitch;

      if (deltaYaw < -180) {
        deltaYaw += 360;
      } else if (deltaYaw > 180) {
        deltaYaw -= 360;
      }

      if (Math.abs(deltaYaw) > 90) {
        hotspot.style.display = "none";
        return;
      }

      let radYaw = ref.toRadian(deltaYaw);
      let radPitch = ref.toRadian(deltaPitch);

      let fov = viewer.getFov();
      let hfov = ref.getHFov(fov);

      let rx = Math.tan(ref.toRadian(hfov) / 2);
      let ry = Math.tan(ref.toRadian(fov) / 2);

      let point = [Math.tan(-radYaw) / rx, Math.tan(-radPitch) / ry];

      // Image rotation compensation
      // The original image is about 10 degrees tilted.
      point = point.map(function (p) {
        return p * Math.cos((15 / 180) * Math.PI);
      });
      point[1] = ref.rotate(point, deltaYaw > 0 ? -10 : 10)[1];

      if (isNaN(point[0]) && isNaN(point[1])) {
        point = [-0, -0];
      }

      let containerSize = ref.container.getBoundingClientRect();

      if (containerSize.height == 0 || containerSize.width == 0) {
        ref.container = document.querySelector(".view360-canvas");
        containerSize = ref.container.getBoundingClientRect();
      }

      viewer._height = containerSize.height;
      viewer._width = containerSize.width;

      // point[0] /= 1.05;
      let left = viewer._width / 2 + (point[0] * viewer._width) / 2;
      let top = viewer._height / 2 + (point[1] * viewer._height) / 2;

      hotspot.style.transform =
        "translate(" + left + "px, " + top + "px) translate(-50%, -50%)";
      hotspot.style.display = "block";
    },
    setHotspotOffsets() {
      const ref = this;
      if (ref.LoadingChangeRoom) {
        return;
      }
      Array.prototype.slice
        .call(document.querySelectorAll(".hotspot"))
        .filter(function (hotspot) {
          return hotspot.getAttribute("data-room") === ref.currentRoom.name;
        })
        .forEach(function (hotspot) {
          ref.setHotspotOffset(hotspot);
        });
    },
    unsetHotspots() {
      const ref = this;
      Array.prototype.slice
        .call(document.querySelectorAll(".hotspot"))
        .filter(function (hotspot) {
          return hotspot.room === ref.currentRoom.name;
        })
        .forEach(function (hotspot) {
          ref.unsetHotspot(hotspot);
        });
    },
    unsetHotspot(hotspot) {
      hotspot.style.display = "none";
    },
    load(hotspot) {
      const ref = this;
      let Targetvirtualroom = ref.virtualRooms.find(
        (virtualroom) => virtualroom.name === hotspot.target_room
      );

      if (ref.currentRoom.name === hotspot.target_room) {
        return;
      } else {
        ref.LoadingChangeRoom = true;
        ref.unsetHotspots();
      }

      let viewer = this.$refs.pano;

      viewer.lookAt(
        {
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
          fov: 30,
        },
        500
      );
      let viewerParent = this.viewerParent;

      setTimeout(function () {
        ref.currentRoom.name = Targetvirtualroom.name;
        ref.currentRoom.image = Targetvirtualroom.image;
        viewerParent.setAttribute("data-room", ref.currentRoom.name);
        ref.LoadingChangeRoom = false;
        ref.container = document.querySelector(".view360-canvas");
      }, 500);
      ref.unsetHotspots();
      ref.setHotspotOffsets();
    },
  },
};
</script>

<style>
#Visiteici-viewer360 {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}

.view360-canvas {
  position: relative;
  height: 100%;
  width: 100%;
}

.hotspot {
  position: absolute;
  display: none;
  z-index: 2;
}

.hotspot.link {
  text-align: center;
  font-weight: bold;
  color: #ff0000;
}

.buttonHotSpot {
  background-color: #ff0000;
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  z-index: 3;
}
</style>
