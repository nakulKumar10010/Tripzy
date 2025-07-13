mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: listing.geometry.coordinates,
  zoom: 10
});

// Create a custom marker element using the uploaded image
const customMarker = document.createElement('div');
customMarker.className = 'custom-marker';
customMarker.style.backgroundImage = 'url("/uploads/img/marker.png")'; // Path to your uploaded image
customMarker.style.width = '40px';   // Adjust size to fit your needs
customMarker.style.height = '40px';
customMarker.style.backgroundSize = 'contain';
customMarker.style.backgroundRepeat = 'no-repeat';
customMarker.style.backgroundPosition = 'center';
customMarker.style.cursor = 'pointer';

const marker = new mapboxgl.Marker({ element: customMarker })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h3>${listing.title}</h3><p>${listing.location}</p>`)
  )
  .addTo(map);

