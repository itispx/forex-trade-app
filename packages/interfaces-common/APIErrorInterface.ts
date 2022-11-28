interface IAPIError {
  status: { code: number; ok: boolean };
  error: { message: string };
}

export default IAPIError;
