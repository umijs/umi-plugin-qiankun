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
            <a href="/#/app1">App1</a>
          </li>
          <li>
            <a href="/#/app2">App2</a>
          </li>
        </ul>
      </header>
      <div id="app-root" style={{ padding: 10, background: '#ccc' }}></div>
    </div>
  );
}
