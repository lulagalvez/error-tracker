function crearTabla(dato,fila){
    var td=document.createElement("td")
    td.innerText=dato
    fila.appendChild(td)
}

function crearTablaFor(bug,cuerpo){
    console.log(bug.id)
    var fila=document.createElement("tr")
    crearTabla(bug.id,fila)
    crearTabla(bug.nombre,fila)
    crearTabla(bug.descripcion,fila)
    crearTabla(bug.depAsignados,fila)
    cuerpo.appendChild(fila)
}

var bugs=new Array(4)
bugs[0]={id:1, nombre:"Error con la pagina", descripcion:"Faltan elementos al cargar la pagina", depAsignados:"Martin Gonzalez\nJuan Perez"}
bugs[1]={id:2, nombre:"nombre 2", descripcion:"descripcion 2", depAsignados:"ninguno"}
bugs[2]={id:3, nombre:"nombre 3", descripcion:"descripcion 3", depAsignados:"ninguno"}
bugs[3]={id:4, nombre:"nombre 4", descripcion:"descripcion 4", depAsignados:"ninguno"}

var tabla=document.getElementById("Bugs")
var cuerpo=document.createElement("tbody")

bugs.forEach(b => {
    crearTablaFor(b,cuerpo)
})
tabla.appendChild(cuerpo)
var cuerpoActual=cuerpo

var bt=document.getElementById("boton")
var texto=document.getElementById("txt")
bt.addEventListener("click",function(){
    var nombre=texto.value
    tabla.removeChild(cuerpoActual)
    if(nombre==""){
        cuerpoActual=cuerpo
    }else{
        var res=document.createElement("tbody")
        var lista=[]
        bugs.forEach(b => {
            var aux=b.nombre
            if(aux.startsWith(nombre)){
                lista.push(b)
            }
        })
        lista.forEach(l => {
            crearTablaFor(l,res)
        })
        cuerpoActual=res
    }
    tabla.appendChild(cuerpoActual)
})