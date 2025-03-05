<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-dialog v-model="dialog" :max-width="maxWidth" persistent scrollable>
      <v-card style="border-radius: .7em;">
        <v-card-title>
          <h5>{{ title }}</h5>
        </v-card-title>
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 text-capitalize" small text @click="close">Tutup</v-btn>
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      value: Boolean, // v-model untuk mengontrol dialog
      title: {
        type: String,
        default: ''
      },
      maxWidth: {
        type: Number,
        default: 600
      }
    },
    computed: {
      dialog: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    methods: {
      close() {
        this.$emit('input', false);
      }
    }
  };
  </script>
  