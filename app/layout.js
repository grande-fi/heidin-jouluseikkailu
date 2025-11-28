// app/layout.js
import './globals.css';

export const metadata = { 
  title: 'Heidin Jouluseikkailu', 
  description: 'Ratkaise tehtävät, kerää tuloksista naatit ja löydä kohde!' 
};

export default function RootLayout({ children }) { 
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  ); 
}