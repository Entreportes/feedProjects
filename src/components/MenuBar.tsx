import styles from "./MenuBar.module.css";

interface MenuItem {
  title: string;
  onClick: () => void;
}

interface Props {
  items: MenuItem[];
  option?: 'primary' | 'secondary'
}

export function MenuBar({ items, option='primary' }:Props){
  return (
    <div className={option === 'primary' ? styles.menuBar : styles.menuBar2}>
      {items.map((item, index) => (
        <button key={index} onClick={item.onClick} className={option === 'primary' ? styles.menuItem : styles.menuItem2}>
          {item.title}
        </button>
      ))}
    </div>
  );
}

