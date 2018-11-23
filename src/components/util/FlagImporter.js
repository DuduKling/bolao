const Flag_of_Argentina = require('../../imgs/flags/Flag_of_Argentina.svg');
const Flag_of_Australia = require('../../imgs/flags/Flag_of_Australia.svg');
const Flag_of_Belgium = require('../../imgs/flags/Flag_of_Belgium.svg');
const Flag_of_Brazil = require('../../imgs/flags/Flag_of_Brazil.svg');
const Flag_of_Colombia =require('../../imgs/flags/Flag_of_Colombia.svg');
const Flag_of_Costa_Rica= require('../../imgs/flags/Flag_of_Costa_Rica.svg');
const Flag_of_Croatia = require('../../imgs/flags/Flag_of_Croatia.svg');
const Flag_of_Denmark = require('../../imgs/flags/Flag_of_Denmark.svg');
const Flag_of_Egypt = require('../../imgs/flags/Flag_of_Egypt.svg');
const Flag_of_England = require('../../imgs/flags/Flag_of_England.svg');
const Flag_of_France = require('../../imgs/flags/Flag_of_France.svg');
const Flag_of_Germany = require('../../imgs/flags/Flag_of_Germany.svg');
const Flag_of_Iceland = require('../../imgs/flags/Flag_of_Iceland.svg');
const Flag_of_Iran = require('../../imgs/flags/Flag_of_Iran.svg');
const Flag_of_Japan = require('../../imgs/flags/Flag_of_Japan.svg');
const Flag_of_Mexico = require('../../imgs/flags/Flag_of_Mexico.svg');
const Flag_of_Morocco = require('../../imgs/flags/Flag_of_Morocco.svg');
const Flag_of_Nigeria = require('../../imgs/flags/Flag_of_Nigeria.svg');
const Flag_of_Panama = require('../../imgs/flags/Flag_of_Panama.svg');
const Flag_of_Peru = require('../../imgs/flags/Flag_of_Peru.svg');
const Flag_of_Poland = require('../../imgs/flags/Flag_of_Poland.svg');
const Flag_of_Portugal =require('../../imgs/flags/Flag_of_Portugal.svg');
const Flag_of_Russia = require('../../imgs/flags/Flag_of_Russia.svg');
const Flag_of_Saudi_Arabia= require('../../imgs/flags/Flag_of_Saudi_Arabia.svg');
const Flag_of_Senegal = require('../../imgs/flags/Flag_of_Senegal.svg');
const Flag_of_Serbia = require('../../imgs/flags/Flag_of_Serbia.svg');
const Flag_of_South_Korea= require('../../imgs/flags/Flag_of_South_Korea.svg');
const Flag_of_Spain = require('../../imgs/flags/Flag_of_Spain.svg');
const Flag_of_Sweden = require('../../imgs/flags/Flag_of_Sweden.svg');
const Flag_of_Switzerland= require('../../imgs/flags/Flag_of_Switzerland.svg');
const Flag_of_Tunisia = require('../../imgs/flags/Flag_of_Tunisia.svg');
const Flag_of_Uruguay = require('../../imgs/flags/Flag_of_Uruguay.svg');
const default_flag = require('../../imgs/default_flag.png');

//TODO matar esse cara, pegando o caminho direto do banco e passando para o img. Isso acaba com ter que ficar colocando todas as imagens aqui e também com o tempo que demora pra fazer o upload da aplicação.

export const TestarImagem = (file_name)=>{
    switch(file_name){
        case "Flag_of_Argentina": 
            return Flag_of_Argentina
        case "Flag_of_Australia": 
            return Flag_of_Australia
        case "Flag_of_Belgium": 
            return Flag_of_Belgium
        case "Flag_of_Brazil": 
            return Flag_of_Brazil
        case "Flag_of_Colombia": 
            return Flag_of_Colombia
        case "Flag_of_Costa_Rica": 
            return Flag_of_Costa_Rica
        case "Flag_of_Croatia": 
            return Flag_of_Croatia
        case "Flag_of_Denmark": 
            return Flag_of_Denmark
        case "Flag_of_Egypt": 
            return Flag_of_Egypt
        case "Flag_of_England": 
            return Flag_of_England
        case "Flag_of_France": 
            return Flag_of_France
        case "Flag_of_Germany": 
            return Flag_of_Germany
        case "Flag_of_Iceland": 
            return Flag_of_Iceland
        case "Flag_of_Iran": 
            return Flag_of_Iran
        case "Flag_of_Japan": 
            return Flag_of_Japan
        case "Flag_of_Mexico": 
            return Flag_of_Mexico
        case "Flag_of_Morocco": 
            return Flag_of_Morocco
        case "Flag_of_Nigeria": 
            return Flag_of_Nigeria
        case "Flag_of_Panama": 
            return Flag_of_Panama
        case "Flag_of_Peru": 
            return Flag_of_Peru
        case "Flag_of_Poland": 
            return Flag_of_Poland
        case "Flag_of_Portugal": 
            return Flag_of_Portugal
        case "Flag_of_Russia": 
            return Flag_of_Russia
        case "Flag_of_Saudi_Arabia": 
            return Flag_of_Saudi_Arabia
        case "Flag_of_Senegal": 
            return Flag_of_Senegal
        case "Flag_of_Serbia": 
            return Flag_of_Serbia
        case "Flag_of_South_Korea": 
            return Flag_of_South_Korea
        case "Flag_of_Spain": 
            return Flag_of_Spain
        case "Flag_of_Sweden": 
            return Flag_of_Sweden
        case "Flag_of_Switzerland": 
            return Flag_of_Switzerland
        case "Flag_of_Tunisia": 
            return Flag_of_Tunisia
        case "Flag_of_Uruguay": 
            return Flag_of_Uruguay
        default:
            return default_flag
    }
}

