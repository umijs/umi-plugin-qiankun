import { useRootExports } from 'umi';

export default function() {
  const rootExports = useRootExports();
  console.log('rootExports', rootExports);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
