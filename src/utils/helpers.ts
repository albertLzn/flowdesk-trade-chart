export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format : 'MM/DD/YYYY, HH:MM:SS AM/PM'
  };
  
  // Fonction pour arrondir les chiffres à un nombre de décimales spécifié
  export const formatNumber = (num: any, decimals: number = 2): string => {
    if (num === null || num === undefined || isNaN(num)) {
      return 'N/A'; // Retourne 'N/A' si le nombre n'est pas valide
    }
    const number = parseFloat(num); // Convertir en nombre si nécessaire
    return number.toFixed(decimals); // Arrondir à 'decimals' décimales
  };
  