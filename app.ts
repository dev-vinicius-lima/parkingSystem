import { CompanyAccount } from "./class/CompanyAccount";
import { PeopleAccount } from "./class/PeopleAccount";
import { PersonAccount } from "./class/PersonAccount";

const peopleAccount: PeopleAccount = new PeopleAccount(1, "Nath", 10);
console.log(peopleAccount);
peopleAccount.deposit(50);
const companyAccount: CompanyAccount = new CompanyAccount("DIO", 20);
companyAccount.deposit(20);
console.log(companyAccount);

const personAccount: PersonAccount = new PersonAccount("vini", 10);
personAccount.deposit(100);
console.log(personAccount);
