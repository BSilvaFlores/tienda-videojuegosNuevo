<template>
    <main class="container h-100 mt-5">
        <h1 class="text-light display-6 mb-3">{{ capitalizedName }} Games</h1>
        <div class="row">
            <div class="col-sm-3 p-3" v-for="game in games" :key="game.sku">
                <ProductCard :product="game" />
            </div>
        </div>
    </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';
export default {
    name: 'CategoryView',
    props: ['name'],//la prop la estamos registrando de la otra forma
    data: function () {
        return {}
    },
    computed: {
        ...mapState({
            games(state) {
                // Obtiene el estado específico dependiendo del name recibido como prop
                return state[this.name]
            }
        }),
        capitalizedName() {
            // charAt aisla el primer caracter, luego lo transforma en mayuscula
            // slice,  lo que hace es cortar la cadena desde el segundo caracter hasta el final
            return this.name.charAt(0).toUpperCase() + this.name.slice(1);
        },
        // Para obtener el nombre de la mutación dependiendo del name obtenido como prop
        setActionName() {
            return `set${this.capitalizedName}`
        }
    },
    methods: {
        ...mapActions({
            // creamos una action que llama a la accion específica de cada categoría
            setGames(dispatch) {
                return dispatch(this.setActionName)
            }
        })
    },
    watch: {
        name() {
            this.setGames();
        }

    },
    components: {
        ProductCard
    },

    // -- Lifecycle Methods
    mounted() {
        this.setGames()
    }
    // -- End Lifecycle Methods
}
</script>