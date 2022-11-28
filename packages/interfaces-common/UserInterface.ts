interface IUser {
  _id: string;
  username: string;
  wallet: {
    USD: number;
    GBP: number;
  };
  createdAt: string;
}

export default IUser;
