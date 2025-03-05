<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <v-app :class="{ 'pa-3': isSmAndUp() }" :dark="darkTheme">
        <v-main>
            <v-row dense align="center">
                <v-col v-if="isSmAndUp()" cols="12" md="5" class="py-16 px-12" style="background-color: #1C2434;">
                    <div style="height: 100vh;">
                        <div class="d-flex" style="justify-content: flex-start;">
                            <img width="32px" height="32px" src="/icons/ic_office.svg" alt="login"/>
                            <h3 class="white--text" style="align-content: center;">TGR System</h3>
                        </div>
                        <h4 class="white--text" style="font-weight: lighter;color: #9CA3AF;line-height: 2em;">Sistem Manajemen Tututan Ganti Rugi</h4>
                        <v-img class="mx-auto my-5" width="448px" height="448px" contain src="/login-bg.webp" alt="login" />
                        <div class="d-flex" style="justify-content: space-around;">
                            <div class="d-flex" style="max-width: 228px;">
                                <img class="mr-2" width="32px" height="32px" src="/icons/ic_secure.svg" alt="login"/>
                                <div>
                                    <h4 class="white--text">Sistem Aman</h4>
                                    <h5 class="white--text" style="color: #9CA3AF;font-weight: lighter;">Dilengkapi dengan enkripsi
                                    data</h5>
                                </div>
                            </div>
                            <div class="d-flex" style="max-width: 228px;">
                                <img class="mr-2" width="32px" height="32px" src="/icons/ic_clock.svg" alt="login"/>
                                <div>
                                    <h4 class="white--text">Akses 24/7</h4>
                                    <h5 class="white--text" style="color: #9CA3AF;font-weight: lighter;">Layanan selalu tersedia</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="7" :style="isSmAndUp() ? '' : 'background-color: #F8F9FB;'" style="height: 100vh;">
                    <div class="pa-10 ma-auto" style="box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.2);max-width: 448px;border-radius: 16px">
                        <h2>Selamat Datang Kembali</h2>
                        <h4 style="color: #4B5563;font-weight: normal;">Masuk ke akun TGR System Anda</h4>
                        <div class="my-9">
                            <h5 class="mb-2" style="font-weight: normal;">Email</h5>
                            <v-text-field v-model="username" outlined hide-details color="primary-portal" type="text"
                            placeholder="@gmail.com" label="" append-icon="mdi-email-outline" />
                        </div>
                        <div class="mt-9">
                            <h5 class="mb-2" style="font-weight: normal;">Kata Sandi</h5>
                            <v-text-field v-model="password" outlined hide-details color="primary-portal" placeholder="*******"
                            label="" :type="typepass ? 'password' : 'text'"
                            :append-icon="typepass ? 'mdi-eye-off' : 'mdi-eye'" @keyup.enter="handleLogin()"
                            @click:append="typepass = !typepass" />
                        </div>
                        <div class="mt-4 d-flex" style="justify-content:space-between;">
                            <v-checkbox
                                v-model="rememberMe"
                                label="Ingat saya"
                                color="#4318FF"
                                dense
                                hide-details
                                class="ma-0 pa-0"
                            />
                            <div style="align-content: flex-end;">
                                <h5 style="font-weight: normal;"><a
                                    style="color: #4318FF;">Lupa kata sandi?</a>
                                </h5>
                            </div>
                        </div>
                        <div class="mt-9">
                            <v-btn block dense style="background: linear-gradient(to right, #4318FF, #9F7AEA);" class="white--text" :loading="isLoading"
                            :large="isSmAndUp()" @click="handleLogin()">
                            Masuk
                        </v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>
  
<script>
import { authPath } from '../utils/authorization'
import { showErrorAlert } from '../utils/services'
import { encryptData, decryptData } from '@/utils/crypto';

export default {
    name: 'Login',
    layout: 'empty',

    data() {
        return {
            darkTheme: true,
            password: null,
            username: null,
            typepass: 'password',
            isLoading: false,
            isError: false,
            txError: null,
            rememberMe: false
        }
    },

    mounted() {
        this.loadRememberMe(); 
    },

    methods: {
        isSmAndUp() {
            const isSmAndUp = this.$vuetify?.breakpoint?.mdAndUp
            return isSmAndUp
        },
        handleLogin() {
            this.isLoading = true
            const { username, password } = this
            const params = { username, password }

            this.$store
                .dispatch('user/login', params)
                .then((resp) => {
                    this.isLoading = false
                    this.saveRememberMe()
                    const data = (resp && resp.data) || null
                    if (data) {
                        const path = authPath
                        this.$router.push({ path })
                    }
                })
                .catch((error) => {
                    this.isLoading = false
                    const message =
                        (error &&
                            error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        'Terjadi Kesalahan.'

                    this.isError = true
                    this.txError = message
                    showErrorAlert(message)
                })
        },
        saveRememberMe() {
            if (this.rememberMe) {
                this.$cookiz.set('rememberMe', true, { path: '/', maxAge: 60 * 60 * 24 * 7 });
                this.$cookiz.set('email', this.username, { path: '/', maxAge: 60 * 60 * 24 * 7 });
                this.$cookiz.set('password', encryptData(this.password), { path: '/', maxAge: 60 * 60 * 24 * 7 });
            } else {
                this.$cookiz.remove('rememberMe');
                this.$cookiz.remove('email');
                this.$cookiz.remove('password');
            }
        },
        loadRememberMe() {
            this.rememberMe = this.$cookiz.get('rememberMe') === true;
            this.username = this.$cookiz.get('email') || '';
            const encryptedPassword = this.$cookiz.get('password');

            if (encryptedPassword) {
                this.password = decryptData(encryptedPassword);
            }
        },
    },
}
</script>
  
<style>
.v-btn,
.v-card {
    border-radius: 4px;
}

.img-login {
    height: 100vh;
    filter: brightness(0.7);
}
</style>
  