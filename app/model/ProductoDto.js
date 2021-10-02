export class ProductoDto {
    usuarioId = null;
    marca = null;
    modelo = null;
    material = null;
    envase = null;
    contenido = null;
    color = null;
    descripcion = null;
    imagenes = [];

    constructor(usuarioId, marca, modelo, material, envase, contenido, color, descripcion, imagenes) {
        this.usuarioId = usuarioId;
        this.marca = marca;
        this.modelo = modelo;
        this.material = material;
        this.envase = envase;
        this.contenido = contenido;
        this.color = color;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
    }
}