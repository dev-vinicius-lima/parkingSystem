import { DioAccount } from "./DioAccount";

class PersonAccount extends DioAccount {
  constructor(name: string, accountNumber: number) {
    super(name, accountNumber);
  }

  deposit = (amount: number): void => {
    if (this.validateStatus()) {
      console.log(`Voce depositou R$${amount}`);
      const total = (this.balance += amount + 10);
      console.log(`Seu saldo agora é de R$${total}`);
    } else {
      console.log("deposito inválido, verifique sua conta");
    }
  };
}

export { PersonAccount };
