export default class personality {
    static getFrase(speakDto) {
        let mensaje = "";
        if (speakDto.tipo) {
            mensaje += "El producto es "  + this.getAdjetivo(speakDto.tipo) + " " + speakDto.tipo;
        }
        if (speakDto.marca) {
            if (mensaje !== "") {
                mensaje += "y modelo " + speakDto.marca + ",";
            } else {
                mensaje += "El producto es de marca " + speakDto.marca + ",";
            }
        }
        if (speakDto.color) {
            if (mensaje !== "") {
                mensaje += "de color " + speakDto.color + ",";
            } else {
                mensaje += "El producto es de color " + speakDto.color + ",";
            }
        }
        if (speakDto.modelo) {
            if (mensaje !== "") {
                mensaje += "y modelo " + speakDto.modelo + ",";
            } else {
                mensaje += "El producto es de modelo " + speakDto.modelo + ",";
            }
        }
        if (speakDto.material) {
            if (mensaje !== "") {
                mensaje += "y de material " + speakDto.material;
            } else {
                mensaje += "El producto es de material " + speakDto.material + ",";
            }
        }
        if (speakDto.envase) {
            if (mensaje !== "") {
                mensaje += "con envase " + speakDto.envase;
            } else {
                mensaje += "El producto es de material " + speakDto.material + ",";
            }
        }
        if (speakDto.contenido) {
            if (mensaje !== "") {
                mensaje += " con contenido " + speakDto.contenido;
            } else {
                mensaje += "El producto tiene un contenido de" + speakDto.contenido + ",";
            }
        }
        if (speakDto.descripcion) {
            if (mensaje !== "") {
                mensaje += " con descripción " + speakDto.descripcion;
            } else {
                mensaje += "El producto tiene como descripción" + speakDto.descripcion + ",";
            }
        }
        return mensaje;
    }
    static getAdjetivo(tipo) {
        let lastCaracter = "";
        lastCaracter = tipo.trim().slice(-1);
        if (lastCaracter == "a") {
            return "una";
        }
        return "un"
    }
}