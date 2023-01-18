import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchValue, setSearchValue }) => {
  const [localSearchValue, setLocalSearchValue] = React.useState<string>(searchValue);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search..."
          value={localSearchValue}
          onChange={(e) => {
            if (e.target.value === '') {
              setSearchValue('');
              setLocalSearchValue('');
            }
            setLocalSearchValue(e.target.value);
          }}
        />
        <span
          style={{ display: localSearchValue ? 'block' : 'none' }}
          onClick={() => {
            setSearchValue('');
            setLocalSearchValue('');
          }}>
          X
        </span>
        <button onClick={() => setSearchValue(localSearchValue)}>Search</button>
      </div>
    </div>
  );
};

export default Header;
