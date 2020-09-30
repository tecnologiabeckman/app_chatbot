/**
 *  Trata as notas númericas
 * @param {*} r 
 */
function verificaNota(r) {
    switch (r.trim()) {
        case '0' || '00':
            return 0
        case '1' || '01':
            return 1
        case '2' || '02':
            return 2
        case '3' || '03':
            return 3
        case '4' || '04':
            return 4
        case '5' || '05':
            return 5
        case '6' || '06':
            return 6
        case '7' || '07':
            return 7
        case '8' || '08':
            return 8
        case '9' || '09':
            return 9
        case '10':
            return 10
        default:
            return 'inválido'
    }
}

/**
 *  Trata notas booleanas SIM ou NÃO
 * @param {*} r 
 */
function verificarEscolha(r)
{
    let decisao = r.toLocaleLowerCase();
    switch(decisao.trim()){
        case 'sim':
            return 'sim';
        case 's':
            return 'sim';
        case 'não':
            return 'não';
        case 'nao':
            return 'não';
        case 'n':
            return 'não';
        default:
            return 'inválido';
    }
}

function formataTelefone(telefone, formato){
    let tefoneFormatado;
    switch(String(formato).toLowerCase()){
        case 'mongo':
                if (!String(telefone).match(/^55.*$/)){                 // 1 possibilidade = número NÃO começa com 55 [9294493350]                        
                    if(String(telefone).match(/^.*@c.us$/)){            // 2 possibilidade = número termina com @c.us  [9294493350@c.us]                          
                        tefoneFormatado = `55${telefone.split('@')[0]}`; // FICA [559294493350]
                    }else{                                      // 2 possibilidade = número NÃO termina com @c.us                            
                        tefoneFormatado = `55${telefone}`;                            
                    }
                }else{
                    tefoneFormatado = telefone.split('@')[0]; // 1 possibilidade = número JÁ começa com 55
                }
            return tefoneFormatado;

        case 'whatsapp':
                if (!String(telefone).match(/^55.*$/)){                 // 1 possibilidade = número NÃO começa com 55 [9294493350]                        
                    if(String(telefone).match(/^.*@c.us$/)){            // 2 possibilidade = número termina com @c.us  [9294493350@c.us]                          
                        tefoneFormatado = `55${telefone}`; // FICA [559294493350@c.us]
                    }else{                                      // 2 possibilidade = número NÃO termina com @c.us                            
                        tefoneFormatado = `55${telefone}@c.us`;                            
                    }
                }else{
                    if(String(telefone).match(/^.*@c.us$/)){            // 2 possibilidade = número termina com @c.us  [9294493350@c.us]                          
                        tefoneFormatado = `${telefone}`; // FICA [559294493350@c.us]
                    }else{                                      // 2 possibilidade = número NÃO termina com @c.us                            
                        tefoneFormatado = `${telefone}@c.us`;                            
                    }
                }
            return tefoneFormatado;
    }
}

exports.formataTelefone = formataTelefone;
exports.verificaNota = verificaNota;
exports.verificarEscolha = verificarEscolha;