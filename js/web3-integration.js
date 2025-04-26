/* Web3 Integration JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Web3 Integration
    initializeWeb3Integration();
});

function initializeWeb3Integration() {
    // Set up wallet connection
    setupWalletConnection();
    
    // Set up network selector
    setupNetworkSelector();
    
    // Set up contract form
    setupContractForm();
    
    // Set up contract preview
    setupContractPreview();
    
    // Set up token management
    setupTokenManagement();
}

// Wallet Connection
function setupWalletConnection() {
    const connectWalletBtn = document.querySelector('.connect-wallet-btn');
    const walletModal = document.getElementById('wallet-modal');
    const modalClose = document.querySelector('.modal-close');
    const walletOptions = document.querySelectorAll('.wallet-option');
    
    if (connectWalletBtn && walletModal) {
        // Open wallet modal
        connectWalletBtn.addEventListener('click', function() {
            walletModal.classList.add('show');
        });
        
        // Close wallet modal
        modalClose.addEventListener('click', function() {
            walletModal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        walletModal.addEventListener('click', function(e) {
            if (e.target === walletModal) {
                walletModal.classList.remove('show');
            }
        });
        
        // Handle wallet option selection
        walletOptions.forEach(option => {
            option.addEventListener('click', function() {
                const walletName = this.querySelector('h3').textContent;
                
                // Simulate wallet connection
                simulateWalletConnection(walletName);
                
                // Close modal
                walletModal.classList.remove('show');
            });
        });
    }
}

// Simulate Wallet Connection
function simulateWalletConnection(walletName) {
    showNotification(`Connecting to ${walletName}...`, 'info');
    
    // Simulate connection delay
    setTimeout(() => {
        // Update wallet indicator
        const walletIndicator = document.querySelector('.wallet-indicator');
        const walletText = document.querySelector('.wallet-text');
        const connectWalletBtn = document.querySelector('.connect-wallet-btn');
        
        if (walletIndicator && walletText && connectWalletBtn) {
            walletIndicator.classList.remove('not-connected');
            walletIndicator.classList.add('connected');
            
            // Generate random wallet address
            const address = generateRandomWalletAddress();
            walletText.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
            
            // Update button text
            connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i><span>Disconnect</span>';
            
            // Enable buttons
            const disabledButtons = document.querySelectorAll('button[disabled]');
            disabledButtons.forEach(button => {
                button.disabled = false;
            });
            
            // Update dashboard values
            updateDashboardValues();
            
            // Show success notification
            showNotification(`Connected to ${walletName} successfully!`, 'success');
        }
    }, 2000);
}

// Generate Random Wallet Address
function generateRandomWalletAddress() {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 40; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Update Dashboard Values
function updateDashboardValues() {
    // Simulate random values
    const cardValues = document.querySelectorAll('.card-value');
    
    if (cardValues.length >= 4) {
        // AI Agents
        cardValues[0].textContent = Math.floor(Math.random() * 5);
        
        // Workflows
        cardValues[1].textContent = Math.floor(Math.random() * 8);
        
        // Tokens
        const tokenAmount = (Math.random() * 1000).toFixed(2);
        cardValues[2].textContent = `${tokenAmount} 4AI`;
        
        // Smart Contracts
        cardValues[3].textContent = Math.floor(Math.random() * 3);
    }
    
    // Update token balance
    const tokenBalance = document.querySelector('.token-stats .stat-value:first-child');
    const tokenValue = document.querySelector('.token-stats .stat-value:last-child');
    
    if (tokenBalance && tokenValue) {
        const balance = (Math.random() * 1000).toFixed(2);
        tokenBalance.textContent = `${balance} 4AI`;
        
        // Calculate USD value (assuming 1 4AI = $0.05)
        const usdValue = (parseFloat(balance) * 0.05).toFixed(2);
        tokenValue.textContent = `$${usdValue}`;
    }
}

// Network Selector
function setupNetworkSelector() {
    const networkSelect = document.getElementById('network-select');
    
    if (networkSelect) {
        networkSelect.addEventListener('change', function() {
            const network = this.value;
            showNotification(`Switched to ${getNetworkName(network)}`, 'info');
        });
    }
}

// Get Network Name
function getNetworkName(networkId) {
    switch(networkId) {
        case 'ethereum': return 'Ethereum Mainnet';
        case 'polygon': return 'Polygon';
        case 'optimism': return 'Optimism';
        case 'arbitrum': return 'Arbitrum';
        case 'base': return 'Base';
        default: return 'Unknown Network';
    }
}

// Contract Form
function setupContractForm() {
    // Contract type selector
    const contractTypeSelect = document.getElementById('contract-type');
    
    if (contractTypeSelect) {
        contractTypeSelect.addEventListener('change', function() {
            updateContractPreview();
        });
    }
    
    // Contract name input
    const contractNameInput = document.getElementById('contract-name');
    
    if (contractNameInput) {
        contractNameInput.addEventListener('input', function() {
            updateContractPreview();
        });
    }
    
    // Contract description input
    const contractDescriptionInput = document.getElementById('contract-description');
    
    if (contractDescriptionInput) {
        contractDescriptionInput.addEventListener('input', function() {
            updateContractPreview();
        });
    }
    
    // Access type radio buttons
    const accessRadios = document.querySelectorAll('input[name="access-type"]');
    
    accessRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateContractPreview();
        });
    });
    
    // Payment model radio buttons
    const paymentRadios = document.querySelectorAll('input[name="payment-model"]');
    const paymentDetails = document.querySelector('.payment-details');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Show/hide payment details
            if (this.id === 'payment-free') {
                paymentDetails.style.display = 'none';
            } else {
                paymentDetails.style.display = 'block';
            }
            
            updateContractPreview();
        });
    });
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    const royaltyDetails = document.querySelector('.royalty-details');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // Show/hide royalty details
            if (this.id === 'royalty-toggle') {
                royaltyDetails.style.display = this.checked ? 'block' : 'none';
            }
            
            updateContractPreview();
        });
    });
}

// Contract Preview
function setupContractPreview() {
    // Copy button
    const copyButton = document.querySelector('.preview-action:first-child');
    
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const codeElement = document.querySelector('.preview-content pre code');
            
            if (codeElement) {
                // Copy code to clipboard
                navigator.clipboard.writeText(codeElement.textContent)
                    .then(() => {
                        showNotification('Contract code copied to clipboard', 'success');
                    })
                    .catch(err => {
                        showNotification('Failed to copy code', 'error');
                        console.error('Could not copy text: ', err);
                    });
            }
        });
    }
    
    // Download button
    const downloadButton = document.querySelector('.preview-action:last-child');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            const codeElement = document.querySelector('.preview-content pre code');
            const contractName = document.getElementById('contract-name').value || 'MyAIAgent';
            
            if (codeElement) {
                // Create blob and download
                const blob = new Blob([codeElement.textContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${contractName}.sol`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showNotification(`Contract downloaded as ${contractName}.sol`, 'success');
            }
        });
    }
}

// Update Contract Preview
function updateContractPreview() {
    const contractName = document.getElementById('contract-name').value || 'MyAIAgent';
    const contractType = document.getElementById('contract-type').value;
    const contractDescription = document.getElementById('contract-description').value || 'AI Agent Contract for 4AI-build platform';
    
    // Get access type
    let accessType = 'public';
    document.querySelectorAll('input[name="access-type"]').forEach(radio => {
        if (radio.checked) {
            accessType = radio.id.replace('access-', '');
        }
    });
    
    // Get payment model
    let paymentModel = 'free';
    document.querySelectorAll('input[name="payment-model"]').forEach(radio => {
        if (radio.checked) {
            paymentModel = radio.id.replace('payment-', '');
        }
    });
    
    // Get toggle states
    const isUpgradeable = document.getElementById('upgradeable-toggle').checked;
    const isPausable = document.getElementById('pausable-toggle').checked;
    const hasRoyalties = document.getElementById('royalty-toggle').checked;
    
    // Generate contract code based on selections
    let contractCode = generateContractCode(
        contractName,
        contractType,
        contractDescription,
        accessType,
        paymentModel,
        isUpgradeable,
        isPausable,
        hasRoyalties
    );
    
    // Update preview
    const codeElement = document.querySelector('.preview-content pre code');
    if (codeElement) {
        codeElement.textContent = contractCode;
    }
}

// Generate Contract Code
function generateContractCode(name, type, description, access, payment, upgradeable, pausable, royalties) {
    // Base contract
    let code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

`;
    
    // Imports
    code += `import "@openzeppelin/contracts/access/Ownable.sol";
`;
    
    if (upgradeable) {
        code += `import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
`;
    }
    
    if (pausable) {
        code += `import "@openzeppelin/contracts/security/Pausable.sol";
`;
    }
    
    if (access === 'token') {
        code += `import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
`;
    }
    
    if (royalties) {
        code += `import "@openzeppelin/contracts/token/common/ERC2981.sol";
`;
    }
    
    // Contract comment
    code += `
/**
 * @title ${name}
 * @dev ${description}
 */
