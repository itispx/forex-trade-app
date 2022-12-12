interface UserInterface {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  wallet: WalletInterface | null | undefined;
}

export default UserInterface;

export interface UserServerResponseInterface {
  doc: UserInterface;
  token: string;
}

export interface WalletInterface {
  id: string;
  userID: string;
  USD: number;
  GBP: number;
}
