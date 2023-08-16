import StrUtil from "./StrUtils";
import AppUtil from "./Utils";

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
    }, removeRealFormatter(value: string): number {
        let valor: string = value.replace('R$', '').trim();


        return Number(AppUtil.formatRealToDouble(valor));
    },

    formatador(valor: string): string {
        if (!valor) return "";
        let doubleFormat = StrUtil.ensureTwoDecimalPlaces(Number(valor));
        const valorNumerico = parseFloat(valor.replace(/[^\d]/g, '')) / 100;
        return valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).replace('R$', '').trim();
    }, formatadorComSufixo(valor: string): string {

        if (!valor) return "";

        // Converte para número e garante que tenha duas casas decimais


        // Converte para um valor numérico
        const valorNumerico = parseFloat(valor.replace(/[^\d-]/g, '')) / 100;

        // Verifica se o valor é negativo e formata adequadamente
        const formattedValue = valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formattedValue;
    },
    formatDouble(number: number): string {
        return number.toFixed(2);
    },
    formatPercentage(number: string): string {
        const valorNumerico = parseFloat(number.replace(/[^\d]/g, '')) / 100;
        const formattedPercentage = valorNumerico.toFixed(2) + '%';
        return formattedPercentage;
    }
}

export default AppFormatters;