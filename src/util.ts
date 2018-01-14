
export function pTimeout(ms: number): Promise<any> {
  return new Promise((resolve => setTimeout(resolve, ms)));
}