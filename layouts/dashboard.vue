<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-app dark>
    <WidgetLoading v-if="isLoading" />
    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col class="flex-grow-0 flex-shrink-0">
        <v-card height="100vh">
          <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent color="#1E293B" width="280px" class="pr-2">
            <div v-if="!mini" class="d-flex" style="justify-content: space-between;">
              <h2 class="white--text ml-3 my-6">TGR System</h2>
              <v-btn style="align-self: center;" color="white" icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </div>

            <v-list v-for="item in items" :key="item.title" dense class="py-0" shaped>
              <v-list-item v-if="!item.child" :to="item.to" color="#2563EB" dense class="py-1">
                <v-list-item-icon class="mr-2">
                  <v-icon class="white--text">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="white--text">
                    <h3 style="font-weight: normal;">
                      {{ item.title }}
                    </h3>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-group v-else :prepend-icon="item.icon" no-action color="white">
                <template #activator>
                  <v-list-item-content>
                    <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list v-for="child in item.child" :key="child.title" dense shaped class="py-0">
                  <v-list-item v-if="!child.child" :to="child.to" color="white">
                    <v-list-item-content>
                      <v-list-item-title class="white--text">{{ child.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-group v-else no-action color="white">
                    <template #activator>
                      <v-list-item-content>
                        <v-list-item-title class="white--text">{{ child.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item v-for="child2 in child.child" :key="child2.title" :to="child2.to" class="pl-10"
                      color="white">
                      <v-list-item-content>
                        <v-list-item-title class="white--text">{{ child2.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-list-group>
            </v-list>
            <v-list dense rounded class="py-0 px-0">
              <v-list-item color="white" class="py-1" @click="klikLogout()">
                <v-list-item-icon class="mr-2">
                  <v-icon class="white--text">mdi-logout-variant</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="white--text">Log Out</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-col style="min-width: 100px; max-width: 100%;background-color: #F8FAFC;" class="flex-grow-1 flex-shrink-0">
        <nuxt style="height: 100vh; overflow: auto; border: 1px solid #ccc;" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import jwtDecode from "jwt-decode"
import W from '@/utils/getWindow'
export default {
  name: 'Dashboard',
  data() {
    return {
      prof_image: '',
      drawer: true,
      items: [
        {
          icon: 'mdil-view-dashboard',
          title: 'Dashboard Utama',
          to: '/'
        },
        {
          icon: 'mdil-shield',
          title: 'Pengelolaan Kasus TGR',
          to: '/pengelolaan-kasus-tgr',
        },
        {
          icon: 'mdil-note-text',
          title: 'Pencatatan Kerugian',
          to: '/pencatatan-kerugian',
        },
        {
          icon: 'mdi-currency-usd',
          title: 'Mekanisme Pengembalian',
          to: '/mekanisme-pengembalian',
        },
        {
          icon: 'mdi-file-chart-outline',
          title: 'Pelaporan',
          to: '/pelaporan',
        },
        {
          icon: 'mdi-card-account-details-outline',
          title: 'Manajemen Pengguna',
          to: '/manajemen-pengguna',
        },
      ],
      mini: false,
      loginname: null
    }
  },
  computed: {
    ...mapState(['isLoading']),
  },
  mounted() {
    const token = this.$cookiz.get("TOKEN");
    const userTokenData = jwtDecode(token);
    this.loginname = userTokenData.name
  },
  methods: {
    klikLogout() {
      this.$store.dispatch('user/logout')
      W.location.replace('/')
    }
  },
}
</script>