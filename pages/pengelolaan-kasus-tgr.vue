<template>
	<section>
		<div class="pa-3">
			<div class="border-card py-3 px-3 mb-3 d-flex" style="background-color: white;border-radius: .5em;justify-content: space-between;">
				<v-row dense style="justify-content: space-between;">
					<v-col cols="12" md="12">
						<v-btn block small class="text-capitalize pl-2" color="primary" @click="showTambahkasus()">
							<v-icon small>mdil-plus</v-icon> Tambah Kasus</v-btn>
					</v-col>
				</v-row>
			</div>
			<div class="border-card py-3 px-3 mb-3" style="background-color: white;border-radius: .5em;justify-content: space-between;">
				<v-row dense>
					<v-col cols="12" md="12" class="d-flex">
						<WidgetSearch :placeholder="'Cari berdasarkan deskripsi'" @update:search="handleSearch" />
					</v-col>
					<v-col cols="12" md="4" class="d-flex">
						<WidgetFilterselected :options="itemsCategories" :placeholder="'Pilih Kategori'" @update:selected="handleSelect" />
					</v-col>
					<v-col cols="12" md="3" class="d-flex">
						<WidgetFilterselected :options="itemsJenisBarang" :placeholder="'Pilih Jenis Barang'" @update:selected="handleSelectJenisBarang" />
					</v-col>
					<v-col cols="12" md="5" class="d-flex">
						<WidgetFilterselected :options="itemsStatus" :placeholder="'Pilih Status'" @update:selected="handleSelectStatus" />
						<WidgetDaterangepicker @update:dateRange="handleDateRange" />
						<v-btn small class="text-capitalize pl-2 ml-2" color="primary" outlined @click="sort==='asc'?sort='desc':sort='asc';loadkasus()">
							<v-icon small>mdi-sort</v-icon><span v-if="isSmAndUp()"> Urutan</span></v-btn>
					</v-col>
				</v-row>
			</div>
			<div v-if="selectedStartdate" class="d-flex">
				<h6 class="mx-3 primary--text">{{ 
				`${$moment(selectedStartdate).format('DD MMMM YYYY')} - ${$moment(selectedEnddate).format('DD MMMM YYYY')}`
				}}</h6>
				<v-icon small @click.stop="clearDateRange">mdi-close</v-icon>
			</div>
			<v-simple-table fixed-header max-height="50vh" class="border-table" dense>
				<template #default>
					<thead>
						<tr>
							<th class="text-left">status</th>
							<th class="text-left">tanggal pengajuan</th>
							<th class="text-left">kategori</th>
							<th class="text-left">jenis barang</th>
							<th class="text-left">deskripsi</th>
							<th class="text-center">aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in itemsKasus" :key="item.cases_id">
							<td>
								<v-chip
								:color="item.status.toLowerCase() === 'new' ? 'red' :
								item.status.toLowerCase() === 'process' ? 'orange' :
								item.status.toLowerCase() === 'refund' ? 'blue' :
								item.status.toLowerCase() === 'completed' ? 'green' : ''" class="white--text" small>{{ item.status }}</v-chip>
							</td>
							<td>{{ $moment(item.created_at).format('DD MMMM YYYY') }}</td>
							<td>{{ item.category }}</td>
							<td>{{ item.jenis_barang }}</td>
							<td>{{ item.description }}</td>
							<td class="text-center">
								<v-tooltip bottom>
									<template #activator="{ on, attrs }">
										<v-icon color="primary" v-bind="attrs" v-on="on" @click="showPopup(item)">mdil-view-module</v-icon>
									</template>
									<span>Detail</span>
								</v-tooltip>
							</td>
						</tr>
						<tr>
							<td colspan="6" class="py-2">
								<WidgetPagination :p-next="nextPage" :p-prev="prevPage" :p-page="page" :p-total="totalPages" />
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
		<WidgetDialogdetails v-model="dialog" :details="selectedDatatoDetail" :status-colors="statusColor" :title="'Detail Kasus'">
			<template #actions>
				<v-btn v-if="selectedDatatoDetail?.Status?.toLowerCase() === 'process'" color="green" class="white--text text-capitalize" small @click="showDialogRefund()">proses refund</v-btn>
			</template>
		</WidgetDialogdetails>
		<WidgetDialogadd v-model="dialogAction" :title="'Pilih Metode Pengembalian'" :max-width="400">
			<v-row dense>
				<v-col cols="12">
					<v-select outlined dense hide-details :items="['Lunas', 'Cicilan']"/>
				</v-col>
			</v-row>
			<template #actions>
				<v-btn color="green" class="white--text text-capitalize" small>lanjutkan</v-btn>
			</template>
		</WidgetDialogadd>
		<WidgetDialogadd v-model="dialogAdd" :title="'Tambah Kasus Baru'" :max-width="400">
			<v-row dense>
				<v-col cols="12" md="12" class="pt-2">
					<v-select v-model="selectedKategori" outlined hide-details dense label="Kategori" :items="itemsCategories" item-value="name" item-text="name"/>
				</v-col>
				<v-col cols="12" md="12" class="pt-2">
					<v-select v-model="selectedJenisBarang" outlined hide-details dense label="Jenis Barang" :items="itemsJenisBarang" item-value="name" item-text="name"/>
				</v-col>
				<v-col cols="12" md="12" class="pt-2">
					<v-textarea v-model="deskripsi" outlined dense hide-details rows="3" label="Deskripsi" />
				</v-col>
				<v-col cols="12" md="12" class="pt-2">
					<v-text-field v-model="nilaiKerugian" type="number" outlined dense hide-details label="Nilai Kerugian" />
				</v-col>
			</v-row>
			<template #actions>
				<v-btn color="green" class="white--text text-capitalize" small @click="addKasus()">simpan</v-btn>
			</template>
		</WidgetDialogadd>
	</section>
