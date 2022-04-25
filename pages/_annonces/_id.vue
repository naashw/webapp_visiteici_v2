<template>
  <div>

    <div class="">
      <div class="grid grid-cols-3 gap-3 my-2">
        <div class="col-span-2">
          <ImagesHero :imagesProps="annonce.photos" />

          <h1 class="capitalize text-2xl">{{ annonce.nom }}</h1>

          <div class="flex gap-2 text-slate-400">
            <p>{{ annonce.nb_pieces }} Pièces</p>
            <span>-</span>
            <p>{{ annonce.surface.split(".")[0] }}m²</p>
            <span>-</span>
            <p>{{ annonce.ville }} {{ annonce.code_postal }}</p>
          </div>

          <div>
            <p class="text-lg font-semibold">
              {{ annonce.prix.split(".")[0] }}€
              <span class="font-normal" v-if="annonce.charges_comprises">charges comprises</span>
              <span class="font-normal" v-else>hors charges</span>
            </p>
          </div>

          <div>
            <p class="text-sm text-accent text-base-200">
              {{ annonce.created_at.split(" ")[0] }}
            </p>
          </div>

          <hr />

          <h2 class="font-medium text-xl mt-2">Description</h2>
          </br>
          <p class="text-left whitespace-pre-line">{{ annonce.description }}</p>
          <hr />

          <h2>Critères</h2>
          <div class="grid grid-cols-4 gap-2">
            <AnnoncesCriteresBadge :critere="annonce.meublé" name="meublé" />
            <AnnoncesCriteresBadge
              :critere="annonce.fibre_optique"
              name="fibre optique"
            />
            <AnnoncesCriteresBadge :critere="annonce.balcon" name="balcon" />
            <AnnoncesCriteresBadge :critere="annonce.terrasse" name="terrasse" />
            <AnnoncesCriteresBadge :critere="annonce.cave" name="cave" />
            <AnnoncesCriteresBadge :critere="annonce.jardin" name="jardin" />
            <AnnoncesCriteresBadge :critere="annonce.parking" name="parking" />
            <AnnoncesCriteresBadge :critere="annonce.garage" name="garage" />
            <AnnoncesCriteresBadge :critere="annonce.ascenseur" name="ascenseur" />
            <AnnoncesCriteresBadge
              :critere="annonce.classe_energie"
              name="classe energie"
            />
            <AnnoncesCriteresBadge :critere="annonce.GES" name="GES" />
          </div>
        </div>
        <div>
          <ProfilCard :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    // fetch annonces in api url with axios
    const annonce = await $axios
      .get(`/api/annonces/${params.id}`)
      .then((res) => res.data[0]);

      annonce.photos = annonce.photos !== null ? annonce.photos.split(',') : [];

      const user = await $axios
      .get(`/api/userPublic/${annonce.user_id}`)
      .then((res) => res.data); 

    return { annonce, user };
  },
};
</script>
