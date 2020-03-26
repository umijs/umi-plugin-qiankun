import { useRootExports } from 'umi';
import router from 'umi/router';

export default function() {
  const rootExports = useRootExports();
  console.log('rootExports', rootExports);
  return (
    <div>
      <h1>Dashboard</h1>
      <a onClick={() => router.push('/user')}>to user</a>
    </div>
  );
}
