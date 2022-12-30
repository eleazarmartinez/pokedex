
const listaPokemon = document.querySelector("#listaPokemon");
const botones = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
       
}


function mostrarPokemon(pokemon){



 let tipos = pokemon.types.map(type=>
    `<p class="${ type.type.name} tipo"> ${ type.type.name} </p>`);

    tipos = tipos.join( "")

    let pokemonId = pokemon.id.toString()
    if(pokemonId.length ===1){
        pokemonId = "00"+ pokemon.id
    }else if(pokemonId.length ===2){
        pokemonId = "0"+ pokemon.id
    }




    listaPokemon.innerHTML += `
    <div class="pokemon">
                    <p class="pokemon-id-back"># ${pokemonId} </p>
                    <div class="pokemon-imagen">
                        <img src= ${pokemon.sprites.other["official-artwork"].front_default}  alt= ${pokemon.name}}>
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokemonId}</p>
                            <h2 class="pokemon-nombre"> ${pokemon.name} </h2>
                        </div>
                        <div class="pokemon-tipos">
                           ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokemon.height} m</p>
                            <p class="stat">${pokemon.weight}kg</p>
                        </div>
                    </div>
                </div>
    
    `
}

botones.forEach((boton)=>{
boton.addEventListener("click",(event)=>{
    

    let botonId = event.currentTarget.id;
   
    

   listaPokemon.innerHTML = " ";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos"){
                 mostrarPokemon(data)
                }else{
                    let tipos = data.types.map(type => type.type.name )
                    if(tipos.some(tipo => tipo.includes(botonId))){
                        mostrarPokemon(data)

                    }

                }

                
                
            })
           
    }

})
})