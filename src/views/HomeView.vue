<template>
  <main class="container my-4 text-light">
    <h1>Juega juegos</h1>
    <section class="mb-4">
      <h2 class="mt-4">Los mas vendidos</h2>
      <!-- Carrusel mas vendidos -->
      <CarouselComp :productos="masVendidos"/>
    </section>
    <section>
      <h2>Categorias</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        <div class="col" v-for="(categoria, index) in categorias" :key="index">
          <CardComp :categoria="categoria" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CarouselComp from '@/components/CarouselComp.vue'
import CardComp from '@/components/CardComp.vue'

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['masVendidos', 'categorias'])
  },
  methods: {
    ...mapActions(['setMasVendidos', 'setCategorias'])
  },
  components: {
    CarouselComp,
    CardComp
  },

  // Lifecycle Hooks start
  async mounted() {

    await this.setMasVendidos();
    await this.setCategorias();
  }
  // Lifecycle Hooks end

}
</script>
