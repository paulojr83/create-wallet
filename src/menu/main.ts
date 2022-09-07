import { MenuEnum } from "./MenuEnum";
import {MenuModel} from "./MenuModel";
import inquirer from "inquirer"
import { createWallet } from "../createWallet";
import fs from "fs";

const questionChoices = [
    {
        type: 'list',
        name: 'choice',
        message: "What do you want to do?",
        choices: [MenuEnum.NEW, MenuEnum.SAVE, MenuEnum.EXIT],
    }
]
function main(){
    inquirer.prompt(questionChoices).then(async (answers: any) => {         
        await actions(new MenuModel(answers.choice))
    }).then(() => {
        main()
    });
}

let address: any;
async function actions(params: MenuModel) {
    switch (params.choice) {
        case MenuEnum.NEW:
            address =createWallet()
            break;            
        case MenuEnum.SAVE:
            if( address ) {
                const data = JSON.stringify(address, null, 2);
                fs.writeFile('address.txt', data, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Address data is saved.");
                });
            }
            console.log('Generate an address first to then');
            break
        case MenuEnum.EXIT:
            console.log('Goodbye!')
            process.exit(0)
        default:
            console.log("Select a option")
    }
}

export { main }