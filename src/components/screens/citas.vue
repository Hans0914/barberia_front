<template>
    <div class="container">
      <!-- <div class="buttons">
        <button @click="showForm = !showForm" :class="{ active: showForm }">Reservar</button>
        <button @click="showReservations = !showReservations" :class="{ active: showReservations }">Ver mis reservas</button>
      </div> -->
      
      <div class = "filas">

      <!-- Formulario de reserva -->
      <div class="form">
        <crear_reserva 
            :isAct="isAct"
            :reservation="reservation" 
            @update-reservations="submitReservation" 
            @reserva_guardada="reserva_guardada"
            />
      </div>
  
      <!-- Listado de reservas -->
      <ReservationsList 
        :isAct="isAct"
        :reservations="reservations" 
        @edit="editReservation" 
        @delete="deleteReservation" 
      />
  
      <!-- <div v-else-if="showReservations">
        <p>No tienes reservas aún.</p>
      </div> -->
    </div>
    </div>
  </template>
  
  <script>
    import ListarReservas from '../objects/ListarReservas.vue';
    import formulario_res from '../objects/formulario_res.vue';
    import axios from 'axios';

  export default {
    components: {
      ReservationsList: ListarReservas,
      crear_reserva: formulario_res
    },
    data() {
      return {
        isAct : false,
        reservations: [],
        reservation: {}
        
      };
    },
    methods: {

       async obtenerReservas() {
        try {
          const response = await axios.get('/dev/reservas?cliente_id=123456789'); // Cambia la URL por tu API
          this.reservations = response.data; // Asigna los datos a la lista
          console.log(this.reservations);
        } catch (err) {
          this.error = 'Error al cargar los datos.';
          console.error(err);
        } finally {
          this.loading = false; // Finaliza el estado de carga
        }
      },
        //Crear una funcion que reciba el evento de que se creó la reserva
        reserva_guardada() {
            this.obtenerReservas();
            this.isAct = false;
            console.log('Reserva guardada'); 
        },
        // Este es el que se pasa cmo @XXXXXX en el formulario
      submitReservation() {
        // Añadir la nueva reserva al array de reservas
        this.reservations.push({...this.reservation});
        
        // Limpiar el formulario
        this.reservation = {};
  
      },
      editReservation(reserva) {
        this.isAct = true;
        // Mostrar el formulario con los datos de la reserva
        console.log(reserva);
        this.reservation = reserva;
      },
    async  deleteReservation(reserva_id) {
        try {
          await axios.delete(`/dev/reserva?reserva_id=${reserva_id}`);
          this.obtenerReservas();
        } catch (error) {
          console.error(error);
        }
      }
    },
    mounted() {
      this.obtenerReservas();
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  .filas{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px;
    background-color: var(--color-4);
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button.active {
    background-color: var(--color-3);
  }
  
  button:hover {
    background-color: var(--color-5);
  }
  
  .form {
    padding: 20px;
    background-color: var(--color-2);
    border-radius: 8px;
    margin-top: 20px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid var(--color-4);
    border-radius: 5px;
  }
  
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
  </style>
  