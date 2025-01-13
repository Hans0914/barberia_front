<template>
    <div class="reservation-screen">
      <h1>Reserva</h1>
      <form @submit.prevent="submitReserva" class="form-container">

        <div class="form-group">
          <label for="barbero">Selecciona tu Barbero:</label>
          <DropdownSelect 
           @seleccionar_barbero="seleccionaBarbero"
           :barbero_cargado="barberoSeleccionado"
          />
        </div>
        <div class="form-group">
          <label for="fecha">Fecha de Reserva:</label>
          <input
            type="date"
            id="fecha"
            v-model="reserva.fecha"
          />
        </div>
        <div class="form-group">
          <label for="hora">Hora de Reserva:</label>
          <input
            type="time"
            id="hora"
            v-model="reserva.hora"
          />
        </div>
        
        <button v-if="!isAct" type="submit" class="button-submit">Reservar</button>
      </form>
      <button v-if="isAct" @click = "actualizarReserva()" type="submit" class="button-submit">Actualizar</button>
        <button @click="limpiarForm()" class="button-cancel">Cancelar</button>
    </div>
  </template>
  
  <script>
    import Dropdownselect from './Dropdownselect.vue';
    import axios from 'axios';
   
  export default {
    name: "ReservationScreen",
    // Data se recibe del padre
    components: {
        DropdownSelect: Dropdownselect
    },
    props: {
      reservation: {
        type: Object,
      },
      isAct : {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {
        barberoSeleccionado: {
            barbero_id: "",
            nombre: "",
        },
        reserva: {
          barbero: "",
          fecha: "",
          hora: "",
        },
      };
    },
    methods: {
        async actualizarReserva() {
        try {
            let body = {
                "reserva_id": this.reservation.reserva_id,
                "cliente_id": "123456789",
                "barbero_id": this.barberoSeleccionado.barbero_id,
                "fecha_reserva": this.reserva.fecha + " " + this.reserva.hora,
            } 
          let response = await axios.put('/dev/reserva',
          body
          ); // Cambia la URL por tu API
          console.log(response);
          this.$emit('reserva_guardada');
          this.limpiarForm();
        } catch (err) {
          this.error = 'Error al cargar los datos.';
          console.error(err);
        } finally {
          this.loading = false; // Finaliza el estado de carga
        }

      },
      async submitReserva() {
        try {
            let body = {
                "cliente_id": "123456789",
                "barbero_id": this.barberoSeleccionado.barbero_id,
                "fecha_reserva": this.reserva.fecha + " " + this.reserva.hora,
            } 
            // Quitar cors 
          let response = await axios.post('/dev/reserva',
          body
          ); // Cambia la URL por tu API
          console.log(response);
          this.$emit('reserva_guardada');
        } catch (err) {
          this.error = 'Error al cargar los datos.';
          console.error(err);
        } finally {
          this.loading = false; // Finaliza el estado de carga
        }
      },

      limpiarForm() {
        console.log("Limpiando reserva");
        this.seleccionaBarbero({});
        this.reserva = {
          barbero: "",
          fecha: "",
          hora: "",
        }
      },

      seleccionaBarbero(barbero) {
        this.barberoSeleccionado = barbero;
        this.reserva.barbero = barbero.barbero_id;
        console.log("Barbero seleccionado desde seleccionador:", this.barberoSeleccionado);
      },
    },

    watch: {
      reservation() {
        if (!this.reservation) {
          return;
        }
        if (Object.entries(this.reservation).length === 0) {
          return;
        }
        let fecha_split = this.reservation.fecha_reserva.split(" ");
        this.barberoSeleccionado = {
            barbero_id: this.reservation.id_barbero,
            nombre: this.reservation.nombre_barbero
        }
        
        this.reserva.barbero = this.reservation.nombre_barbero;
        this.reserva.fecha = fecha_split[0];
        this.reserva.hora = fecha_split[1]; 
        console.log("Reserva:", this.reserva.fecha);
      }
    }

  };
  </script>
  
  <style scoped>
  /* Paleta de colores */
  :root {
    --color-1: #d4afb9;
    --color-2: #d1cfe2;
    --color-3: #9cadce;
    --color-4: #7ec4cf;
    --color-5: #daeaf6;
  }
  
  .reservation-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--color-5);
    font-family: 'Arial', sans-serif;
    text-align: center;
  }
  
  h1 {
    font-size: 2rem;
    color: var(--color-3);
    margin-bottom: 2rem;
  }
  
  .form-container {
    background-color: var(--color-2);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 1rem;
    color: var(--color-3);
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid var(--color-3);
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  input:focus {
    border-color: var(--color-4);
  }
  
  .button-submit {
    background-color: var(--color-4);
    color: white;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button-cancel {
    background-color: var(--color-1);
    color: white;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  
  .button-submit:hover {
    background-color: var(--color-3);
  }

  .button-cancel:hover {
    background-color: var(--color-3);
  }
  </style>
  