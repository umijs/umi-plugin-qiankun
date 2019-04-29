
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Master</h1>
      <div id="slave-root" style={{ padding: 10, background: '#ccc' }}></div>
    </div>
  );
}
