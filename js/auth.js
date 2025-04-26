// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const passwordFields = document.querySelectorAll('input[type="password"]');
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach((button, index) => {
        if (button && passwordFields[index]) {
            button.addEventListener('click', function() {
                const field = passwordFields[index];
                const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
                field.setAttribute('type', type);
                
                // Toggle icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-eye');
                    icon.classList.toggle('fa-eye-slash');
                }
            });
        }
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe')?.checked || false;
            
            // In a real application, you would send these credentials to your server
            console.log('Login attempt:', { email, password, rememberMe });
            
            // Simulate authentication
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify({
                firstName: 'Hafedh',
                lastName: 'Ammani',
                email: email,
                role: 'Admin'
            }));
            
            // Redirect to dashboard
            window.location.href = 'index.html';
        });
    }
    
    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const company = document.getElementById('company')?.value || '';
            const termsAgreement = document.getElementById('termsAgreement')?.checked || false;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            // In a real application, you would send this data to your server
            console.log('Registration attempt:', { firstName, lastName, email, password, company, termsAgreement });
            
            // Simulate registration
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: 'User'
            }));
            
            // Redirect to dashboard
            window.location.href = 'index.html';
        });
    }
    
    // Password reset form submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetSuccess = document.getElementById('resetSuccess');
    
    if (forgotPasswordForm && resetSuccess) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            // In a real application, you would send this email to your server
            console.log('Password reset requested for:', email);
            
            // Show success message
            forgotPasswordForm.style.display = 'none';
            resetSuccess.style.display = 'block';
        });
    }
    
    // Password strength meter
    const passwordInput = document.getElementById('password');
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthValue = document.getElementById('strengthValue');
    
    if (passwordInput && strengthSegments.length > 0 && strengthValue) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Calculate password strength
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/\d/)) strength++;
            if (password.match(/[^a-zA-Z\d]/)) strength++;
            
            // Update strength meter
            strengthSegments.forEach((segment, index) => {
                if (index < strength) {
                    segment.classList.add('active');
                } else {
                    segment.classList.remove('active');
                }
            });
            
            // Update strength text
            let strengthText = 'Weak';
            let strengthClass = 'weak';
            
            if (strength === 2) {
                strengthText = 'Fair';
                strengthClass = 'fair';
            } else if (strength === 3) {
                strengthText = 'Good';
                strengthClass = 'good';
            } else if (strength === 4) {
                strengthText = 'Strong';
                strengthClass = 'strong';
            }
            
            strengthValue.textContent = strengthText;
            strengthValue.className = '';
            strengthValue.classList.add(strengthClass);
        });
    }
    
    // Logout functionality
    function logout() {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
    
    // Add logout functionality to all logout buttons
    const logoutButtons = document.querySelectorAll('[onclick="logout()"]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                logout();
            }
        });
    });
    
    // Check authentication status on protected pages
    function checkAuth() {
        // Skip auth check on login, register, and forgot password pages
        const currentPage = window.location.pathname.split('/').pop();
        const authPages = ['login.html', 'register.html', 'forgot-password.html'];
        
        if (authPages.includes(currentPage)) {
            return;
        }
        
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            window.location.href = 'login.html';
        }
    }
    
    // Update UI with user info if authenticated
    function updateUserInfo() {
        const userInfoElements = document.querySelectorAll('.user-name');
        const userRoleElements = document.querySelectorAll('.user-role');
        
        if (userInfoElements.length > 0 || userRoleElements.length > 0) {
            const userJson = localStorage.getItem('user');
            if (userJson) {
                try {
                    const user = JSON.parse(userJson);
                    
                    userInfoElements.forEach(element => {
                        element.textContent = `${user.firstName} ${user.lastName}`;
                    });
                    
                    userRoleElements.forEach(element => {
                        element.textContent = user.role;
                    });
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            }
        }
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 
                        type === 'error' ? 'fas fa-exclamation-circle' : 
                        'fas fa-info-circle';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        notification.appendChild(icon);
        notification.appendChild(text);
        notification.appendChild(closeBtn);
        
        notificationContainer.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Run auth check and update user info
    checkAuth();
    updateUserInfo();
});
