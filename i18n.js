/**
 * Internationalization (i18n) system for the Symbolic Calculator
 * Supports English and Chinese languages
 */

// Translation data
const translations = {
    en: {
        // Navigation
        'nav.editor': 'Editor',
        'nav.calculator': 'Calculator',
        
        // Page titles
        'title.editor': 'Symbolic Math Tools',
        'title.calculator': 'Symbolic Calculator',
        
        // Editor page
        'editor.shortcuts': 'Shortcuts',
        'editor.shortcut.new_row': 'Shift+Enter: add a new row',
        'editor.shortcut.copy_row': 'Shift+Command+Enter: copy the current row',
        
        // Calculator page
        'calculator.actions.solve': 'Solve',
        'calculator.actions.dsolve': 'Dsolve',
        'calculator.actions.integrate': 'Integrate',
        'calculator.actions.diff': 'Differentiate',
        'calculator.actions.simplify': 'Simplify',
        'calculator.actions.expand': 'Expand',
        'calculator.actions.factor': 'Factor',
        'calculator.actions.collect': 'Collect',
        'calculator.actions.limit': 'Limit',
        'calculator.actions.series': 'Series',
        'calculator.button.calculate': 'Calculate',
        'calculator.button.copy_latex': 'Copy LaTeX',
        'calculator.examples.title': 'Example Expressions',
        
        // Status messages
        'status.calculating': 'Calculating... first time loading may be slow, please wait',
        'status.copied': 'Copied!',
        'status.error': 'Error',
        
        // Help section
        'help.toggle': 'Help',
        'help.hide': 'Hide Help',
        'help.quick_start': 'Quick Start',
        'help.step1': 'Enter a mathematical expression in the input field above',
        'help.step2': 'Select an operation (integrate, differentiate, etc.) from the dropdown',
        'help.step3': 'Click "Calculate" to see the result',
        'help.examples': 'Examples',
        'help.integration': 'Integration:',
        'help.integration_example': 'x^2 → x³/3',
        'help.differentiation': 'Differentiation:',
        'help.differentiation_example': 'x³ → 3x²',
        'help.series': 'Series:',
        'help.series_example': 'sin(x) → x - x³/6 + x⁵/120 + ...',
        'help.important_notes': 'Important Notes',
        'help.note_variable': 'Only use \'x\' as a variable',
        'help.note_constants': 'a, b, c are real constants',
        'help.note_exp': 'Use exp(x) instead of e^x',
        'help.note_loading': 'First calculation may take up to 15 seconds',
        'help.full_manual': 'View Full Manual',
        
        // Language toggle
        'language.current': 'English',
        'language.switch': 'Switch to Chinese'
    },
    zh: {
        // Navigation
        'nav.editor': '编辑器',
        'nav.calculator': '计算器',
        
        // Page titles
        'title.editor': '符号数学工具',
        'title.calculator': '符号计算器',
        
        // Editor page
        'editor.shortcuts': '快捷键',
        'editor.shortcut.new_row': 'Shift+Enter：添加新行',
        'editor.shortcut.copy_row': 'Shift+Command+Enter：复制当前行',
        
        // Calculator page
        'calculator.actions.solve': '求解',
        'calculator.actions.dsolve': '求解微分方程',
        'calculator.actions.integrate': '积分',
        'calculator.actions.diff': '求导',
        'calculator.actions.simplify': '化简',
        'calculator.actions.expand': '展开',
        'calculator.actions.factor': '因式分解',
        'calculator.actions.collect': '合并同类项',
        'calculator.actions.limit': '极限',
        'calculator.actions.series': '级数',
        'calculator.button.calculate': '计算',
        'calculator.button.copy_latex': '复制 LaTeX',
        'calculator.examples.title': '示例表达式',
        
        // Status messages
        'status.calculating': '计算中...首次加载缓慢请耐心等待',
        'status.copied': '已复制！',
        'status.error': '错误',
        
        // Help section
        'help.toggle': '帮助',
        'help.hide': '隐藏帮助',
        'help.quick_start': '快速开始',
        'help.step1': '在上方输入框中输入数学表达式',
        'help.step2': '从下拉菜单中选择操作（积分、求导等）',
        'help.step3': '点击"计算"查看结果',
        'help.examples': '示例',
        'help.integration': '积分：',
        'help.integration_example': 'x^2 → x³/3',
        'help.differentiation': '求导：',
        'help.differentiation_example': 'x³ → 3x²',
        'help.series': '级数：',
        'help.series_example': 'sin(x) → x - x³/6 + x⁵/120 + ...',
        'help.important_notes': '重要提示',
        'help.note_variable': '只能使用 \'x\' 作为变量',
        'help.note_constants': 'a, b, c 是实数常数',
        'help.note_exp': '使用 exp(x) 而不是 e^x',
        'help.note_loading': '首次计算可能需要15秒',
        'help.full_manual': '查看完整手册',
        
        // Language toggle
        'language.current': '中文',
        'language.switch': 'English'
    }
};

class I18n {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.translations = translations;
    }
    
    /**
     * Detect language from environment variable or fallback to browser/default
     */
    detectLanguage() {
        // Check for environment variable (for Node.js environments)
        if (typeof process !== 'undefined' && process.env && process.env.LANG) {
            const envLang = process.env.LANG.toLowerCase();
            if (envLang.includes('zh') || envLang.includes('chinese')) {
                return 'zh';
            }
            return 'en';
        }
        
        // Check for URL parameter (useful for testing)
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && (langParam === 'en' || langParam === 'zh')) {
            return langParam;
        }
        
        // Check localStorage for user preference
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
            return savedLang;
        }
        
        // Check browser language as fallback
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        if (browserLang.toLowerCase().includes('zh')) {
            return 'zh';
        }
        
        return 'en'; // Default to English
    }
    
    /**
     * Get translated text for a key
     * @param {string} key - Translation key (e.g., 'nav.editor')
     * @param {Object} params - Optional parameters for string interpolation
     * @returns {string} Translated text
     */
    t(key, params = {}) {
        const translation = this.translations[this.currentLanguage]?.[key] || 
                          this.translations['en']?.[key] || 
                          key;
        
        // Simple parameter substitution
        return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
            return params[param] || match;
        });
    }
    
    /**
     * Switch language
     * @param {string} language - Language code ('en' or 'zh')
     */
    setLanguage(language) {
        if (language === 'en' || language === 'zh') {
            this.currentLanguage = language;
            localStorage.setItem('preferred-language', language);
            this.updatePageContent();
        }
    }
    
    /**
     * Get current language
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * Update all translatable content on the page
     */
    updatePageContent() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Update elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
        
        // Update elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Update page title
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.hasAttribute('data-i18n')) {
            const key = titleElement.getAttribute('data-i18n');
            titleElement.textContent = this.t(key);
        }
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage === 'zh' ? 'zh-CN' : 'en';
        
        // Update language toggle button text
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.textContent = this.t('language.switch');
        }
    }
    
    /**
     * Initialize i18n system
     */
    init() {
        // Update content on page load
        this.updatePageContent();
        
        // Add language toggle functionality if toggle exists
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                const newLang = this.currentLanguage === 'en' ? 'zh' : 'en';
                this.setLanguage(newLang);
            });
        }
    }
}

// Create global i18n instance
const i18n = new I18n();

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { I18n, i18n };
}
