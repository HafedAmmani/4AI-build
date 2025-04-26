/* Collaboration JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Collaboration
    initializeCollaboration();
});

function initializeCollaboration() {
    // Set up project selection
    setupProjectSelection();
    
    // Set up tab switching
    setupTabSwitching();
    
    // Set up share dropdown
    setupShareDropdown();
    
    // Set up comment actions
    setupCommentActions();
    
    // Set up chat functionality
    setupChatFunctionality();
    
    // Set up real-time collaboration simulation
    setupRealTimeSimulation();
}

// Project Selection
function setupProjectSelection() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all projects
            projectItems.forEach(project => project.classList.remove('active'));
            
            // Add active class to clicked project
            this.classList.add('active');
            
            // Update project details (in a real app, this would load data from the server)
            const projectName = this.querySelector('.project-info h3').textContent;
            updateProjectDetails(projectName);
            
            // Show notification
            showNotification(`Switched to project: ${projectName}`, 'info');
        });
    });
}

// Tab Switching
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.project-tab');
    const tabContents = document.querySelectorAll('.project-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the selected tab content
            const tabName = this.textContent.toLowerCase();
            const selectedTab = document.getElementById(`${tabName}-tab`);
            if (selectedTab) {
                selectedTab.style.display = 'block';
            }
        });
    });
}

// Share Dropdown
function setupShareDropdown() {
    const shareButton = document.querySelector('.btn-secondary');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (shareButton && dropdownMenu) {
        shareButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle dropdown visibility
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function() {
            dropdownMenu.style.display = 'none';
        });
        
        // Prevent dropdown from closing when clicking inside it
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Handle dropdown item clicks
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                const action = this.textContent.trim();
                
                switch(action) {
                    case 'Copy Link':
                        // Simulate copying link to clipboard
                        navigator.clipboard.writeText('https://4ai-build.com/collaboration/project/123')
                            .then(() => {
                                showNotification('Project link copied to clipboard', 'success');
                            })
                            .catch(err => {
                                showNotification('Failed to copy link', 'error');
                                console.error('Could not copy text: ', err);
                            });
                        break;
                        
                    case 'Email':
                        // Simulate opening email dialog
                        showNotification('Opening email dialog...', 'info');
                        setTimeout(() => {
                            showNotification('Email sharing feature coming soon!', 'info');
                        }, 1500);
                        break;
                        
                    case 'Manage Access':
                        // Simulate opening access management
                        showNotification('Opening access management...', 'info');
                        setTimeout(() => {
                            showNotification('Access management feature coming soon!', 'info');
                        }, 1500);
                        break;
                }
                
                // Close dropdown
                dropdownMenu.style.display = 'none';
            });
        });
    }
}

// Comment Actions
function setupCommentActions() {
    // Reply buttons
    const replyButtons = document.querySelectorAll('.comment-action:first-child');
    
    replyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const commentItem = this.closest('.comment-item');
            const authorName = commentItem.querySelector('.comment-header h4').textContent;
            
            // Focus on comment input and add @mention
            const commentInput = document.querySelector('.comment-form textarea');
            if (commentInput) {
                commentInput.focus();
                commentInput.value = `@${authorName} `;
            }
        });
    });
    
    // Like buttons
    const likeButtons = document.querySelectorAll('.comment-action:nth-child(2)');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCount = this.querySelector('span');
            let count = parseInt(likeCount.textContent);
            
            // Toggle like
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                count--;
            } else {
                this.classList.add('liked');
                count++;
            }
            
            likeCount.textContent = count;
        });
    });
    
    // Comment form
    const commentForm = document.querySelector('.comment-form');
    const sendButton = commentForm.querySelector('.btn-primary');
    const textarea = commentForm.querySelector('textarea');
    
    if (sendButton && textarea) {
        sendButton.addEventListener('click', function() {
            const commentText = textarea.value.trim();
            
            if (commentText) {
                // Add new comment (in a real app, this would send to the server)
                addNewComment(commentText);
                
                // Clear textarea
                textarea.value = '';
            }
        });
        
        // Allow submitting with Enter key (Shift+Enter for new line)
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendButton.click();
            }
        });
    }
}

// Chat Functionality
function setupChatFunctionality() {
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.input-send');
    
    if (chatInput && sendButton) {
        // Send message on button click
        sendButton.addEventListener('click', function() {
            sendChatMessage();
        });
        
        // Send message on Enter key
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
        
        // Show typing indicator when typing
        chatInput.addEventListener('input', function() {
            // In a real app, this would notify other users that you're typing
            // For this prototype, we'll just keep the typing indicator visible
        });
    }
}

// Real-time Collaboration Simulation
function setupRealTimeSimulation() {
    // Simulate other users' activities
    setTimeout(() => {
        // Simulate new chat message
        addChatMessage({
            user: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
            text: 'I just finished testing the order status inquiries. The bot handles them correctly in most cases, but there are a few edge cases we need to address.',
            time: '11:45 AM'
        });
        
        // Hide typing indicator
        document.querySelector('.chat-typing').style.display = 'none';
    }, 5000);
    
    // Simulate new comment after 10 seconds
    setTimeout(() => {
        // Add new comment from another user
        addNewComment('I found a bug in the return label generation. It sometimes creates labels with incorrect shipping addresses. I\'ll fix it today.', {
            user: 'Emma Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
            time: 'Just now'
        });
    }, 10000);
    
    // Simulate new user coming online after 15 seconds
    setTimeout(() => {
        const offlineUser = document.querySelectorAll('.member-item:not(.online)')[0];
        if (offlineUser) {
            offlineUser.classList.add('online');
            
            // Add system message to chat
            addSystemMessage(`${offlineUser.querySelector('.member-info h3').textContent} is now online`);
        }
    }, 15000);
}

// Update Project Details
function updateProjectDetails(projectName) {
    // In a real app, this would fetch project data from the server
    // For this prototype, we'll just update the title
    const projectTitle = document.querySelector('.project-title h2');
    if (projectTitle) {
        projectTitle.textContent = projectName;
    }
}

// Add New Comment
function addNewComment(text, user = null) {
    const commentList = document.querySelector('.comment-list');
    
    if (!commentList) return;
    
    // Create new comment element
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    
    // Use current user if not specified
    const userData = user || {
        user: 'Hafedh Ammani',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        time: 'Just now'
    };
    
    // Set comment HTML
    commentItem.innerHTML = `
        <div class="comment-avatar">
            <img src="${userData.avatar}" alt="${userData.user}">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <h4>${userData.user}</h4>
                <span>${userData.time}</span>
            </div>
            <div class="comment-text">
                <p>${text}</p>
            </div>
            <div class="comment-actions">
                <button class="comment-action">
                    <i class="fas fa-reply"></i>
                    <span>Reply</span>
                </button>
                <button class="comment-action">
                    <i class="fas fa-thumbs-up"></i>
                    <span>0</span>
                </button>
            </div>
        </div>
    `;
    
    // Add to comment list
    commentList.prepend(commentItem);
    
    // Set up actions for new comment
    const replyButton = commentItem.querySelector('.comment-action:first-child');
    const likeButton = commentItem.querySelector('.comment-action:nth-child(2)');
    
    replyButton.addEventListener('click', function() {
        const commentInput = document.querySelector('.comment-form textarea');
        if (commentInput) {
            commentInput.focus();
            commentInput.value = `@${userData.user} `;
        }
    });
    
    likeButton.addEventListener('click', function() {
        const likeCount = this.querySelector('span');
        let count = parseInt(likeCount.textContent);
        
        if (this.classList.contains('liked')) {
            this.classList.remove('liked');
            count--;
        } else {
            this.classList.add('liked');
            count++;
        }
        
        likeCount.textContent = count;
    });
    
    // Show notification
    showNotification('New comment added', 'success');
}

// Send Chat Message
function sendChatMessage() {
    const chatInput = document.querySelector('.chat-input input');
    const text = chatInput.value.trim();
    
    if (text) {
        // Add message to chat
        addChatMessage({
            user: 'Hafedh Ammani',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: text,
            time: getCurrentTime()
        });
        
        // Clear input
        chatInput.value = '';
    }
}

// Add Chat Message
function addChatMessage(message) {
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) return;
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    
    // Set message HTML
    messageElement.innerHTML = `
        <div class="message-avatar">
            <img src="${message.avatar}" alt="${message.user}">
        </div>
        <div class="message-content">
            <div class="message-header">
                <h4>${message.user}</h4>
                <span>${message.time}</span>
            </div>
            <div class="message-text">
                <p>${message.text}</p>
            </div>
        </div>
    `;
    
    // Add to chat
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add System Message
function addSystemMessage(text) {
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) return;
    
    // Create system message element
    const systemMessage = document.createElement('div');
    systemMessage.className = 'chat-system-message';
    systemMessage.innerHTML = `<span>${text}</span>`;
    
    // Add to chat
    chatMessages.appendChild(systemMessage);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get Current Time
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${formattedMinutes} ${ampm}`;
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
