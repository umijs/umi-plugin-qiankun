import { Link } from 'umi';
import styles from './index.css';

export default function ({ children }) {
  return (
    <div className={styles.normal}>
      <header>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/app1">App1</Link></li>
          <li><Link to="/app2">App2</Link></li>
          <li><Link to="/demo">demo</Link></li>
        </ul>
      </header>
      {
        children
      }
      <div id="app-root" style={{ padding: 10, background: '#ccc' }}></div>
    </div>
  );
}
