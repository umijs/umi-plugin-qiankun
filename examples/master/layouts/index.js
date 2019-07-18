import { Link } from 'umi';
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/app1">app1</Link>
          </li>
          <li>
            <Link to="/app2">app2</Link>
          </li>
        </ul>
      </header>
      <div id="app-root" style={{ padding: 10, background: '#ccc' }}></div>
    </div>
  );
}
