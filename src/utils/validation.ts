// Validação de placeholders snake_case
export function validatePlaceholdersInText(text) {
  if (!text) return { ok: true, invalid: [] };
  
  const found = text.match(/{{\s*([^}]+)\s*}}/g) || [];
  const invalid = found.map(tok => tok.replace(/[{}]/g, '').trim())
                       .filter(key => !/^[a-z0-9_]+$/.test(key));
  
  return { ok: invalid.length === 0, invalid };
}

// Normalização de valores de tom
const TONE_MAP = {
  persuative: 'Persuasive',
  profesional: 'Professional',
  casual: 'Casual',
  friendly: 'Friendly',
  excited: 'Excited',
  urgent: 'Urgent',
  trustworthy: 'Trustworthy',
  informative: 'Informative'
};

export function normalizeToneValue(value) {
  if (!value) return value;
  const key = value.trim().toLowerCase();
  return TONE_MAP[key] || value;
}

// Compilação de templates
export function compileTemplate(template, data) {
  if (!template) return '';
  
  return template.replace(/{{\s*([a-z0-9_]+)\s*}}/gi, (_, key) => {
    const value = data[key];
    if (value === undefined || value === null) return '';
    return String(Array.isArray(value) ? value.join('\n') : value);
  });
}