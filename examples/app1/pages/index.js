import { useRootExports } from 'umi';
import styles from './index.less';

export default function() {
  const rootExports = useRootExports();
  return (
    <div className={`${styles.normal} normalTest`}>
      <h1>App 1 </h1>
      <p>data: {JSON.stringify(rootExports.getData())}</p>
    </div>
  );
}
