'use client';

import Link from 'next/link';
import styles from './BackButton.module.scss';

interface Props {
  href?: string;
  label?: string;
}

const BackButton = ({ href = '/students', label = '<< список студентов' }: Props): React.ReactElement => {
  return (
    <Link href={href} className={styles.BackButton}>
      {label}
    </Link>
  );
};

export default BackButton;

