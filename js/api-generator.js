/* API Generator JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize API Generator
    initializeAPIGenerator();
});

function initializeAPIGenerator() {
    // Set up API card selection
    setupAPICardSelection();
    
    // Set up tab switching
    setupTabSwitching();
    
    // Set up endpoint toggling
    setupEndpointToggling();
    
    // Set up chart controls
    setupChartControls();
    
    // Set up API key actions
    setupAPIKeyActions();
    
    // Set up form toggles
    setupFormToggles();
    
    // Set up action buttons
    setupActionButtons();
}

// API Card Selection
function setupAPICardSelection() {
    const apiCards = document.querySelectorAll('.api-card');
    
    apiCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            apiCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update API details section (in a real app, this would load data from the server)
            const apiName = this.querySelector('.api-info h3').textContent;
            updateAPIDetailsTitle(apiName);
            
            // Show notification
            showNotification(`Selected API: ${apiName}`, 'info');
        });
    });
}

// Tab Switching
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.header-tab');
    const tabContents = document.querySelectorAll('.details-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the selected tab content
            const tabName = this.textContent.toLowerCase();
            const selectedTab = document.getElementById(`${tabName}-tab`);
            if (selectedTab) {
                selectedTab.style.display = 'block';
            }
        });
    });
}

// Endpoint Toggling
function setupEndpointToggling() {
    const endpointHeaders = document.querySelectorAll('.endpoint-header');
    
    endpointHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const toggleButton = this.querySelector('.endpoint-action-btn:last-child i');
            
            // Toggle content visibility
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggleButton.className = 'fas fa-chevron-up';
            } else {
                content.style.display = 'none';
                toggleButton.className = 'fas fa-chevron-down';
            }
        });
    });
}

// Chart Controls
function setupChartControls() {
    const chartControls = document.querySelectorAll('.chart-control');
    
    chartControls.forEach(control => {
        control.addEventListener('click', function() {
            // Remove active class from all controls
            chartControls.forEach(ctrl => ctrl.classList.remove('active'));
            
            // Add active class to clicked control
            this.classList.add('active');
            
            // Update chart (in a real app, this would load different data)
            updateChartData(this.textContent.toLowerCase());
        });
    });
}

// Update Chart Data
function updateChartData(timeframe) {
    // In a real app, this would fetch data for the selected timeframe
    // For this prototype, we'll just simulate different data
    
    const chartBars = document.querySelectorAll('.chart-bar');
    
    // Generate random heights based on timeframe
    chartBars.forEach(bar => {
        let height;
        
        switch(timeframe) {
            case 'day':
                height = Math.floor(Math.random() * 70) + 30; // 30-100%
                break;
            case 'week':
                height = Math.floor(Math.random() * 60) + 40; // 40-100%
                break;
            case 'month':
                height = Math.floor(Math.random() * 50) + 50; // 50-100%
                break;
            default:
                height = Math.floor(Math.random() * 70) + 30; // 30-100%
        }
        
        bar.style.height = `${height}%`;
    });
    
    // Update chart labels based on timeframe
    const chartLabels = document.querySelector('.chart-labels');
    if (chartLabels) {
        let labels;
        
        switch(timeframe) {
            case 'day':
                labels = ['12am', '4am', '8am', '12pm', '4pm', '8pm', '11pm'];
                break;
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                break;
            case 'month':
                labels = ['W1', 'W2', 'W3', 'W4'];
                break;
            default:
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        }
        
        // Only update if we have the right number of spans
        const spans = chartLabels.querySelectorAll('span');
        if (spans.length === labels.length) {
            spans.forEach((span, index) => {
                span.textContent = labels[index];
            });
        }
    }
}

// API Key Actions
function setupAPIKeyActions() {
    const viewKeyButton = document.querySelector('.api-key-action:first-child');
    const copyKeyButton = document.querySelector('.api-key-action:last-child');
    const apiKeyHidden = document.querySelector('.api-key-hidden');
    
    if (viewKeyButton && apiKeyHidden) {
        viewKeyButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (apiKeyHidden.textContent === '••••••••••••••••••••••') {
                // Show the API key (in a real app, this would fetch the actual key)
                apiKeyHidden.textContent = 'api key here';
                icon.className = 'fas fa-eye-slash';
            } else {
                // Hide the API key
                apiKeyHidden.textContent = '••••••••••••••••••••••';
                icon.className = 'fas fa-eye';
            }
        });
    }
    
    if (copyKeyButton) {
        copyKeyButton.addEventListener('click', function() {
            // In a real app, this would copy the actual key to clipboard
            navigator.clipboard.writeText('api key here')
                .then(() => {
                    showNotification('API key copied to clipboard', 'success');
                })
                .catch(err => {
                    showNotification('Failed to copy API key', 'error');
                    console.error('Could not copy text: ', err);
                });
        });
    }
}

// Form Toggles
function setupFormToggles() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const toggleId = this.id;
            const isChecked = this.checked;
            
            // Handle specific toggle actions
            switch(toggleId) {
                case 'rate-limit-toggle':
                    // Enable/disable rate limit inputs
                    const rateLimitInputs = document.querySelectorAll('.form-group input[type="number"]');
                    rateLimitInputs.forEach(input => {
                        input.disabled = !isChecked;
                    });
                    
                    showNotification(`Rate limiting ${isChecked ? 'enabled' : 'disabled'}`, 'info');
                    break;
                    
                case 'cors-toggle':
                    // Enable/disable CORS origin input
                    const corsInput = document.querySelector('.form-group input[value="*"]');
                    if (corsInput) {
                        corsInput.disabled = !isChecked;
                    }
                    
                    showNotification(`CORS ${isChecked ? 'enabled' : 'disabled'}`, 'info');
                    break;
                    
                default:
                    // Generic toggle notification
                    showNotification(`Setting ${isChecked ? 'enabled' : 'disabled'}`, 'info');
            }
        });
    });
}

// Action Buttons
function setupActionButtons() {
    // New API button
    const newAPIButton = document.querySelector('.btn-primary');
    if (newAPIButton) {
        newAPIButton.addEventListener('click', function() {
            showNotification('Creating new API...', 'info');
            
            // In a real app, this would open a form or modal
            setTimeout(() => {
                showNotification('New API creation feature coming soon!', 'info');
            }, 1500);
        });
    }
    
    // Test API button
    const testAPIButton = document.querySelector('.header-actions .btn-secondary');
    if (testAPIButton) {
        testAPIButton.addEventListener('click', function() {
            showNotification('Testing API...', 'info');
            
            // Simulate API test
            setTimeout(() => {
                showNotification('API test successful! Response time: 235ms', 'success');
            }, 2000);
        });
    }
    
    // Deploy button
    const deployButton = document.querySelector('.header-actions .btn-primary');
    if (deployButton) {
        deployButton.addEventListener('click', function() {
            showNotification('Deploying API...', 'info');
            
            // Simulate deployment process
            setTimeout(() => {
                showNotification('API deployed successfully!', 'success');
            }, 3000);
        });
    }
    
    // Danger zone buttons
    const dangerButtons = document.querySelectorAll('.danger-zone button');
    dangerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            // Confirm dangerous actions
            if (confirm(`Are you sure you want to ${action} this API? This action ${action === 'Delete' ? 'cannot' : 'can'} be undone.`)) {
                showNotification(`API ${action.toLowerCase()} in progress...`, 'warning');
                
                // Simulate action
                setTimeout(() => {
                    showNotification(`API ${action.toLowerCase()}d successfully`, action === 'Delete' ? 'warning' : 'success');
                    
                    if (action === 'Delete') {
                        // In a real app, this would redirect to the API list page
                        // For now, we'll just update the UI
                        const activeCard = document.querySelector('.api-card.active');
                        if (activeCard) {
                            activeCard.remove();
                            
                            // Select the first remaining card if any
                            const firstCard = document.querySelector('.api-card');
                            if (firstCard) {
                                firstCard.click();
                            }
                        }
                    }
                }, 2000);
            }
        });
    });
    
    // Save Changes button
    const saveButton = document.querySelector('.settings-header .btn-primary');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            showNotification('Saving changes...', 'info');
            
            // Simulate saving process
            setTimeout(() => {
                showNotification('Changes saved successfully!', 'success');
            }, 1500);
        });
    }
}

// Update API Details Title
function updateAPIDetailsTitle(apiName) {
    const overviewTitle = document.querySelector('.overview-title h2');
    if (overviewTitle) {
        overviewTitle.textContent = apiName;
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let container = document.querySelector('.notification-container');
    
    // Create container if it doesn't exist
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add notification content
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${getIconForNotificationType(type)}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.add('notification-hiding');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('notification-hiding');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Get Icon for Notification Type
function getIconForNotificationType(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'error': return 'fa-times-circle';
        case 'info':
        default: return 'fa-info-circle';
    }
}
