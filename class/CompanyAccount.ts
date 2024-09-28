import { DioAccount } from "./DioAccount";

export class CompanyAccount extends DioAccount {
  constructor(name: string, accountNumber: number) {
    super(name, accountNumber);
  }

  getLoan = (amount: number) => {
    if (this.validateStatus()) {
      console.log(`Voce pegou um empréstimo de R$${amount}`);
      this.balance += amount;
    } else {
      console.log("Emprestimo inválido, verifique sua conta");
    }
  };
}
