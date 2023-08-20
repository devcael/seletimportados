export default class Imei {
    public id_imei: number;
    public id_itemvenda: number;
    public numeroimei: string;

    constructor(id_imei: number, id_itemvenda: number, numeroimei: string) {
        this.id_imei = id_imei;
        this.id_itemvenda = id_itemvenda;
        this.numeroimei = numeroimei;
    }

    static fromJson(json: Imei | null): Imei | null {
        if (json == null) {
            return null;
        }
        return new Imei(
            json.id_imei,
            json.id_itemvenda,
            json.numeroimei
        );
    }

    toJson(params: { sendId: boolean }): any {
        return {
            id_imei: params.sendId ? this.id_imei : null,
            id_itemvenda: this.id_itemvenda,
            numeroimei: this.numeroimei
        };
    }
}
