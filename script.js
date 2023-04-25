// Variables globales
var map;
var currentBasemap;

// Función para cambiar el basemap
function changeBasemap(basemapUrl) {
  if (currentBasemap) {
    map.removeLayer(currentBasemap);
  }
  const tiles = L.tileLayer(basemapUrl, { attribution: '' });
  tiles.addTo(map);
  tiles.on('load', function () {
    currentBasemap = tiles;
  });
}

// Función para mostrar las coordenadas del marcador
function showMarkerCoordinates(marker) {
  var position = marker.getLatLng();
  marker.setPopupContent("<b>Coordenadas WGS 84</b><br>Latitud: " + position.lat.toFixed(6) + "<br>Longitud: " + position.lng.toFixed(6));
  marker.openPopup();
}

// Función para inicializar el mapa
function initMap() {
  // Creamos el mapa
  map = L.map('mapid').setView([-2.1961603, -79.8862076], 13);

  var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
  });

  // Agregamos un marcador
  var marker = L.marker([-2.170998, -79.922359], { draggable: true, icon: redIcon }).addTo(map);

  marker.bindPopup("<b>Coordenadas WGS 84</b><br>Latitud: " + marker.getLatLng().lat.toFixed(6) + "<br>Longitud: " + marker.getLatLng().lng.toFixed(6)).openPopup();
  
  marker.on('mousemove', function (event) {
    showMarkerCoordinates(marker);
  });

  // Añadimos el basemap inicial
  var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' });
  streets.addTo(map);
  currentBasemap = streets;

  // Agregamos los botones para cambiar de basemap
  var openStreetMapButton = document.getElementById('openstreetmap-button');
  openStreetMapButton.addEventListener('click', function () {
    changeBasemap('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  });

  var esriButton = document.getElementById('esri-button');
  esriButton.addEventListener('click', function () {
    changeBasemap('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
  });

  var openTopoMapButton = document.getElementById('opentopomap-button');
  openTopoMapButton.addEventListener('click', function () {
    changeBasemap('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
  });

}
// Inicializamos el mapa cuando la página carga
window.onload = initMap;
