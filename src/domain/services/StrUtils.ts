const StrUtil = {
    ensureTwoDecimalPlaces(number: number): string {
        return number.toFixed(2);
    },

    percentToNumber(percent: string): number {
        return Number(percent.replace("%", ""));
    },
    formatadorComGarantiaDeDecimal(valor: string): string {
        if (!valor) return "";
        let doubleFormat = StrUtil.ensureTwoDecimalPlaces(Number(valor));
        const valorNumerico = parseFloat(doubleFormat.replace(/[^\d]/g, '')) / 100;
        return valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).replace('R$', '').trim();
    },

    transformarStringDinheiroEmDOuble(numero: string, sufixReplace: string): number {

        const numeroSemMilhar: string = numero.replace(/\./g, "").replace(",", ".");
        return parseFloat(numeroSemMilhar.replace(sufixReplace, " ").trim());
    },
    formatadorComPrefixo(valor: string, prefix: string): string {

        if (!valor) return "";

        // Converte para número e garante que tenha duas casas decimais
        let doubleFormat = StrUtil.ensureTwoDecimalPlaces(Number(valor));

        // Converte para um valor numérico
        const valorNumerico = parseFloat(doubleFormat.replace(/[^\d-]/g, '')) / 100;

        // Verifica se o valor é negativo e formata adequadamente
        const formattedValue = valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).replace('R$', prefix).trim();

        return formattedValue;
    },
    formatadorComSufixoComGarantiaDeDecimal(valor: string): string {

        if (!valor) return "";

        // Converte para número e garante que tenha duas casas decimais
        let doubleFormat = StrUtil.ensureTwoDecimalPlaces(Number(valor));

        // Converte para um valor numérico
        const valorNumerico = parseFloat(doubleFormat.replace(/[^\d-]/g, '')) / 100;

        // Verifica se o valor é negativo e formata adequadamente
        const formattedValue = valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return formattedValue;
    }, formatDateBr(inputDate: Date | string): string {
        const dateObject = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

        if (isNaN(dateObject.getTime())) {
            throw new Error('Invalid date format');
        }

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        return dateObject.toLocaleDateString('pt-BR', options);
    }, getCurrentFormattedDate() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }, getCurrentFormattedTime() {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;
        return formattedTime;
    }





}

export default StrUtil;