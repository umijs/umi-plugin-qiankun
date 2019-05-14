import { useRootExports } from 'umi';
import styles from './index.css';

export default function() {
  const rootExports = useRootExports();
  return (
    <div className={styles.normal}>
      <h1>App 1 { rootExports.getData().count }</h1>
    </div>
  );
}
