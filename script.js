// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
    
    // Simulate chart animations
    setTimeout(() => {
        const chartSegments = document.querySelectorAll('.chart-segment');
        chartSegments.forEach(segment => {
            segment.style.transition = 'transform 1s ease-out';
        });
    }, 100);
    
    // Add click handlers for buttons
    const actionButtons = document.querySelectorAll('.btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default for demo purposes
            e.preventDefault();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            ripple.classList.add('active');
            
            setTimeout(() => {
                ripple.remove();
            }, 500);
            
            // Handle specific button actions
            if (button.textContent.includes('New Workflow')) {
                console.log('Create new workflow');
                // In a real app, this would navigate to the workflow builder
            }
            
            if (button.textContent.includes('Manage Agents')) {
                console.log('Navigate to agent management');
                // In a real app, this would navigate to the agent management page
            }
        });
    });
    
    // Add hover effects for table rows
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--color-primary-light)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Simulate data loading
    simulateDataLoading();
});

// Function to simulate data loading with a subtle animation
function simulateDataLoading() {
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        const finalValue = metric.textContent;
        metric.textContent = '0';
        
        let currentValue = 0;
        const targetValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        const duration = 1000; // 1 second
        const interval = 20; // Update every 20ms
        const steps = duration / interval;
        const increment = targetValue / steps;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                clearInterval(counter);
                metric.textContent = finalValue;
            } else {
                metric.textContent = Math.floor(currentValue).toString();
                if (finalValue.includes('%')) {
                    metric.textContent += '%';
                }
            }
        }, interval);
    });
}
