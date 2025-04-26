// Améliorations générales de l'interface utilisateur et système de notification

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le système de notification
    initNotificationSystem();
    
    // Initialiser l'assistant IA d'onboarding
    initAIAssistant();
    
    // Ajouter les écouteurs d'événements pour les nouvelles fonctionnalités
    addEventListeners();
    
    // Afficher une notification de bienvenue
    showNotification('info', 'Bienvenue sur 4AI-build V2', 'Découvrez les nouvelles fonctionnalités : Prompt Lab et Dataset Studio');
});

// Initialiser le système de notification
function initNotificationSystem() {
    // Créer le conteneur de notifications s'il n'existe pas déjà
    if (!document.querySelector('.notification-center')) {
        const notificationCenter = document.createElement('div');
        notificationCenter.className = 'notification-center';
        document.body.appendChild(notificationCenter);
    }
}

// Afficher une notification
function showNotification(type, title, message, duration = 5000) {
    const notificationCenter = document.querySelector('.notification-center');
    
    if (notificationCenter) {
        // Créer la notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        // Définir l'icône en fonction du type
        let icon = '';
        switch (type) {
            case 'info':
                icon = 'info-circle';
                break;
            case 'success':
                icon = 'check-circle';
                break;
            case 'warning':
                icon = 'exclamation-triangle';
                break;
            case 'error':
                icon = 'times-circle';
                break;
            default:
                icon = 'bell';
        }
        
        // Construire le HTML de la notification
        notification.innerHTML = `
            <div class="notification-icon ${type}">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-content">
                <h3 class="notification-title">${title}</h3>
                <p class="notification-message">${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Ajouter la notification au centre de notifications
        notificationCenter.appendChild(notification);
        
        // Ajouter un écouteur d'événement pour fermer la notification
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.remove();
            });
        }
        
        // Supprimer automatiquement la notification après la durée spécifiée
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    }
}

// Initialiser l'assistant IA d'onboarding
function initAIAssistant() {
    // Créer l'assistant IA s'il n'existe pas déjà
    if (!document.querySelector('.ai-assistant')) {
        const aiAssistant = document.createElement('div');
        aiAssistant.className = 'ai-assistant';
        
        aiAssistant.innerHTML = `
            <div class="ai-assistant-button">
                <i class="fas fa-robot"></i>
            </div>
            <div class="ai-assistant-panel">
                <div class="ai-assistant-header">
                    <div class="ai-assistant-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="ai-assistant-info">
                        <h3>Assistant 4AI</h3>
                        <p>Je suis là pour vous aider</p>
                    </div>
                </div>
                <div class="ai-assistant-messages">
                    <div class="message assistant">
                        <div class="message-content">
                            Bonjour ! Je suis votre assistant 4AI. Comment puis-je vous aider aujourd'hui ?
                        </div>
                        <div class="message-time">Maintenant</div>
                    </div>
                    <div class="message assistant">
                        <div class="message-content">
                            Je peux vous guider dans l'utilisation des nouvelles fonctionnalités comme le Prompt Lab et le Dataset Studio.
                        </div>
                        <div class="message-time">Maintenant</div>
                    </div>
                </div>
                <div class="ai-assistant-input">
                    <input type="text" placeholder="Posez votre question...">
                    <button>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(aiAssistant);
        
        // Ajouter un écouteur d'événement pour ouvrir/fermer le panneau de l'assistant
        const assistantButton = aiAssistant.querySelector('.ai-assistant-button');
        const assistantPanel = aiAssistant.querySelector('.ai-assistant-panel');
        
        if (assistantButton && assistantPanel) {
            assistantButton.addEventListener('click', () => {
                assistantPanel.classList.toggle('open');
            });
        }
        
        // Ajouter un écouteur d'événement pour envoyer un message
        const messageInput = aiAssistant.querySelector('.ai-assistant-input input');
        const sendButton = aiAssistant.querySelector('.ai-assistant-input button');
        
        if (messageInput && sendButton) {
            const sendMessage = () => {
                const message = messageInput.value.trim();
                
                if (message) {
                    // Ajouter le message de l'utilisateur
                    addMessage('user', message);
                    
                    // Réinitialiser l'input
                    messageInput.value = '';
                    
                    // Simuler une réponse de l'assistant après un court délai
                    setTimeout(() => {
                        respondToMessage(message);
                    }, 1000);
                }
            };
            
            sendButton.addEventListener('click', sendMessage);
            
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
}

// Ajouter un message à la conversation
function addMessage(type, content) {
    const messagesContainer = document.querySelector('.ai-assistant-messages');
    
    if (messagesContainer) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        
        message.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
            <div class="message-time">Maintenant</div>
        `;
        
        messagesContainer.appendChild(message);
        
        // Faire défiler vers le bas pour voir le nouveau message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Répondre à un message de l'utilisateur
function respondToMessage(message) {
    // Réponses prédéfinies basées sur des mots-clés
    const responses = {
        'prompt lab': 'Le Prompt Lab vous permet de tester vos prompts sur différents modèles d\'IA et de comparer leurs performances. Vous pouvez accéder à cette fonctionnalité depuis le menu latéral.',
        'dataset studio': 'Le Dataset Studio vous permet de gérer, nettoyer et enrichir vos jeux de données. Vous pouvez importer des fichiers CSV, JSON ou TXT et les préparer pour vos modèles d\'IA.',
        'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
        'aide': 'Je peux vous aider à utiliser les fonctionnalités de 4AI-build. Que souhaitez-vous savoir ?',
        'merci': 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions.',
        'tutoriel': 'Je peux vous guider à travers un tutoriel interactif. Quelle fonctionnalité souhaitez-vous explorer ?'
    };
    
    // Rechercher une correspondance dans les réponses prédéfinies
    let response = 'Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ?';
    
    for (const [keyword, resp] of Object.entries(responses)) {
        if (message.toLowerCase().includes(keyword)) {
            response = resp;
            break;
        }
    }
    
    // Ajouter la réponse de l'assistant
    addMessage('assistant', response);
}

// Ajouter les écouteurs d'événements pour les nouvelles fonctionnalités
function addEventListeners() {
    // Ajouter un écouteur d'événement pour le bouton de notification dans la barre supérieure
    const notificationBtn = document.querySelector('.top-bar .btn-secondary i.fa-bell');
    
    if (notificationBtn) {
        const notificationButton = notificationBtn.closest('.btn');
        
        if (notificationButton) {
            notificationButton.addEventListener('click', () => {
                showNotification('info', 'Centre de notifications', 'Vous n\'avez pas de nouvelles notifications.');
            });
        }
    }
    
    // Ajouter des liens CSS pour les améliorations d'interface
    addUIImprovements();
}

// Ajouter les améliorations d'interface
function addUIImprovements() {
    // Vérifier si le lien CSS existe déjà
    if (!document.querySelector('link[href="ui-improvements.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'ui-improvements.css';
        document.head.appendChild(link);
    }
}

// Afficher le tutoriel d'onboarding
function showOnboardingTutorial() {
    // Créer l'overlay d'onboarding s'il n'existe pas déjà
    if (!document.querySelector('.onboarding-overlay')) {
        const onboardingOverlay = document.createElement('div');
        onboardingOverlay.className = 'onboarding-overlay';
        
        onboardingOverlay.innerHTML = `
            <div class="onboarding-modal">
                <div class="onboarding-header">
                    <h2 class="onboarding-title">Bienvenue sur 4AI-build V2</h2>
                    <button class="btn btn-icon" id="closeOnboardingBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="onboarding-content">
                    <div class="onboarding-steps">
                        <div class="onboarding-step active">
                            <div class="step-number">1</div>
                            <div class="step-label">Bienvenue</div>
                        </div>
                        <div class="onboarding-step">
                            <div class="step-number">2</div>
                            <div class="step-label">Prompt Lab</div>
                        </div>
                        <div class="onboarding-step">
                            <div class="step-number">3</div>
                            <div class="step-label">Dataset Studio</div>
                        </div>
                        <div class="onboarding-step">
                            <div class="step-number">4</div>
                            <div class="step-label">Terminé</div>
                        </div>
                    </div>
                    <div class="onboarding-body">
                        <h3>Découvrez les nouvelles fonctionnalités</h3>
                        <p>4AI-build V2 introduit de nouvelles fonctionnalités puissantes pour améliorer votre expérience de création d'IA :</p>
                        <ul>
                            <li><strong>Prompt Lab</strong> - Testez vos prompts sur différents modèles et comparez leurs performances</li>
                            <li><strong>Dataset Studio</strong> - Gérez, nettoyez et enrichissez vos jeux de données</li>
                            <li><strong>Interface améliorée</strong> - Une expérience utilisateur plus intuitive et réactive</li>
                        </ul>
                        <p>Suivez ce tutoriel pour découvrir ces nouvelles fonctionnalités.</p>
                    </div>
                </div>
                <div class="onboarding-footer">
                    <button class="btn btn-secondary" id="skipOnboardingBtn">Ignorer</button>
                    <button class="btn btn-primary" id="nextOnboardingBtn">Suivant</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(onboardingOverlay);
        
        // Ajouter des écouteurs d'événements pour les boutons d'onboarding
        const closeBtn = document.getElementById('closeOnboardingBtn');
        const skipBtn = document.getElementById('skipOnboardingBtn');
        const nextBtn = document.getElementById('nextOnboardingBtn');
        
        if (closeBtn && skipBtn && nextBtn) {
            closeBtn.addEventListener('click', () => {
                onboardingOverlay.remove();
            });
            
            skipBtn.addEventListener('click', () => {
                onboardingOverlay.remove();
            });
            
            let currentStep = 0;
            const steps = [
                {
                    title: 'Bienvenue sur 4AI-build V2',
                    content: `
                        <h3>Découvrez les nouvelles fonctionnalités</h3>
                        <p>4AI-build V2 introduit de nouvelles fonctionnalités puissantes pour améliorer votre expérience de création d'IA :</p>
                        <ul>
                            <li><strong>Prompt Lab</strong> - Testez vos prompts sur différents modèles et comparez leurs performances</li>
                            <li><strong>Dataset Studio</strong> - Gérez, nettoyez et enrichissez vos jeux de données</li>
                            <li><strong>Interface améliorée</strong> - Une expérience utilisateur plus intuitive et réactive</li>
                        </ul>
                        <p>Suivez ce tutoriel pour découvrir ces nouvelles fonctionnalités.</p>
                    `
                },
                {
                    title: 'Prompt Lab',
                    content: `
                        <h3>Testez vos prompts sur différents modèles</h3>
                        <p>Le Prompt Lab vous permet de :</p>
                        <ul>
                            <li>Tester vos prompts sur plusieurs modèles simultanément (OpenAI, Claude, Mistral, Llama)</li>
                            <li>Comparer les réponses et les performances</li>
                            <li>Ajuster les paramètres comme la température et le nombre de tokens</li>
                            <li>Sauvegarder vos prompts pour une utilisation future</li>
                        </ul>
                        <p>Accédez au Prompt Lab depuis le menu latéral.</p>
                    `
                },
                {
                    title: 'Dataset Studio',
                    content: `
                        <h3>Gérez vos jeux de données</h3>
                        <p>Le Dataset Studio vous offre des outils puissants pour :</p>
                        <ul>
                            <li>Importer des données depuis des fichiers CSV, JSON ou TXT</li>
                            <li>Visualiser et explorer vos données</li>
                            <li>Annoter manuellement ou avec l'aide de l'IA</li>
                            <li>Nettoyer et enrichir vos jeux de données</li>
                            <li>Suivre les versions et l'historique des modifications</li>
                        </ul>
                        <p>Accédez au Dataset Studio depuis le menu latéral.</p>
                    `
                },
                {
                    title: 'Vous êtes prêt !',
                    content: `
                        <h3>Commencez à utiliser 4AI-build V2</h3>
                        <p>Vous connaissez maintenant les principales nouvelles fonctionnalités de 4AI-build V2.</p>
                        <p>N'hésitez pas à explorer l'interface et à utiliser l'assistant IA si vous avez besoin d'aide.</p>
                        <p>Bon développement !</p>
                    `
                }
            ];
            
            nextBtn.addEventListener('click', () => {
                currentStep++;
                
                if (currentStep >= steps.length) {
                    onboardingOverlay.remove();
                    return;
                }
                
                // Mettre à jour les étapes
                const onboardingSteps = document.querySelectorAll('.onboarding-step');
                onboardingSteps.forEach((step, index) => {
                    step.classList.remove('active');
                    
                    if (index < currentStep) {
                        step.classList.add('completed');
                    } else if (index === currentStep) {
                        step.classList.add('active');
                    }
                });
                
                // Mettre à jour le contenu
                const onboardingTitle = document.querySelector('.onboarding-title');
                const onboardingBody = document.querySelector('.onboarding-body');
                
                if (onboardingTitle && onboardingBody) {
                    onboardingTitle.textContent = steps[currentStep].title;
                    onboardingBody.innerHTML = steps[currentStep].content;
                }
                
                // Mettre à jour les boutons
                if (currentStep === steps.length - 1) {
                    nextBtn.textContent = 'Terminer';
                }
            });
        }
    }
}

// Fonction pour afficher l'onboarding au chargement de la page
function showOnboardingOnLoad() {
    // Vérifier si c'est la première visite (simulé ici)
    const isFirstVisit = !localStorage.getItem('onboardingShown');
    
    if (isFirstVisit) {
        // Attendre un court délai pour que la page soit complètement chargée
        setTimeout(() => {
            showOnboardingTutorial();
            localStorage.setItem('onboardingShown', 'true');
        }, 1000);
    }
}

// Appeler la fonction d'onboarding au chargement
showOnboardingOnLoad();
