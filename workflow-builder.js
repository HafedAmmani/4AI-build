// Workflow Builder functionality
document.addEventListener('DOMContentLoaded', function() {
    // Component category switching
    const componentCategories = document.querySelectorAll('.component-category');
    const componentGroups = document.querySelectorAll('.component-group');
    
    componentCategories.forEach(category => {
        category.addEventListener('click', function() {
            // Update active category
            componentCategories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding component group
            const targetGroup = this.getAttribute('data-category');
            componentGroups.forEach(group => {
                if (group.getAttribute('data-group') === targetGroup) {
                    group.style.display = 'flex';
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });
    
    // Drag and drop functionality
    const canvas = document.getElementById('workflowCanvas');
    const draggableItems = document.querySelectorAll('.component-item');
    const nodes = document.querySelectorAll('.workflow-node');
    
    // Make existing nodes draggable
    nodes.forEach(node => {
        makeNodeDraggable(node);
    });
    
    // Draggable components from library
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-component-type'));
            e.dataTransfer.effectAllowed = 'copy';
        });
    });
    
    // Canvas drop area
    canvas.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    
    canvas.addEventListener('drop', function(e) {
        e.preventDefault();
        
        const componentType = e.dataTransfer.getData('text/plain');
        if (!componentType) return;
        
        // Create new node
        createNewNode(componentType, e.clientX, e.clientY);
    });
    
    // Function to create a new node
    function createNewNode(type, clientX, clientY) {
        // Get canvas position
        const canvasRect = canvas.getBoundingClientRect();
        
        // Calculate position relative to canvas
        const x = clientX - canvasRect.left;
        const y = clientY - canvasRect.top;
        
        // Generate unique ID
        const nodeId = 'node-' + Date.now();
        
        // Create node element
        const node = document.createElement('div');
        node.className = 'workflow-node';
        node.setAttribute('data-node-id', nodeId);
        node.setAttribute('data-node-type', type);
        node.style.left = `${x - 100}px`; // Center the node
        node.style.top = `${y - 30}px`;
        
        // Get node configuration based on type
        const nodeConfig = getNodeConfig(type);
        
        // Create node content
        node.innerHTML = `
            <div class="node-header">
                <div class="node-icon">
                    <i class="${nodeConfig.icon}"></i>
                </div>
                <div class="node-title">${nodeConfig.title}</div>
                <div class="node-actions">
                    <button class="btn btn-icon node-action-btn">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>
            <div class="node-content">
                <p class="node-description">${nodeConfig.description}</p>
            </div>
            <div class="node-ports">
                ${nodeConfig.hasInput ? '<div class="input-port" data-port-id="' + nodeId + '-input"></div>' : ''}
                ${nodeConfig.hasOutput ? '<div class="output-port" data-port-id="' + nodeId + '-output"></div>' : ''}
            </div>
        `;
        
        // Add node to canvas
        canvas.appendChild(node);
        
        // Make node draggable
        makeNodeDraggable(node);
        
        // Make node selectable
        node.addEventListener('click', function(e) {
            if (e.target.classList.contains('node-action-btn') || 
                e.target.parentElement.classList.contains('node-action-btn')) {
                return; // Don't select when clicking action button
            }
            
            selectNode(node);
        });
        
        // Make ports connectable
        setupPorts(node);
        
        // Select the new node
        selectNode(node);
    }
    
    // Function to get node configuration based on type
    function getNodeConfig(type) {
        const configs = {
            'text-input': {
                title: 'Text Input',
                icon: 'fas fa-font',
                description: 'User-provided text',
                hasInput: false,
                hasOutput: true
            },
            'file-input': {
                title: 'File Input',
                icon: 'fas fa-file',
                description: 'Document or data file',
                hasInput: false,
                hasOutput: true
            },
            'api-input': {
                title: 'API Input',
                icon: 'fas fa-plug',
                description: 'External data source',
                hasInput: false,
                hasOutput: true
            },
            'filter': {
                title: 'Filter',
                icon: 'fas fa-filter',
                description: 'Filter data by criteria',
                hasInput: true,
                hasOutput: true
            },
            'transform': {
                title: 'Transform',
                icon: 'fas fa-exchange-alt',
                description: 'Convert data format',
                hasInput: true,
                hasOutput: true
            },
            'merge': {
                title: 'Merge',
                icon: 'fas fa-object-group',
                description: 'Combine multiple inputs',
                hasInput: true,
                hasOutput: true
            },
            'agent': {
                title: 'Agent',
                icon: 'fas fa-robot',
                description: 'AI agent processing',
                hasInput: true,
                hasOutput: true
            },
            'summarize': {
                title: 'Summarize',
                icon: 'fas fa-compress-alt',
                description: 'Document summarization',
                hasInput: true,
                hasOutput: true
            },
            'classify': {
                title: 'Classify',
                icon: 'fas fa-tags',
                description: 'Content classification',
                hasInput: true,
                hasOutput: true
            },
            'text-output': {
                title: 'Text Output',
                icon: 'fas fa-align-left',
                description: 'Formatted text result',
                hasInput: true,
                hasOutput: false
            },
            'file-output': {
                title: 'File Output',
                icon: 'fas fa-file-export',
                description: 'Save result to file',
                hasInput: true,
                hasOutput: false
            },
            'api-output': {
                title: 'API Output',
                icon: 'fas fa-cloud-upload-alt',
                description: 'Send to external API',
                hasInput: true,
                hasOutput: false
            }
        };
        
        return configs[type] || {
            title: 'Unknown',
            icon: 'fas fa-question',
            description: 'Unknown component',
            hasInput: true,
            hasOutput: true
        };
    }
    
    // Function to make a node draggable
    function makeNodeDraggable(node) {
        let isDragging = false;
        let offsetX, offsetY;
        
        node.addEventListener('mousedown', function(e) {
            if (e.target.classList.contains('input-port') || 
                e.target.classList.contains('output-port') ||
                e.target.classList.contains('node-action-btn') || 
                e.target.parentElement.classList.contains('node-action-btn')) {
                return; // Don't start drag when clicking ports or buttons
            }
            
            isDragging = true;
            
            // Calculate offset
            const nodeRect = node.getBoundingClientRect();
            offsetX = e.clientX - nodeRect.left;
            offsetY = e.clientY - nodeRect.top;
            
            // Add dragging class
            node.classList.add('dragging');
            
            // Select the node
            selectNode(node);
            
            // Prevent text selection
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            // Calculate new position
            const canvasRect = canvas.getBoundingClientRect();
            const x = e.clientX - canvasRect.left - offsetX;
            const y = e.clientY - canvasRect.top - offsetY;
            
            // Update node position
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            
            // Update connections
            updateConnections();
        });
        
        document.addEventListener('mouseup', function() {
            if (!isDragging) return;
            
            isDragging = false;
            node.classList.remove('dragging');
        });
    }
    
    // Function to select a node
    function selectNode(node) {
        // Deselect all nodes
        document.querySelectorAll('.workflow-node').forEach(n => {
            n.classList.remove('selected');
        });
        
        // Select the node
        node.classList.add('selected');
        
        // Show properties panel for the selected node
        showProperties(node);
    }
    
    // Function to show properties for a node
    function showProperties(node) {
        const nodeType = node.getAttribute('data-node-type');
        const nodeId = node.getAttribute('data-node-id');
        
        // In a real app, this would load the properties for the specific node
        // For demo, we'll just show/hide the example properties
        const propertiesPanel = document.querySelector('.properties-panel');
        const nodeProperties = document.querySelectorAll('.node-properties');
        
        // Show properties panel
        propertiesPanel.classList.add('active');
        
        // Hide all property groups
        nodeProperties.forEach(prop => {
            prop.style.display = 'none';
        });
        
        // Show properties for the selected node type
        // In this demo, we only have properties for the agent node
        if (nodeType === 'agent') {
            const agentProperties = document.querySelector('.node-properties[data-for-node="node2"]');
            if (agentProperties) {
                agentProperties.style.display = 'block';
            }
        }
    }
    
    // Connection drawing functionality
    let isConnecting = false;
    let startPort = null;
    let tempConnection = null;
    
    function setupPorts(node) {
        const ports = node.querySelectorAll('.input-port, .output-port');
        
        ports.forEach(port => {
            port.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                
                // Start connection from output port
                if (port.classList.contains('output-port')) {
                    startPort = port;
                    isConnecting = true;
                    
                    // Create temporary connection
                    const svg = document.querySelector('.connections-layer');
                    tempConnection = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    tempConnection.classList.add('connection-path', 'temp-connection');
                    svg.appendChild(tempConnection);
                }
            });
            
            port.addEventListener('mouseup', function(e) {
                e.stopPropagation();
                
                // Complete connection to input port
                if (isConnecting && port.classList.contains('input-port')) {
                    // Check if connection is valid
                    if (startPort && startPort !== port) {
                        createConnection(startPort, port);
                    }
                    
                    // Reset connection state
                    resetConnectionState();
                }
            });
        });
    }
    
    // Setup existing ports
    document.querySelectorAll('.input-port, .output-port').forEach(port => {
        port.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            
            // Start connection from output port
            if (port.classList.contains('output-port')) {
                startPort = port;
                isConnecting = true;
                
                // Create temporary connection
                const svg = document.querySelector('.connections-layer');
                tempConnection = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                tempConnection.classList.add('connection-path', 'temp-connection');
                svg.appendChild(tempConnection);
            }
        });
        
        port.addEventListener('mouseup', function(e) {
            e.stopPropagation();
            
            // Complete connection to input port
            if (isConnecting && port.classList.contains('input-port')) {
                // Check if connection is valid
                if (startPort && startPort !== port) {
                    createConnection(startPort, port);
                }
                
                // Reset connection state
                resetConnectionState();
            }
        });
    });
    
    // Canvas mouse move for drawing connection
    canvas.addEventListener('mousemove', function(e) {
        if (!isConnecting || !startPort || !tempConnection) return;
        
        // Get canvas and port positions
        const canvasRect = canvas.getBoundingClientRect();
        const portRect = startPort.getBoundingClientRect();
        
        // Calculate start and end points
        const startX = portRect.left + portRect.width/2 - canvasRect.left;
        const startY = portRect.top + portRect.height/2 - canvasRect.top;
        const endX = e.clientX - canvasRect.left;
        const endY = e.clientY - canvasRect.top;
        
        // Draw bezier curve
        const path = `M ${startX},${startY} C ${startX + 50},${startY} ${endX - 50},${endY} ${endX},${endY}`;
        tempConnection.setAttribute('d', path);
    });
    
    // Canvas mouse up to cancel connection
    canvas.addEventListener('mouseup', function() {
        resetConnectionState();
    });
    
    // Function to reset connection state
    function resetConnectionState() {
        isConnecting = false;
        startPort = null;
        
        // Remove temporary connection
        if (tempConnection) {
            tempConnection.remove();
            tempConnection = null;
        }
    }
    
    // Function to create a connection between ports
    function createConnection(fromPort, toPort) {
        const fromPortId = fromPort.getAttribute('data-port-id');
        const toPortId = toPort.getAttribute('data-port-id');
        
        // Check if connection already exists
        const existingConnection = document.querySelector(`.connection-path[data-from="${fromPortId}"][data-to="${toPortId}"]`);
        if (existingConnection) return;
        
        // Create connection
        const svg = document.querySelector('.connections-layer');
        const connection = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        connection.classList.add('connection-path');
        connection.setAttribute('data-from', fromPortId);
        connection.setAttribute('data-to', toPortId);
        svg.appendChild(connection);
        
        // Update connection path
        updateConnectionPath(connection);
    }
    
    // Function to update a connection path
    function updateConnectionPath(connection) {
        const fromPortId = connection.getAttribute('data-from');
        const toPortId = connection.getAttribute('data-to');
        
        const fromPort = document.querySelector(`.output-port[data-port-id="${fromPortId}"]`);
        const toPort = document.querySelector(`.input-port[data-port-id="${toPortId}"]`);
        
        if (!fromPort || !toPort) {
            connection.remove();
            return;
        }
        
        // Get canvas and port positions
        const canvasRect = canvas.getBoundingClientRect();
        const fromPortRect = fromPort.getBoundingClientRect();
        const toPortRect = toPort.getBoundingClientRect();
        
        // Calculate start and end points
        const startX = fromPortRect.left + fromPortRect.width/2 - canvasRect.left;
        const startY = fromPortRect.top + fromPortRect.height/2 - canvasRect.top;
        const endX = toPortRect.left + toPortRect.width/2 - canvasRect.left;
        const endY = toPortRect.top + toPortRect.height/2 - canvasRect.top;
        
        // Calculate control points
        const dx = Math.abs(endX - startX);
        const controlX = dx / 2;
        
        // Draw bezier curve
        const path = `M ${startX},${startY} C ${startX + controlX},${startY} ${endX - controlX},${endY} ${endX},${endY}`;
        connection.setAttribute('d', path);
    }
    
    // Function to update all connections
    function updateConnections() {
        const connections = document.querySelectorAll('.connection-path:not(.temp-connection)');
        connections.forEach(updateConnectionPath);
    }
    
    // Delete selected node
    const deleteBtn = document.querySelector('.toolbar-group button[title="Delete Selected"]');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const selectedNode = document.querySelector('.workflow-node.selected');
            if (!selectedNode) return;
            
            // Get node ID
            const nodeId = selectedNode.getAttribute('data-node-id');
            
            // Remove connections
            const connections = document.querySelectorAll(`.connection-path[data-from^="${nodeId}"], .connection-path[data-to^="${nodeId}"]`);
            connections.forEach(conn => conn.remove());
            
            // Remove node
            selectedNode.remove();
        });
    }
    
    // Save workflow
    const saveBtn = document.getElementById('saveWorkflowBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // In a real app, this would save the workflow to the server
            alert('Workflow saved successfully!');
        });
    }
    
    // Run workflow
    const runBtn = document.getElementById('runWorkflowBtn');
    if (runBtn) {
        runBtn.addEventListener('click', function() {
            // In a real app, this would execute the workflow
            // For demo, we'll redirect to the result page
            window.location.href = 'workflow-result.html';
        });
    }
    
    // Close properties panel
    const closePropertiesBtn = document.querySelector('.close-properties');
    if (closePropertiesBtn) {
        closePropertiesBtn.addEventListener('click', function() {
            document.querySelector('.properties-panel').classList.remove('active');
        });
    }
    
    // Zoom functionality
    const zoomInBtn = document.querySelector('.toolbar-group button[title="Zoom In"]');
    const zoomOutBtn = document.querySelector('.toolbar-group button[title="Zoom Out"]');
    const resetViewBtn = document.querySelector('.toolbar-group button[title="Reset View"]');
    
    let currentZoom = 1;
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            if (currentZoom < 2) {
                currentZoom += 0.1;
                applyZoom();
            }
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            if (currentZoom > 0.5) {
                currentZoom -= 0.1;
                applyZoom();
            }
        });
    }
    
    if (resetViewBtn) {
        resetViewBtn.addEventListener('click', function() {
            currentZoom = 1;
            applyZoom();
        });
    }
    
    function applyZoom() {
        const nodes = document.querySelectorAll('.workflow-node');
        nodes.forEach(node => {
            node.style.transform = `scale(${currentZoom})`;
            node.style.transformOrigin = 'center';
        });
        
        // Update connections after zoom
        updateConnections();
    }
});
