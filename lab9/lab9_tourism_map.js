const swedenMap = L.map('sweden-region-map').setView([62.0, 15.0], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 12,
    minZoom: 4
}).addTo(swedenMap);
let currentHighlight = null;
let currentCircle = null;
const swedenRegions = 
{
    norrland: 
    {
        name: 'Норрланд',
        center: [65.5, 18.0],
        zoom: 5,
        color: '#FF9800',
        description: 'Северный регион Швеции, известный своей арктической природой, северным сиянием, горами и национальными парками.',
        cities: ['Кируна', 'Лулео', 'Умео', 'Эстерсунд'],
        facts: 'Крупнейший по площади регион Швеции, занимает около 60% территории страны.'
    },
    svealand: 
    {
        name: 'Свеаланд',
        center: [59.5, 16.5],
        zoom: 6,
        color: '#4CAF50',
        description: 'Центральный регион, где находится столица Стокгольм, а также исторические города Уппсала и Вестерос.',
        cities: ['Стокгольм', 'Уппсала', 'Вестерос', 'Эребру'],
        facts: 'Здесь находится озеро Меларен — третье по величине озеро Швеции.'
    },
    gotaland: 
    {
        name: 'Гёталанд',
        center: [57.5, 13.0],
        zoom: 6,
        color: '#2196F3',
        description: 'Южный регион Швеции с крупными городами Гётеборг и Мальмё, а также живописными побережьями.',
        cities: ['Гётеборг', 'Мальмё', 'Хельсингборг', 'Лунд', 'Кальмар'],
        facts: 'В Гёталанде находится Гёта-канал, соединяющий Балтийское море с Каттегатом.'
    },
    oland: 
    {
        name: 'Эланд',
        center: [56.7, 16.6],
        zoom: 8,
        color: '#9C27B0',
        description: 'Второй по величине остров Швеции, известный своими пляжами, ветряными мельницами и замком Боргхольм.',
        cities: ['Боргхольм', 'Ферьестаден'],
        facts: 'Эланд соединен с материком самым длинным мостом в Швеции — Эландским мостом (6 км).'
    },
    gotland: 
    {
        name: 'Готланд',
        center: [57.5, 18.5],
        zoom: 8,
        color: '#E91E63',
        description: 'Крупнейший остров Швеции в Балтийском море, знаменитый средневековым городом Висбю (объект Всемирного наследия ЮНЕСКО).',
        cities: ['Висбю', 'Слите'],
        facts: 'Висбю окружен 3.5-километровой средневековой крепостной стеной с 44 башнями.'
    }
};

function loadSwedenRegion(regionName, regionId) 
{
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(regionName + ', Sweden')}&format=json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) 
            {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                if (currentCircle) 
                    swedenMap.removeLayer(currentCircle);
                let radiusInMeters = 150000;
                if (regionId === 'norrland') 
                    radiusInMeters = 250000;
                else if (regionId === 'svealand') 
                    radiusInMeters = 120000;
                else if (regionId === 'gotaland') 
                    radiusInMeters = 140000;
                else if (regionId === 'oland') 
                    radiusInMeters = 40000;
                else if (regionId === 'gotland') 
                    radiusInMeters = 50000;
                currentCircle = L.circle([lat, lon], {
                    color: swedenRegions[regionId].color,
                    fillColor: swedenRegions[regionId].color,
                    fillOpacity: 0.3,
                    radius: radiusInMeters,
                    weight: 5,
                    opacity: 0.9,
                }).addTo(swedenMap);
                const statusDiv = document.getElementById('sweden-map-status');
                statusDiv.innerHTML = `✨ ${swedenRegions[regionId].name}: ${swedenRegions[regionId].description}<br>🏙️ Города: ${swedenRegions[regionId].cities.join(', ')}<br>📌 ${swedenRegions[regionId].facts}`;
                statusDiv.style.background = '#d4edda';
            }
        })
        .catch(error => {
            const [lat, lon] = swedenRegions[regionId].center;
            if (currentCircle) 
                swedenMap.removeLayer(currentCircle);
            let radiusInMeters = 150000;
                if (regionId === 'norrland') 
                    radiusInMeters = 250000;
                else if (regionId === 'svealand') 
                    radiusInMeters = 120000;
                else if (regionId === 'gotaland') 
                    radiusInMeters = 140000;
                else if (regionId === 'oland') 
                    radiusInMeters = 40000;
                else if (regionId === 'gotland') 
                    radiusInMeters = 50000;
            currentCircle = L.circle([lat, lon], {
                color: swedenRegions[regionId].color,
                fillColor: swedenRegions[regionId].color,
                fillOpacity: 0.3,
                radius: radiusInMeters,
                weight: 5,
                opacity: 0.9,
            }).addTo(swedenMap);
            const statusDiv = document.getElementById('sweden-map-status');
            statusDiv.innerHTML = `✨ ${swedenRegions[regionId].name}: ${swedenRegions[regionId].description}<br>🏙️ Города: ${swedenRegions[regionId].cities.join(', ')}<br>📌 ${swedenRegions[regionId].facts}`;
            statusDiv.style.background = '#d4edda';
        });
}

document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const region = this.getAttribute('data-region');
        const regionName = swedenRegions[region].name;
        loadSwedenRegion(regionName, region);
    });
});

document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const region = this.getAttribute('data-region');
        highlightRegion(region, this);
    });
});