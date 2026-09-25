import L from 'leaflet';

export const displayMap = (element, locations) => {
    const map = L.map(element, {
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false
    });

    L.tileLayer(
        import.meta.env.VITE_MAP_URL,
        {
            attribution: import.meta.env.MAP_ATTRIBUTION,
            maxZoom: 10
        }
    ).addTo(map);

    const bounds = L.latLngBounds();

    locations.forEach(loc => {
        const coordinates = [
            loc.coordinates[1],
            loc.coordinates[0]
        ];

        const marker = L.marker(coordinates).addTo(map);
        marker.bindPopup(
            `<p class="map-popup__text">
                Day ${loc.day}: ${loc.description}
            </p>`,
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: true,
                className: 'map-popup'
            }
        ).openPopup();

        bounds.extend(coordinates);
    });

    map.fitBounds(bounds, {
        padding: [90, 90]
    });

    return map;
};