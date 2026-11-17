import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'], variable: '--font-nunito' });
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  title: 'Salvaê · Seu plano para a prova',
  description: 'Responda algumas perguntas rápidas e receba um plano de revisão para a sua recuperação ou prova final.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#FAF7F0', viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className="min-h-dvh bg-offwhite font-sans text-tinta antialiased">
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
