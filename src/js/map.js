// src/js/map.js
document.addEventListener('DOMContentLoaded', () => {
    const all_locations = [
        "home", "wallace", "spawn", "seaweed_castle", "fork",
        "jellyfish_fields", "crevice", "hydrothermal_vents",
        "crystal_crab_cave", "sunken_ship"
    ];

    const map_overlay = document.getElementById('map-overlay');
    const map_container = document.getElementById('map-container');

    // Hide the map as soon as the page loads
    if (map_overlay) {
        map_overlay.style.display = 'none';
    }

    function update_map() {
        if (!map_container) return;
        map_container.innerHTML = '';
        const visited_locations = JSON.parse(localStorage.getItem('visited_locations')) || [];

        all_locations.forEach(location => {
            const location_element = document.createElement('div');
            // Add a class and a unique ID for CSS grid positioning
            location_element.classList.add('map-location');
            location_element.id = `map-${location}`; // e.g., id="map-spawn"

            if (visited_locations.includes(location)) {
                location_element.textContent = location.replace(/_/g, ' ');
            } else {
                location_element.textContent = '???';
            }
            map_container.appendChild(location_element);
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'm' && map_overlay) {
            const is_visible = map_overlay.style.display === 'flex';
            if (is_visible) {
                map_overlay.style.display = 'none';
            } else {
                update_map();
                map_overlay.style.display = 'flex';
            }
        }
    });
});