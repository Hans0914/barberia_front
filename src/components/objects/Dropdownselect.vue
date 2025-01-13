<template>
      <div v-if="loading">Cargando opciones...</div>
      <div v-else-if="error">{{ error }}</div>
      <select v-model="opccion_seleccionada" @change="onSelectChange">
        <option value="" disabled>Seleccione una opción</option>
        <option v-for="item in items" :key="item.barbero_id" :value="item.nombre">
          {{ item.nombre }}
        </option>
      </select>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {

    name: "DropdownSelect",
    props: {
      barbero_cargado: {
        type: Object,
      },
    },
    data() {
    
      return {
        items: [], // Opciones para el select
        opccion_seleccionada: '', // Opcion seleccionada
        selected: {}, // Valor seleccionado
        loading: true, // Estado de carga
        error: null, // Mensaje de error si algo falla
      };
    },
    computed: {
      
    },
    methods: {
      async fetchItems() {
        try {
          const response = await axios.get('/dev/barberos'); // Cambia la URL por tu API
          this.items = response.data.barberos; // Asigna los datos a la lista
          // this.load_barbero();
        } catch (err) {
          this.error = 'Error al cargar los datos.';
          console.error(err);
        } finally {
          this.loading = false; // Finaliza el estado de carga
        }
      },
      onSelectChange(event) {
        console.log(event.target.value);
        this.opccion_seleccionada = event.target.value;
        let barbero = this.items.find(item => item.nombre === event.target.value);
        this.selected = barbero;
        console.log(this.selected);
        this.$emit('seleccionar_barbero', this.selected);
        console.log(`Seleccionaste el ID: ${this.selected.barbero_id}`);
      },
    },
    watch: {
      barbero_cargado() {
        if(this.barbero_cargado && this.items.length > 0) {
          console.log(this.barbero_cargado);
          this.opccion_seleccionada = this.barbero_cargado.nombre;
        }
      }
    },
    created() {
      this.fetchItems(); // Llama a fetchItems al montar el componente
    },
    mounted() {
      // this.load_barbero();
    }
  };
  </script>
  
  <style>
  .dropdown-select {
    font-family: Arial, sans-serif;
    padding: 16px;
    background-color: #000;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  select {
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #000;
    width: 100%;
    max-width: 300px;
  }
  /* Letras negras del select y las demas opciones */
  option {
    color: #000;
  }
  </style>
  