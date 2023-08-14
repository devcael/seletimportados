describe('Find Methods', () => {

    it('should return 1', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const evenNumber = numbers.find((number) => number == 99);

        console.log(evenNumber);
        if (evenNumber == undefined || evenNumber == null) {
            console.log("Não encontrado");

        } else {

            console.log(
                "Número encontrado: " + evenNumber
            );


        }// 2 (primeiro número par encontrado)

    });

});