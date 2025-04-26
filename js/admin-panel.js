/* Admin Panel JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Admin Panel
    initializeAdminPanel();
});

function initializeAdminPanel() {
    // Set up admin tabs
    setupAdminTabs();
    
    // Set up settings navigation
    setupSettingsNav();
    
    // Set up content tabs
    setupContentTabs();
    
    // Set up user management
    setupUserManagement();
    
    // Set up billing period
    setupBillingPeriod();
    
    // Set up dropdown menus
    setupDropdowns();
    
    // Set up charts
    setupCharts();
    
    // Set up modals
    setupModals();
}

// Admin Tabs
function setupAdminTabs() {
    const adminTabs = document.querySelectorAll('.admin-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (adminTabs.length > 0 && tabContents.length > 0) {
        adminTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Get tab ID
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs
                adminTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show corresponding tab content
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
}

// Settings Navigation
function setupSettingsNav() {
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    const settingsSections = document.querySelectorAll('.settings-section');
    
    if (settingsNavItems.length > 0 && settingsSections.length > 0) {
        settingsNavItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                settingsNavItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Hide all sections
                settingsSections.forEach(section => section.classList.remove('active'));
                
                // Show corresponding section
                settingsSections[index].classList.add('active');
            });
        });
    }
}

// Content Tabs
function setupContentTabs() {
    const contentTabs = document.querySelectorAll('.content-tab');
    
    if (contentTabs.length > 0) {
        contentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                contentTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // In a real app, this would filter the content table
                // For this prototype, we'll just show a notification
                showNotification(`Filtered content by: ${this.textContent.trim()}`, 'info');
            });
        });
    }
}

// User Management
function setupUserManagement() {
    const selectAllCheckbox = document.getElementById('select-all');
    const userCheckboxes = document.querySelectorAll('tbody .checkbox-wrapper input[type="checkbox"]');
    const roleFilter = document.getElementById('role-filter');
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    const rowsPerPage = document.getElementById('rows-per-page');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const searchInput = document.querySelector('.tab-actions .search-input');
    const searchButton = document.querySelector('.tab-actions .search-button');
    const addUserButton = document.querySelector('.tab-actions .btn-primary');
    const userModal = document.getElementById('user-modal');
    const modalClose = userModal ? userModal.querySelector('.modal-close') : null;
    const cancelButton = userModal ? userModal.querySelector('.modal-footer .btn-secondary') : null;
    const addButton = userModal ? userModal.querySelector('.modal-footer .btn-primary') : null;
    const editButtons = document.querySelectorAll('.action-buttons .btn-icon:first-child');
    const deleteButtons = document.querySelectorAll('.action-buttons .btn-icon:last-child');
    
    // Select All Checkbox
    if (selectAllCheckbox && userCheckboxes.length > 0) {
        selectAllCheckbox.addEventListener('change', function() {
            userCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
        
        // Update select all checkbox when individual checkboxes change
        userCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = Array.from(userCheckboxes).every(c => c.checked);
                const someChecked = Array.from(userCheckboxes).some(c => c.checked);
                
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            });
        });
    }
    
    // Filters
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // Rows Per Page
    if (rowsPerPage) {
        rowsPerPage.addEventListener('change', function() {
            showNotification(`Showing ${rowsPerPage.value} rows per page`, 'info');
        });
    }
    
    // Pagination
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    paginationButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                });
            }
        });
    }
    
    // Search
    if (searchInput && searchButton) {
        // Search on button click
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // Search on Enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Add User
    if (addUserButton && userModal && modalClose) {
        // Open user modal
        addUserButton.addEventListener('click', function() {
            userModal.classList.add('show');
        });
        
        // Close user modal
        modalClose.addEventListener('click', function() {
            userModal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        userModal.addEventListener('click', function(e) {
            if (e.target === userModal) {
                userModal.classList.remove('show');
            }
        });
        
        // Cancel button
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                userModal.classList.remove('show');
            });
        }
        
        // Add button
        if (addButton) {
            addButton.addEventListener('click', function() {
                // Get form values
                const name = document.getElementById('user-name').value;
                const email = document.getElementById('user-email').value;
                const role = document.getElementById('user-role').value;
                const status = document.getElementById('user-status').value;
                const password = document.getElementById('user-password').value;
                const confirmPassword = document.getElementById('user-confirm-password').value;
                
                // Validate form
                if (!name || !email || !role || !password) {
                    showNotification('Please fill in all required fields', 'error');
                    return;
                }
                
                if (password !== confirmPassword) {
                    showNotification('Passwords do not match', 'error');
                    return;
                }
                
                // Show success notification
                showNotification('User added successfully!', 'success');
                
                // Close modal
                userModal.classList.remove('show');
                
                // Reset form
                document.getElementById('user-name').value = '';
                document.getElementById('user-email').value = '';
                document.getElementById('user-role').value = '';
                document.getElementById('user-status').value = 'active';
                document.getElementById('user-password').value = '';
                document.getElementById('user-confirm-password').value = '';
                document.getElementById('send-welcome-email').checked = false;
            });
        }
    }
    
    // Edit User
    if (editButtons.length > 0) {
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get user data from row
                const row = this.closest('tr');
                const name = row.querySelector('.user-info span').textContent;
                const email = row.querySelector('td:nth-child(3)').textContent;
                const role = row.querySelector('.badge').textContent;
                const status = row.querySelector('td:nth-child(5) .badge').textContent;
                
                // Show notification
                showNotification(`Editing user: ${name}`, 'info');
                
                // In a real app, this would open the user modal with pre-filled data
            });
        });
    }
    
    // Delete User
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get user data from row
                const row = this.closest('tr');
                const name = row.querySelector('.user-info span').textContent;
                
                // Confirm deletion
                if (confirm(`Are you sure you want to delete user: ${name}?`)) {
                    // Show notification
                    showNotification(`User deleted: ${name}`, 'success');
                    
                    // In a real app, this would delete the user from the database
                    // and remove the row from the table
                }
            });
        });
    }
}

// Apply Filters
function applyFilters() {
    const roleFilter = document.getElementById('role-filter');
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    
    // Get filter values
    const role = roleFilter ? roleFilter.value : 'all';
    const status = statusFilter ? statusFilter.value : 'all';
    const date = dateFilter ? dateFilter.value : 'all';
    
    // Show notification
    showNotification(`Filters applied: Role=${role}, Status=${status}, Date=${date}`, 'info');
    
    // In a real app, this would filter the table data
}

// Perform Search
function performSearch() {
    const searchInput = document.querySelector('.tab-actions .search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    // Show notification
    showNotification(`Searching for "${searchTerm}"...`, 'info');
    
    // In a real app, this would search the table data
}

// Billing Period
function setupBillingPeriod() {
    const periodButtons = document.querySelectorAll('.chart-period .period-btn');
    
    if (periodButtons.length > 0) {
        periodButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                periodButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update chart data
                updateRevenueChart(button.textContent.trim());
            });
        });
    }
}

// Update Revenue Chart
function updateRevenueChart(period) {
    // In a real app, this would update the chart data based on the selected period
    showNotification(`Updated revenue chart to show ${period} data`, 'info');
}

// Dropdowns
function setupDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (dropdownToggles.length > 0) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Get dropdown menu
                const dropdown = this.closest('.dropdown');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                // Toggle menu
                menu.classList.toggle('show');
                
                // Close menu when clicking outside
                document.addEventListener('click', function closeMenu(e) {
                    if (!dropdown.contains(e.target)) {
                        menu.classList.remove('show');
                        document.removeEventListener('click', closeMenu);
                    }
                });
            });
        });
    }
}

// Charts
function setupCharts() {
    // Usage Chart
    const usageChartCanvas = document.getElementById('usageChart');
    
    if (usageChartCanvas) {
        const usageChart = new Chart(usageChartCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'API Calls',
                        data: [12500, 15000, 18000, 22000, 25000, 28000, 32000, 38000, 42000, 45000, 48000, 52000],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Workflows',
                        data: [5000, 6000, 7500, 9000, 10500, 12000, 14000, 16000, 18000, 20000, 22000, 24000],
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                if (value >= 1000) {
                                    return (value / 1000) + 'k';
                                }
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Growth Chart
    const growthChartCanvas = document.getElementById('growthChart');
    
    if (growthChartCanvas) {
        const growthChart = new Chart(growthChartCanvas, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'New Users',
                        data: [85, 92, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240],
                        backgroundColor: '#9b59b6'
                    },
                    {
                        label: 'Active Users',
                        data: [650, 700, 750, 820, 900, 980, 1050, 1120, 1180, 1220, 1240, 1248],
                        backgroundColor: '#3498db'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Revenue Chart
    const revenueChartCanvas = document.getElementById('revenueChart');
    
    if (revenueChartCanvas) {
        const revenueChart = new Chart(revenueChartCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [15000, 18500, 22000, 24856],
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Expenses',
                        data: [8000, 9500, 11000, 12500],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

// Modals
function setupModals() {
    const systemSettingsButton = document.querySelector('.admin-actions .btn-primary');
    const settingsTab = document.querySelector('.admin-tab[data-tab="settings"]');
    
    if (systemSettingsButton && settingsTab) {
        systemSettingsButton.addEventListener('click', function() {
            // Trigger click on settings tab
            settingsTab.click();
        });
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
