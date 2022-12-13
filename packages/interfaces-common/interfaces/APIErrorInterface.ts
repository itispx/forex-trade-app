interface APIErrorInterface {
  status: { code: number | string; ok: boolean };
  error: { message: string };
}

export default APIErrorInterface;
