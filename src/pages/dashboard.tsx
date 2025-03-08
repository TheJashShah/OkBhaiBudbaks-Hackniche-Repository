import React from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const Dashboard = () => {
    const data = [
        {
          src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
          title: 'Night view',
          description: '4.21M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
          title: 'Lake view',
          description: '4.74M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
          title: 'Mountain view',
          description: '3.98M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
          title: 'Night view',
          description: '4.21M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
          title: 'Lake view',
          description: '4.74M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
          title: 'Mountain view',
          description: '3.98M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
          title: 'Night view',
          description: '4.21M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
          title: 'Lake view',
          description: '4.74M views',
        },
        {
          src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
          title: 'Mountain view',
          description: '3.98M views',
        },
      ];
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white p-6 shadow-lg flex flex-col items-center md:items-start">
        <h1 className="text-xl font-bold text-blue-600 md:block hidden">Best<span className="text-black">BuyCo</span></h1>
        <h1 className="text-xl font-bold text-blue-600 block md:hidden">BB</h1>
        <nav className="mt-6 space-y-4 w-full">
          <a className="block text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-200 flex items-center justify-center md:justify-start" href="#">
            <span className="md:hidden">🏬</span>
            <span className="hidden md:block">Popular Products</span>
          </a>
          <a className="block bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center md:justify-start" href="#">
            <span className="md:hidden">🔍</span>
            <span className="hidden md:block">Explore New</span>
          </a>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white p-4 h-30 w-[71vw] flex flex-col items-center md:flex-row md:h-20 md:justify-between ">
            <div className="w-full flex justify-between flex-col md:flex-row ">
            <h2 className="text-xl font-bold text-center m-auto md-m-auto md:ml-0 md:text-left">Explore</h2>
            <input className="w-[200px] md:w-full max-w-xs h-10 rounded-full  m-auto md:m-0 md:ml-auto md:mt-0 mt-2 bg-gradient-to-br from-blue-50 to-slate-100 text-center" placeholder="Search..." />
            </div>
        </div>
        {/* Product Grid */}
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100">
        <Box
        sx={{
            marginLeft: '10px',
            display: 'flex',
            gap: 1,
            py: 1,
            overflow: 'auto',
            width: '85vw',
            height: 'auto',
            scrollSnapType: 'x mandatory',
            '& > *': {
            scrollSnapAlign: 'center',
            },
            '::-webkit-scrollbar': { display: 'none' },
        }}
        >
        {data.map((item) => (
            <Card
            key={item.title}
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 2, // Default padding
                width: 300,
                '@media (max-width: 600px)': {
                width: 120,
                padding: 1, // Reduced padding on mobile
                },
            }}
            >
            <AspectRatio
                ratio="1"
                sx={{
                width: 300,
                height: 300,
                p: 1, // Padding for spacing
                '@media (max-width: 600px)': {
                    width: 100,
                    height: 100,
                    p: 0.5, // Less padding in mobile mode
                },
                }}
            >
                <img
                srcSet={`${item.src}?h=300&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.src}?h=300&fit=crop&auto=format`}
                alt={item.title}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </AspectRatio>
            <Box sx={{ mt: 1, width: '100%' }}> {/* Reduced margin to keep content closer */}
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
