<template>
    <div class="register-screen">
      <h1>Registrar Cliente</h1>
      <form @submit.prevent="submitForm" class="form-container">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="cliente.name" placeholder="Ingresa tu nombre" />
        </div>
        <div class="form-group">
          <label for="phone">Celular:</label>
          <input type="tel" id="phone" v-model="cliente.phone" placeholder="Ingresa tu celular" />
        </div>
        <div class="form-group">
          <label for="email">Correo:</label>
          <input type="email" id="email" v-model="cliente.email" placeholder="Ingresa tu correo" />
        </div>
        <button @click = "submitCliente()" type="submit" class="button-submit">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: "RegisterScreen",
    data() {
      return {
        cliente:{
            name: "",
            phone: "",
            email: "",
        }
    };
    },
    methods: {
        async submitCliente() {
            try {
                let body = {
                    "nombre": this.cliente.name,
                    "celular": this.cliente.phone,
                    "correo": this.cliente.email
                } 
                // Quitar cors 
            let response = await axios.post('/dev/clientes',
            body
            ); // Cambia la URL por tu API
            console.log(response);
            this.$emit('clente_guardado');
            } catch (err) {
            this.error = 'Error al cargar los datos.';
            console.error(err);
            } finally {
            this.loading = false; // Finaliza el estado de carga
            }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background);
    text-align: center;
  }
  
  h1 {
    font-size: 2rem;
    color: var(--color-3);
    margin-bottom: 2rem;
  }
  
  .form-container {
    background-color: var(--color-background-soft);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
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
  
  .button-submit:hover {
    background-color: var(--color-3);
  }
  </style>
  