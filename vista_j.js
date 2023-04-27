function crearTabla(dato,fila){
    var td=document.createElement("td")
    td.innerText=dato
    fila.appendChild(td)
}

function crearTablaForB(bug,cuerpo){//crear tabla de los bugs
    //console.log(bug.id)
    var fila=document.createElement("tr")
    crearTabla(bug.id,fila)
    crearTabla(bug.nombre,fila)
    crearTabla(bug.descripcion,fila)
    crearTabla(bug.depAsignados,fila)
    crearTabla(bug.prioridad,fila)
    crearTabla(bug.resuelto,fila)
    cuerpo.appendChild(fila)
}

function crearTablaForD(dev,cuerpo){
    //console.log(dev.id)
    var fila=document.createElement("tr")
    crearTabla(dev.id,fila)
    crearTabla(dev.nombre,fila)
    crearTabla(dev.numBugs,fila)
    cuerpo.appendChild(fila)
}

/*Tabla de bugs*/
var bugs=new Array(4)
var nombre0="Error con la pagina"
var desc0="Faltan elementos al cargar la pagina"
bugs[0]={id:"1", nombre:nombre0, descripcion:desc0, depAsignados:"Martin Gonzalez\nJuan Perez", prioridad:2, resuelto:"No"}
bugs[1]={id:"2", nombre:"Bug2", descripcion:"Descripcion 2", depAsignados:"ninguno", prioridad:1, resuelto:"No"}
bugs[2]={id:"3", nombre:"Bug3", descripcion:"Descripcion 3", depAsignados:"ninguno", prioridad:4, resuelto:"Si"}
bugs[3]={id:"4", nombre:"Bug4", descripcion:"Descripcion 4", depAsignados:"ninguno", prioridad:3, resuelto:"No"}

var tablaB=document.getElementById("Bugs")
var cuerpoB=document.createElement("tbody")

bugs.forEach(b => {
    crearTablaForB(b,cuerpoB)
})
tablaB.appendChild(cuerpoB)
var cuerpoActualB=cuerpoB

var btBuscarB=document.getElementById("botonBuscarB")
var textoB=document.getElementById("txt")
btBuscarB.addEventListener("click",function(){
    var nombre=textoB.value
    tablaB.removeChild(cuerpoActualB)
    if(nombre==""){
        cuerpoActualB=cuerpoB
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
            crearTablaForB(l,res)
        })
        cuerpoActualB=res
    }
    tablaB.appendChild(cuerpoActualB)
})

var btOrdenB=document.getElementById("botonOrdenB")
var seleccion=document.getElementById("ordenBugs")
btOrdenB.addEventListener("click",function(){
    var categoria=seleccion.value
    tablaB.removeChild(cuerpoActualB)
    bugs.sort((a,b) => {
        var ret=0
        if(categoria=="idB"){
            if(a.id<b.id) ret=-1
            else if(a.id>b.id) ret=1
        }else if(categoria=="nombreB"){
            if(a.nombre<b.nombre) ret=-1
            else if(a.nombre>b.nombre) ret=1
        }else if(categoria=="descB"){
            if(a.descripcion<b.descripcion) ret=-1
            else if(a.descripcion>b.descripcion) ret=1
        }else if(categoria=="priorityB"){
            ret=a.prioridad-b.prioridad
        }else if(categoria=="solvedB"){
            if(a.resuelto<b.resuelto) ret=-1
            else if(a.resuelto>b.resuelto) ret=1
        }
        return ret
    })
    cuerpoB=document.createElement("tbody")
    bugs.forEach(b => {
        crearTablaForB(b,cuerpoB)
    })
    tablaB.appendChild(cuerpoB)
    cuerpoActualB=cuerpoB
})
/**************************************************/

/*Tabla de depuradores*/
var devs=new Array(4)
devs[0]={id:"1", nombre:"Martin Gonzalez", numBugs:1}
devs[1]={id:"2", nombre:"Juan Perez", numBugs:1}
devs[2]={id:"3", nombre:"nombre3", numBugs:0}
devs[3]={id:"4", nombre:"nombre4", numBugs:0}

var tablaD=document.getElementById("Devs")
var cuerpoD=document.createElement("tbody")

devs.forEach(d => {
    crearTablaForD(d,cuerpoD)
})
tablaD.appendChild(cuerpoD)
var cuerpoActualD=cuerpoD
/***************************************************/

/*Asignar prioridad a bug*/
/***************************************************/

/*Asignar bug a depurador*/
var botonDev=document.getElementById("botonIdDev")
var txtBugD=document.getElementById("devIdBug")
var txtDev=document.getElementById("devIdDev")
botonDev.addEventListener("click",function(){
    var idBug=txtBugD.value
    var idDev=txtDev.value
    var posBug=-1
    for(i=0;i<bugs.length;i++){
        if(bugs[i].id==idBug){
            posBug=i
            break
        }
    }
    if(posBug==-1) return
    var posDev=-1
    for(i=0;i<devs.length;i++){
        if(devs[i].id==idDev){
            posDev=i
            break
        }
    }
    if(posDev==-1) return
    tablaB.removeChild(cuerpoActualB)
    tablaD.removeChild(cuerpoActualD)
    devs[posDev].numBugs++
    var nombreDev=devs[posDev].nombre
    if(bugs[posBug].depAsignados=="ninguno"){
        bugs[posBug].depAsignados=nombreDev
    }else{
        bugs[posBug].depAsignados+="\n"+nombreDev
    }
    cuerpoB=document.createElement("tbody")
    bugs.forEach(b => {
        crearTablaForB(b,cuerpoB)
    })
    tablaB.appendChild(cuerpoB)
    cuerpoActualB=cuerpoB
    cuerpoD=document.createElement("tbody")
    devs.forEach(d => {
        crearTablaForD(d,cuerpoD)
    })
    tablaD.appendChild(cuerpoD)
    cuerpoActualD=cuerpoD
})
/***************************************************/
