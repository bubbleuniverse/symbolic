/**
 * Notebook Page Logic
 * Implements the v1 Notebook spec with Append-Only data structure.
 */

// State
const state = {
    sections: [], // Array of Section objects
    nextId: 1     // Counter for generating visual section numbers (1.1, 1.2, etc.)
};

// DOM Elements
const container = document.getElementById('notebook-container');
const addSectionBtn = document.getElementById('add-section-btn');
const downloadBtn = document.getElementById('download-btn');

/**
 * Initialize the notebook
 */
function init() {
    // Check if we have saved data (optional, for future persistence)
    // For now, start with a text-math pair
    if (state.sections.length === 0) {
        addSectionPair('# Welcome to Notebook\n\nStart typing your notes here...', '');
    }
    
    // Event Listeners
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', () => addSectionPair());
    }
    downloadBtn.addEventListener('click', exportToMarkdown);

    // Global Shortcut Listener
    document.addEventListener('keydown', handleGlobalShortcuts);

    render();
}

/**
 * Handle global keyboard shortcuts
 * @param {KeyboardEvent} e 
 */
function handleGlobalShortcuts(e) {
    // Shift + Enter: Add new Text + Math sections
    if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        addSectionPair();
    }
}

/**
 * Add a pair of sections (Markdown + Math)
 * @param {string} textContent 
 * @param {string} mathContent 
 */
function addSectionPair(textContent = '', mathContent = '') {
    // Add Markdown section
    addSection('markdown', textContent, false); // Don't render yet
    // Add Math section
    addSection('math', mathContent, true); // Render now
    
    // Focus the newly created markdown section (second to last visible wrapper)
    // Wait for render to complete
    setTimeout(() => {
        // We need to find the element. Since we just added 2 items to the end...
        // But render re-creates DOM.
        // Let's find the LAST 'markdown-input'
        const textareas = container.querySelectorAll('.markdown-input');
        if (textareas.length > 0) {
            textareas[textareas.length - 1].focus();
        }
    }, 0);
}

/**
 * Add a new section to the notebook (Internal use)
 * @param {string} type - 'markdown' | 'math'
 * @param {string} content - Initial content
 * @param {boolean} shouldRender - Whether to trigger a render immediately
 */
function addSection(type, content = '', shouldRender = true) {
    const newSection = {
        id: state.sections.length, // Array index as ID
        type: type,
        content: content,
        isVisible: true,
        createdAt: Date.now()
    };

    state.sections.push(newSection);
    if (shouldRender) {
        render();
    }
}

/**
 * Delete (hide) a pair of sections
 * @param {number} textIndex - The index of the text section
 * @param {number} mathIndex - The index of the math section
 */
function deletePair(textIndex, mathIndex) {
    if (state.sections[textIndex]) state.sections[textIndex].isVisible = false;
    if (state.sections[mathIndex]) state.sections[mathIndex].isVisible = false;
    render();
}

/**
 * Update the content of a section
 * @param {number} id - The index of the section
 * @param {string} newContent - The new content
 */
function updateSection(id, newContent) {
    if (state.sections[id]) {
        state.sections[id].content = newContent;
    }
}

/**
 * Render the entire notebook based on state (Pair-based rendering)
 */
function render() {
    container.innerHTML = '';
    
    let pairCount = 0;

    // Iterate through sections in pairs
    // Assumption: Sections are always added in pairs [Markdown, Math, Markdown, Math, ...]
    for (let i = 0; i < state.sections.length; i += 2) {
        const textSection = state.sections[i];
        const mathSection = state.sections[i + 1];

        // Safety check: ensure both exist
        if (!textSection || !mathSection) continue;

        // If the pair is hidden (checking text section is enough as they are hidden together)
        if (!textSection.isVisible) continue;

        pairCount++;

        const wrapper = document.createElement('div');
        wrapper.className = 'section-pair-wrapper';
        wrapper.dataset.pairId = pairCount;

        // --- Pair Number ---
        const numberLabel = document.createElement('div');
        numberLabel.className = 'section-number';
        numberLabel.textContent = `${pairCount}`;
        
        // --- Content Container ---
        const contentArea = document.createElement('div');
        contentArea.className = 'section-content';

        // 1. Markdown Part
        const textDiv = document.createElement('div');
        textDiv.className = 'pair-part markdown-part';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'markdown-input';
        textarea.value = textSection.content;
        textarea.placeholder = 'Type Markdown here...';
        
        // Auto-resize
        const adjustHeight = (el) => {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 'px';
        };

        textarea.addEventListener('input', (e) => {
            updateSection(i, e.target.value);
            adjustHeight(e.target);
        });
        
        textDiv.appendChild(textarea);
        contentArea.appendChild(textDiv);
        
        // Trigger auto-grow on init
        setTimeout(() => adjustHeight(textarea), 0);

        // 2. Math Part
        const mathDiv = document.createElement('div');
        mathDiv.className = 'pair-part math-part';

        const mathField = document.createElement('math-field');
        mathField.className = 'math-input';
        mathField.value = mathSection.content;
        mathField.addEventListener('input', (e) => {
            updateSection(i + 1, e.target.value);
        });
        
        mathDiv.appendChild(mathField);
        contentArea.appendChild(mathDiv);

        // --- Delete Button (Applies to Pair) ---
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'section-delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Delete Section Pair';
        deleteBtn.addEventListener('click', () => deletePair(i, i + 1));

        wrapper.appendChild(numberLabel);
        wrapper.appendChild(contentArea);
        wrapper.appendChild(deleteBtn);

        container.appendChild(wrapper);
    }
}


/**
 * Export visible sections to a Markdown file
 */
function exportToMarkdown() {
    let fileContent = '';

    state.sections.forEach(section => {
        if (!section.isVisible) return;

        if (section.type === 'markdown') {
            fileContent += section.content + '\n\n';
        } else if (section.type === 'math') {
            fileContent += `\$\$\n${section.content}\n\$\$\n\n`;
        }
    });

    const blob = new Blob([fileContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notebook.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Start
document.addEventListener('DOMContentLoaded', init);
