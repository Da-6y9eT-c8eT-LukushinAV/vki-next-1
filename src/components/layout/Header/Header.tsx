import Menu from '../Menu/Menu';
import Profile from './Profile/Profile';
import type UserInterface from '@/types/UserInterface';

import styles from './Header.module.scss';

interface Props {
  userFromServer?: UserInterface | null;
}

const Header = ({ userFromServer }: Props): React.ReactElement => (
  <header className={styles.Header}>
    <div className={styles.title}>Вэб разработка</div>
    <div className={styles.menuWrapper}>
      <Menu />
    </div>
    <Profile userFromServer={userFromServer || null} />
  </header>
);

export default Header;
