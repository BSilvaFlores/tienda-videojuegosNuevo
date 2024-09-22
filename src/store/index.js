import { createStore } from "vuex";
import getProducts from  "@/services/productService";//importamos getProducts del servicio	
// import { getPrincipal } from "@/services/productService";

export default createStore({
// State
// El state (estado) en Vuex es un objeto que contiene el estado centralizado de la aplicación. 
// Es la fuente única de verdad que representa el estado de todos los datos en la aplicación. 
// Este estado es accesible globalmente desde cualquier componente de Vue que esté conectado a Vuex.

// Uso: Se utiliza para almacenar datos cruciales de la aplicación, como listas de productos, 
// carritos de compras, datos de usuarios, etc.
    state: {
        masVendidos: [],
        categorias: [],
        rpg: [],
        fps: [],
        racing: [],
        cart: [],
    },

// Getters
// Los getters (accesores) en Vuex son métodos computados que se utilizan para obtener datos específicos 
// del estado de la aplicación de manera reactiva. Permiten obtener valores derivados o filtrados del 
// estado sin modificarlo directamente.

// Uso: Son útiles para obtener datos calculados, filtrados o transformados del estado, por ejemplo, 
// obtener la cantidad total de productos en el carrito, calcular el total de la compra, etc.
    getters: {
        // Obtiene cantidad de productos en el carrito
        productCount(state) {
            return state.cart.length;
        },
        // Obtiene el precio total de un producto (cantidad * precio)
        cartProductTotal(state) {
            return state.cart.map((product) => {//vamos a recorrer producto por producto del carrito
                let newProduct = product;
                newProduct.total = parseFloat(//convertimos el total en decimal
                    product.price * product.quantity //precio del producto por la cantidad
                ).toFixed(2);//maximo de 2 decimales
                return newProduct;
            });
        },
        findProductBySku: (state) => (sku) => {
            return state.cart.find((product) => product.sku == sku);//vamos a buscar un producto por su codigo sku
        },
        // Obtiene precio total de la compra
        cartTotalPrice(state, getters) {
            let totalPrice = getters.cartProductTotal.reduce(
                (total, product) => {
                    return total + Number(product.total);
                },
                0 //total será el contador y se iniciará en 0
            );
            return parseFloat(totalPrice).toFixed(2);
        },
    },

// Mutations
// Las mutations (mutaciones) son funciones síncronas que se utilizan para modificar el estado en Vuex 
// de manera predecible. Cada mutación realiza un cambio específico en el estado.

// Uso: Se utilizan para realizar cambios directos y sincrónicos en el estado de la aplicación, 
// por ejemplo, agregar un producto al carrito, actualizar la cantidad de un producto, 
// vaciar el carrito, etc.
    mutations: {
        // Mutaciones fetch data
        SET_MAS_VENDIDOS(state, juegos) {
            state.masVendidos = juegos;
        },
        SET_CATEGORIAS(state, categorias) {
            state.categorias = categorias;
        },
        SET_RPG(state, games) {
            state.rpg = games;
        },
        SET_FPS(state, games) {
            state.fps = games;
        },
        SET_RACING(state, games) {
            state.racing = games;
        },
        // Mutaciones logica cart
        ADD_TO_CART(state, product) {//agregar producto al carrito
            state.cart.push(product);
        },
        ADD_QUANTITY_TO_PRODUCT(state, sku) {//sumarle 1 a la cantidad
            let index = state.cart.findIndex((product) => product.sku == sku);
            state.cart[index].quantity += 1;
        },
        REMOVE_QUANTITY_TO_PRODUCT(state, sku) {
            let index = state.cart.findIndex((product) => product.sku == sku);
            state.cart[index].quantity -= 1;//eliminarle 1 a la cantidad
        },
        REMOVE_PRODUCT_FROM_CART(state, sku) {
            let index = state.cart.findIndex((product) => product.sku == sku);
            state.cart.splice(index, 1);//eliminar producto del carrito, con splice se eliminar 1 elemendo desde el index
        },
        EMPTY_CART(state) {//vaciar carrito
            state.cart = [];
        },
    },

// Actions
// Las actions (acciones) en Vuex son funciones que pueden contener lógica asíncrona y llamar a 
// mutaciones para modificar el estado. Las acciones son útiles cuando se necesitan realizar 
// operaciones asincrónicas, como llamadas a API, antes de modificar el estado.

// Uso: Se utilizan para encapsular la lógica de negocio compleja, realizar operaciones 
// asíncronas como peticiones HTTP, y luego llamar a mutaciones para actualizar el estado en 
// respuesta a los resultados de esas operaciones.
    actions: {
        // Fetching data del product service
        async setMasVendidos({ commit }) {//productos destacados del json
            try {
                let data = await getProducts('principal')
                commit("SET_MAS_VENDIDOS", data.principal.destacados);
            } catch (error) {
                console.log(error);
            }
        },
        async setCategorias({ commit }) {//categorias del json
            try {
                let data = await getProducts('principal')
                commit("SET_CATEGORIAS", data.principal.categorias);
            } catch (error) {
                console.log(error);
            }
        },
        async setRpg({ commit }) {//categoria rpg
            try {
                let data = await getProducts('rpg')
                commit("SET_RPG", data.rpg);
            } catch (error) {
                console.log(error);
            }
        },
        async setFps({ commit }) {//categoria fps
            try {
                let data = await getProducts('fps')
                commit("SET_FPS", data.fps);
            } catch (error) {
                console.log(error);
            }
        },
        async setRacing({ commit }) {//categoria racing
            try {
                let data = await getProducts('racing')
                commit("SET_RACING", data.racing);
            } catch (error) {
                console.log(error);
            }
        },
        // Cart logic
        addToCart({ commit, getters }, product) {//añadir un producto al carrito
            let found = getters.findProductBySku(product.sku)
            if (!found) {
                commit("ADD_TO_CART", product);
            } else {
                commit("ADD_QUANTITY_TO_PRODUCT", product.sku)
            }
        },
        addQuantityToProduct({ commit, getters }, product) {//añadir cantidad del producto
            let found = getters.findProductBySku(product.sku)

            if (found) {
                commit("ADD_QUANTITY_TO_PRODUCT", product.sku);
            } else {
                throw "Producto no encontrado dentro del carro";
            }
        },
        removeQuantityToProduct({ commit, getters }, product) {//eliminar cantidad
            let found = getters.findProductBySku(product.sku)

            if (found) {
                if (found.quantity > 1) {
                    commit("REMOVE_QUANTITY_TO_PRODUCT", product.sku);//si la cantidad es mayor a 1 se decrementa en 1 la cantidad
                } else {
                    if (
                        confirm(
                            "El producto se eliminará del carro. ¿Quiere eliminarlo?"//si la cantidad esmenor a 1 se elimina el producto
                        )
                    ) {
                        commit("REMOVE_PRODUCT_FROM_CART", product.sku);//entonces se borra el producto
                    }
                }
            } else {
                throw "Producto no encontrado dentro del carro";
            }
        },
        removeProductFromCart({ commit, getters }, product) {//eliminar producto del carrito
            let found = getters.findProductBySku(product.sku)//busca el producto
            if (found) {
                if (
                    confirm(
                        "El producto se eliminará del carro. ¿Quiere eliminarlo?"//si lo encuentra le pregunta al ususario
                    )
                ) {
                    commit("REMOVE_PRODUCT_FROM_CART", product.sku);//y lo borra si acepta
                }
            } else {
                throw "Producto no encontrado dentro del carro";//si no enviamos por error el mensaje
            }
        },
        emptyCart({ commit }) {//vaciar carrito
            commit("EMPTY_CART");
        },
    },
    modules: {},
});


// Resumen de uso conjunto
// State: Almacena el estado centralizado de la aplicación.
// Getters: Obtienen datos derivados del estado de manera reactiva.
// Mutations: Modifican el estado de forma síncrona y predecible.
// Actions: Contienen lógica asíncrona y pueden llamar a mutaciones para modificar el estado.