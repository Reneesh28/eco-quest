/**
 * EcoQuest - Navigation Controller
 * Handles active route detection and responsive mobile drawer
 */

const EcoNavigation = {
    activePageId: '',

    /**
     * Initialize navigation bindings
     */
    init: function(currentPageId) {
        this.activePageId = currentPageId || this.detectCurrentPage();
        this.highlightActiveLink();
        this.bindMobileNav();
        this.bindKeyboardAccessibility();
    },

    /**
     * Determine current page key based on URL pathname
     */
    detectCurrentPage: function() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1).replace('.html', '').toLowerCase();

        if (!page || page === 'index' || page === '') {
            return 'dashboard';
        }
        return page;
    },

    /**
     * Apply active state to current navigation link
     */
    highlightActiveLink: function() {
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        if (!navLinks || navLinks.length === 0) return;

        const targetPage = this.activePageId;

        navLinks.forEach(link => {
            const pageAttr = link.getAttribute('data-page');
            const href = link.getAttribute('href');

            const isMatch = (pageAttr && pageAttr === targetPage) ||
                            (targetPage === 'dashboard' && href === 'index.html') ||
                            (href && href.includes(targetPage + '.html'));

            if (isMatch) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    },

    /**
     * Wire up mobile navigation toggle and backdrop overlay
     */
    bindMobileNav: function() {
        const toggleBtn = document.getElementById('mobileNavToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (!toggleBtn || !sidebar || !overlay) return;

        const openSidebar = () => {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = sidebar.classList.contains('open');
            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        overlay.addEventListener('click', closeSidebar);

        // Close sidebar if a nav link is clicked on smaller screens
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    closeSidebar();
                }
            });
        });

        // Close drawer if screen resizes past desktop breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    },

    /**
     * Keyboard accessibility (close mobile drawer on Escape)
     */
    bindKeyboardAccessibility: function() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebarOverlay');
                const toggleBtn = document.getElementById('mobileNavToggle');

                if (sidebar && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    if (overlay) overlay.classList.remove('active');
                    if (toggleBtn) {
                        toggleBtn.setAttribute('aria-expanded', 'false');
                        toggleBtn.focus();
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    }
};

window.EcoNavigation = EcoNavigation;

