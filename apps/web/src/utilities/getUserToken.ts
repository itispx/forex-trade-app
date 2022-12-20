import getUserQueryData from "../queries/getUserQueryData";

const getUserToken = (): string | undefined => {
  const data = getUserQueryData();

  if (data) {
    return data.token;
  }

  return undefined;
};

export default getUserToken;
