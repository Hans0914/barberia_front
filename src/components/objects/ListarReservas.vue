<template>
    <div class="reservations">
      <h2>Mis Reservas</h2>
      <!-- Table -->
       <table class="table" v-if="reservations.length > 0">
        <thead>
          <tr>
            <th>Barbero</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(res, index) in reservations" :key="index">
            <td>{{ res.nombre_barbero }}</td>
            <td>{{ res.fecha_reserva }}</td>
            <td>
              <button @click="editReservation(res)">Modificar</button>
              <button @click="deleteReservation(res.reserva_id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="reservations.length === 0">
        <p>No tienes reservas aún.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      reservations: {
        type: Array,
        required: true
      },
      isAct: {
        type: Boolean
      }
    },
    methods: {
      editReservation(res) {
        console.log(res);
        this.$emit('edit', res);  // Emitir la reserva seleccionada para modificar
      },
      deleteReservation(reserva_id) {
        this.$emit('delete', reserva_id);  // Emitir la reserva seleccionada para eliminar
      }
    },
    mounted() {
      console.log(this.reservations);
    }
  };
  </script>
  
  <style scoped>
  .reservations {
    padding: 20px;
    background-color: var(--color-2);
    border-radius: 8px;
    margin-top: 20px;
  }
  
  .reservations ul {
    list-style-type: none;
    padding: 0;
  }
  
  .reservations li {
    margin-bottom: 15px;
  }
  
  button {
    margin-top: 10px;
    background-color: var(--color-4);
  }
  
  button:hover {
    background-color: var(--color-5);
  }

  /* Table con separadores de colores*/
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  </style>
  