import useUserQueryData from "../queries/hooks/useUserQueryData";

const getUserToken = (): string | undefined => {
  const data = useUserQueryData();

  if (data) {
    return data.token;
  }

  return undefined;
};

export default getUserToken;
