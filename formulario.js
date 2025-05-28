document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario-contacto");
    const mensajeExito = document.getElementById("mensaje-exito");
    const botonEnviar = form.querySelector('input[type="submit"]');
  
    const tiempoEspera = 60; // segundos
  
    // Función para iniciar contador si es necesario
    function verificarBloqueo() {
      const ultimoEnvio = localStorage.getItem("ultimoEnvio");
      if (!ultimoEnvio) return;
  
      const ahora = Date.now();
      const restante = tiempoEspera - Math.floor((ahora - ultimoEnvio) / 1000);
  
      if (restante > 0) {
        bloquearBoton(restante);
      }
    }
  
    // Función para bloquear el botón y mostrar contador
    function bloquearBoton(segundosIniciales) {
      let segundos = segundosIniciales;
      botonEnviar.disabled = true;
      botonEnviar.value = `Espera ${segundos}s...`;
  
      const cuentaAtras = setInterval(() => {
        segundos--;
        botonEnviar.value = `Espera ${segundos}s...`;
  
        if (segundos <= 0) {
          clearInterval(cuentaAtras);
          botonEnviar.disabled = false;
          botonEnviar.value = "Enviar";
          localStorage.removeItem("ultimoEnvio");
        }
      }, 1000);
    }
  
    // Escuchar envío del formulario
    form.addEventListener("submit", () => {
      // Guardar tiempo del envío en localStorage
      localStorage.setItem("ultimoEnvio", Date.now());
  
      // Mostrar mensaje de éxito
      setTimeout(() => {
        mensajeExito.style.display = "block";
        setTimeout(() => {
          mensajeExito.style.display = "none";
        }, 5000);
      }, 1000);
  
      // Iniciar bloqueo
      bloquearBoton(tiempoEspera);
    });
  
    // Al cargar la página, revisar si ya estaba bloqueado
    verificarBloqueo();
  });
  