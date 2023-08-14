const AppFormatters = {
    formatCNPJ(input: string) {
        const cleanedInput = input.replace(/\D/g, ''); // Remove caracteres não numéricos
        const match = cleanedInput.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);

        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
        }

        return input;
    }, formatCPFWithZeros(input: string) {
        const cleanedInput = input.replace(/\D/g, '');
        const paddedInput = cleanedInput.padStart(11, '0'); // Preenche com zeros à esquerda até 11 dígitos

        const match = paddedInput.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }

        return input;
    }, formatCPF(input: string) {
        const cleanedInput = input.replace(/\D/g, ''); // Remove caracteres não numéricos
        const match = cleanedInput.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }

        return input;
    }, formatPhoneNumber(input: string) {
        const cleanedInput = input.replace(/\D/g, ''); // Remove caracteres não numéricos
        const match = cleanedInput.match(/^(\d{2})(\d{4,5})(\d{4})$/);

        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        return input;
    }, formatRealValue(input: string) {
        const cleanedInput = input.replace(/[^0-9,]/g, ''); // Remove caracteres não numéricos exceto vírgulas
        const formattedInput = parseFloat(cleanedInput.replace(',', '.')).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formattedInput;
    }, formatador(valor: string): string {
        if (!valor) return "";
        const valorNumerico = parseFloat(valor.replace(/[^\d]/g, '')) / 100;
        return valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).replace('R$', '').trim();
    }
}

export default AppFormatters;