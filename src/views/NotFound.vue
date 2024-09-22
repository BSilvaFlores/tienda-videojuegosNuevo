<template>
    <main class="view text-light text-center">
        <div class="container view__container">
            <h1 class="display-1 view__title">La página no fue encontrada 🫠</h1>
            <p class="text-body-tertiary view__description">Prueba volviendo al inicio . . .</p>
            <div class="view__action">
                <router-link to="/" class="btn btn-primary">Volver</router-link>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'component-name',
    // props: {},
    data: function () {
        return {}
    },
    // computed: {},
    //methods: {},
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped lang="scss">
.view{
    min-height: 90vh;
    &__container {
        height: 80vh;
        display: grid;
        place-content: center
    }
}
</style>