<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <!-- Button untuk membuka popup -->
      <v-btn small class="text-capitalize pl-2 ml-2" color="primary" outlined @click="isOpen = true">
        <v-icon small>mdi-calendar-range</v-icon>
        <span v-if="isSmAndUp()">Periode Tanggal</span>
      </v-btn>
  
      <!-- Dialog Popup -->
      <v-dialog v-model="isOpen" max-width="400px" persistent>
        <v-card style="border-radius: .7em;">
          <v-card-title>
            <h5>Pilih Rentang Tanggal</h5>
          </v-card-title>
          <v-card-text>
            <v-row dense>
                <v-col cols="12" md="5">
                    <v-menu
                        ref="startMenu"
                        v-model="startMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template #activator="{ on, attrs }">
                            <v-text-field
                                v-model="startDate"
                                label="Tanggal Mulai"
                                readonly
                                dense
                                hide-details
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                @click="openMenu('startMenu')"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="startDate" @input="startMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="2" class="text-center" style="align-content: space-around;"><span>s.d</span></v-col>
                <v-col cols="12" md="5">
                    <v-menu
                        ref="endMenu"
                        v-model="endMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template #activator="{ on, attrs }">
                            <v-text-field
                                v-model="endDate"
                                label="Tanggal Akhir"
                                readonly
                                dense
                                hide-details
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                @click="openMenu('endMenu')"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="endDate" @input="endMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions class="d-flex justify-end">
            <v-btn small text @click="isOpen = false">Batal</v-btn>
            <v-btn small color="primary" @click="applyDateRange">Terapkan</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
  
<script>
export default {
    data() {
      return {
        isOpen: false,
        startMenu: false,
        endMenu: false,
        startDate: null,
        endDate: null,
      };
    },
    watch: {
        isOpen() {
            if(this.isOpen) {
                this.startDate = null
                this.endDate = null
            }
        }
    },
    methods: {
        isSmAndUp() {
            const isSmAndUp = this.$vuetify?.breakpoint?.smAndUp
            return isSmAndUp
        },
        openMenu(menu) {
            // Tutup menu lain sebelum membuka yang baru
            this.startMenu = false;
            this.endMenu = false;
            this[menu] = true;
        },
        applyDateRange() {
            this.$emit("update:dateRange", { start: this.startDate, end: this.endDate });
            this.isOpen = false;
        },
    },
};
</script>