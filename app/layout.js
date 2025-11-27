// app/layout.js
import './globals.css';

export const metadata = { 
  title: 'Heidin Jouluseikkailu', 
  description: 'Ratkaise tehtävät ja löydä määränpää' 
};

export default function RootLayout({ children }) { 
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  ); 
}