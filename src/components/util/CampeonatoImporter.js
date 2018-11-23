const Camepeonato_Copa_America_2019 = require('../../imgs/campeonatos/copa_america_2019.png');
const Campeonato_Copa_Mundo_2022 = require('../../imgs/campeonatos/qatar_2022.png');
const Campeonato_Copa_Mundo_2018 = require('../../imgs/campeonatos/russia_2018.png');
const default_flag = require('../../imgs/default_flag.png');

export const getCampeonatoImagem = (file_name)=>{
    switch(file_name){
        case "Campeonato_Copa_Mundo_2018": 
            return Campeonato_Copa_Mundo_2018 
        case "Camepeonato_Copa_America_2019": 
            return Camepeonato_Copa_America_2019
        case "Campeonato_Copa_Mundo_2022": 
            return Campeonato_Copa_Mundo_2022
        default:
            return default_flag
    }
}

