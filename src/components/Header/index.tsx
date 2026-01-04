import { Link } from 'react-router-dom';
import classes from "./Header.module.css";

export default function Header() {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>
		      <Link to='/'>Blog</Link>
		    </div>
		    <div className={classes.contact}>
				  <Link to='/contact'>お問い合わせ</Link>
		    </div>
      </header>
    </div>
  );
}