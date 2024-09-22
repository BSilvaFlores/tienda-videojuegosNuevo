<template>
    <div class="card h-100">
        <div class="card-body">
            <h5 class="card-title text-capitalize">{{ categoria.name }}</h5>
            <p class="card-text">{{ categoria.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'component-name',
    props: {
        categoria: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.card {
    transition: box-shadow  0.3s ease-in-out;
    &:hover {
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
    }
}
</style>