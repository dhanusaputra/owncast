import { Tag, Tooltip } from 'antd';
import { FC } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { OwncastLogo } from '../../common/OwncastLogo/OwncastLogo';
import styles from './Header.module.scss';

// Lazy loaded components

const UserDropdown = dynamic(
  () => import('../../common/UserDropdown/UserDropdown').then(mod => mod.UserDropdown),
  {
    ssr: false,
  },
);

export type HeaderComponentProps = {
  name: string;
  chatAvailable: boolean;
  chatDisabled: boolean;
  online: boolean;
};

export const Header: FC<HeaderComponentProps> = ({ name, chatAvailable, chatDisabled, online }) => (
  <header className={cn([`${styles.header}`], 'global-header')}>
    {online ? (
      <Link href="#player" className={styles.skipLink}>
        Skip to player
      </Link>
    ) : (
      <Link href="#offline-message" className={styles.skipLink}>
        Skip to offline message
      </Link>
    )}
    <Link href="#skip-to-content" className={styles.skipLink}>
      Skip to page content
    </Link>
    <Link href="#footer" className={styles.skipLink}>
      Skip to footer
    </Link>
    <div className={styles.logo}>
      <div id="header-logo" className={styles.logoImage}>
        <OwncastLogo variant="contrast" />
      </div>
      <h1 className={styles.title} id="global-header-text">
        {name}
      </h1>
    </div>
    {chatAvailable && !chatDisabled && <UserDropdown />}
    {!chatAvailable && !chatDisabled && (
      <Tooltip title="Chat is available when the stream is live." placement="left">
        <Tag className={styles.offlineTag}>Chat offline</Tag>
      </Tooltip>
    )}
  </header>
);
export default Header;
