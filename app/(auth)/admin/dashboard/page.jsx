import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import Listing from '@/components/admin/Listing';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header at the Top */}
      <Header />

      {/* Main Content Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main style={{
              flex: 1,
              display: 'flex',             // Enables flexbox
              justifyContent: 'center',    // Centers content horizontally
              // alignItems: 'center',        // Centers content vertically
              padding: '20px',
              backgroundColor: '#f9fafb',
              height: '100vh'              // Ensures it takes full viewport height
            }}>
              <div style={{
                width: '100%',              // Sets width to 80% of the parent container
                maxWidth: '1100px',  
                marginLeft:'20px',       // Restricts maximum width
              }}>
                <Listing />
              </div>
            </main>

      </div>
    </div>
  );
}
