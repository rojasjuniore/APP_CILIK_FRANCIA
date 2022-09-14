import { environment } from "src/environments/environment";

/**
 * Generar hash en SHA256
 *
 * @param chain             Cadena de parametros legibles a concatenar para generar hash
 * @returns
 */
 export async function generateHashSHA256(chain: any[]){
  const toConcat =  [environment.seedKey].concat(chain);
  const chainString = toConcat.join('');

  const encondedText = new TextEncoder().encode(chainString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
