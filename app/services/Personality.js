export default class personality {
    static getFrase(speakDto) {
        let mensaje = "";
        if(speakDto.marca){
        mensaje += "El producto es de marca " + speakDto.marca;
        }
        if(speakDto.modelo){
            if(mensaje !== ""){
                mensaje += "y modelo " + speakDto.modelo + ",";
            }else{
                mensaje += "El producto es de modelo " + speakDto.modelo + ",";
            }
        }
        if(speakDto.material){
            if(mensaje !== ""){
                mensaje += "y de material " + speakDto.material;
            }else{
                mensaje += "El producto es de material " + speakDto.material + ",";
            }
        }
        if(speakDto.envase){
            if(mensaje !== ""){
                mensaje += "con envase " + speakDto.material;
            }else{
                mensaje += "El producto es de material " + speakDto.material + ",";
            }
        }
        if(speakDto.contenido){
            if(mensaje !== ""){
                mensaje += " y contenido " + speakDto.contenido;
            }else{
                mensaje += "El producto es de material " + speakDto.contenido + ",";
            }
        }
        return mensaje;
    }
}