//Funcion revisa si hay datos con la llave "data" en el local storage
function verificarLocalSorage(){
    const data = JSON.parse(localStorage.getItem("data"));

    if(data){
        leerLocalstorage(data);
    }
    else{
        consultaAPI();
    }
}

function leerLocalstorage(data){
    
    mostrarDatos(data);
    setTimeout(() => {
        localStorage.removeItem('data');
    }, 60000);
}

function consultaAPI(){
    let url = "https://reqres.in/api/users?delay=3";
    dibujarSpiner();
    fetch(url)
        .then(response => response.json())
        .then(data => guardarDatosLocalStorage(data))
        .catch(error => console.log(error));
}


function mostrarDatos(data){
    
    let codigoHTML = "";
    
    for (let index = 0; index < data.data.length; index++) {
        codigoHTML += `<div class="col-lg-4 mb-4">
        <div class="card border-0 text-center">
            <img src="${data.data[index].avatar}"
                alt="" class="card-img-top rounded-circle w-25 " style="margin: 0 auto">
            <div class="card-body">
                <h5 class="card-title">${data.data[index].first_name} ${data.data[index].last_name}</h5>
                <p class="card-text">${data.data[index].email}</p>
    
            </div>
        </div>
    </div>`
        
    }

    document.getElementById("contenido").innerHTML = codigoHTML;
    
}


function dibujarSpiner(){
    let codigoHTML = `<div class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`;
  document.getElementById("contenido").innerHTML = codigoHTML;


}



function guardarDatosLocalStorage(data){
    localStorage.setItem("data", JSON.stringify(data));
    mostrarDatos(data);
    setTimeout(() => {
        localStorage.removeItem('data'); 
    }, 60000);
}