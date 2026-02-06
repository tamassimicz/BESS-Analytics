/**
 * Help Modal Module
 * Manages the "How to Use" help modal with dual-language support (EN/HU)
 * 
 * Features:
 * - Modal open/close with animations
 * - Tab navigation between help sections
 * - Language toggle (English/Hungarian)
 * - Keyboard navigation (Esc, Tab)
 * - LocalStorage for language preference
 */

const HelpModal = {
    // Current state
    currentLanguage: 'en',
    currentSection: 'getting-started',
    isOpen: false,
    
    // DOM elements (cached for performance)
    elements: {
        modal: null,
        modalContent: null,
        closeButton: null,
        langButtons: null,
        tabButtons: null,
        sections: null,
        helpButton: null
    },
    
    /**
     * Initialize the help modal
     * Sets up event listeners and loads user preferences
     */
    init() {
        console.log('Initializing Help Modal...');
        
        // Cache DOM elements
        this.cacheElements();
        
        // Check if modal exists
        if (!this.elements.modal) {
            console.error('Help modal not found in DOM');
            return;
        }
        
        // Load user's preferred language
        this.loadPreferredLanguage();
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Set initial language
        this.switchLanguage(this.currentLanguage, false);
        
        console.log('Help Modal initialized successfully');
    },
    
    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.elements.modal = document.getElementById('helpModal');
        this.elements.modalContent = document.querySelector('.modal-content');
        this.elements.closeButton = document.querySelector('.modal-close');
        this.elements.langButtons = document.querySelectorAll('.lang-btn');
        this.elements.tabButtons = document.querySelectorAll('.tab-btn');
        this.elements.sections = document.querySelectorAll('.help-section');
        this.elements.helpButton = document.getElementById('helpButton');
    },
    
    /**
     * Attach all event listeners
     */
    attachEventListeners() {
        // Help button to open modal
        if (this.elements.helpButton) {
            this.elements.helpButton.addEventListener('click', () => this.open());
        }
        
        // Close button
        if (this.elements.closeButton) {
            this.elements.closeButton.addEventListener('click', () => this.close());
        }
        
        // Click outside modal content to close
        if (this.elements.modal) {
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) {
                    this.close();
                }
            });
        }
        
        // Language toggle buttons
        this.elements.langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
        
        // Tab buttons
        this.elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.getAttribute('data-section');
                this.switchTab(section);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isOpen) {
                // Escape key to close
                if (e.key === 'Escape') {
                    this.close();
                }
                
                // Tab navigation (prevent tabbing outside modal)
                if (e.key === 'Tab') {
                    this.handleTabKey(e);
                }
            }
        });
    },
    
    /**
     * Open the modal with fade-in animation
     */
    open() {
        if (!this.elements.modal) return;
        
        this.elements.modal.style.display = 'flex';
        // Force reflow for animation
        this.elements.modal.offsetHeight;
        this.elements.modal.classList.add('modal-open');
        
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        
        this.isOpen = true;
        
        // Focus on first tab button for accessibility
        setTimeout(() => {
            const firstTab = this.elements.tabButtons[0];
            if (firstTab) firstTab.focus();
        }, 100);
        
        console.log('Help modal opened');
    },
    
    /**
     * Close the modal with fade-out animation
     */
    close() {
        if (!this.elements.modal) return;
        
        this.elements.modal.classList.remove('modal-open');
        
        // Wait for animation to complete
        setTimeout(() => {
            this.elements.modal.style.display = 'none';
            // Unlock body scroll
            document.body.style.overflow = '';
        }, 300); // Match CSS transition duration
        
        this.isOpen = false;
        
        console.log('Help modal closed');
    },
    
    /**
     * Switch between languages (EN/HU)
     * @param {string} lang - Language code ('en' or 'hu')
     * @param {boolean} savePreference - Whether to save to localStorage
     */
    switchLanguage(lang, savePreference = true) {
        if (lang !== 'en' && lang !== 'hu') {
            console.error('Invalid language:', lang);
            return;
        }
        
        this.currentLanguage = lang;
        
        // Update language button states
        this.elements.langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show/hide language-specific content
        const allLangElements = document.querySelectorAll('[class*="lang-"]');
        allLangElements.forEach(el => {
            if (el.classList.contains(`lang-${lang}`)) {
                el.style.display = '';
            } else if (el.classList.contains('lang-en') || el.classList.contains('lang-hu')) {
                el.style.display = 'none';
            }
        });
        
        // Update tab button text visibility
        const tabTextElements = document.querySelectorAll('[class*="tab-text-"]');
        tabTextElements.forEach(el => {
            if (el.classList.contains(`tab-text-${lang}`)) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
        
        // Update modal title
        const modalTitle = document.getElementById('helpModalTitle');
        if (modalTitle) {
            modalTitle.textContent = lang === 'en' ? 'How to Use' : 'Használati útmutató';
        }
        
        // Save preference
        if (savePreference) {
            this.saveLanguagePreference(lang);
        }
        
        console.log('Language switched to:', lang);
    },
    
    /**
     * Switch between help sections (tabs)
     * @param {string} sectionId - ID of the section to show
     */
    switchTab(sectionId) {
        this.currentSection = sectionId;
        
        // Update tab button states
        this.elements.tabButtons.forEach(btn => {
            if (btn.getAttribute('data-section') === sectionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show/hide sections
        this.elements.sections.forEach(section => {
            if (section.id === `section-${sectionId}`) {
                section.classList.add('active');
                section.style.display = 'block';
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
        
        // Scroll content to top
        const modalBody = document.querySelector('.modal-body');
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
        
        console.log('Switched to section:', sectionId);
    },
    
    /**
     * Handle Tab key for keyboard navigation within modal
     * Keeps focus trapped within modal
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleTabKey(e) {
        if (!this.elements.modalContent) return;
        
        // Get all focusable elements within modal
        const focusableElements = this.elements.modalContent.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Shift + Tab (backwards)
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        }
        // Tab (forwards)
        else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    },
    
    /**
     * Save language preference to localStorage
     * @param {string} lang - Language code
     */
    saveLanguagePreference(lang) {
        try {
            localStorage.setItem('beesAnalyticsHelpLang', lang);
            console.log('Language preference saved:', lang);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    },
    
    /**
     * Load language preference from localStorage
     */
    loadPreferredLanguage() {
        try {
            const saved = localStorage.getItem('beesAnalyticsHelpLang');
            if (saved && (saved === 'en' || saved === 'hu')) {
                this.currentLanguage = saved;
                console.log('Loaded language preference:', saved);
            }
        } catch (e) {
            console.warn('Could not load language preference:', e);
            // Default to English
            this.currentLanguage = 'en';
        }
    },
    
    /**
     * Public API: Open modal to specific section
     * @param {string} sectionId - Section to open (optional)
     * @param {string} lang - Language to use (optional)
     */
    openTo(sectionId = null, lang = null) {
        this.open();
        
        if (sectionId) {
            setTimeout(() => {
                this.switchTab(sectionId);
            }, 100);
        }
        
        if (lang) {
            this.switchLanguage(lang);
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HelpModal.init());
} else {
    HelpModal.init();
}

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HelpModal;
}
