/* Dashboard JavaScript Improvements */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initializeNotifications();
    initializeQuickActions();
    initializeCharts();
    initializeAnimations();
    initializeSearchFunctionality();
    
    // Add welcome notification
    showWelcomeNotification();
});

// Notification System
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Add notification bell functionality
    const notificationBell = document.querySelector('.btn-secondary i.fa-bell');
    if (notificationBell) {
        notificationBell.parentElement.addEventListener('click', function() {
            toggleNotificationPanel();
        });
    }
}

function showNotification(message, type = 'info', duration = 5000) {
    const container = document.querySelector('.notification-container');
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Create notification content
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
    
    // Auto-remove after duration
    if (duration) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('notification-hiding');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
}

function getIconForNotificationType(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'error': return 'fa-times-circle';
        case 'info':
        default: return 'fa-info-circle';
    }
}

function toggleNotificationPanel() {
    let panel = document.querySelector('.notification-panel');
    
    if (!panel) {
        // Create panel if it doesn't exist
        panel = document.createElement('div');
        panel.className = 'notification-panel';
        
        // Add header
        const header = document.createElement('div');
        header.className = 'notification-panel-header';
        header.innerHTML = `
            <h3>Notifications</h3>
            <button class="btn btn-text">Mark all as read</button>
        `;
        panel.appendChild(header);
        
        // Add content
        const content = document.createElement('div');
        content.className = 'notification-panel-content';
        
        // Sample notifications
        const notifications = [
            { type: 'info', message: 'New agent template available', time: '2 minutes ago' },
            { type: 'success', message: 'Workflow "Data Processing" completed successfully', time: '1 hour ago' },
            { type: 'warning', message: 'API usage approaching limit', time: 'Yesterday' },
            { type: 'error', message: 'Agent "Email Processor" encountered an error', time: '2 days ago' }
        ];
        
        notifications.forEach(notif => {
            const item = document.createElement('div');
            item.className = `notification-item notification-${notif.type}`;
            item.innerHTML = `
                <div class="notification-item-icon">
                    <i class="fas ${getIconForNotificationType(notif.type)}"></i>
                </div>
                <div class="notification-item-content">
                    <p class="notification-item-message">${notif.message}</p>
                    <p class="notification-item-time">${notif.time}</p>
                </div>
            `;
            content.appendChild(item);
        });
        
        panel.appendChild(content);
        
        // Add footer
        const footer = document.createElement('div');
        footer.className = 'notification-panel-footer';
        footer.innerHTML = `
            <button class="btn btn-text">View all notifications</button>
        `;
        panel.appendChild(footer);
        
        // Add to document
        document.querySelector('.top-bar').appendChild(panel);
        
        // Add close functionality when clicking outside
        document.addEventListener('click', function(event) {
            if (!panel.contains(event.target) && 
                !event.target.closest('.btn-secondary i.fa-bell')) {
                panel.classList.remove('notification-panel-show');
            }
        });
    }
    
    // Toggle visibility
    panel.classList.toggle('notification-panel-show');
}

function showWelcomeNotification() {
    setTimeout(() => {
        showNotification('Welcome to the enhanced 4AI-build dashboard!', 'info', 8000);
    }, 1000);
}

// Quick Actions
function initializeQuickActions() {
    // Create quick actions section if it doesn't exist
    if (!document.querySelector('.quick-actions')) {
        const dashboardContent = document.querySelector('.dashboard-content');
        if (dashboardContent) {
            const quickActions = document.createElement('div');
            quickActions.className = 'quick-actions';
            
            // Define quick actions
            const actions = [
                { 
                    icon: 'fa-robot', 
                    title: 'Create Agent', 
                    description: 'Build a new AI agent from scratch or template' 
                },
                { 
                    icon: 'fa-project-diagram', 
                    title: 'New Workflow', 
                    description: 'Design automated processes with multiple agents' 
                },
                { 
                    icon: 'fa-flask', 
                    title: 'Prompt Lab', 
                    description: 'Test and optimize prompts for your agents' 
                }
            ];
            
            // Create action cards
            actions.forEach(action => {
                const card = document.createElement('div');
                card.className = 'action-card';
                card.innerHTML = `
                    <div class="action-icon">
                        <i class="fas ${action.icon}"></i>
                    </div>
                    <h3 class="action-title">${action.title}</h3>
                    <p class="action-description">${action.description}</p>
                `;
                
                // Add click functionality
                card.addEventListener('click', function() {
                    handleQuickAction(action.title);
                });
                
                quickActions.appendChild(card);
            });
            
            // Insert at the beginning of dashboard content
            dashboardContent.insertBefore(quickActions, dashboardContent.firstChild);
        }
    }
}

function handleQuickAction(actionTitle) {
    switch(actionTitle) {
        case 'Create Agent':
            window.location.href = 'agent-management.html';
            break;
        case 'New Workflow':
            window.location.href = 'workflow-builder.html';
            break;
        case 'Prompt Lab':
            window.location.href = 'prompt-lab.html';
            break;
    }
}

// Charts and Visualizations
function initializeCharts() {
    // Enhance existing chart visualizations
    updateAgentStatusChart();
}

function updateAgentStatusChart() {
    const chartCenter = document.querySelector('.chart-center');
    if (chartCenter) {
        // Add animation to chart value
        const chartValue = chartCenter.querySelector('.chart-value');
        if (chartValue) {
            const finalValue = parseInt(chartValue.textContent);
            animateNumber(chartValue, 0, finalValue, 1500);
        }
    }
    
    // Update chart segments with animation
    const chartSegments = document.querySelectorAll('.chart-segment');
    chartSegments.forEach(segment => {
        const percentage = parseFloat(getComputedStyle(segment).getPropertyValue('--percentage'));
        segment.style.setProperty('--percentage', '0');
        setTimeout(() => {
            segment.style.transition = 'transform 1.5s ease-out';
            segment.style.setProperty('--percentage', percentage);
        }, 100);
    });
}

// Animations and Visual Effects
function initializeAnimations() {
    // Add entrance animations to dashboard cards
    const cards = document.querySelectorAll('.metric-card, .dashboard-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Search Functionality
function initializeSearchFunctionality() {
    // Add search bar to top bar if it doesn't exist
    const topBar = document.querySelector('.top-bar');
    if (topBar && !document.querySelector('.search-container')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-input-wrapper">
                <i class="fas fa-search search-icon"></i>
                <input type="text" class="search-input" placeholder="Search...">
            </div>
        `;
        
        // Insert after page title
        const pageTitle = topBar.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.parentNode.insertBefore(searchContainer, pageTitle.nextSibling);
        } else {
            topBar.insertBefore(searchContainer, topBar.firstChild);
        }
        
        // Add search functionality
        const searchInput = searchContainer.querySelector('.search-input');
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('search-focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('search-focused');
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    if (query.trim() === '') return;
    
    // Show search notification
    showNotification(`Searching for "${query}"...`, 'info', 2000);
    
    // In a real application, this would perform an actual search
    setTimeout(() => {
        showNotification(`Found 5 results for "${query}"`, 'success', 5000);
    }, 2000);
}
