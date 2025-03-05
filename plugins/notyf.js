import Vue from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'right', y: 'top' }
});

Vue.prototype.$notyf = notyf;
