"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {

    const router = useRouter();
    
    const handleAuthRedirect = (e, path) => {
      e.preventDefault();
      router.push(path); // Use programmatic navigation
    };
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.list}>
        <li style={styles.listItem}>
        <li style={styles.listItem}>
          <a href="#"
            onClick={(e) => handleAuthRedirect(e, '/admin/dashboard')}>Users</a>
        </li>
        <a
            href="#"
            onClick={(e) => handleAuthRedirect(e, '/admin/package')}  
          >
            Plans
          </a>
        </li>
       
        {/* <li style={styles.listItem}>
          <Link href="/dashboard/settings">Settings</Link>
        </li> */}
      </ul>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '200px',
    height: '100vh',
    backgroundColor: '#111827',
    color: '#fff',
    padding: '20px',
    // position: 'fixed',
    top: 0,
    left: 0,
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '15px',
  },
};
