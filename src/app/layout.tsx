import localFont from 'next/font/local'
import { Viewport } from 'next';
import './global.css'

export const metadata = {
  description: 'Busca de usuários do github e visualização dos repositórios',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Poppins/Poppins-Regular.ttf',
      weight: 'normal',
    },
    {
      path: '../../public/fonts/Poppins/Poppins-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600',
    },
  ]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className={`w-full min-h-[100dvh] overflow-x-hidden  ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
