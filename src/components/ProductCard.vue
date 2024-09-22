<template>
    <div class="card h-100 rounded-3 shadow-sm">
        <img :src="product.image_url" class="card-img-top" alt="...">
        <div class="card-header py-3 d-flex align-items-center justify-content-center">
            <h4 class="my-0 fw-normal">{{ product.name }} <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" v-if="count(product) > 0">
                        {{ count(product) }}
                    </span></h4>
        </div>
        <div class="card-body">
            <h1 class="card-title pricing-card-title">${{ product.price }}</h1>
            <p>{{ product.description }}</p>
        </div>
        <div class="card-footer">
            <div class="btn-group w-50 d-flex mx-auto">
                <span class="p-2 bg-success" v-if="count(product) > 0" style="border-radius: 5px; margin-right: 10px;">
                        {{ count(product) }}
                    </span>
                <button type="button" class="w-100 btn btn-sm btn-primary" @click=agregar()>
                    <i class="bi bi-plus-lg"></i>
                </button>
                <button type="button" class="w-100 btn btn-sm btn-warning" v-if="count()>0" @click="quitar()">
                    <i class="bi bi-dash"></i>
                </button>
                <button type="button" class="w-100 btn btn-sm btn-outline-danger" v-if="count()>0" @click="eliminar()">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {     
        ...mapState(['cart'])   
    },
    methods: {
        ...mapActions(['addToCart', 'removeQuantityToProduct', 'removeProductFromCart']),
        agregar() {
            let productToAdd = {
                sku: this.product.sku,
                name: this.product.name,
                price: this.product.price,
                quantity: 1
            }
            this.addToCart(productToAdd);
        },
        quitar(){
            try {
                this.removeQuantityToProduct(this.product)
            }catch(error){
                alert(error.message)
            }
        },
        count(){
            let found = this.cart.find(prod=>prod.sku == this.product.sku)
            if(found){
                return  found.quantity
            }
        },
        eliminar(){
            try {
                this.removeProductFromCart(this.product)
            } catch (error) {
                alert(error.message)
            }
        }
    }
}
</script>

<style scoped>
.card-header {
    min-height: 95px;
}
</style>