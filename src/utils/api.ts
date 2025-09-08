import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// PubChem API for chemical elements
const PUBCHEM_BASE_URL = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';

// Fallback chemical elements list
const FALLBACK_ELEMENTS = [
  { label: 'Hydrogen (H)', value: 'H', formula: 'H' },
  { label: 'Helium (He)', value: 'He', formula: 'He' },
  { label: 'Lithium (Li)', value: 'Li', formula: 'Li' },
  { label: 'Beryllium (Be)', value: 'Be', formula: 'Be' },
  { label: 'Boron (B)', value: 'B', formula: 'B' },
  { label: 'Carbon (C)', value: 'C', formula: 'C' },
  { label: 'Nitrogen (N)', value: 'N', formula: 'N' },
  { label: 'Oxygen (O)', value: 'O', formula: 'O' },
  { label: 'Fluorine (F)', value: 'F', formula: 'F' },
  { label: 'Neon (Ne)', value: 'Ne', formula: 'Ne' },
  { label: 'Sodium (Na)', value: 'Na', formula: 'Na' },
  { label: 'Magnesium (Mg)', value: 'Mg', formula: 'Mg' },
  { label: 'Aluminum (Al)', value: 'Al', formula: 'Al' },
  { label: 'Silicon (Si)', value: 'Si', formula: 'Si' },
  { label: 'Phosphorus (P)', value: 'P', formula: 'P' },
  { label: 'Sulfur (S)', value: 'S', formula: 'S' },
  { label: 'Chlorine (Cl)', value: 'Cl', formula: 'Cl' },
  { label: 'Argon (Ar)', value: 'Ar', formula: 'Ar' },
  { label: 'Potassium (K)', value: 'K', formula: 'K' },
  { label: 'Calcium (Ca)', value: 'Ca', formula: 'Ca' },
  { label: 'Iron (Fe)', value: 'Fe', formula: 'Fe' },
  { label: 'Copper (Cu)', value: 'Cu', formula: 'Cu' },
  { label: 'Zinc (Zn)', value: 'Zn', formula: 'Zn' },
  { label: 'Bromine (Br)', value: 'Br', formula: 'Br' },
  { label: 'Silver (Ag)', value: 'Ag', formula: 'Ag' },
  { label: 'Gold (Au)', value: 'Au', formula: 'Au' },
  { label: 'Mercury (Hg)', value: 'Hg', formula: 'Hg' },
  { label: 'Lead (Pb)', value: 'Pb', formula: 'Pb' },
];

export interface ChemicalElement {
  label: string;
  value: string;
  formula?: string;
}

// Fetch chemical elements from PubChem API
export const fetchChemicalElements = async (): Promise<ChemicalElement[]> => {
  try {
    // Try to fetch from PubChem API
    const response = await api.get(`${PUBCHEM_BASE_URL}/compound/listkey/name/JSON`);
    
    if (response.data && response.data.IdentifierList) {
      // Transform the response into our format
      const elements = response.data.IdentifierList.CID.slice(0, 50).map((cid: number, index: number) => ({
        label: `Element ${index + 1}`,
        value: `element_${cid}`,
        formula: `E${index + 1}`,
      }));
      return elements;
    }
    
    // If API response is not in expected format, use fallback
    return FALLBACK_ELEMENTS;
  } catch (error) {
    console.warn('Failed to fetch from PubChem API, using fallback elements:', error);
    // Return fallback elements if API fails
    return FALLBACK_ELEMENTS;
  }
};

// Load translations
export const loadTranslations = async (language: string): Promise<Record<string, string>> => {
  try {
    const translations = await import(`../translations/${language}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    // Return empty object if translation file doesn't exist
    return {};
  }
};

export default api;
