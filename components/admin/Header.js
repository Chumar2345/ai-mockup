export default function Header() {
    return (
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
      </header>
    );
  }
  
  const styles = {
    header: {
      backgroundColor: '#1E3A8A',
      color: '#fff',
      padding: '10px 20px',
      textAlign: 'center',
    },
    title: {
      margin: 0,
      fontSize: '1.5rem',
    },
  };
  