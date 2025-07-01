export function Discountcalculation(inputString) {

  const convertPersianDigitsToEnglish = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/[\u06F0-\u06F9]/g, char => 
      String.fromCharCode(char.charCodeAt(0) - 0x06F0 + 0x0030)
    );
  };


  if (typeof inputString !== 'string') {
    return ''; 
  }

  const englishString = convertPersianDigitsToEnglish(inputString);



  const numberParts = englishString.match(/[\d.]+/g); 


  if (!numberParts) {
    return '';
  }

  const singleNumberString = numberParts.join('');

  

  const finalCleanedString = singleNumberString.replace(/[^0-9.]/g, '');

  return finalCleanedString;
}