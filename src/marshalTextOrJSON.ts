export default function marshalTextOrJSON(v: unknown): string {
  if (typeof v === 'string') {
    return v;
  }
  return JSON.stringify(v, undefined, 2);
}
