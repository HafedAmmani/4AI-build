// Ajout du code JavaScript pour les graphiques de statistiques d'utilisation
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si les éléments canvas existent
    const usageChartElement = document.getElementById('usageChart');
    const resourceChartElement = document.getElementById('resourceChart');
    
    if (usageChartElement) {
        const usageChart = new Chart(usageChartElement, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'API Calls',
                    data: [320, 280, 350, 410, 290, 380, 426],
                    borderColor: '#4a6cf7',
                    backgroundColor: 'rgba(74, 108, 247, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Compute Hours',
                    data: [2.1, 1.8, 2.5, 3.2, 2.7, 2.9, 3.3],
                    borderColor: '#6ad2ff',
                    backgroundColor: 'rgba(106, 210, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Storage (MB)',
                    data: [150, 170, 180, 190, 200, 210, 220],
                    borderColor: '#ffba69',
                    backgroundColor: 'rgba(255, 186, 105, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(200, 200, 200, 0.1)'
                        }
                    }
                }
            }
        });
    }
    
    if (resourceChartElement) {
        const resourceChart = new Chart(resourceChartElement, {
            type: 'doughnut',
            data: {
                labels: ['Document Processing', 'Customer Support', 'Data Analysis', 'Content Generation', 'Other'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#4a6cf7',
                        '#6ad2ff',
                        '#ffba69',
                        '#ff6b6b',
                        '#8c54ff'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '70%'
            }
        });
    }
    
    // Gestion du sélecteur de plage de temps
    const timeRangeSelect = document.querySelector('.time-range-select');
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', function() {
            // Simuler le chargement de nouvelles données
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="spinner"></div>';
            
            const cardContent = document.querySelector('.usage-stats-card .card-content');
            if (cardContent) {
                cardContent.appendChild(loadingOverlay);
                
                setTimeout(() => {
                    loadingOverlay.remove();
                    // Ici on pourrait mettre à jour les données du graphique
                }, 1000);
            }
        });
    }
});
