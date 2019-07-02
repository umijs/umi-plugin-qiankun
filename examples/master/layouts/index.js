import { Link } from 'umi';
import styles from './index.css';

const menu = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/app1',
    name: 'App1',
  },
  {
    path: '/app2',
    name: 'App2',
  },
];

export default function({ children }) {
  return (
    <div className={styles.normal}>
      <header>
        <ul>
          {menu.map(({ name, path }) => (
            <li key={path}>
              {' '}
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      </header>
      {children}
      {/* <div id="app-root" style={{ padding: 10, background: '#ccc' }}></div> */}
    </div>
  );
}
