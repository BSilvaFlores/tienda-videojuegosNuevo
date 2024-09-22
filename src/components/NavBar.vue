<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container">
            <a class="navbar-brand" href="#">Tiendita de juegos</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav" v-for="(route, index) in routes" :key="index">
                    <li class="nav-item" >
                        <router-link class="nav-link" :to="route.path" activeClass="active disabled">{{ route.name }}</router-link>
                    </li>
                </ul>
                
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    // props: {},
    data: function () {
        return {
            routes: [
                {
                    name: 'Inicio',
                    path: '/category/principal'
                },
                {
                    name: 'Juegos FPS',
                    // path: '/fps'
                    path:'/category/fps'
                },
                {
                    name: 'Juegos de Carreras',
                    // path: '/racing'
                    path:'/category/racing'

                },
                {
                    name: 'Juegos RPG',
                    // path: '/rpg'
                    path:'/category/rpg'
                },
                {
                    name: 'Carrito',
                    path: '/cart'
                }
            ]
        }
    },
}
</script>

<style scoped></style>