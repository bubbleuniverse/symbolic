# Internationalization (i18n) Usage Guide

This document explains how to use the i18n system implemented for the Symbolic Calculator application.

## Language Support

The application now supports:
- **English (en)** - Default language
- **Chinese (zh)** - Simplified Chinese

## Language Detection Priority

The system detects the language in the following order:

1. **Environment Variable** (Node.js): `process.env.LANG`
   - If contains 'zh' or 'chinese' → Chinese
   - Otherwise → English

2. **URL Parameter**: `?lang=en` or `?lang=zh`
   - Example: `index.html?lang=zh`

3. **LocalStorage**: User preference saved from previous sessions
   - Key: `preferred-language`

4. **Browser Language**: `navigator.language`
   - If contains 'zh' → Chinese
   - Otherwise → English (fallback)

## Setting Language via Environment Variable

### For Browser/Client-side (Simulation)
Since browsers don't have direct access to environment variables, you can:

1. **URL Parameter** (easiest for testing):
   ```
   http://localhost/index.html?lang=zh
   http://localhost/calculator.html?lang=en
   ```

2. **Browser Developer Console**:
   ```javascript
   localStorage.setItem('preferred-language', 'zh');
   location.reload();
   ```

### For Server-side/Node.js Integration
If you're serving this through a Node.js server, you can set:

```bash
export LANG=zh_CN.UTF-8  # Chinese
export LANG=en_US.UTF-8  # English
```

Or in your Node.js application:
```javascript
process.env.LANG = 'zh_CN.UTF-8';  // Chinese
process.env.LANG = 'en_US.UTF-8';  // English
```

## Manual Language Switching

Users can switch languages using the green toggle button in the navigation bar.

## Adding New Translations

To add new translatable text:

1. **Add translation keys** in `i18n.js`:
   ```javascript
   const translations = {
       en: {
           'your.new.key': 'English Text',
           // ...
       },
       zh: {
           'your.new.key': '中文文本',
           // ...
       }
   };
   ```

2. **In HTML**, use the `data-i18n` attribute:
   ```html
   <span data-i18n="your.new.key">English Text</span>
   ```

3. **In JavaScript**, use the `i18n.t()` function:
   ```javascript
   const text = i18n.t('your.new.key');
   ```

## Available Translation Keys

### Navigation
- `nav.editor` - "Editor" / "编辑器"
- `nav.calculator` - "Calculator" / "计算器"

### Page Titles
- `title.editor` - "Symbolic Math Tools" / "符号数学工具"
- `title.calculator` - "Symbolic Calculator" / "符号计算器"

### Calculator Actions
- `calculator.actions.solve` - "Solve" / "求解"
- `calculator.actions.integrate` - "Integrate" / "积分"
- `calculator.actions.diff` - "Differentiate" / "求导"
- `calculator.actions.simplify` - "Simplify" / "化简"
- `calculator.actions.expand` - "Expand" / "展开"
- `calculator.actions.factor` - "Factor" / "因式分解"
- `calculator.actions.collect` - "Collect" / "合并同类项"
- `calculator.actions.limit` - "Limit" / "极限"
- `calculator.actions.series` - "Series" / "级数"

### Buttons
- `calculator.button.calculate` - "Calculate" / "计算"
- `calculator.button.copy_latex` - "Copy LaTeX" / "复制 LaTeX"

### Status Messages
- `status.calculating` - "Calculating..." / "计算中..."
- `status.copied` - "Copied!" / "已复制！"
- `status.error` - "Error" / "错误"

### Language Toggle
- `language.current` - "English" / "中文"
- `language.switch` - "中文" / "English"

## Testing

1. Open `test-i18n.html` to test the i18n system
2. Try different language detection methods:
   - URL: `test-i18n.html?lang=zh`
   - LocalStorage: Set in browser console
   - Language toggle button

## File Structure

```
symbolic/
├── i18n.js              # Main i18n system
├── index.html           # Editor page (updated with i18n)
├── calculator.html      # Calculator page (updated with i18n)
├── symbolic_calculator.js  # Updated with i18n for dynamic text
├── test-i18n.html       # Test page for i18n functionality
└── I18N_USAGE.md        # This documentation
```

## API Reference

### `i18n.t(key, params)`
Get translated text for a key.
- `key`: Translation key (e.g., 'nav.editor')
- `params`: Optional object for parameter substitution

### `i18n.setLanguage(language)`
Switch to a different language.
- `language`: 'en' or 'zh'

### `i18n.getCurrentLanguage()`
Get the current language code.

### `i18n.updatePageContent()`
Manually update all translatable content on the page.
