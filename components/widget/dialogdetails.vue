<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<v-dialog v-model="dialog" :max-width="`${widthDialog}px`" persistent scrollable>
		<v-card style="border-radius: .7em;">
			<v-card-title>
				<h4>{{ title }}</h4>
			</v-card-title>
			<v-card-text v-if="fromPage === 'pengembalian'">
				<v-simple-table fixed-header :max-height="maxHeightTable" class="border-table" dense>
					<template #default>
						<thead>
							<tr>
								<th v-for="(value, key) in details" :key="key" class="text-left">{{ key }}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td v-for="(value, key) in details" :key="key">
									<v-chip v-if="key.toLowerCase() === 'status'" :color="getStatusColor(value)" dark small>
										{{ value }}
									</v-chip>
									<span v-else>{{ value }}</span>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card-text>
			<v-card-text v-else>
				<v-simple-table fixed-header dense>
					<template #default>
						<tbody>
							<tr v-for="(value, key) in details" :key="key">
								<td class="px-0">{{ key }}</td>
								<td class="px-2">:</td>
								<td class="px-0">
									<v-chip v-if="key.toLowerCase() === 'status'" :color="getStatusColor(value)" dark small>
										{{ value }}
									</v-chip>
									<span v-else>{{ value }}</span>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card-text>
			<v-card-actions class="px-6">
				<h3>Total Pengembalian : Rp. 1000,-</h3>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" class="text-capitalize" text small @click="close">Tutup</v-btn>
				<slot name="actions"></slot>
			</v-card-actions>
			<v-card-text v-if="fromPage === 'pengembalian'" class="mt-5">
				<v-simple-table fixed-header :max-height="maxHeightTable" class="border-table" dense>
					<template #default>
						<thead>
							<tr>
								<th class="text-left">tes1</th>
								<th class="text-left">tes1</th>
								<th class="text-left">tes1</th>
								<th class="text-left">tes1</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>tes1</td>
								<td>tes1</td>
								<td>tes1</td>
								<td>tes1</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		value: Boolean, // v-model untuk mengontrol dialog
		details: {
			type: Object,
			default: () => ({})
		},
		statusColors: {
			type: Object,
			default: () => ({
				active: 'green',
				inactive: 'red',
				pending: 'orange',
				completed: 'blue'
			})
		},
		title: {
			type: String,
			default: ''
		},
		fromPage: {
			type: String,
			default: ''
		},
		widthDialog: {
			type: Number,
			default: 600
		},
		maxHeightTable: {
			type: String,
			default: '50vh'
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
		},
		getStatusColor(status) {
			return this.statusColors[status.toLowerCase()] || 'grey';
		}
	}
};
</script>