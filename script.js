var mymap = L.map('mapid', {
  center: [-2.170998, -79.922359],
  zoom: 13,
  scrollWheelZoom: true
});

var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18
});

tileLayer.addTo(mymap);

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var marker = L.marker([-2.170998, -79.922359], { draggable: true, icon: redIcon }).addTo(mymap);

marker.bindPopup("<b>Coordenadas WGS 84</b><br>Latitud: " + marker.getLatLng().lat.toFixed(6) + "<br>Longitud: " + marker.getLatLng().lng.toFixed(6)).openPopup();

marker.on('mousemove', function (event) {
  var position = marker.getLatLng();
  marker.setPopupContent("<b>Coordenadas WGS 84</b><br>Latitud: " + position.lat.toFixed(6) + "<br>Longitud: " + position.lng.toFixed(6));
  marker.openPopup();
  // mymap.setView(position, 13);
});










var baseMaps = {
  "Streets": streets,
  "Satellite": satellite
};

// Add basemaps to layer control and add layer control to map
L.control.layers(baseMaps).addTo(mymap);

// Add marker to map
var marker = L.marker([-2.196160, -79.886208], { draggable: true }).addTo(mymap);

// Add tooltip to marker
marker.bindTooltip("Guayaquil").openTooltip();

// Add popup to marker
var popup = L.popup();
marker.on('click', function (e) {
  popup
    .setLatLng(marker.getLatLng())
    .setContent("Latitud: " + marker.getLatLng().lat + "<br>Longitud: " + marker.getLatLng().lng + "<br>Ciudad: Guayaquil")
    .openOn(mymap);
});

// Change basemap when option is selected
document.getElementById('basemaps').addEventListener('change', function () {
  var selectedBasemap = this.value;
  mymap.eachLayer(function (layer) {
    if (layer instanceof L.TileLayer) {
      mymap.removeLayer(layer);
    }
  });
  baseMaps[selectedBasemap].addTo(mymap);
});
