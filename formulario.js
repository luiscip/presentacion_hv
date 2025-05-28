const form = document.getElementById("formulario-contacto");
const mensajeExito = document.getElementById("mensaje-exito");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action);
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      form.reset();
      mensajeExito.style.display = "block";

      // Opcional: ocultar después de 5 segundos
      setTimeout(() => {
        mensajeExito.style.display = "none";
      }, 5000);
    } else {
      alert("Hubo un problema al enviar el formulario. Intenta más tarde.");
    }
  };

  xhr.send(data);
});