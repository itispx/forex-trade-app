import useUserQueryData from "../queries/hooks/useUserQueryData";

const getUserToken = async (): Promise<string | undefined> => {
  const data = await useUserQueryData();

  if (data) {
    return data.token;
  }

  return undefined;
};

export default getUserToken;
