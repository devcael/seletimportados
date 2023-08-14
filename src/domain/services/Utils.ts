const AppUtil = {
    formatRealToDouble(valor: string): number | null {


        const cleanedValue = valor.replace(/\./g, "").replace(",", ".");


        if (!/^-?\d+(\.\d+)?$/.test(cleanedValue)) {
            return null;
        }


        return parseFloat(cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ""));
    }, formatarReais(value: number): string {
        const valor: string = value.toString().replace(/\D/g, '');

        const valorNumerico: number = parseFloat(valor) / 100;
        const valorFormatado: string = valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return valorFormatado;
    }

}

export default AppUtil;