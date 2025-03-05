<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="d-flex custom-input">
      <v-icon small>mdil-magnify</v-icon>
      <input v-model="search" :placeholder="placeholder" @input="updateValue"/>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: 'Cari'
        }
    },
    data: () => ({
        search: ''
    }),
    methods: {
        updateValue() {
            this.$emit("update:search", this.search);
        },
    }
}
</script>

<style scoped>
.custom-input {
  border:1px solid #E5E7EB;
  border-radius:.3em !important;
  padding-left: 3px;
  width:100%;
  padding-top: 4px;
  padding-bottom: 4px;
}

.custom-input:focus-within {
  border-color: #1E293B;
}

input {
  padding-inline: 3px !important;
  font-size: 12px !important;
  width: 100%;
}

input:focus-visible {
  outline: none !important;
}
</style>