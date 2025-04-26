// Dataset Studio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements
    initializeUI();
    
    // Add event listeners
    addEventListeners();
});

// Initialize UI elements
function initializeUI() {
    // Set up tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
    
    // Set up dataset items
    const datasetItems = document.querySelectorAll('.dataset-item');
    datasetItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            datasetItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // In a real implementation, this would load the selected dataset
            const datasetName = item.querySelector('.dataset-name').textContent;
            document.querySelector('.dataset-title h2').textContent = datasetName;
        });
    });
    
    // Set up annotation labels
    const labelButtons = document.querySelectorAll('.label-btn');
    labelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get parent label group
            const labelGroup = button.closest('.label-group');
            
            // Remove active class from all buttons in this group
            labelGroup.querySelectorAll('.label-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
        });
    });
}

// Add event listeners
function addEventListeners() {
    // Import data button
    const importDataBtn = document.getElementById('importDataBtn');
    if (importDataBtn) {
        importDataBtn.addEventListener('click', () => {
            openModal('importDataModal');
        });
    }
    
    // Close modal button
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeModal('importDataModal');
        });
    }
    
    // Cancel import button
    const cancelImportBtn = document.getElementById('cancelImportBtn');
    if (cancelImportBtn) {
        cancelImportBtn.addEventListener('click', () => {
            closeModal('importDataModal');
        });
    }
    
    // Confirm import button
    const confirmImportBtn = document.getElementById('confirmImportBtn');
    if (confirmImportBtn) {
        confirmImportBtn.addEventListener('click', () => {
            importData();
            closeModal('importDataModal');
        });
    }
    
    // New dataset button
    const newDatasetBtn = document.getElementById('newDatasetBtn');
    if (newDatasetBtn) {
        newDatasetBtn.addEventListener('click', createNewDataset);
    }
    
    // Save dataset button
    const saveDatasetBtn = document.getElementById('saveDatasetBtn');
    if (saveDatasetBtn) {
        saveDatasetBtn.addEventListener('click', saveDataset);
    }
    
    // Auto-annotate button
    const autoAnnotateBtn = document.getElementById('autoAnnotateBtn');
    if (autoAnnotateBtn) {
        autoAnnotateBtn.addEventListener('click', autoAnnotate);
    }
    
    // Apply annotations button
    const applyAnnotationsBtn = document.getElementById('applyAnnotationsBtn');
    if (applyAnnotationsBtn) {
        applyAnnotationsBtn.addEventListener('click', applyAnnotations);
    }
    
    // Analyze data button
    const analyzeDataBtn = document.getElementById('analyzeDataBtn');
    if (analyzeDataBtn) {
        analyzeDataBtn.addEventListener('click', analyzeData);
    }
    
    // Apply cleaning button
    const applyCleaningBtn = document.getElementById('applyCleaningBtn');
    if (applyCleaningBtn) {
        applyCleaningBtn.addEventListener('click', applyCleaning);
    }
    
    // Compare versions button
    const compareVersionsBtn = document.getElementById('compareVersionsBtn');
    if (compareVersionsBtn) {
        compareVersionsBtn.addEventListener('click', compareVersions);
    }
    
    // Restore version button
    const restoreVersionBtn = document.getElementById('restoreVersionBtn');
    if (restoreVersionBtn) {
        restoreVersionBtn.addEventListener('click', restoreVersion);
    }
    
    // File upload area
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('fileUpload');
    
    if (fileUploadArea && fileInput) {
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                updateFileUploadUI(fileInput.files);
            }
        });
        
        fileInput.addEventListener('change', () => {
            updateFileUploadUI(fileInput.files);
        });
    }
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
}

// Update file upload UI
function updateFileUploadUI(files) {
    const fileUploadArea = document.querySelector('.file-upload-area');
    
    if (files.length && fileUploadArea) {
        // Update UI to show selected files
        let fileNames = '';
        for (let i = 0; i < files.length; i++) {
            fileNames += files[i].name + (i < files.length - 1 ? ', ' : '');
        }
        
        fileUploadArea.innerHTML = `
            <i class="fas fa-file-alt"></i>
            <p>${files.length} file(s) selected: ${fileNames}</p>
            <p class="file-upload-hint">Click or drop to change</p>
        `;
    }
}

// Import data function
function importData() {
    // In a real implementation, this would process the uploaded files
    // and import the data into the system
    
    // For demo purposes, we'll just show a success message
    alert('Data imported successfully!');
    
    // Add new dataset to the list (for demo purposes)
    addNewDatasetToList('Imported Dataset', 'CSV', '1.5 MB', '850 rows');
}

