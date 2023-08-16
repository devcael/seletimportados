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
    }, calculatePercentage(props: { value: number, total: number }): number {
        console.log("props", props)
        if (props.total === 0) {
            return 0;
        }

        const percentage = (props.value / props.total) * 100;
        return percentage;
    }, calculatePercentageValue(props: { value: number, percentage: number }): number {
        const calculatedValue = (props.value * props.percentage) / 100;
        console.log("calculatedValue", calculatedValue);

        return calculatedValue;
    }

}

export default AppUtil;