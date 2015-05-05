/*
Autor: Diego Salas
Fecha creacion: 4/20/2015
Descripcion: Javascript encargado del manejo de canvas de seleccion de daño
del vehículo

*/

//Test de asignacion de daños vehiculo
//Variables de entorno
var canvas;
var ctx;
var auto;
var cPushArray;
var cStep;
var mousePressed;
var lastX, lastY;
var container;
var idImg;
var containerWidth;
var containerHeight;
var imgSedan;
var imgTruck;
var scrSedan;
var scrTruck;

$(window).load(function () {
    inicializarVariables();
    //Por default carga el estilo sedan del vehículo
    cargarEstilo(1);
    dibujaImg();
    $(window).resize(respondCanvas);
    respondCanvas();

    $(canvas).click(function (e) {
        clickDanio(e);
    });

    $('#Sel_Estilo').change(function () {
        var idEstilo = $(this).val();
        selectEstiloIMG(idEstilo);
        dibujaImg();
    });

});

function selectEstiloIMG(idEstilo) {
    cargarEstilo(idEstilo);
}

function inicializarVariables() {
    canvas = $('#myCanvas');
    ctx = canvas.get(0).getContext('2d');
    container = $(canvas).parent();

    //seteo de valores por defecto del div
    containerWidth = 500;
    containerHeight = 500;

    imgSedan = new Image();
    imgTruck = new Image();
    scrSedan = "../Recursos/sedan_2_portas.png";
    scrTruck = "../Recursos/truck.png";

    imgSedan.src = scrSedan;
    imgTruck.src = scrTruck;

    cPushArray = new Array();
    cStep = -1;
}

function respondCanvas() {

    if ($(container).width() == 100) {
        $(canvas).attr('width', containerWidth); //max width
        $(canvas).attr('height', containerHeight); //max height
        //alert("aaa");
    } else {
        containerWidth = $(container).width();
        containerHeight = $(container).height();
        $(canvas).attr('width', containerWidth); //max width
        $(canvas).attr('height', containerHeight); //max height
        //alert(containerWidth +" "+ containerHeight)
    }
    //dibujaImg();
    clonCanvas()
}

function dibujaImg() {
    //alert("asda" + auto.src);

    var W = containerWidth;
    var H = containerHeight;
    auto.onload = function () { //la nueva imagen tiene que haberse cargado

        ctx.drawImage(auto, 0, 0, W, H);
        cPush();
        //alert("W "+ W+ " H " + H);
    }
}

function cargarEstilo(idEstilo) {
    switch (idEstilo) {
        case 1:
            auto = imgSedan;
            break;
        case 2:
            auto = imgTruck
            break;
    }
}

function asigValorIMG(ID) {
    idImg = ID;
}

function clickDanio(event) {
    var pos = getMousePos(event),
    canvas_x = pos.x;
    canvas_y = pos.y;
    //alert(canvas_x +" " +canvas_y);
    //Dependiendo del daño selecciona la imagen correspondiente al mismo
    switch (idImg) {
        case 0:
            //Sin daño
            img = "";
            break;
        case 1:
            //Abollado
            img = document.getElementById("abollado");
            break;
        case 2:
            img = document.getElementById("desgaste");
            break;
        case 3:
            img = document.getElementById("estrellado");
            break;
        case 4:
            img = document.getElementById("otro");
            break;
        case 5:
            img = document.getElementById("pintDesg");
            break;
        case 6:
            img = document.getElementById("rayado");
            break;

    }
    //dibujado
    ctx.drawImage(img, canvas_x, canvas_y);
    cPush();
}

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('myCanvas').toDataURL());
}
function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

function getMousePos(evt) {
    return {
        x: evt.clientX - canvas.offset().left - 15,
        y: evt.clientY - canvas.offset().top - 15
    };
}

function clonCanvas()
{
    cPushArray.push(document.getElementById('myCanvas').toDataURL());
    var canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0, containerWidth, containerHeight); }
}

function clearCanvas() {
    ctx.drawImage(auto, 0, 0, canvas.width(), canvas.height());
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
}
