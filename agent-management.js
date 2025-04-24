// Agent Management functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const newAgentBtn = document.getElementById('newAgentBtn');
    const createAgentModal = document.getElementById('createAgentModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const createAgentBtn = document.getElementById('createAgentBtn');
    
    // Open modal
    if (newAgentBtn) {
        newAgentBtn.addEventListener('click', function() {
            createAgentModal.classList.add('active');
        });
    }
    
    // Close modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            createAgentModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === createAgentModal) {
            createAgentModal.classList.remove('active');
        }
    });
    
    // Create agent
    if (createAgentBtn) {
        createAgentBtn.addEventListener('click', function() {
            const agentName = document.getElementById('newAgentName').value;
            const agentModel = document.getElementById('newAgentModel').value;
            
            if (agentName.trim() === '') {
                alert('Please enter an agent name');
                return;
            }
            
            // In a real app, this would send data to the server
            console.log('Creating agent:', {
                name: agentName,
                model: agentModel,
                description: document.getElementById('newAgentDescription').value
            });
            
            // Close modal and show success message
            createAgentModal.classList.remove('active');
            alert('Agent created successfully!');
            
            // Reset form
            document.getElementById('newAgentName').value = '';
            document.getElementById('newAgentDescription').value = '';
        });
    }
    
    // Toggle agent status
    const toggleStatusBtn = document.getElementById('toggleStatus');
    if (toggleStatusBtn) {
        toggleStatusBtn.addEventListener('click', function() {
            const isActive = !this.classList.contains('inactive');
            
            if (isActive) {
                // Deactivate
                this.classList.add('inactive');
                this.innerHTML = '<i class="fas fa-power-off"></i><span>Activate</span>';
            } else {
                // Activate
                this.classList.remove('inactive');
                this.innerHTML = '<i class="fas fa-power-off"></i><span>Deactivate</span>';
            }
        });
    }
    
    // File upload functionality
    const fileUploadAreas = document.querySelectorAll('.file-upload-area');
    fileUploadAreas.forEach(area => {
        area.addEventListener('click', function() {
            const fileInput = this.querySelector('.file-input');
            if (fileInput) {
                fileInput.click();
            }
        });
        
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(100, 116, 139, 0.2)';
        });
        
        area.addEventListener('dragleave', function() {
            this.style.backgroundColor = '';
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.backgroundColor = '';
            
            const fileInput = this.querySelector('.file-input');
            if (fileInput && e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                handleFileUpload(fileInput);
            }
        });
    });
    
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            handleFileUpload(this);
        });
    });
    
    function handleFileUpload(fileInput) {
        const files = fileInput.files;
        if (files.length === 0) return;
        
        // In a real app, this would upload files to the server
        console.log('Files selected:', files);
        
        // Show uploaded files (for demo)
        const uploadedFilesContainer = fileInput.closest('.form-group').querySelector('.uploaded-files') || 
                                      fileInput.closest('.file-upload-container')?.querySelector('.uploaded-files');
        
        if (uploadedFilesContainer) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileElement = document.createElement('div');
                fileElement.className = 'uploaded-file';
                
                // Determine icon based on file type
                let iconClass = 'fa-file';
                if (file.type.includes('pdf')) {
                    iconClass = 'fa-file-pdf';
                } else if (file.type.includes('word')) {
                    iconClass = 'fa-file-word';
                } else if (file.type.includes('excel') || file.type.includes('sheet')) {
                    iconClass = 'fa-file-excel';
                } else if (file.type.includes('image')) {
                    iconClass = 'fa-file-image';
                }
                
                fileElement.innerHTML = `
                    <i class="fas ${iconClass}"></i>
                    <span>${file.name}</span>
                    <button class="btn btn-icon remove-file">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                uploadedFilesContainer.appendChild(fileElement);
            }
            
            // Add event listeners to remove buttons
            const removeButtons = uploadedFilesContainer.querySelectorAll('.remove-file');
            removeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.closest('.uploaded-file').remove();
                });
            });
        }
    }
    
    // Range input value display
    const rangeInputs = document.querySelectorAll('.range-input');
    rangeInputs.forEach(input => {
        const valueDisplay = input.nextElementSibling;
        
        input.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
    });
    
    // Test prompt functionality
    const testPromptBtn = document.getElementById('testPromptBtn');
    if (testPromptBtn) {
        testPromptBtn.addEventListener('click', function() {
            const promptText = document.getElementById('testPrompt').value;
            
            if (promptText.trim() === '') {
                alert('Please enter a test prompt');
                return;
            }
            
            // Show loading state
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Testing...</span>';
            
            // In a real app, this would send the prompt to the AI model
            // For demo, we'll simulate a response after a delay
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-bolt"></i><span>Test</span>';
                
                // Show the pre-defined result (in a real app, this would be the AI response)
                document.querySelector('.test-result').style.display = 'block';
            }, 1500);
        });
    }
    
    // Table row selection
    const tableRows = document.querySelectorAll('.agent-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Highlight selected row
            tableRows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
            
            // In a real app, this would load the agent details
            // For demo, we'll just show the agent details panel
            document.getElementById('agentDetails').style.display = 'block';
            
            // Update agent details with selected agent info
            const agentName = this.querySelector('.agent-name span').textContent;
            document.getElementById('agentName').value = agentName;
            
            const agentModel = this.cells[1].textContent;
            const modelSelect = document.getElementById('agentModel');
            for (let i = 0; i < modelSelect.options.length; i++) {
                if (modelSelect.options[i].text === agentModel) {
                    modelSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Update status toggle button
            const statusBadge = this.querySelector('.status-badge');
            const toggleBtn = document.getElementById('toggleStatus');
            
            if (statusBadge.classList.contains('active')) {
                toggleBtn.classList.remove('inactive');
                toggleBtn.innerHTML = '<i class="fas fa-power-off"></i><span>Deactivate</span>';
            } else {
                toggleBtn.classList.add('inactive');
                toggleBtn.innerHTML = '<i class="fas fa-power-off"></i><span>Activate</span>';
            }
        });
    });
    
    // Save agent changes
    const saveAgentBtn = document.getElementById('saveAgent');
    if (saveAgentBtn) {
        saveAgentBtn.addEventListener('click', function() {
            // In a real app, this would save changes to the server
            console.log('Saving agent changes:', {
                name: document.getElementById('agentName').value,
                model: document.getElementById('agentModel').value,
                description: document.getElementById('agentDescription').value,
                temperature: document.getElementById('temperature').value,
                maxTokens: document.getElementById('maxTokens').value,
                systemPrompt: document.getElementById('systemPrompt').value
            });
            
            // Show success message
            alert('Agent updated successfully!');
        });
    }
});
