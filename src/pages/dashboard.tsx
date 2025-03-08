import React from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const Dashboard = () => {
  const datanew = [
    { src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236', title: 'Night view', description: '4.21M views' },
    { src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782', title: 'Lake view', description: '4.74M views' },
    { src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36', title: 'Mountain view', description: '3.98M views' },
    { src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236', title: 'Night view', description: '4.21M views' },
    { src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782', title: 'Lake view', description: '4.74M views' },
    { src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36', title: 'Mountain view', description: '3.98M views' }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white p-6 shadow-lg flex flex-col items-center md:items-start">
        <h1 className="text-xl font-bold text-blue-600 md:block hidden">Best<span className="text-black">BuyCo</span></h1>
        <h1 className="text-xl font-bold text-blue-600 block md:hidden">BB</h1>
        <nav className="mt-6 space-y-4 w-full">
          <a className="text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-200 flex items-center justify-center md:justify-start" href="#">
            <span className="md:hidden">🏬</span>
            <span className="hidden md:block">Popular Products</span>
          </a>
          <a className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center md:justify-start" href="#">
            <span className="md:hidden">🔍</span>
            <span className="hidden md:block">Explore New</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white p-4 h-30 md:h-20 flex-shrink-0 md:w-[85vw] w-[70vw] items-center justify-between flex">
          <h2 className="text-xl font-bold md:m-0">Explore</h2>
          <input className="w-[200px] md:w-full max-w-xs h-10 m-2 rounded-full bg-gradient-to-br from-blue-50 to-slate-100 text-center" placeholder="Search..." />
        </div>

        {/* Product Grid */}
        <div className="w-[85vw] h-full bg-gradient-to-br from-blue-50 to-slate-100 overflow-hidden">
          <Box
            sx={{
              marginLeft: '10px',
              display: 'flex',
              gap: 1,
              py: 1,
              overflowX: 'auto',
              maxWidth: '100vw',
              flexWrap: 'nowrap',
              scrollSnapType: 'x mandatory',
              paddingRight: '30px', // Fix for last image cutoff
              '& > *': { scrollSnapAlign: 'center' },
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {datanew.map((item, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  minWidth: 250,
                  maxWidth: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: 2,
                  overflow: 'hidden',
                  '@media (max-width: 600px)': {
                    minWidth: 140,
                    maxWidth: 140,
                    padding: 1,
                  },
                }}
              >
                <AspectRatio
                  ratio="1"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`${item.src}?h=300&fit=crop&auto=format`}
                    alt={item.title}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                    }}
                  />
                </AspectRatio>
                <Box sx={{ mt: 1, width: '100%' }}>
                  <Typography level="title-md">{item.title}</Typography>
                  <Typography level="body-sm">{item.description}</Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
