import style from './index.css';

export default function() {
  return (
    <div className={style.container}>
      <h2>Welcome to use QianKun ~</h2>
      <p>
        如果在使用中遇到任何问题，请在
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/umijs/umi/issues/new/choose">
          此处
        </a>
        提Issue
      </p>
    </div>
  );
}
