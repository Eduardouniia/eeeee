export function toPrice(value) {
  const formattedPrice = `R$ ${value.toFixed(2).toString().replace('.', ',')}`;

  return formattedPrice;
}
export const handleDateChange = (value, setBookDate) => {
  const formattedDate = value
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/(\d{2})(\d)/, '$1/$2') // Insere a primeira barra após o segundo dígito
    .replace(/(\d{2})(\d)/, '$1/$2') // Insere a segunda barra após o quarto dígito
    .substring(0, 10); // Limita a entrada a 10 caracteres (dd/mm/aaaa)

  setBookDate(formattedDate);
};
export const handleTimeChange = (value, setBookHour) => {
  const FormattedTime = value.replace(/(\d{2})(\d)/, '$1:$2').substring(0, 5);
  setBookHour(FormattedTime);
};

export const toName = (name) => {
  const palavras = name.split(' ');

  return palavras[0] + ' ' + palavras[1];
};
