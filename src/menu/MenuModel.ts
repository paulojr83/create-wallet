import { MenuEnum } from "./MenuEnum";

export class MenuModel {

    choice: MenuEnum;

    constructor(choice: MenuEnum) {
        this.choice =choice;
    }
}