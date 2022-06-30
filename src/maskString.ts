export default function maskString(s: string): string {
  return s.replace(/\w/g, '*');
}
