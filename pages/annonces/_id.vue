<template>
  <div v-if="annonce">

    <div class="">
      <div class="grid grid-cols-3 gap-3 my-2">
        <div class="col-span-2">
          <ImagesHero v-if="annonce.photos" :imagesProps="annonce.photos" />

          <h1 class="capitalize text-2xl">{{ annonce.nom }}</h1>

          <div class="flex gap-2 text-slate-400">
            <p>{{ annonce.appartement.nb_pieces }} Pièces</p>
            <span>-</span>
            <p>{{ annonce.appartement.surface.split(".")[0] }}m²</p>
            <span>-</span>
            <p>{{ annonce.appartement.ville }} {{ annonce.code_postal }}</p>
          </div>

          <div>
            <p class="text-lg font-semibold">
              {{ annonce.appartement.prix.split(".")[0] }}€
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
            <AnnoncesCriteresBadge :critere="annonce.appartement.meublé" name="meublé" />
            <AnnoncesCriteresBadge
              :critere="annonce.appartement.fibre_optique"
              name="fibre optique"
            />
            <AnnoncesCriteresBadge :critere="annonce.appartement.balcon" name="balcon" />
            <AnnoncesCriteresBadge :critere="annonce.appartement.terrasse" name="terrasse" />
            <AnnoncesCriteresBadge :critere="annonce.appartement.cave" name="cave" />
            <AnnoncesCriteresBadge :critere="annonce.appartement.jardin" name="jardin" />
            <AnnoncesCriteresBadge :critere="annonce.appartement.parking" name="parking" />
            <AnnoncesCriteresBadge :critere="annonce.appartement.garage" name="garage" />
            <AnnoncesCriteresBadge :critere="annonce.appartement.ascenseur" name="ascenseur" />
            <AnnoncesCriteresBadge
              :critere="annonce.appartement.classe_energie"
              name="classe energie"
            />
            <AnnoncesCriteresBadge :critere="annonce.appartement.GES" name="GES" />
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
  async asyncData({ redirect, params, $axios, error }) {
    try {
      
    const annonce = await $axios
      .get(`/api/annonces/${params.id}`)
      .then((res) => res.data);

      const user = await $axios
      .get(`/api/userPublic/${annonce.user_id}`)
      .then((res) => res.data.user); 

    return { annonce, user };

    } catch (error) {
      console.log(error);
      redirect('/annonces/');
    }
  },
};
</script>
