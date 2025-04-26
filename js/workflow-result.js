// Workflow Result functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab pane
            tabPanes.forEach(pane => {
                if (pane.id === tabId + 'Tab') {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
    
    // Copy button functionality
    const copyButton = document.querySelector('.result-actions button[title="Copy"]');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            // Get result content
            const resultContent = document.querySelector('.result-body').innerText;
            
            // Copy to clipboard
            navigator.clipboard.writeText(resultContent)
                .then(() => {
                    // Show success feedback
                    const originalIcon = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    
                    setTimeout(() => {
                        this.innerHTML = originalIcon;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    }
    
    // Download button functionality
    const downloadButton = document.querySelector('.result-actions button[title="Download"]');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // Get result content
            const resultContent = document.querySelector('.result-body').innerText;
            
            // Create blob and download link
            const blob = new Blob([resultContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document_analysis_result.txt';
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
        });
    }
    
    // Export result button functionality
    const exportResultBtn = document.getElementById('exportResultBtn');
    if (exportResultBtn) {
        exportResultBtn.addEventListener('click', function() {
            // Show export options (in a real app, this would show a dropdown or modal)
            const options = ['PDF', 'Word', 'Text', 'JSON'];
            const option = prompt('Select export format: ' + options.join(', '));
            
            if (option) {
                alert(`Exporting result as ${option}...`);
                // In a real app, this would trigger the actual export
            }
        });
    }
    
    // New run button functionality
    const newRunBtn = document.getElementById('newRunBtn');
    if (newRunBtn) {
        newRunBtn.addEventListener('click', function() {
            // In a real app, this would navigate to the workflow builder with the same workflow loaded
            window.location.href = 'workflow-builder.html';
        });
    }
    
    // Back to workflow button functionality
    const backToWorkflowBtn = document.getElementById('backToWorkflowBtn');
    if (backToWorkflowBtn) {
        backToWorkflowBtn.addEventListener('click', function() {
            window.location.href = 'workflow-builder.html';
        });
    }
    
    // Share result button functionality
    const shareResultBtn = document.getElementById('shareResultBtn');
    if (shareResultBtn) {
        shareResultBtn.addEventListener('click', function() {
            // In a real app, this would show sharing options
            const shareUrl = window.location.href;
            
            // Create a temporary input to copy the URL
            const tempInput = document.createElement('input');
            tempInput.value = shareUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            alert('Result URL copied to clipboard!');
        });
    }
    
    // Log filter functionality
    const logFilter = document.querySelector('.log-filters .form-select');
    if (logFilter) {
        logFilter.addEventListener('change', function() {
            const filterValue = this.value;
            const logEntries = document.querySelectorAll('.log-entry');
            
            logEntries.forEach(entry => {
                if (filterValue === 'all') {
                    entry.style.display = 'flex';
                } else {
                    if (entry.classList.contains(filterValue)) {
                        entry.style.display = 'flex';
                    } else {
                        entry.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // Log search functionality
    const logSearch = document.querySelector('.log-filters .search-input');
    if (logSearch) {
        logSearch.addEventListener('input', function() {
            const searchValue = this.value.toLowerCase();
            const logEntries = document.querySelectorAll('.log-entry');
            
            logEntries.forEach(entry => {
                const logMessage = entry.querySelector('.log-message').textContent.toLowerCase();
                
                if (logMessage.includes(searchValue)) {
                    entry.style.display = 'flex';
                } else {
                    entry.style.display = 'none';
                }
            });
        });
    }
    
    // Initialize syntax highlighting for code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});
