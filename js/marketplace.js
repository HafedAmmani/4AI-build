/* Marketplace JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Marketplace
    initializeMarketplace();
});

function initializeMarketplace() {
    // Set up price range slider
    setupPriceRangeSlider();
    
    // Set up filter actions
    setupFilterActions();
    
    // Set up item preview
    setupItemPreview();
    
    // Set up publish item
    setupPublishItem();
    
    // Set up pagination
    setupPagination();
    
    // Set up sorting
    setupSorting();
    
    // Set up search
    setupSearch();
}

// Price Range Slider
function setupPriceRangeSlider() {
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const minInput = document.querySelector('.min-input');
    const maxInput = document.querySelector('.max-input');
    const sliderTrack = document.querySelector('.slider-track');
    const sliderRange = document.querySelector('.slider-range');
    
    if (rangeMin && rangeMax && minInput && maxInput && sliderRange) {
        // Set initial range position
        updateSliderRange();
        
        // Update range on input change
        rangeMin.addEventListener('input', function() {
            // Prevent min from exceeding max
            if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
                rangeMin.value = rangeMax.value;
            }
            
            // Update min input
            minInput.value = rangeMin.value;
            
            // Update range position
            updateSliderRange();
        });
        
        rangeMax.addEventListener('input', function() {
            // Prevent max from being less than min
            if (parseInt(rangeMax.value) < parseInt(rangeMin.value)) {
                rangeMax.value = rangeMin.value;
            }
            
            // Update max input
            maxInput.value = rangeMax.value;
            
            // Update range position
            updateSliderRange();
        });
        
        // Update range on input field change
        minInput.addEventListener('input', function() {
            // Validate input
            let value = parseInt(minInput.value);
            if (isNaN(value)) {
                value = 0;
            }
            if (value < 0) {
                value = 0;
            }
            if (value > parseInt(rangeMax.value)) {
                value = parseInt(rangeMax.value);
            }
            
            // Update range slider
            rangeMin.value = value;
            minInput.value = value;
            
            // Update range position
            updateSliderRange();
        });
        
        maxInput.addEventListener('input', function() {
            // Validate input
            let value = parseInt(maxInput.value);
            if (isNaN(value)) {
                value = 100;
            }
            if (value > 100) {
                value = 100;
            }
            if (value < parseInt(rangeMin.value)) {
                value = parseInt(rangeMin.value);
            }
            
            // Update range slider
            rangeMax.value = value;
            maxInput.value = value;
            
            // Update range position
            updateSliderRange();
        });
    }
}

// Update Slider Range
function updateSliderRange() {
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const sliderRange = document.querySelector('.slider-range');
    
    if (rangeMin && rangeMax && sliderRange) {
        const min = parseInt(rangeMin.value);
        const max = parseInt(rangeMax.value);
        
        // Calculate percentage positions
        const minPercent = (min / 100) * 100;
        const maxPercent = (max / 100) * 100;
        
        // Update range position
        sliderRange.style.left = minPercent + '%';
        sliderRange.style.width = (maxPercent - minPercent) + '%';
    }
}

// Filter Actions
function setupFilterActions() {
    const resetButton = document.querySelector('.filter-actions .btn-secondary');
    const applyButton = document.querySelector('.filter-actions .btn-primary');
    
    if (resetButton && applyButton) {
        // Reset filters
        resetButton.addEventListener('click', function() {
            // Reset checkboxes
            const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = checkbox.parentElement.querySelector('span').textContent === 'All';
            });
            
            // Reset price range
            const rangeMin = document.querySelector('.range-min');
            const rangeMax = document.querySelector('.range-max');
            const minInput = document.querySelector('.min-input');
            const maxInput = document.querySelector('.max-input');
            
            if (rangeMin && rangeMax && minInput && maxInput) {
                rangeMin.value = 0;
                rangeMax.value = 100;
                minInput.value = 0;
                maxInput.value = 100;
                
                // Update range position
                updateSliderRange();
            }
            
            // Show notification
            showNotification('Filters have been reset', 'info');
        });
        
        // Apply filters
        applyButton.addEventListener('click', function() {
            // Get selected categories
            const categoryCheckboxes = document.querySelectorAll('.filter-section:first-child .filter-option input[type="checkbox"]');
            const selectedCategories = [];
            
            categoryCheckboxes.forEach(checkbox => {
                if (checkbox.checked && checkbox.parentElement.querySelector('span').textContent !== 'All') {
                    selectedCategories.push(checkbox.parentElement.querySelector('span').textContent);
                }
            });
            
            // Get price range
            const minPrice = document.querySelector('.min-input').value;
            const maxPrice = document.querySelector('.max-input').value;
            
            // Get selected ratings
            const ratingCheckboxes = document.querySelectorAll('.filter-section:nth-child(3) .filter-option input[type="checkbox"]');
            const selectedRatings = [];
            
            ratingCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const stars = checkbox.parentElement.querySelector('.rating').querySelectorAll('i.fas').length;
                    selectedRatings.push(stars);
                }
            });
            
            // Get selected licenses
            const licenseCheckboxes = document.querySelectorAll('.filter-section:nth-child(4) .filter-option input[type="checkbox"]');
            const selectedLicenses = [];
            
            licenseCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedLicenses.push(checkbox.parentElement.querySelector('span').textContent);
                }
            });
            
            // Log filter criteria (in a real app, this would filter the items)
            console.log('Filter Criteria:');
            console.log('Categories:', selectedCategories.length > 0 ? selectedCategories : 'All');
            console.log('Price Range:', `$${minPrice} - $${maxPrice}`);
            console.log('Ratings:', selectedRatings.length > 0 ? selectedRatings : 'All');
            console.log('Licenses:', selectedLicenses.length > 0 ? selectedLicenses : 'All');
            
            // Show notification
            showNotification('Filters applied successfully', 'success');
            
            // Simulate filtered results
            simulateFilteredResults(selectedCategories, minPrice, maxPrice, selectedRatings, selectedLicenses);
        });
    }
}

// Simulate Filtered Results
function simulateFilteredResults(categories, minPrice, maxPrice, ratings, licenses) {
    // In a real app, this would filter the items based on the criteria
    // For this prototype, we'll just update the item count
    
    const itemsCount = document.querySelector('.items-count span');
    
    if (itemsCount) {
        // Generate a random number between 1 and 42
        const randomCount = Math.floor(Math.random() * 42) + 1;
        itemsCount.textContent = `${randomCount} items`;
    }
}

// Item Preview
function setupItemPreview() {
    const previewButtons = document.querySelectorAll('.item-actions .btn-secondary');
    const previewModal = document.getElementById('preview-modal');
    const modalClose = previewModal ? previewModal.querySelector('.modal-close') : null;
    
    if (previewButtons.length > 0 && previewModal && modalClose) {
        // Open preview modal
        previewButtons.forEach(button => {
            button.addEventListener('click', function() {
                previewModal.classList.add('show');
            });
        });
        
        // Close preview modal
        modalClose.addEventListener('click', function() {
            previewModal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        previewModal.addEventListener('click', function(e) {
            if (e.target === previewModal) {
                previewModal.classList.remove('show');
            }
        });
        
        // Set up preview tabs
        setupPreviewTabs();
        
        // Set up preview thumbnails
        setupPreviewThumbnails();
    }
}

// Preview Tabs
function setupPreviewTabs() {
    const previewTabs = document.querySelectorAll('.preview-tab');
    const tabContents = document.querySelectorAll('.preview-tab-content');
    
    if (previewTabs.length > 0 && tabContents.length > 0) {
        previewTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                previewTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content.style.display = 'none');
                
                // Show corresponding tab content
                tabContents[index].style.display = 'block';
            });
        });
    }
}

// Preview Thumbnails
function setupPreviewThumbnails() {
    const thumbnails = document.querySelectorAll('.preview-thumbnail');
    const mainImage = document.querySelector('.preview-main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');
                
                // Update main image
                const thumbnailImg = thumbnail.querySelector('img');
                mainImage.src = thumbnailImg.src;
            });
        });
    }
}

// Publish Item
function setupPublishItem() {
    const publishButton = document.querySelector('.marketplace-actions .btn-primary');
    const publishModal = document.getElementById('publish-modal');
    const modalClose = publishModal ? publishModal.querySelector('.modal-close') : null;
    const termsCheckbox = document.getElementById('terms-checkbox');
    const submitButton = publishModal ? publishModal.querySelector('.modal-footer .btn-primary') : null;
    
    if (publishButton && publishModal && modalClose && termsCheckbox && submitButton) {
        // Open publish modal
        publishButton.addEventListener('click', function() {
            publishModal.classList.add('show');
        });
        
        // Close publish modal
        modalClose.addEventListener('click', function() {
            publishModal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        publishModal.addEventListener('click', function(e) {
            if (e.target === publishModal) {
                publishModal.classList.remove('show');
            }
        });
        
        // Enable/disable submit button based on terms checkbox
        termsCheckbox.addEventListener('change', function() {
            submitButton.disabled = !termsCheckbox.checked;
        });
        
        // Set up image uploader
        setupImageUploader();
        
        // Set up tags input
        setupTagsInput();
        
        // Handle form submission
        submitButton.addEventListener('click', function() {
            // Get form values
            const title = document.getElementById('item-title').value;
            const category = document.getElementById('item-category').value;
            const description = document.getElementById('item-description').value;
            const price = document.getElementById('item-price').value;
            const license = document.getElementById('item-license').value;
            
            // Validate form
            if (!title || !category || !description) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Show success notification
            showNotification('Item published successfully!', 'success');
            
            // Close modal
            publishModal.classList.remove('show');
            
            // Reset form
            document.getElementById('item-title').value = '';
            document.getElementById('item-category').value = '';
            document.getElementById('item-description').value = '';
            document.getElementById('item-price').value = '';
            document.getElementById('item-license').value = 'free';
            termsCheckbox.checked = false;
            submitButton.disabled = true;
        });
    }
}

// Image Uploader
function setupImageUploader() {
    const imageUploader = document.querySelector('.image-uploader');
    const fileInput = document.querySelector('.image-uploader input[type="file"]');
    const uploadPreview = document.querySelector('.upload-preview');
    
    if (imageUploader && fileInput && uploadPreview) {
        // Open file dialog when clicking on uploader
        imageUploader.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Handle file selection
        fileInput.addEventListener('change', function() {
            // Clear preview
            uploadPreview.innerHTML = '';
            
            // Process selected files
            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    showNotification('Please select image files only', 'error');
                    continue;
                }
                
                // Create preview element
                const preview = document.createElement('div');
                preview.className = 'preview-item';
                preview.innerHTML = `
                    <img src="${URL.createObjectURL(file)}" alt="${file.name}">
                    <button class="preview-remove">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                // Add to preview container
                uploadPreview.appendChild(preview);
                
                // Add remove button functionality
                const removeButton = preview.querySelector('.preview-remove');
                removeButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    preview.remove();
                });
            }
        });
        
        // Handle drag and drop
        imageUploader.addEventListener('dragover', function(e) {
            e.preventDefault();
            imageUploader.style.borderColor = 'var(--primary-color)';
            imageUploader.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)';
        });
        
        imageUploader.addEventListener('dragleave', function() {
            imageUploader.style.borderColor = 'var(--border-color)';
            imageUploader.style.backgroundColor = 'transparent';
        });
        
        imageUploader.addEventListener('drop', function(e) {
            e.preventDefault();
            imageUploader.style.borderColor = 'var(--border-color)';
            imageUploader.style.backgroundColor = 'transparent';
            
            // Process dropped files
            const files = e.dataTransfer.files;
            fileInput.files = files;
            
            // Trigger change event
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        });
    }
}

// Tags Input
function setupTagsInput() {
    const tagsInput = document.querySelector('.tags-input input');
    const tagsList = document.querySelector('.tags-list');
    
    if (tagsInput && tagsList) {
        // Add tag on Enter key
        tagsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                
                // Get tag value
                const tagValue = tagsInput.value.trim();
                
                // Validate tag
                if (tagValue === '') {
                    return;
                }
                
                // Create tag element
                const tag = document.createElement('div');
                tag.className = 'tag';
                tag.innerHTML = `
                    <span>${tagValue}</span>
                    <button class="tag-remove">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                // Add to tags list
                tagsList.appendChild(tag);
                
                // Clear input
                tagsInput.value = '';
                
                // Add remove button functionality
                const removeButton = tag.querySelector('.tag-remove');
                removeButton.addEventListener('click', function() {
                    tag.remove();
                });
            }
        });
    }
}

// Pagination
function setupPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    paginationButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Scroll to top of items
                    const itemsGrid = document.querySelector('.items-grid');
                    if (itemsGrid) {
                        itemsGrid.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });
    }
}

// Sorting
function setupSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = sortSelect.value;
            
            // Show notification
            showNotification(`Sorting items by ${getSortLabel(sortValue)}`, 'info');
            
            // In a real app, this would sort the items
            console.log('Sorting by:', sortValue);
        });
    }
}

// Get Sort Label
function getSortLabel(value) {
    switch(value) {
        case 'popular': return 'Most Popular';
        case 'recent': return 'Recently Added';
        case 'price-low': return 'Price: Low to High';
        case 'price-high': return 'Price: High to Low';
        case 'rating': return 'Highest Rated';
        default: return value;
    }
}

// Search
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
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
}

// Perform Search
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }
    
    // Show notification
    showNotification(`Searching for "${searchTerm}"...`, 'info');
    
    // In a real app, this would search the items
    console.log('Searching for:', searchTerm);
    
    // Simulate search results
    setTimeout(() => {
        const itemsCount = document.querySelector('.items-count span');
        
        if (itemsCount) {
            // Generate a random number between 0 and 10
            const randomCount = Math.floor(Math.random() * 11);
            itemsCount.textContent = `${randomCount} items`;
            
            if (randomCount === 0) {
                showNotification(`No results found for "${searchTerm}"`, 'info');
            } else {
                showNotification(`Found ${randomCount} results for "${searchTerm}"`, 'success');
            }
        }
    }, 1000);
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
