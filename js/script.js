//Constantes iniciales
const letrasContenedor = document.getElementById("letter-container");
const opcionContenedor = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const agregarContainer = document.getElementById("new-palabra-container");
const agregarText = document.getElementById("agregar-text");
const botonGuardar = document.getElementById("new-palabra-button");
const selectOpcion = document.getElementById("opciones");
const inputPalabra = document.getElementById("inputPalabra");

var frutas = [];
var animales = [];
var paises = [];

const cargarPalabrasPredeterminadas = () => {
    frutas = JSON.parse(localStorage.getItem("Frutas"))

    if (frutas === null) {

        frutas = ["manzana", "cereza", "mandarina", "pera", "pomelo", "sandia"];
        animales = ["hipopotamo", "pantera", "cebra", "tigre", "mono", "elefante"];
        paises = ["india", "dominicana", "argentina", "colombia", "brazil", "uruguay"];


        localStorage.setItem("Frutas", JSON.stringify(frutas));
        localStorage.setItem("Animales", JSON.stringify(animales));
        localStorage.setItem("Paises", JSON.stringify(paises));

        var opciones = {
            frutas,
            animales,
            paises
        };
        return opciones;

    } else {
        frutas = JSON.parse(localStorage.getItem("Frutas"));
        animales = JSON.parse(localStorage.getItem("Animales"));
        paises = JSON.parse(localStorage.getItem("Paises"));
        var opciones = {
            frutas,
            animales,
            paises
        };

        return opciones;
    }

}



const guardarPalabra = () => {

    if (inputPalabra.value !== "") {

        switch (selectOpcion.value) {

            case "1":
                if (inputPalabra.value.toLowerCase() === frutas.filter(elem => elem === inputPalabra.value.toLowerCase()).toString()) {
                    alert("La Palabra " + inputPalabra.value.toUpperCase() + " ya existe");
                } else {
                    frutas.push(inputPalabra.value.toLowerCase());
                    localStorage.setItem("Frutas", JSON.stringify(frutas));
                    agregarContainer.classList.add("hide");
                }
                break;
            case "2":
                if (inputPalabra.value.toLowerCase() === animales.filter(elem => elem === inputPalabra.value.toLowerCase()).toString()) {
                    alert("La Palabra " + inputPalabra.value.toUpperCase() + " ya existe");
                } else {
                    animales.push(inputPalabra.value.toLowerCase());
                    localStorage.setItem("Animales", JSON.stringify(animales));
                    agregarContainer.classList.add("hide");
                }
                break;
            case "3":
                if (inputPalabra.value.toLowerCase() === paises.filter(elem => elem === inputPalabra.value.toLowerCase()).toString()) {
                    alert("La Palabra " + inputPalabra.value.toUpperCase() + " ya existe");
                } else {
                    paises.push(inputPalabra.value.toLowerCase());
                    localStorage.setItem("Paises", JSON.stringify(paises));
                    agregarContainer.classList.add("hide");
                }
                break;
            default:
                alert("NO SE PUEDE GUARDAR UNA PALABRA SIN SU CATEGORIA");
                break;
        }

    } else {
        alert("NO SE PUEDE GUARDAR UNA PALABRA VACIA");
    }

};

var opciones = cargarPalabrasPredeterminadas();
//Contador
let winCount = 0;
let count = 0;

let palabraElegida = "";

//Botones opciones
const displayOptions = () => {

    let buttonAgregar = `<button onclick="agregarContenedor()">Agregar Palabra</button>`;
    opcionContenedor.innerHTML += `<h3>Seleccione una categoría</h3>`;
    let buttonOpcion = document.createElement("div");

    for (let value in opciones) {

        buttonOpcion.innerHTML += `<button class="options" onclick="generarPalabra('${value}')">${value}</button>` + `<br>`;

    }
    buttonOpcion.innerHTML += `<hr>${buttonAgregar}`;
    opcionContenedor.appendChild(buttonOpcion);
};


//Agregar Palabra Contenedor
const agregarContenedor = () => {
    agregarContainer.classList.remove("hide");

};
//Quitar Contendor Palabra
const quitarContenedor = () => {
    agregarContainer.classList.add("hide");
}

//Bloque de botones letras
const bloquear = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    //Desabilita opcion
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    //Desabilita letra
    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    newGameContainer.classList.remove("hide");
};