</template>

<script>
import { mapMutations } from 'vuex';
import jwtDecode from "jwt-decode"
export default {
	layout: 'dashboard',
	middleware: "auth",
	data: () => ({
		isLoading: false,
		itemsKasus: [],
		itemsCategories: [],
		itemsJenisBarang: [],
		itemsStatus: [],
		page: 1,
		itemsPerPage: 10,
		totalPages: 0,
		sort: 'desc',
      	selectedOption: null,
		search: '',
		selectedOptionJenisBarang: null,
		selectedStartdate: null,
		selectedEnddate: null,
		selectedOptionStatus: null,
		dialog: false,
		selectedDatatoDetail: {},
		statusColor: {
			new: 'red',
			process: 'orange',
			refund: 'blue',
			completed: 'green'
		},
		dialogAction: false,
		dialogAdd: false,
		selectedKategori: null,
		selectedJenisBarang: null,
		deskripsi: null,
		nilaiKerugian: null,
		userId: null
	}),
	watch: {},
	mounted() {
		const token = this.$cookiz.get("TOKEN");
		const userTokenData = jwtDecode(token);
		this.userId = userTokenData.id

		this.loadKategori()
		this.loadJenisBarang()
		this.loadStatus()
		this.loadkasus()
	},
	methods: {
		...mapMutations(['SET_LOADING']),
		nextPage() {
			if (this.page < this.totalPages) {
				this.page++
				this.loadkasus()
			};
		},
		prevPage() {
			if (this.page > 1) {
				this.page--
				this.loadkasus()
			};
		},
		async loadkasus(){
			try {
				const params = {
					page: this.page,
					limit: this.itemsPerPage,
					status: this.selectedOptionStatus ? this.selectedOptionStatus : 'new, process',
					sortOrder: this.sort,
					jenis_barang: this.selectedOptionJenisBarang,
					category: this.selectedOption,
					search: this.search,
					start_date: this.selectedStartdate,
					end_date: this.selectedEnddate
				}
				this.SET_LOADING(true); 
				const datas = await this.$store.dispatch('cases/getKasus', params)
				if(datas.success) {
					this.itemsKasus = datas.data
					this.totalPages = datas.totalPages
					this.SET_LOADING(false); 
				}
			} catch (error) {
				this.SET_LOADING(false);
			}
		},
		isSmAndUp() {
            const isSmAndUp = this.$vuetify?.breakpoint?.smAndUp
            return isSmAndUp
        },
		handleSearch(value) {
			this.search = value
			this.loadkasus()
		},
		async loadKategori() {
			try {
				this.SET_LOADING(true);
				const datas = await this.$store.dispatch('lookup/getCategories');
				if(datas.success) {
					this.itemsCategories = datas.data
					this.SET_LOADING(false); 
				}
			} catch (error) {
				this.SET_LOADING(false);
			}
		},
		handleSelect(value) {
			this.selectedOption = value;
			this.loadkasus()
		},
		async loadJenisBarang() {
			try {
				this.SET_LOADING(true);
				const datas = await this.$store.dispatch('lookup/getJenisBarang');
				if(datas.success) {
					this.itemsJenisBarang = datas.data
					this.SET_LOADING(false); 
				}
			} catch (error) {
				this.SET_LOADING(false);
			}
		},
		handleSelectJenisBarang(value) {
			this.selectedOptionJenisBarang = value;
			this.loadkasus()
		},
		handleDateRange(range) {
			this.selectedStartdate = range.start
			this.selectedEnddate = range.end
			this.loadkasus()
		},
		clearDateRange() {
			this.selectedStartdate = null
			this.selectedEnddate = null
			this.loadkasus()
		},
		async loadStatus() {
			try {
				const params = {
					name: 'New, Process'
				}
				this.SET_LOADING(true); 
				const datas = await this.$store.dispatch('lookup/getStatus', params)
				if(datas.success) {
					this.itemsStatus = datas.data
					this.SET_LOADING(false); 
				}
			} catch (error) {
				this.SET_LOADING(false);
			}
		},
		handleSelectStatus(value) {
			this.selectedOptionStatus = value;
			this.loadkasus()
		},
		showPopup(item) {
			this.selectedDatatoDetail = {
				'ID Kasus': item.cases_id,
				'Tanggal Pengajuan': this.$moment(item.created_at).format('DD MMMM YYYY'),
				'Status': item.status,
				'NIP': item.nip,
				'Nama': item.name,
				'Jabatan': item.jabatan,
				'Hp': item.hp,
				'Kategori': item.category,
				'Jenis Barang': item.jenis_barang,
				'Deskripsi': item.description,
				'Nilai Kerugian': new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount)
			}
			this.dialog = true;
		},
		showDialogRefund() {
			this.dialogAction = true
		},
		showTambahkasus() {
			this.selectedKategori = null
			this.selectedJenisBarang = null
			this.deskripsi = null
			this.nilaiKerugian = null
			this.dialogAdd = true
		},
		async addKasus() {
			try {
				const params = {
					description: this.deskripsi,
					amount: this.nilaiKerugian,
					user_id: this.userId,
					category: this.selectedKategori,
					status: 'New',
					jenis_barang: this.selectedJenisBarang
				}
				this.SET_LOADING(true)
				const datas = await this.$store.dispatch('cases/addKasus', params)
				if(datas.success) {
					this.loadkasus()
					this.dialogAdd = false
					this.SET_LOADING(false);
				}
			} catch (error) {
				this.SET_LOADING(false);
			}
		}
	}
}
</script>