<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div ref="dropdown" class="dropdown">
        <button class="dropdown-btn text-capitalize" @click="toggleDropdown">
            <span class="selected-text" :title="selected || placeholder">
                {{ selected || placeholder }}
            </span>
            <div class="icons">
                <v-icon v-if="selected" small @click.stop="clearSelection">mdi-close</v-icon>
                <v-icon small>mdil-chevron-down</v-icon>
            </div>
        </button>
        <ul v-if="isOpen" class="dropdown-menu">
            <li 
                v-for="(option, index) in options" 
                :key="index" 
                @click="selectOption(option)"
            >
                <h6 class="text-capitalize" style="font-weight: normal;">{{ option.name }}</h6>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: "Pilih opsi",
        },
    },
    data: () => ({
        isOpen: false,
        selected: null,
    }),
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.selected = option.name;
            this.isOpen = false;
            this.$emit("update:selected", option.name);
        },
        handleClickOutside(event) {
            if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
                this.isOpen = false;
            }
        },
        clearSelection(event) {
            this.selected = null;
            this.$emit("update:selected", null);
        },
    },
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-btn {
  width: 100%;
  font-size: 12px;
  border-radius: .4em;
  padding: 4px;
  border:1px solid #E5E7EB;
  background-color: white;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.dropdown-menu li {
  padding: 8px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: #f3f4f6;
}

.icons {
  display: flex;
  align-items: center;
}

.selected-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>