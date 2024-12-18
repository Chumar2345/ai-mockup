import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link href="/dashboard">Home</Link>
        </li>
        <li style={styles.listItem}>
          <Link href="/dashboard/users">Users</Link>
        </li>
        <li style={styles.listItem}>
          <Link href="/dashboard/settings">Settings</Link>
        </li>
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
