<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section>
        <div class="d-flex" style="justify-content:flex-end;">
            <div class="pagination">
              <h4 class="font-weight-light">Halaman {{ pPage }} dari {{ pTotal }}</h4>
              <div>
                <v-btn class="pl-1 pr-3" color="primary" elevation="0" outlined small :disabled="pPage === 1" @click="pPrev">
                  <v-icon>mdil-chevron-left</v-icon> Prev</v-btn>
                <v-btn class="pl-3 pr-1" color="primary" elevation="0" outlined small :disabled="pPage === pTotal" @click="pNext">
                  Next <v-icon>mdil-chevron-right</v-icon></v-btn>
              </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        pNext: {
            type: Function,
            default: () => {}
        },
        pPrev: {
            type: Function,
            default: () => {}
        },
        pPage: {
            type: Number,
            default: 1
        },
        pTotal: {
            type: Number,
            default: 10
        }
    },
    data: () => ({
    }),
    methods: {
    }
}
</script>

<style scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.pagination button {
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
