import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="./Logo.svg" alt="Logo" />
      </div>
    </div>
  );
};

export { Header };
