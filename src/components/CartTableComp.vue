<template>
    <div class="border rounded-2 overflow-hidden">
        <!-- TABLA CARRITO DETALLE -->
        <table class="table text-start">
            <thead>
                <tr>
                    <th scope="col">Game</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <!-- cart viene desde el ...mapState -->
                <tr v-for="game in cart" :key="game.sku">
                    <td>{{ game.name }}</td>
                    <td>
                        <div class="btn-group">

                            <button class="btn btn-sm btn-outline-light" v-if="editableCount"
                                @click="add(game)"><i class="bi bi-plus-lg"></i></button>
                            <button class="btn btn-sm btn-outline-light" disabled>
                                {{ game.quantity }}
                            </button>
                            <button class="btn btn-sm btn-outline-light" v-if="editableCount"
                                @click="remove(game)"><i class="bi bi-dash"></i></button>
                        </div>
                    </td>
                    <td>{{ game.price }}</td>
                    <td>{{ game.total }}</td>
                </tr>
                <tr>
                    <th class="text-end" colspan="3" scope="row">Total (USD)</th>
                    <td><strong>${{ cartTotalPrice }}</strong></td>
                </tr>
            </tbody>
        </table>

        <!-- CREATE ORDER -->
        <form class="class p-2 text-body-secondary" v-if="editableCount">
            <button class="btn btn-success" type="submit" @click.prevent="createOrder">Crear pedido</button>
        </form>
        <button class="btn btn-danger" type="button" @click="vaciarCarrito">Vaciar carrito</button>

    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'CartTableComp',
    props: {
        editableCount: {//para editar la cantidad de cuantos productos queremos comprar
            type: Boolean,
            required: false,
            default: false
        }
    },
    data: function () {
        return {}
    },
    computed: {
        ...mapState(['cart']),//traemos cart del state
        ...mapGetters(['productCount', 'cartTotalPrice'])//traemos los getters productCount y cartTotalPrice
    },
    methods: {
        ...mapActions(['addQuantityToProduct', 'removeQuantityToProduct', 'emptyCart']),
        createOrder(){
            this.$router.push('/checkout')
        },
        add(game){
            try {
                this.addQuantityToProduct(game)
            } catch (error) {
                alert(error.message)
            }
        },
        remove(game){
            try {
                this.removeQuantityToProduct(game)
            } catch (error) {
                alert(error.message)
            }
        },
        vaciarCarrito(){
            this.emptyCart();
        }
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods

    // -- End Lifecycle Methods
}
</script>

<style scoped lang="scss">
i {
    font-size: 10px
}
</style>