export default class ReqHttp {

    static _url: string = 'http://154.49.246.212:3000/api';

    static async get(params: { path: string, headers?: object, queryParams?: Record<string, any>, secondsTimeout: number }): Promise<{ body: any; response: Response }> {
        try {
            const queryParams = new URLSearchParams(
                params.queryParams ?? {}
            );

            const url = `${this._url}${params.path}${queryParams ? `?${queryParams}` : ''}`;

         /*    const timeoutDuration = params.secondsTimeout * 1000;

            const controller = new AbortController();
            const timeout = setTimeout(() => {
                controller.abort(); // Cancela a requisição quando o timeout é atingido
            }, 120); */

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...params.headers ?? {}
                },
      
            });

/*             clearTimeout(timeout); */


            const responseBody = await response.text();

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${responseBody}}`);
            }

            const data = JSON.parse(responseBody);




            return { body: data, response };
        } catch (error) {
            console.log('Erro na requisição:', error);
            throw error;
        }

    }

    static async post(params: {
        path: string;
        headers?: object;
        body?: any;
        queryParams?: Record<string, any>;
        secondsTimeout: number;
    }): Promise<{ body: any; response: Response }> {
        try {
            const queryParams = new URLSearchParams(params.queryParams ?? {});

            const url = `${this._url}/${params.path}${queryParams ? `?${queryParams}` : ''}`;

          /*   const timeoutDuration = params.secondsTimeout * 1000;

            const controller = new AbortController();
            const timeout = setTimeout(() => {
                controller.abort(); // Cancela a requisição quando o timeout é atingido
            }, 120); */

            const response = await fetch(url, {
                method: 'POST', // Alterado para POST
                headers: {
                    'Content-Type': 'application/json',
                    ...params.headers ?? {},
                },
                body: params.body !== null ? JSON.stringify(params.body) : '',
        
            });

   /*          clearTimeout(timeout); */

            const responseBody = await response.text();

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${responseBody}}`);
            }

            const data = JSON.parse(responseBody);

            return { body: data, response };
        } catch (error) {
            console.log('Erro na requisição:', error);
            throw error;
        }
    }

    static async put(params: {
        path: string;
        headers?: object;
        body?: any;
        queryParams?: Record<string, any>;
        secondsTimeout: number;
    }): Promise<{ body: any; response: Response }> {
        try {
            const queryParams = new URLSearchParams(params.queryParams ?? {});

            const url = `${this._url}/${params.path}${queryParams ? `?${queryParams}` : ''}`;

      /*       const timeoutDuration = params.secondsTimeout * 1000;

            const controller = new AbortController();
            const timeout = setTimeout(() => {
                controller.abort(); // Cancela a requisição quando o timeout é atingido
            }, 120); */

            const response = await fetch(url, {
                method: 'PUT', // Alterado para PUT (método de atualização)
                headers: {
                    'Content-Type': 'application/json',
                    ...params.headers ?? {},
                },
                body: JSON.stringify(params.body), // Corpo da requisição
             
            });

   /*          clearTimeout(timeout); */

            const responseBody = await response.text();

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${responseBody}}`);
            }

            const data = JSON.parse(responseBody);

            return { body: data, response };
        } catch (error) {
            console.log('Erro na requisição:', error);
            throw error;
        }
    }

    static async delete(params: {
        path: string;
        headers?: object;
        queryParams?: Record<string, any>;
        secondsTimeout: number;
    }): Promise<{ body: any; response: Response }> {
        try {
            const queryParams = new URLSearchParams(params.queryParams ?? {});

            const url = `${this._url}/${params.path}${queryParams ? `?${queryParams}` : ''}`;

           // const timeoutDuration = params.secondsTimeout * 1000;

          //  const controller = new AbortController();
           // const timeout = setTimeout(() => {
                //controller.abort(); // Cancela a requisição quando o timeout é atingido
           // }, 120);

            const response = await fetch(url, {
                method: 'DELETE', // Método de exclusão
                headers: {
                    'Content-Type': 'application/json',
                    ...params.headers ?? {},
                },
           
            });

           // clearTimeout(timeout);


            const responseBody = await response.text();

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${responseBody}}`);
            }

            const data = JSON.parse(responseBody);

            return { body: data, response };
        } catch (error) {
            console.log('Erro na requisição:', error);
            throw error;
        }
    }

}