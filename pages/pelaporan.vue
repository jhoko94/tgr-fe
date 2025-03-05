<template>
    <section>
        <WidgetsLoadingCentered v-if="isLoading" />
        <div class="pa-3">
            pelaporan
        </div>
    </section>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: "auth",
    data: () => ({
        isLoading: false,
    }),
    mounted() {
        this.load()
    },
    methods: {
        async load(){}
    }
}
</script>