jQuery(document).ready(function () {
  jQuery('#contact-form').on('submit', function (e) {
    e.preventDefault(); // Evitar la recarga de la página

    // Mostrar un indicador de carga
    swal({
      title: "Enviando...",
      text: "Por favor espera mientras procesamos tu solicitud.",
      icon: "info",
      buttons: false,
    });

    // Realizar la solicitud AJAX
    jQuery.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzCvnd1-e518lsdpZtP3rW-MzYauV5FFFJnR8-Fj4eFsrXELfXkh0zdM7_KW8S8zNA/exec', // URL del script
      data: jQuery(this).serialize(), // Serializar los datos del formulario
      type: 'POST', // Método HTTP
      success: function (response) {
        try {
          // Parsear la respuesta si es necesario
          if (typeof response === "string") response = JSON.parse(response);

          // Verifica si la respuesta indica éxito
          if (response.result === "success") {
            swal({
              title: "¡Gracias!",
              text: "Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto.",
              icon: "success",
              timer: 3000
            }).then(function () {
              jQuery('#contact-form')[0].reset(); // Resetear el formulario
            });
          } else {
            swal({
              title: "Ups...",
              text: "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo más tarde.",
              icon: "error",
              timer: 3000
            });
          }
        } catch (error) {
          console.error("Error al procesar la respuesta:", error);
          swal({
            title: "Error",
            text: "Hubo un problema inesperado. Por favor, inténtalo de nuevo.",
            icon: "error",
            timer: 3000
          });
        }
      },
      error: function (xhr, status, error) {
        // Manejo de errores de la solicitud AJAX
        console.error("Error de AJAX:", status, error);
        swal({
          title: "Error",
          text: "No se pudo enviar el formulario. Revisa tu conexión a internet o inténtalo de nuevo más tarde.",
          icon: "error",
          timer: 3000
        });
      }
    });
  });
});
