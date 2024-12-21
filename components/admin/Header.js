"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem("token");

    // Optionally clear cookies if you're storing the token there
    // document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Redirect to the login page after logging out
    router.push("/admin/login");
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Dashboard</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1E3A8A',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex', // Use flexbox for layout
    justifyContent: 'space-between', // Space between title and button
    alignItems: 'center', // Vertically align items in the center
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  logoutButton: {
    padding: '5px 10px',
    backgroundColor: '#ff4747',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
