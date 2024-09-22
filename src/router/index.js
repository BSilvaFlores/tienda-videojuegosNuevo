import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
    {
        path: "/category/principal",
        name: "home",
        component: HomeView,
    },
    {
        path: "/category/:name",
        name: "category",
        component: () => import("../views/CategoryView.vue"),
        // Pasará el parametro name como prop
        props: true,//activamos las props
    },
    {
        path: "/cart",
        name: "cart",
        component: () => import("../views/CartView.vue"),
    },
    {
        path: "/checkout",
        name: "checkout",
        component: () => import("../views/CheckoutView.vue"),
    },
    {
        path: "/confirmation/:orderId",
        name: "confirmation",
        component: () => import("../views/ConfirmationView.vue"),
        props: true,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
    },
    // TODO: agregar vista 404
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