// Add new dataset to the list
function addNewDatasetToList(name, type, size, rows) {
    const datasetList = document.querySelector('.dataset-list');
    
    if (datasetList) {
        // Create new dataset item
        const datasetItem = document.createElement('div');
        datasetItem.className = 'dataset-item';
        datasetItem.innerHTML = `
            <div class="dataset-icon">
                <i class="fas fa-${type.toLowerCase() === 'csv' ? 'table' : type.toLowerCase() === 'json' ? 'file-code' : 'file-alt'}"></i>
            </div>
            <div class="dataset-info">
                <h3 class="dataset-name">${name}</h3>
                <div class="dataset-meta">
                    <span class="dataset-type">${type}</span>
                    <span class="dataset-size">${size}</span>
                    <span class="dataset-rows">${rows}</span>
                </div>
            </div>
            <div class="dataset-actions">
                <button class="btn btn-icon" title="More Options">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        `;
        
        // Add click event
        datasetItem.addEventListener('click', () => {
            // Remove active class from all items
            document.querySelectorAll('.dataset-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to this item
            datasetItem.classList.add('active');
            
            // Update dataset title
            document.querySelector('.dataset-title h2').textContent = name;
        });
        
        // Add to list (at the top)
        datasetList.insertBefore(datasetItem, datasetList.firstChild);
    }
}

// Create new dataset function
function createNewDataset() {
    // In a real implementation, this would create a new empty dataset
    // or open a dialog to configure the new dataset
    
    // For demo purposes, we'll just add a new dataset to the list
    const name = 'New Dataset';
    const type = 'CSV';
    const size = '0 KB';
    const rows = '0 rows';
    
    addNewDatasetToList(name, type, size, rows);
}

// Save dataset function
function saveDataset() {
    // In a real implementation, this would save the current dataset
    
    // For demo purposes, we'll just show a success message
    alert('Dataset saved successfully!');
    
    // Update last updated time
    document.querySelector('.dataset-updated').textContent = 'Last updated: Just now';
    
    // Add new version to history (for demo purposes)
    addNewVersionToHistory();
}

// Add new version to history
function addNewVersionToHistory() {
    const versionTimeline = document.querySelector('.version-timeline');
    
    if (versionTimeline) {
        // Get current active version
        const activeVersion = versionTimeline.querySelector('.version-item.active');
        
        if (activeVersion) {
            // Remove active class
            activeVersion.classList.remove('active');
            
            // Create new version item
            const versionItem = document.createElement('div');
            versionItem.className = 'version-item active';
            
            // Get version number from active version
            const versionHeader = activeVersion.querySelector('.version-header h4').textContent;
            const versionMatch = versionHeader.match(/Version (\d+\.\d+)/);
            let newVersionNumber = '1.0';
            
            if (versionMatch) {
                const versionParts = versionMatch[1].split('.');
                newVersionNumber = `${versionParts[0]}.${parseInt(versionParts[1]) + 1}`;
            }
            
            versionItem.innerHTML = `
                <div class="version-marker">
                    <div class="version-dot"></div>
                    <div class="version-line"></div>
                </div>
                <div class="version-card">
                    <div class="version-header">
                        <h4>Version ${newVersionNumber} (Current)</h4>
                        <span class="version-date">Just now</span>
                    </div>
                    <div class="version-details">
                        <p class="version-description">Updated dataset</p>
                        <div class="version-stats">
                            <span class="version-stat">1,245 rows</span>
                            <span class="version-stat">8 columns</span>
                            <span class="version-stat">2.4 MB</span>
                        </div>
                        <div class="version-author">
                            <i class="fas fa-user"></i>
                            <span>Hafedh Ammani</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Update previous version header
            activeVersion.querySelector('.version-header h4').textContent = `Version ${versionMatch ? versionMatch[1] : '1.0'}`;
            
            // Insert new version at the top
            versionTimeline.insertBefore(versionItem, versionTimeline.firstChild);
        }
    }
}

// Auto-annotate function
function autoAnnotate() {
    // In a real implementation, this would use AI to automatically
    // annotate the dataset based on the selected field and method
    
    // For demo purposes, we'll just update the progress bar
    const progressFill = document.querySelector('.progress-fill');
    const progressStats = document.querySelector('.progress-stats span');
    
    if (progressFill && progressStats) {
        // Simulate progress increase
        const currentWidth = parseInt(progressFill.style.width) || 45;
        const newWidth = Math.min(currentWidth + 15, 100);
        
        progressFill.style.width = `${newWidth}%`;
        
        // Update stats text
        const totalRows = 1245;
        const annotatedRows = Math.round(totalRows * (newWidth / 100));
        progressStats.textContent = `${annotatedRows} / ${totalRows} annotated (${newWidth}%)`;
        
        // Show success message
        alert('Auto-annotation completed successfully!');
    }
}

// Apply annotations function
function applyAnnotations() {
    // In a real implementation, this would apply the current annotations
    // to the dataset
    
    // For demo purposes, we'll just show a success message
    alert('Annotations applied successfully!');
}

// Analyze data function
function analyzeData() {
    // In a real implementation, this would analyze the dataset based on
    // the selected cleaning operation
    
    // For demo purposes, we'll just show a success message
    alert('Data analysis completed successfully!');
}

// Apply cleaning function
function applyCleaning() {
    // In a real implementation, this would apply the selected cleaning
    // operation to the dataset
    
    // For demo purposes, we'll just show a success message
    alert('Data cleaning applied successfully!');
    
    // Update missing values count (for demo purposes)
    const missingValuesMetric = document.querySelector('.quality-metrics .quality-metric:first-child .metric-value');
    
    if (missingValuesMetric) {
        missingValuesMetric.textContent = '0 cells (0.00%)';
    }
    
    // Update chart fill width
    const chartFill = document.querySelector('.quality-metrics .quality-metric:first-child .chart-fill');
    
    if (chartFill) {
        chartFill.style.width = '0%';
    }
}

// Compare versions function
function compareVersions() {
    // In a real implementation, this would compare selected versions
    
    // For demo purposes, we'll just show a message
    alert('Version comparison feature will be available in the next update.');
}

// Restore version function
function restoreVersion() {
    // In a real implementation, this would restore the selected version
    
    // For demo purposes, we'll just show a confirmation dialog
    if (confirm('Are you sure you want to restore this version? This will overwrite the current version.')) {
        alert('Version restored successfully!');
    }
}
