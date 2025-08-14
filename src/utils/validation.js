"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlaceholdersInText = validatePlaceholdersInText;
exports.normalizeToneValue = normalizeToneValue;
exports.compileTemplate = compileTemplate;
// Validação de placeholders snake_case
function validatePlaceholdersInText(text) {
    if (!text)
        return { ok: true, invalid: [] };
    var found = text.match(/{{\s*([^}]+)\s*}}/g) || [];
    var invalid = found.map(function (tok) { return tok.replace(/[{}]/g, '').trim(); })
        .filter(function (key) { return !/^[a-z0-9_]+$/.test(key); });
    return { ok: invalid.length === 0, invalid: invalid };
}
// Normalização de valores de tom
var TONE_MAP = {
    persuative: 'Persuasive',
    profesional: 'Professional',
    casual: 'Casual',
    friendly: 'Friendly',
    excited: 'Excited',
    urgent: 'Urgent',
    trustworthy: 'Trustworthy',
    informative: 'Informative'
};
function normalizeToneValue(value) {
    if (!value)
        return value;
    var key = value.trim().toLowerCase();
    return TONE_MAP[key] || value;
}
// Compilação de templates
function compileTemplate(template, data) {
    if (!template)
        return '';
    return template.replace(/{{\s*([a-z0-9_]+)\s*}}/gi, function (_, key) {
        var value = data[key];
        if (value === undefined || value === null)
            return '';
        return String(Array.isArray(value) ? value.join('\n') : value);
    });
}
