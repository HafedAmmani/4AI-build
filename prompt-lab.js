// Prompt Lab JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements
    initializeUI();
    
    // Add event listeners
    addEventListeners();
    
    // Initialize parameter sliders
    initializeParameterSliders();
    
    // Initialize comparison chart
    initializeComparisonChart();
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
}

// Add event listeners
function addEventListeners() {
    // Run prompt button
    const runPromptBtn = document.getElementById('runPromptBtn');
    if (runPromptBtn) {
        runPromptBtn.addEventListener('click', runPrompt);
    }
    
    // Save prompt button
    const savePromptBtn = document.getElementById('savePromptBtn');
    if (savePromptBtn) {
        savePromptBtn.addEventListener('click', savePrompt);
    }
    
    // Export results button
    const exportResultsBtn = document.getElementById('exportResultsBtn');
    if (exportResultsBtn) {
        exportResultsBtn.addEventListener('click', exportResults);
    }
    
    // History button (to open sidebar)
    const historyBtn = document.querySelector('.prompt-actions button[title="History"]');
    if (historyBtn) {
        historyBtn.addEventListener('click', toggleHistorySidebar);
    }
    
    // Close sidebar button
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', toggleHistorySidebar);
    }
    
    // History item click
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', () => loadPromptFromHistory(item));
    });
}

// Initialize parameter sliders
function initializeParameterSliders() {
    const sliders = document.querySelectorAll('input[type="range"]');
    
    sliders.forEach(slider => {
        // Update value display on input
        const valueDisplay = slider.nextElementSibling;
        slider.addEventListener('input', () => {
            valueDisplay.textContent = slider.value;
        });
    });
}

// Initialize comparison chart
function initializeComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Coherence', 'Relevance', 'Accuracy', 'Creativity', 'Efficiency'],
                datasets: [
                    {
                        label: 'GPT-4',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
                    },
                    {
                        label: 'Claude 3',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(153, 102, 255, 1)'
                    },
                    {
                        label: 'Mistral',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 159, 64, 1)'
                    },
                    {
                        label: 'Llama 3',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                    }
                ]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
    }
}

// Run prompt function
function runPrompt() {
    // Get prompt text
    const promptText = document.getElementById('promptText').value;
    
    if (!promptText.trim()) {
        alert('Please enter a prompt before running.');
        return;
    }
    
    // Get selected models
    const selectedModels = [];
    if (document.getElementById('modelOpenAI').checked) selectedModels.push('openai');
    if (document.getElementById('modelClaude').checked) selectedModels.push('claude');
    if (document.getElementById('modelMistral').checked) selectedModels.push('mistral');
    if (document.getElementById('modelLlama').checked) selectedModels.push('llama');
    
    if (selectedModels.length === 0) {
        alert('Please select at least one model to test.');
        return;
    }
    
    // Get parameters
    const parameters = {
        temperature: parseFloat(document.getElementById('temperature').value),
        maxTokens: parseInt(document.getElementById('maxTokens').value),
        topP: parseFloat(document.getElementById('topP').value),
        frequencyPenalty: parseFloat(document.getElementById('frequencyPenalty').value)
    };
    
    // Show loading state
    selectedModels.forEach(model => {
        const responseBody = document.querySelector(`#${model}Tab .response-body`);
        responseBody.innerHTML = `
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Generating response...</p>
            </div>
        `;
    });
    
    // Simulate API calls to different models
    // In a real implementation, these would be actual API calls to the respective LLM providers
    simulateModelResponses(promptText, selectedModels, parameters);
}

// Simulate model responses (for demo purposes)
function simulateModelResponses(prompt, models, parameters) {
    // Sample responses for demonstration
    const sampleResponses = {
        openai: {
            text: "This is a simulated response from OpenAI's GPT-4 model. In a real implementation, this would be the actual response from the OpenAI API based on your prompt and parameters.",
            tokens: 245,
            cost: 0.012,
            time: 1.2,
            metrics: {
                coherence: 9.2,
                relevance: 8.7,
                accuracy: 9.0,
                creativity: 7.5,
                efficiency: 8.8
            }
        },
        claude: {
            text: "This is a simulated response from Anthropic's Claude 3 Opus model. In a real implementation, this would be the actual response from the Claude API based on your prompt and parameters.",
            tokens: 278,
            cost: 0.015,
            time: 1.5,
            metrics: {
                coherence: 9.5,
                relevance: 9.0,
                accuracy: 8.8,
                creativity: 8.2,
                efficiency: 8.5
            }
        },
        mistral: {
            text: "This is a simulated response from Mistral AI's Large model. In a real implementation, this would be the actual response from the Mistral API based on your prompt and parameters.",
            tokens: 210,
            cost: 0.008,
            time: 0.9,
            metrics: {
                coherence: 8.7,
                relevance: 8.5,
                accuracy: 8.6,
                creativity: 7.8,
                efficiency: 9.2
            }
        },
        llama: {
            text: "This is a simulated response from Meta's Llama 3 70B model. In a real implementation, this would be the actual response from the Llama API based on your prompt and parameters.",
            tokens: 225,
            cost: 0.006,
            time: 1.1,
            metrics: {
                coherence: 8.5,
                relevance: 8.3,
                accuracy: 8.4,
                creativity: 8.0,
                efficiency: 9.0
            }
        }
    };
    
    // Simulate API delay
    setTimeout(() => {
        // Update UI with responses
        models.forEach(model => {
            updateModelResponse(model, sampleResponses[model]);
        });
        
        // Update comparison chart
        updateComparisonChart(models.map(model => sampleResponses[model]));
        
        // Update comparison table
        updateComparisonTable(models, sampleResponses);
    }, 2000);
}

