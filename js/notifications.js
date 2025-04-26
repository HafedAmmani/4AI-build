// JavaScript pour gérer les notifications

// Fonction pour afficher le dropdown des notifications
function toggleNotificationDropdown() {
    const dropdown = document.querySelector('.notification-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Fonction pour marquer toutes les notifications comme lues
function markAllAsRead() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
        item.classList.remove('unread');
        item.classList.add('read');
    });
    
    // Mettre à jour le badge de notification
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.display = 'none';
    }
}

// Fonction pour afficher une notification toast
function showToast(type, title, message, duration = 5000) {
    const toastContainer = document.querySelector('.toast-container');
    
    // Créer le conteneur de toast s'il n'existe pas
    if (!toastContainer) {
        const newContainer = document.createElement('div');
        newContainer.className = 'toast-container';
        document.body.appendChild(newContainer);
    }
    
    // Créer l'élément toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Contenu du toast
    toast.innerHTML = `
        <div class="toast-indicator ${type}"></div>
        <div class="toast-body">
            <div class="toast-header">
                <h4 class="toast-title">${title}</h4>
                <button class="toast-close">&times;</button>
            </div>
            <p class="toast-message">${message}</p>
        </div>
    `;
    
    // Ajouter le toast au conteneur
    const container = document.querySelector('.toast-container');
    container.appendChild(toast);
    
    // Gérer la fermeture du toast
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Fermer automatiquement après la durée spécifiée
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, duration);
}

// Initialiser les éléments de notification
function initNotifications() {
    // Ajouter le dropdown de notifications s'il n'existe pas
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell && !document.querySelector('.notification-dropdown')) {
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="mark-all-read">Marquer tout comme lu</button>
            </div>
            <div class="notification-list">
                <div class="notification-item unread">
                    <div class="notification-dot"></div>
                    <div class="notification-content">
                        <h4 class="notification-title">Mise à jour du système</h4>
                        <p class="notification-message">Une nouvelle version de 4AI-build est disponible.</p>
                        <span class="notification-time">Il y a 5 minutes</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-dot"></div>
                    <div class="notification-content">
                        <h4 class="notification-title">Nouveau message</h4>
                        <p class="notification-message">Vous avez reçu un nouveau message de l'équipe de support.</p>
                        <span class="notification-time">Il y a 30 minutes</span>
                    </div>
                </div>
                <div class="notification-item read">
                    <div class="notification-dot"></div>
                    <div class="notification-content">
                        <h4 class="notification-title">Workflow terminé</h4>
                        <p class="notification-message">Le workflow "Analyse de données" a été exécuté avec succès.</p>
                        <span class="notification-time">Hier</span>
                    </div>
                </div>
            </div>
            <div class="notification-footer">
                <a href="#" class="view-all-link">Voir toutes les notifications</a>
            </div>
        `;
        
        document.body.appendChild(dropdown);
        
        // Ajouter les événements
        notificationBell.querySelector('.btn-icon').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNotificationDropdown();
        });
        
        document.querySelector('.mark-all-read').addEventListener('click', (e) => {
            e.stopPropagation();
            markAllAsRead();
        });
        
        // Fermer le dropdown en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (!notificationBell.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
    
    // Créer le conteneur de toast s'il n'existe pas
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// Exécuter l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    initNotifications();
    
    // Exemple de notification toast après 2 secondes
    setTimeout(() => {
        showToast('success', 'Connexion réussie', 'Bienvenue sur 4AI-build!');
    }, 2000);
});

// Fonction pour ajouter une classe CSS à un fichier HTML
function addCssToPage(cssFile) {
    // Vérifier si le lien existe déjà
    const existingLink = document.querySelector(`link[href="${cssFile}"]`);
    if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        document.head.appendChild(link);
    }
}

// Ajouter le fichier CSS des notifications à toutes les pages
addCssToPage('css/notifications.css');
