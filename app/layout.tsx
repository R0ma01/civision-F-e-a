import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Familles en affaires',
    description: 'Propulsé par CIVISION',
};

interface RootProps {
    children: any;
}

export default function RootLayout({ children }: RootProps) {
    return (
        <html lang="en">
            <head>
                {/* IMAGE DE MEILLEURE QUALITÉ À OBTENIR */}
                <link rel="icon" href="/fae_browser_img.png" />
                <meta name="description" content="Propulsé par CIVISION" />
                <title>Familles en affaires</title>
            </head>
            <body className={inter.className + 'text-black font-sans'}>
                <ThemeProvider attribute="class">{children}</ThemeProvider>
            </body>
        </html>
    );
}
