// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Importa tus componentes
import Home from '../components/screens/inicio.vue'
import Citas from '../components/screens/citas.vue';
import Registrar from '../components/screens/registro_cliente.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // Componente asociado a esta ruta
  },
  {
    path: '/citas',
    name: 'Citas',
    component: Citas, // Componente asociado a esta ruta
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar, // Componente asociado a esta ruta
  },
];

const router = createRouter({
  history: createWebHistory(), // Usa el modo de historial HTML5
  routes,
});

export default router;