//Selecionar palabra para jugar
const generarPalabra = (optionValue) => {

    let optionsButtons = document.querySelectorAll(".options");

    //Hover para el boton de la opcion selecionada
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });



    //inicialmente ocultar letras, borrar palabra anterior
    letrasContenedor.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = opciones[optionValue];

    //elegir palabra al azar
    palabraElegida = optionArray[Math.floor(Math.random() * optionArray.length)];
    palabraElegida = palabraElegida.toUpperCase();

    //reemplace cada letra con un espacio que contenga un guión
    let displayItem = palabraElegida.replace(/./g, '<span class="dashes">_</span>');


    userInputSection.innerHTML = displayItem;
};

//Función inicial (llamada cuando se carga la página/el usuario presiona nuevo juego)
const inicializador = () => {

    winCount = 0;
    count = 0;

    //Borrar todo el contenido, ocultar las letras y el botón de juego nuevo
    userInputSection.innerHTML = "";
    opcionContenedor.innerHTML = "";
    letrasContenedor.classList.add("hide");
    newGameContainer.classList.add("hide");
    letrasContenedor.innerHTML = "";

    //Para crear botones de letras
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        //Numeros a ASCII[A-Z]
        button.innerText = String.fromCharCode(i);

        //Evento click en el boton de caracter
        button.addEventListener("click", () => {
            let charArray = palabraElegida.split("");
            let dashes = document.getElementsByClassName("dashes");

            //si el array contiene un valor seleccionado, reemplace el guión coincidente con la letra; 
            //de lo contrario, desabilite la letra en el lienzo
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {

                    //si el carácter en el array es el mismo que el botón en el que se hizo clic
                    if (char === button.innerText) {

                        //reemplazar guión con letra
                        dashes[index].innerText = char;

                        //incrementar contador 
                        winCount += 1;

                        //si winCount es igual a la longitud de la palabra
                        //mostramos Ganado
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>Tu Ganas!! &#128512</h2><p>La palabra era <span>${palabraElegida.toUpperCase()}</span></p>`;
                            //bloquear todos los botones
                            bloquear();
                        }
                    }
                });
            } else {

                //Incrementar contador perdido
                count += 1;

                //Dibujar el personaje
                dibujarPersonaje(count);

                //Count==6 because head,body,left arm, right arm,left leg,right leg
                if (count == 6) {
                    resultText.innerHTML = `<h2 class='lose-msg'>Tu Pierdes!! &#128557</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
                    bloquear();
                }
            }

            //disable clicked button
            button.disabled = true;
        });

        letrasContenedor.append(button);
    }

    displayOptions();

    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { dibujoInicial } = crearLienzo();

    //initialDrawing would draw the frame
    dibujoInicial();
};

//Lienzo
const crearLienzo = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#0A3871";
    context.lineWidth = 2;

    //Para dibujar líneas
    const dibujarLinea = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const cabeza = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const cuerpo = () => {
        dibujarLinea(70, 40, 70, 80);
    };

    const brazoIzquierdo = () => {
        dibujarLinea(70, 50, 50, 70);
    };

    const brazoDerecho = () => {
        dibujarLinea(70, 50, 90, 70);
    };

    const piernaIzquierda = () => {
        dibujarLinea(70, 80, 50, 110);
    };

    const piernaDerecha = () => {
        dibujarLinea(70, 80, 90, 110);
    };

    //Marco inicial
    const dibujoInicial = () => {
        //Limpiar lienzo
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //Linea inferior
        dibujarLinea(10, 130, 130, 130);
        //Linea derecha
        dibujarLinea(10, 10, 10, 131);
        //Linea superior
        dibujarLinea(10, 10, 70, 10);
        //Linea superio pequeña
        dibujarLinea(70, 10, 70, 20);
    };

    return { dibujoInicial, cabeza, cuerpo, brazoIzquierdo, brazoDerecho, piernaIzquierda, piernaDerecha };
};

//Dibujar personaje
const dibujarPersonaje = (count) => {
    let { cabeza, cuerpo, brazoIzquierdo, brazoDerecho, piernaIzquierda, piernaDerecha } = crearLienzo();
    switch (count) {
        case 1:
            cabeza();
            break;
        case 2:
            cuerpo();
            break;
        case 3:
            brazoIzquierdo();
            break;
        case 4:
            brazoDerecho();
            break;
        case 5:
            piernaIzquierda();
            break;
        case 6:
            piernaDerecha();
            break;
        default:
            break;
    }

};

//Nuevo Juego
newGameButton.addEventListener("click", inicializador);
window.onload = inicializador;