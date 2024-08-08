import localFont from 'next/font/local'
import './global.css'

export const metadata = {
  viewport: 'width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no',
};

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
      <body className={`w-screen min-h-[100dvh] pb-16 md:pt-20 mt:pb-0 ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
