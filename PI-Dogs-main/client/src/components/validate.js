export const validate = (name, value) => {
    let error = "";

    switch (name) {
        case "name":
            if (!value.trim()) {
                error = "*El nombre de la raza es obligatorio";
            }
            break;
        // case "height":
        //     if (!value.trim()) {
        //         error = "La altura es obligatoria";
        //     } else if (!/^\d{1,3}\s-\s\d{1,3}$/.test(value) ) {
        //         error =
        //             "Formato de altura inválido. Utiliza 'número - número' (por ejemplo, '20 - 110')";
        //     }
        //     break;


        // case "height":
        //     if (!value.trim()) {
        //       error = "*La altura es obligatoria";
        //     } else if (!/^\s*(\d{1,3})\s*-\s*(\d{1,3})\s*$/.test(value)) {
        //       error = "*Formato de altura inválido.";
        //     } else {
        //       const [minHeight, maxHeight] = value.split(" - ").map(Number);
          
        //       if (minHeight >= maxHeight) {
        //         error = "*El segundo valor debe ser mayor que el primero";
        //       }
        //     }
        //     break;

        case "height":
          if (!value.trim()) {
            error = "*La altura es obligatoria";
          } else {
            const match = value.match(/^\s*(\d{1,3})\s*-\s*(\d{1,3})\s*$/);
        
            if (!match) {
              error = "*Formato de altura inválido.";
            } else {
              const minHeight = Number(match[1].replace(/\s/g, ""));
              const maxHeight = Number(match[2].replace(/\s/g, ""));
        
              if (minHeight >= maxHeight) {
                error = "*El segundo valor debe ser mayor que el primero";
              }
            }
          }
          break;     
        case "weight":
            if (!value.trim()) {
                error = "*El peso es obligatorio";
            } else {
              const match = value.match(/^\s*(\d{1,2})\s*-\s*(\d{1,2})\s*$/); 
              if (!match){
                error =
                    "*Formato de peso inválido.";
            } else {
              const minHeight = Number(match[1].replace(/\s/g, ""));
              const maxHeight = Number(match[2].replace(/\s/g, ""));
        
              if (minHeight >= maxHeight) {
                error = "*El segundo valor debe ser mayor que el primero";
              }
            }
          }
          break;
        case "life_span":
            if (!value.trim()) {
                error = "*La edad es obligatoria";
            } else {
              const match = value.match(/^\s*(\d{1,2})\s*-\s*(\d{1,2})\s*$/); 
              if (!match) {
                error =
                    "*Formato de edad inválido.";
            } else {
              const minHeight = Number(match[1].replace(/\s/g, ""));
              const maxHeight = Number(match[2].replace(/\s/g, ""));
        
              if (minHeight >= maxHeight) {
                error = "*El segundo valor debe ser mayor que el primero";
              }
            }
          }
          break;
        case "image":
            if (!value.trim()) {
                error = "*La URL de la imagen es obligatoria";
            } else if (value.length > 300) {
                error = "*La URL de la imagen no puede exceder los 300 caracteres";
            } else if (!/^https?:\/\/\S+$/.test(value)) {
                error = "*URL de imagen inválida";
            }
            break;

        // case "image":
        //     const imageInput = document.getElementById("imageInput");
        //     const file = imageInput.files[0];
          
        //     if (!file) {
        //       error = "Debe seleccionar una imagen";
        //     } else if (!/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
        //       error = "Formato de imagen inválido. Utilice un archivo de imagen válido (jpg, jpeg, png o gif)";
        //     } else if (file.size > 20 * 1024 ) { // Reemplaza MAX_IMAGE_SIZE con el tamaño máximo permitido en bytes
        //         error = "El tamaño de la imagen es demasiado grande. Por favor, seleccione una imagen más pequeña.";
        //       }
        //     break;
        default:
            break;
    }

    return error;
};