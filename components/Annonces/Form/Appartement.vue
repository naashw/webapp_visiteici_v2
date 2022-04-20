<template>
  <div>
    <h2 class="text-5xl font-bold">Publication de votre annonce</h2>
    <p class="text-base">
      Rédigez votre description, téléchargez quelques photos et touchez un maximum
      d'acheteurs et locataires
    </p>
    <form class="" @submit.prevent="submit" autocomplete="on">
      <select
        v-model="userdata.categories"
        class="select select-bordered w-full max-w-xs"
        key="categories"
      >
        <option disabled selected>Le type de bien</option>
        <option value="1">Appartements</option>
        <option value="2">Maison</option>
      </select>

      <label class="label">
        <span class="label-text">Titre de votre annonce</span>
      </label>
      <input
        v-model="userdata.nom"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />

      <div class="form-control">
        <label class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea
          v-model="userdata.description"
          class="textarea textarea-bordered h-24"
          placeholder="Bio"
        ></textarea>
      </div>

      <label class="label">
        <span class="label-text">Code postal</span>
      </label>
      <input
        v-model="userdata.code_postal"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />

      <label class="label">
        <span class="label-text">Ville</span>
      </label>
      <input
        v-model="userdata.ville"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />

      <label class="label">
        <span class="label-text">Adresse</span>
      </label>
      <input
        v-model="userdata.adresse"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />
      <div>
        <label class="label">
          <span class="label-text">Prix</span>
        </label>
        <input
          v-model="userdata.prix"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Charges comprises ?</span>
        </label>
        <input
          v-model="userdata.charges_comprises"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Meublé ?</span>
        </label>
        <input
          v-model="userdata.meublé"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text">Surface</span>
        </label>
        <input
          v-model="userdata.surface"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text">Nombres de pièces</span>
        </label>
        <input
          v-model="userdata.nb_pieces"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text">Nombre de chambres</span>
        </label>
        <input
          v-model="userdata.nb_chambres"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
        <p v-if="errors.nb_chambres" class="text-error text-sm italic">
            {{ this.errors.nb_chambres[0] }}
          </p>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Fibre optique ?</span>
        </label>
        <input
          v-model="userdata.fibre_optique"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Balcon ?</span>
        </label>
        <input
          v-model="userdata.balcon"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Terasse ?</span>
        </label>
        <input
          v-model="userdata.terrasse"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Cave ?</span>
        </label>
        <input
          v-model="userdata.cave"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Jardin ?</span>
        </label>
        <input
          v-model="userdata.jardin"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Parking ?</span>
        </label>
        <input
          v-model="userdata.parking"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Garage ?</span>
        </label>
        <input
          v-model="userdata.garage"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Ascenseur ?</span>
        </label>
        <input
          v-model="userdata.ascenseur"
          type="checkbox"
          true-value="1"
          false-value="0"
          class="checkbox"
        />
      </div>

      <select
        v-model="userdata.classe_energie"
        class="select select-bordered w-full max-w-xs"
        key="classe_energie"
      >
        <option disabled selected>Classe énergétique</option>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
        <option value="4">D</option>
        <option value="5">E</option>
        <option value="6">F</option>
        <option value="7">G</option>
      </select>
      <select
        key="GES"
        v-model="userdata.GES"
        class="select select-bordered w-full max-w-xs"
      >
        <option disabled selected>GES</option>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
        <option value="4">D</option>
        <option value="5">E</option>
        <option value="6">F</option>
        <option value="7">G</option>
      </select>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        @click.prevent="submit"
      >
        Crée une nouvelle annonce
      </button>
    </form>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click.prevent="test"
    >
      test
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userdata: {
        categories: 0,
        charges_comprises: 0,
        meublé: 0,
        fibre_optique: 0,
        balcon: 0,
        terrasse: 0,
        cave: 0,
        jardin: 0,
        parking: 0,
        garage: 0,
        ascenseur: 0,
      },
      errors: {},
    };
  },
  methods: {
    async test() {
      console.log(this.userdata);
      console.log("errors : ".this.errors);
    },
    async submit() {
      // assign url for cors error
      const queryText = this.$route.query.text ? "?text=" + this.$route.query.text : "";
      const apiUrl = "/api/appartements" + queryText;

      // fetch annonces in api url with axios
      try {
        let response = await this.$axios
          .post(apiUrl, this.userdata)
          .then((res) => res.data);
        console.log(response);
      } catch (error) {
        console.log(error.response.data);
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>
