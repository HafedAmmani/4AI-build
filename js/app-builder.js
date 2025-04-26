/* App Builder JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize App Builder
    initializeAppBuilder();
});

function initializeAppBuilder() {
    // Set up category switching
    setupCategorySwitching();
    
    // Set up device switching
    setupDeviceSwitching();
    
    // Set up view switching
    setupViewSwitching();
    
    // Set up property panel toggles
    setupPropertyToggles();
    
    // Set up drag and drop functionality
    setupDragAndDrop();
    
    // Set up canvas interactions
    setupCanvasInteractions();
}

// Category Switching
function setupCategorySwitching() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get category name
            const category = this.getAttribute('data-category');
            
            // Hide all component groups
            document.querySelectorAll('.component-group').forEach(group => {
                group.style.display = 'none';
            });
            
            // Show the selected component group
            const selectedGroup = document.querySelector(`.component-group[data-category="${category}"]`);
            if (selectedGroup) {
                selectedGroup.style.display = 'grid';
            }
        });
    });
}

// Device Switching
function setupDeviceSwitching() {
    const deviceButtons = document.querySelectorAll('.device-btn');
    const canvasContainer = document.querySelector('.canvas-container');
    
    deviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all device buttons
            deviceButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get device type
            const device = this.getAttribute('data-device');
            
            // Update canvas container style based on device
            switch(device) {
                case 'desktop':
                    canvasContainer.style.width = '100%';
                    canvasContainer.style.height = '100%';
                    break;
                case 'tablet':
                    canvasContainer.style.width = '768px';
                    canvasContainer.style.height = '1024px';
                    canvasContainer.style.margin = '0 auto';
                    break;
                case 'mobile':
                    canvasContainer.style.width = '375px';
                    canvasContainer.style.height = '667px';
                    canvasContainer.style.margin = '0 auto';
                    break;
            }
        });
    });
}

// View Switching
function setupViewSwitching() {
    const viewButtons = document.querySelectorAll('.toolbar-btn[data-view]');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all view buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get view type
            const view = this.getAttribute('data-view');
            
            // Update UI based on view (in a real app, this would show/hide different panels)
            showNotification(`Switched to ${view} view`, 'info');
        });
    });
}

// Property Panel Toggles
function setupPropertyToggles() {
    const propertyToggles = document.querySelectorAll('.property-toggle');
    
    propertyToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.parentElement.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle content visibility
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.className = 'fas fa-chevron-down';
            } else {
                content.style.display = 'none';
                icon.className = 'fas fa-chevron-up';
            }
        });
    });
}

// Drag and Drop Functionality
function setupDragAndDrop() {
    const componentItems = document.querySelectorAll('.component-item');
    const dropzone = document.querySelector('.dropzone');
    
    componentItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-component'));
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // Dropzone event listeners
    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    dropzone.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const componentType = e.dataTransfer.getData('text/plain');
        if (componentType) {
            addComponentToCanvas(componentType, e.clientX, e.clientY);
        }
    });
}

// Canvas Interactions
function setupCanvasInteractions() {
    const canvas = document.querySelector('.canvas-content');
    
    // Click on canvas to select/deselect components
    canvas.addEventListener('click', function(e) {
        if (e.target === canvas || e.target.classList.contains('dropzone')) {
            // Deselect all components
            deselectAllComponents();
            
            // Hide properties form and show empty message
            document.querySelector('.properties-form').style.display = 'none';
            document.querySelector('.empty-properties').style.display = 'block';
        }
    });
    
    // Preview button functionality
    const previewButton = document.querySelector('.btn-secondary');
    if (previewButton) {
        previewButton.addEventListener('click', function() {
            showNotification('App preview mode activated', 'info');
            
            // In a real app, this would open a preview window or switch to preview mode
            setTimeout(() => {
                showNotification('This is a preview of your app', 'success');
            }, 1000);
        });
    }
    
    // Save button functionality
    const saveButton = document.querySelector('.btn-primary');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            showNotification('Saving your app...', 'info');
            
            // Simulate saving process
            setTimeout(() => {
                showNotification('App saved successfully!', 'success');
            }, 1500);
        });
    }
}

// Add Component to Canvas
function addComponentToCanvas(componentType, x, y) {
    const canvas = document.querySelector('.canvas-content');
    const dropzone = document.querySelector('.dropzone');
    
    // Remove empty canvas message if it exists
    const emptyMessage = document.querySelector('.empty-canvas-message');
    if (emptyMessage) {
        emptyMessage.remove();
        dropzone.classList.remove('empty-canvas');
    }
    
    // Create component element
    const component = document.createElement('div');
    component.className = 'canvas-component';
    component.setAttribute('data-component-type', componentType);
    
    // Set component content based on type
    switch(componentType) {
        case 'container':
            component.innerHTML = `
                <div class="component-container" style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div class="component-placeholder">Container Component</div>
                </div>
                <div class="component-actions">
                    <button class="component-action-btn"><i class="fas fa-arrows-alt"></i></button>
                    <button class="component-action-btn"><i class="fas fa-copy"></i></button>
                    <button class="component-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            break;
        case 'row':
            component.innerHTML = `
                <div class="component-row" style="display: flex; gap: 10px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9fafb;">
                    <div style="flex: 1; padding: 10px; background-color: #ffffff; border: 1px dashed #e0e0e0; border-radius: 4px; text-align: center;">Column</div>
                    <div style="flex: 1; padding: 10px; background-color: #ffffff; border: 1px dashed #e0e0e0; border-radius: 4px; text-align: center;">Column</div>
                </div>
                <div class="component-actions">
                    <button class="component-action-btn"><i class="fas fa-arrows-alt"></i></button>
                    <button class="component-action-btn"><i class="fas fa-copy"></i></button>
                    <button class="component-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            break;
        case 'text':
            component.innerHTML = `
                <div class="component-text" style="padding: 10px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
                    <p style="margin: 0;">This is a text component. Click to edit.</p>
                </div>
                <div class="component-actions">
                    <button class="component-action-btn"><i class="fas fa-arrows-alt"></i></button>
                    <button class="component-action-btn"><i class="fas fa-copy"></i></button>
                    <button class="component-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            break;
        case 'button':
            component.innerHTML = `
                <div class="component-button" style="padding: 10px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
                    <button style="padding: 8px 16px; background-color: #4361ee; color: white; border: none; border-radius: 4px; cursor: pointer;">Button</button>
                </div>
                <div class="component-actions">
                    <button class="component-action-btn"><i class="fas fa-arrows-alt"></i></button>
                    <button class="component-action-btn"><i class="fas fa-copy"></i></button>
                    <button class="component-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            break;
        case 'ai-chat':
            component.innerHTML = `
                <div class="component-ai-chat" style="padding: 10px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
                    <div style="border: 1px solid #e0e0e0; border-radius: 8px; height: 200px; overflow: auto; padding: 10px; margin-bottom: 10px; background-color: #f9fafb;">
                        <div style="margin-bottom: 10px;">
                            <div style="font-weight: bold; margin-bottom: 5px;">AI Assistant</div>
                            <div style="background-color: #e3f2fd; padding: 8px; border-radius: 8px; display: inline-block; max-width: 80%;">Hello! How can I help you today?</div>
                        </div>
                        <div style="margin-bottom: 10px; text-align: right;">
                            <div style="font-weight: bold; margin-bottom: 5px;">You</div>
                            <div style="background-color: #e8f5e9; padding: 8px; border-radius: 8px; display: inline-block; max-width: 80%;">I need help with my project.</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" placeholder="Type your message..." style="flex: 1; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px;">
                        <button style="padding: 8px 16px; background-color: #4361ee; color: white; border: none; border-radius: 4px; cursor: pointer;">Send</button>
                    </div>
                </div>
                <div class="component-actions">
                    <button class="component-action-btn"><i class="fas fa-arrows-alt"></i></button>
                    <button class="component-action-btn"><i class="fas fa-copy"></i></button>
                    <button class="component-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            break;
        default:
            component.innerHTML = `
                <div class="component-generic" style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; text-align: center;">
                    ${componentType.charAt(0).toUpperCase() + componentType.slice(1)} Component
                </div>
                <div class="component-actions">
                    <button class="component-action-btn"><i class="fas fa-arrows-alt"></i></button>
                    <button class="component-action-btn"><i class="fas fa-copy"></i></button>
                    <button class="component-action-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
    }
    
    // Add component to canvas
    dropzone.appendChild(component);
    
    // Add selection functionality
    component.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Deselect all components
        deselectAllComponents();
        
        // Select this component
        this.classList.add('selected');
        
        // Show properties form and hide empty message
        document.querySelector('.properties-form').style.display = 'block';
        document.querySelector('.empty-properties').style.display = 'none';
        
        // Update properties panel with component info
        updatePropertiesPanel(componentType);
    });
    
    // Add component action buttons functionality
    setupComponentActions(component);
    
    // Show notification
    showNotification(`Added ${componentType} component to canvas`, 'success');
}

// Setup Component Actions
function setupComponentActions(component) {
    const actionButtons = component.querySelectorAll('.component-action-btn');
    
    // First button: Move (drag)
    if (actionButtons[0]) {
        actionButtons[0].addEventListener('mousedown', function(e) {
            e.stopPropagation();
            
            // Make component draggable
            component.setAttribute('draggable', 'true');
            
            // Add drag events
            component.addEventListener('dragstart', handleComponentDragStart);
            component.addEventListener('dragend', handleComponentDragEnd);
        });
    }
    
    // Second button: Duplicate
    if (actionButtons[1]) {
        actionButtons[1].addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Clone component
            const clone = component.cloneNode(true);
            
            // Add to canvas
            component.parentNode.appendChild(clone);
            
            // Setup actions for the clone
            setupComponentActions(clone);
            
            // Show notification
            showNotification('Component duplicated', 'success');
        });
    }
    
    // Third button: Delete
    if (actionButtons[2]) {
        actionButtons[2].addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove component
            component.remove();
            
            // Show notification
            showNotification('Component deleted', 'info');
            
            // Check if canvas is empty
            const dropzone = document.querySelector('.dropzone');
            if (dropzone.children.length === 0) {
                // Add empty canvas message
                dropzone.classList.add('empty-canvas');
                dropzone.innerHTML = `
                    <div class="empty-canvas-message">
                        <i class="fas fa-cubes"></i>
                        <h3>Start Building Your App</h3>
                        <p>Drag and drop components from the library to build your app</p>
                    </div>
                `;
            }
        });
    }
}

// Component Drag Handlers
function handleComponentDragStart(e) {
    e.dataTransfer.setData('text/plain', 'move-component');
    this.classList.add('dragging');
}

function handleComponentDragEnd(e) {
    this.classList.remove('dragging');
    this.removeAttribute('draggable');
    
    // Remove drag events
    this.removeEventListener('dragstart', handleComponentDragStart);
    this.removeEventListener('dragend', handleComponentDragEnd);
}

// Deselect All Components
function deselectAllComponents() {
    document.querySelectorAll('.canvas-component').forEach(comp => {
        comp.classList.remove('selected');
    });
}

// Update Properties Panel
function updatePropertiesPanel(componentType) {
    // Update component type in properties panel
    const typeValue = document.querySelector('.property-value');
    if (typeValue) {
        typeValue.textContent = componentType.charAt(0).toUpperCase() + componentType.slice(1);
    }
    
    // Update component ID
    const idInput = document.querySelector('.property-field input[value="container-1"]');
    if (idInput) {
        idInput.value = `${componentType}-${Math.floor(Math.random() * 1000)}`;
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
