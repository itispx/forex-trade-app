interface APIErrorInterface {
  status: { code: number; ok: boolean };
  error: { message: string };
}

export default APIErrorInterface;
