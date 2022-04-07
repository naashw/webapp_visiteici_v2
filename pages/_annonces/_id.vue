<template>
  <div>

     <AnnoncesHero :annonceProp="annonce[0]" /> 

  </div>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    // fetch annonces in api url with axios
    const annonce = await $axios.get(`https://api.visiteici.fr/api/annonces/${params.id}`).then((res) => res.data);

    return { annonce }
  }
}
</script>
