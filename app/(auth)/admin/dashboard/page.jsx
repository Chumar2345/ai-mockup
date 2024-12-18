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
                  display: 'flex',
                  justifyContent: 'center',

                  padding: '20px',
                  backgroundColor: '#f9fafb',
                  minHeight: '100vh'
            }}>
              <div style={{
                width: '100%', 
                maxWidth: '1100px',
                backgroundColor: '#fff',  
                borderRadius: '8px',      
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
              }}>
                <Listing />
              </div>
            </main>

      </div>
    </div>
  );
}
