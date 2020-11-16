const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.URL_API,
   // timeout: 65000,
    headers: {Authorization: 'bearer eyJ0eXAiOwiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTYzOThhNi0xMjA4LTQ0ODYtYTBjMC0xYTFlZwmJlZGNhMTUiLCJqdGkiOiJjMWE1MDZkMzZhYTc4YmE2NDM0NGY3NzNkYWMyNzIwMTAxNzBmZjdlNTVhZjFiZWZlZWRmZDM5NGRlZDlkYTQzNzVlMjE2ODFhM2I5ZjIzMiIsImlhdCI6MTU5OTY5MjkwMiwibmJmIjoxNTk5NjkyOTAyLCJleHAiOjE2MzEywMjg5MDIsInN1wYiI6IjQiLCJzY29wZXMiOltdfQ.rN1LkEKusr8hQEooQ4PnnTjyavAG0_4br9Ypg_M4aPJ5tuB_8wakeK1DiMHeieoefwWB52jzKsWndxJVd-w19Mj57-H4VymLMFhvj8nhlTBATfhYTc0UZmI0xOo0TFbE45gE-31UKcMCw9zVLqTTZXC2IpJNSdEVEyF2GxfwPPIQRFlOWAXaOemfmMhIuInhj4W8BKSonlGJNVqumV9mXWco6grzs8rBanuVL_phwNDbfEjockBt1HQrhCo-djfJOv66drwnzHt2L-e_PZ-9dWBiawn82VOJstWk-X-RgS1I0jPq-CSYqWvkGg2MFcmzoDoEqlGAyfsbrTJkOSOVf86leN12Lk25iCiqylY5h9dvHRLs3MvV0sUicJvcSWjFcm0QdHDlzvXxTCCcDiV_cakifksePEwY3WuFsRHLIXIM64bT2EuBmF61jQ8F2I1Sf6mxPCpn5VnKi8lB_kCmdjgBM9QTV5it2ABj_7chUq0NAYtPp2AvCEP7oucpHDqmP4sczMkdFnqbHrjZvjuvZCKzIGtQfuNtx2qoK7F5zLDjnyyLZQjBxEvOK4epCmn_HGom2gnMhxoHRTUWdiT8jcjpLEYmYCB9hO2yHdvMNytpKfaL6LE30xc-BaAbklg7Sc-gkBiVJOYHpwV7t4Freij1Rj4w-nR6NycFZ7MUf6D40rx4'}
  });

async function restApi(acao,rota,params){
    //console.log(`DAO API CHATBOT => [ação]: ${acao} [rota]: ${rota} [parametros]: ${params}`);
    let retorno =null;
    
    switch(acao){

        case 'all':

            try {                
                retorno = await instance.get(`${rota}`);
            } catch(error) {
                console.log(`Erro: ${error}`);
                return error;
            }

            return retorno;    
        
        
        case 'find':

            try {
                retorno = await instance.get(`${rota}`,{params});
            } catch (error) {
                console.log(`Erro: ${error}`);
                return error;
            }
            
            return retorno;
        
        case 'save':
           // console.log(`PARAMETROS: ${params}`);
            try { 
                retorno = await instance.post(`${rota}`, {params});
                //console.log(`INCLUIR: ${retorno.data}`);    
            } catch (error) {
                console.log(`Erro: ${error}`);
            }
        
            return retorno;
     
        case 'update':

            try {
                retorno = await instance.put(`${rota}`, {params} )
            } catch (error) {
                console.log(`Erro: ${error}`);
            }
            
            break;
     

    }
    

}

exports.restApi = restApi;