`;
    
    // Contract declaration
    let contractDeclaration = `contract ${name} is Ownable`;
    
    if (upgradeable) {
        contractDeclaration += `, Initializable`;
    }
    
    if (pausable) {
        contractDeclaration += `, Pausable`;
    }
    
    if (royalties) {
        contractDeclaration += `, ERC2981`;
    }
    
    code += contractDeclaration + ` {
    // Contract variables
    string public name;
    string public description;
    bool public isActive;
    `;
    
    // Additional variables based on options
    if (access === 'token') {
        code += `    IERC20 public accessToken;
    uint256 public requiredTokenAmount;
`;
    } else if (access === 'whitelist') {
        code += `    mapping(address => bool) public whitelist;
`;
    }
    
    if (payment !== 'free') {
        code += `    uint256 public fee;
    address public treasury;
`;
    }
    
    // Events
    code += `
    // Events
    event AgentActivated(address indexed owner);
    event AgentDeactivated(address indexed owner);
    event AgentExecuted(address indexed user, uint256 timestamp);
`;
    
    if (access === 'whitelist') {
        code += `    event AddressWhitelisted(address indexed user);
    event AddressRemovedFromWhitelist(address indexed user);
`;
    }
    
    // Constructor
    if (upgradeable) {
        code += `
    /**
     * @dev Initializer for upgradeable contract
     */
    function initialize(string memory _name, string memory _description) public initializer {
        __Ownable_init();
`;
        if (pausable) {
            code += `        __Pausable_init();
`;
        }
        code += `        name = _name;
        description = _description;
        isActive = true;
`;
        if (payment !== 'free') {
            code += `        treasury = msg.sender;
`;
        }
        code += `    }
`;
    } else {
        code += `
    /**
     * @dev Constructor sets the name and description of the AI agent
     */
    constructor(string memory _name, string memory _description) {
        name = _name;
        description = _description;
        isActive = true;
`;
        if (payment !== 'free') {
            code += `        treasury = msg.sender;
`;
        }
        code += `    }
`;
    }
    
    // Main functionality
    code += `
    /**
     * @dev Execute the AI agent functionality
     * @return success status of execution
     */
    function executeAgent() external`;
    
    if (pausable) {
        code += ` whenNotPaused`;
    }
    
    code += ` returns (bool) {
        require(isActive, "Agent is not active");
`;
    
    // Access control
    if (access === 'token') {
        code += `        require(accessToken.balanceOf(msg.sender) >= requiredTokenAmount, "Insufficient token balance");
`;
    } else if (access === 'whitelist') {
        code += `        require(whitelist[msg.sender], "Address not whitelisted");
`;
    }
    
    // Payment
    if (payment === 'per-use') {
        code += `        require(msg.value >= fee, "Insufficient payment");
        
        // Transfer fee to treasury
        (bool success, ) = treasury.call{value: msg.value}("");
        require(success, "Fee transfer failed");
`;
    } else if (payment === 'subscription') {
        code += `        // Subscription validation would be implemented here
`;
    }
    
    code += `
        // AI agent execution logic would be implemented here
        
        emit AgentExecuted(msg.sender, block.timestamp);
        return true;
    }
`;
    
    // Admin functions
    code += `
    /**
     * @dev Activate the AI agent
     * @notice Only contract owner can call this function
     */
    function activateAgent() external onlyOwner {
        isActive = true;
        emit AgentActivated(msg.sender);
    }
    
    /**
     * @dev Deactivate the AI agent
     * @notice Only contract owner can call this function
     */
    function deactivateAgent() external onlyOwner {
        isActive = false;
        emit AgentDeactivated(msg.sender);
    }
    
    /**
     * @dev Update the agent description
     * @notice Only contract owner can call this function
     */
    function updateDescription(string memory _description) external onlyOwner {
        description = _description;
    }
`;
    
    // Additional functions based on options
    if (pausable) {
        code += `
    /**
     * @dev Pause the contract
     * @notice Only contract owner can call this function
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the contract
     * @notice Only contract owner can call this function
     */
    function unpause() external onlyOwner {
        _unpause();
    }
`;
    }
    
    if (access === 'token') {
        code += `
    /**
     * @dev Set the access token and required amount
     * @notice Only contract owner can call this function
     */
    function setAccessToken(address _token, uint256 _amount) external onlyOwner {
        accessToken = IERC20(_token);
        requiredTokenAmount = _amount;
    }
`;
    } else if (access === 'whitelist') {
        code += `
    /**
     * @dev Add address to whitelist
     * @notice Only contract owner can call this function
     */
    function addToWhitelist(address _user) external onlyOwner {
        whitelist[_user] = true;
        emit AddressWhitelisted(_user);
    }
    
    /**
     * @dev Remove address from whitelist
     * @notice Only contract owner can call this function
     */
    function removeFromWhitelist(address _user) external onlyOwner {
        whitelist[_user] = false;
        emit AddressRemovedFromWhitelist(_user);
    }
`;
    }
    
    if (payment !== 'free') {
        code += `
    /**
     * @dev Set the fee for using the agent
     * @notice Only contract owner can call this function
     */
    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }
    
    /**
     * @dev Set the treasury address
     * @notice Only contract owner can call this function
     */
    function setTreasury(address _treasury) external onlyOwner {
        treasury = _treasury;
    }
`;
    }
    
    if (royalties) {
        code += `
    /**
     * @dev Set the royalty information
     * @notice Only contract owner can call this function
     */
    function setRoyaltyInfo(address receiver, uint96 feeNumerator) external onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }
`;
    }
    
    // Close contract
    code += `}`;
    
    return code;
}

// Token Management
function setupTokenManagement() {
    const refreshButton = document.querySelector('.transactions-header .btn-text');
    
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            showNotification('Refreshing transaction data...', 'info');
            
            // Simulate refresh delay
            setTimeout(() => {
                showNotification('No new transactions found', 'info');
            }, 1500);
        });
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
