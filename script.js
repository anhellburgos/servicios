
// Variables globales
var map;

// Función para cambiar el basemap
function changeBasemap(basemapUrl) {
  var tiles = L.tileLayer(basemapUrl, { attribution: '' });
  tiles.addTo(map);
  tiles.bringToBack();
}

// Función para inicializar el mapa
function initMap() {
  // Creamos el mapa
  map = L.map('mapid').setView([-2.1961603, -79.8862076], 13);


  var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Agregamos un marcador
  var marker = L.marker([-2.170998, -79.922359], { draggable: true, icon: redIcon }).addTo(map);

  marker.bindPopup("<b>Coordenadas WGS 84</b><br>Latitud: " + marker.getLatLng().lat.toFixed(6) + "<br>Longitud: " + marker.getLatLng().lng.toFixed(6)).openPopup();

  marker.on('mousemove', function (event) {
    var position = marker.getLatLng();
    marker.setPopupContent("<b>Coordenadas WGS 84</b><br>Latitud: " + position.lat.toFixed(6) + "<br>Longitud: " + position.lng.toFixed(6));
    marker.openPopup();
  });

  // Añadimos el basemap inicial
  var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' });
  streets.addTo(map);

  // Añadimos los botones para cambiar de basemap
  var streetsButton = document.getElementById('streets-button');
  streetsButton.addEventListener('click', function () {
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
    var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' });
    streets.addTo(map);
  });

  var satelliteButton = document.getElementById('satellite-button');
  satelliteButton.addEventListener('click', function () {
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
    var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '© Esri' });
    satellite.addTo(map);
  });

  var topoButton = document.getElementById('topo-button');
  topoButton.addEventListener('click', function () {
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { attribution: '© OpenTopoMap' });
    topo.addTo(map);
  });
}

// Inicializamos el mapa cuando la página carga
window.onload = initMap;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Declarar la variable que almacenará la ubicación del marcador
// let markerLocation = L.latLng([51.505, -0.09]);

// // Crear el mapa con el primer basemap
// let map = L.map('mapid', {
//   center: markerLocation,
//   zoom: 13,
//   layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
// });

// // Agregar el marcador al mapa
// let marker = L.marker(markerLocation, { draggable: true, icon: redIcon }).addTo(map);

// // Función para cambiar el basemap
// function changeBasemap(layer) {
//   // Remover todos los layers del mapa
//   map.eachLayer(function (layer) {
//     map.removeLayer(layer);
//   });

//   // Agregar el nuevo layer al mapa
//   layer.addTo(map);

//   // Volver a agregar el marcador al mapa
//   marker.addTo(map);
// }

// // Crear los layers de los basemaps
// let streetsLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
// let satelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox/satellite-streets-v11',
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'YOUR_ACCESS_TOKEN'
// });

// // Agregar el layer de streets al mapa por defecto
// streetsLayer.addTo(map);

// // Crear el control de capas para cambiar entre los basemaps
// let baseLayers = {
//   'Streets': streetsLayer,
//   'Satellite': satelliteLayer
// };
// L.control.layers(baseLayers).addTo(map);

// // Agregar el botón para cambiar los basemaps
// L.easyButton('fa-exchange-alt', function () {
//   if (map.hasLayer(streetsLayer)) {
//     changeBasemap(satelliteLayer);
//   } else {
//     changeBasemap(streetsLayer);
//   }
// }).addTo(map);





