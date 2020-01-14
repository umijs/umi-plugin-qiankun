import { useRootExports } from 'umi';
import Link from 'umi/link';

export default function() {
  const rootExports = useRootExports();
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