// Update model response in UI
function updateModelResponse(model, response) {
    const responseBody = document.querySelector(`#${model}Tab .response-body`);
    const responseMetrics = document.querySelector(`#${model}Tab .response-metrics`);
    
    // Update response text
    responseBody.innerHTML = `<div class="response-text">${response.text}</div>`;
    
    // Update metrics
    responseMetrics.innerHTML = `
        <div class="metric">
            <span class="metric-label">Tokens:</span>
            <span class="metric-value">${response.tokens}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Cost:</span>
            <span class="metric-value">$${response.cost.toFixed(3)}</span>
        </div>
        <div class="metric">
            <span class="metric-label">Time:</span>
            <span class="metric-value">${response.time.toFixed(1)}s</span>
        </div>
    `;
}

// Update comparison chart
function updateComparisonChart(responses) {
    const chart = Chart.getChart('comparisonChart');
    
    if (chart) {
        // Update each dataset with response metrics
        responses.forEach((response, index) => {
            chart.data.datasets[index].data = [
                response.metrics.coherence,
                response.metrics.relevance,
                response.metrics.accuracy,
                response.metrics.creativity,
                response.metrics.efficiency
            ];
        });
        
        chart.update();
    }
}

// Update comparison table
function updateComparisonTable(models, responses) {
    const tableBody = document.querySelector('.comparison-table tbody');
    
    if (tableBody) {
        // Clear existing rows
        tableBody.innerHTML = '';
        
        // Add row for each model
        models.forEach(model => {
            const response = responses[model];
            const modelName = getModelDisplayName(model);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${modelName}</td>
                <td>${response.metrics.coherence.toFixed(1)}</td>
                <td>${response.metrics.relevance.toFixed(1)}</td>
                <td>${response.tokens}</td>
                <td>$${response.cost.toFixed(3)}</td>
                <td>${response.time.toFixed(1)}s</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// Get display name for model
function getModelDisplayName(modelId) {
    const modelNames = {
        openai: 'GPT-4',
        claude: 'Claude 3',
        mistral: 'Mistral',
        llama: 'Llama 3'
    };
    
    return modelNames[modelId] || modelId;
}

// Save prompt function
function savePrompt() {
    const promptTitle = document.querySelector('.prompt-title-input').value;
    const promptText = document.getElementById('promptText').value;
    
    if (!promptText.trim()) {
        alert('Please enter a prompt before saving.');
        return;
    }
    
    // In a real implementation, this would save to a database
    alert(`Prompt "${promptTitle}" saved successfully!`);
    
    // Add to history (for demo purposes)
    addToHistory(promptTitle, promptText);
}

// Add to history (for demo purposes)
function addToHistory(title, text) {
    const historyList = document.querySelector('.history-list');
    
    if (historyList) {
        // Create new history item
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-item-header">
                <h3 class="history-item-title">${title}</h3>
                <span class="history-item-date">Just now</span>
            </div>
            <p class="history-item-preview">${text.substring(0, 60)}${text.length > 60 ? '...' : ''}</p>
        `;
        
        // Add click event
        historyItem.addEventListener('click', () => loadPromptFromHistory(historyItem));
        
        // Add to list (at the top)
        historyList.insertBefore(historyItem, historyList.firstChild);
    }
}

// Load prompt from history
function loadPromptFromHistory(historyItem) {
    // Remove active class from all items
    document.querySelectorAll('.history-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    historyItem.classList.add('active');
    
    // Get title and preview
    const title = historyItem.querySelector('.history-item-title').textContent;
    const preview = historyItem.querySelector('.history-item-preview').textContent;
    
    // Update prompt editor
    document.querySelector('.prompt-title-input').value = title;
    document.getElementById('promptText').value = preview.endsWith('...') 
        ? "This is a placeholder for the full prompt text that would be loaded from the database in a real implementation."
        : preview;
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        document.querySelector('.prompt-history-sidebar').classList.remove('open');
    }
}

// Export results function
function exportResults() {
    // In a real implementation, this would generate and download a file
    alert('Results exported successfully!');
}

// Toggle history sidebar
function toggleHistorySidebar() {
    const sidebar = document.querySelector('.prompt-history-sidebar');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}
