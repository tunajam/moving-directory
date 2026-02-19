import siteConfig from '../../site.config';

export const config = siteConfig;

/**
 * Simple template string interpolation.
 * Replaces {variable} with values from the provided context.
 */
export function t(template: string, vars: Record<string, string | number>): string {
  let result = template;
  // Add siteName to all templates
  const allVars = { siteName: config.name, ...vars };
  for (const [key, value] of Object.entries(allVars)) {
    result = result.replaceAll(`{${key}}`, String(value));
  }
  // Handle literal \n as newlines
  result = result.replaceAll('\\n', '\n');
  return result;
}

/** Industry shorthand helpers */
export const industry = config.industry.singular;
export const industryPlural = config.industry.plural;
