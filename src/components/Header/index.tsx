import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';
import logo from '../../public/Logo.png';

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src={logo} alt="logo" layout="fill" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
