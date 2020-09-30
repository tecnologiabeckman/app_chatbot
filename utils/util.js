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