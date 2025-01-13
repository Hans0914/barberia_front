<template>
    <div class="welcome-screen">
      <h1>Bienvenido a Barbería Barbatos</h1>
      <div class="button-container">
        <button class="button button-login" @click=abrirModal()>Ingresar</button>
        <button class="button button-register">Registrar</button>
      </div>
    </div>
   <!-- Modal para ingresar el número de celular -->
   <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h2>Ingrese su Número de celular</h2>
        <form @submit.prevent="buscarUsuario">
          <input
            type="text"
            v-model="celular"
            placeholder="Ingrese su celular"
            maxlength="10"
          />
          <div class="modal-buttons">
            <button type="submit" class="button button-submit">Ingresar</button>
            <button type="button" class="button button-cancel" @click="cerrarModal">Cancelar</button>
          </div>
        </form>
        <p v-if="mensajeError" class="error-message">{{ mensajeError }}</p>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  export default {
    name: "WelcomeScreen",
    data() {
      return {
        mostrarModal: false,
        celular: '',
        mensajeError: '',
      };
    },
    methods: {
    abrirModal() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.celular = "";
      this.mensajeError = "";
    },
    async buscarUsuario() {
      if (!this.celular) {
        this.mensajeError = "Por favor ingrese un número de celular válido.";
        return;
      }

      try {
        const response = await axios.get(`/dev/clientes?celular=${this.celular}`);
        if (response.data) {
          console.log(response.data);
          alert(`Bienvenido de nuevo, ${response.data.nombre}!`);
          this.cerrarModal();
          // Aquí puedes redirigir al usuario a su dashboard o pantalla principal
        } else {
          this.mensajeError = "Número de celular no encontrado.";
        }
      } catch (error) {
        console.error("Error al buscar el usuario:", error);
        this.mensajeError = "Ocurrió un error al buscar el número.";
      }
    },
  },
  };
  </script>
  
  <style scoped>
/* Paleta de colores */
:root {
  --color-background: #daeaf6;
  --color-1: #d4afb9;
  --color-2: #d1cfe2;
  --color-3: #9cadce;
  --color-4: #7ec4cf;
}

.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-background);
  font-family: "Arial", sans-serif;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: var(--color-3);
  margin-bottom: 2rem;
}

.button-container {
  display: flex;
  gap: 1rem;
}

.button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-login {
  background-color: var(--color-4);
  color: white;
}

.button-register {
  background-color: var(--color-2);
  color: white;
}

.button:hover {
  opacity: 0.8;
}

/* Estilo del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal h2 {
  color: var(--color-3);
  margin-bottom: 1rem;
}

.modal input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-3);
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.button-submit {
  background-color: var(--color-4);
  color: white;
}

.button-cancel {
  background-color: var(--color-2);
  color: white;
}

.error-message {
  color: var(--color-1);
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>