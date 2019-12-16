// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAtVuzX9ivRRLwYMkdosUZfwaZkASQ9h1U",
    authDomain: "primer-crud-668c0.firebaseapp.com",
    projectId: "primer-crud-668c0",
});
  
var db = firebase.firestore();

// Agregar documentos
const guardar = () => {

    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const fecha = document.querySelector('#fecha').value;


    db.collection("usuarios").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then(function(docRef) {
        console.log("Documento escrito con el ID: ", docRef.id);
        document.querySelector('#nombre').value = '';
        document.querySelector('#apellido').value = '';
        document.querySelector('#fecha').value = '';
    })
    .catch(function(error) {
        console.error("Error añadiendo el documento: ", error);
    });
}

// Leer datos
const tabla = document.querySelector('#tabla');
db.collection("usuarios").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
          <td class="font-weight-bold" scope="row">${doc.id}</td>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')">Editar</button></td>
        </tr>
        `
    });
});

// Borrar datos
const eliminar = (id) => {
    db.collection("usuarios").doc(id).delete().then(function() {
        console.log("Documento Eliminado!");
    }).catch(function(error) {
        console.error("Error eliminando documento: ", error);
    });
}

// Editar datos

const editar = (id, nombre, apellido, fecha) => {

    document.querySelector('#nombre').value = nombre;
    document.querySelector('#apellido').value = apellido;
    document.querySelector('#fecha').value = fecha;
    
    const boton = document.querySelector('#boton');
    boton.innerHTML = 'Editar';
    boton.onclick = () => {
        var washingtonRef = db.collection("usuarios").doc(id);

        // Set the "capital" field of the city 'DC'

        const nombre = document.querySelector('#nombre').value;
        const apellido = document.querySelector('#apellido').value;
        const fecha = document.querySelector('#fecha').value;

        return washingtonRef.update({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(function() {
            console.log("Documento editado correctamente!");
            boton.innerHTML = 'Guardar';
            document.querySelector('#nombre').value = '';
            document.querySelector('#apellido').value = '';
            document.querySelector('#fecha').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error al editar el documento: ", error);
        });
    }
}