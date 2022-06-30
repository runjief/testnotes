import currentTest from './currentTest';

export default function getSnapshotKey(name = ''): string {
  const ret = `${currentTest.key}${name ? `.${  name}` : ''}`.replace(
    /[ :*?<>"|]/g,
    '-',
  );
  if (!ret) {
    throw new Error('getSnapshotKey: currentTest is not configured');
  }
  return ret;
}
