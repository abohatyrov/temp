import "./globals.css";
import Script from "next/script";
import Providers from "/providers/Providers";
import Header from "/components/Header/Header";
import HeaderOffset from "/components/Header/HeaderOffset";
import LayoutFooter from "/components/Footer/layoutFooter";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const namuFont = localFont({
  src: "./NAMU-1930.otf",
  display: "swap",
  variable: "--font-namu",
});

export const metadata = {
  keywords:
    "Суші, Японська кухня, Суші у Львові, Філадельфія з лососем, Багато Лосося, Роли, Сети, Авторські Роли, Гарячі Роли, Класичні, Сирні роли, Вегетеріанські суші, Запечені суші, Нігірі, Доставка, Самовивіз, Online замовлення, Свіжа риба, syodo, sushi, суші малоголосківська",
  robots: "max-image-preview:large",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${namuFont.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/icons/favicon.ico"
        />
        <meta name="robots" content="index, follow"></meta>
        <meta
          name="facebook-domain-verification"
          content={`${process.env.FB_DOMAIN_VERIFICATION_CODE}`}
        />
        {/* Facebook Pixel Code  */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                  n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
              }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.FB_ANALYTICS_KEY}');
              fbq('track', 'PageView');`,
          }}
        ></Script>

        {/* Google Tag Manager  */}

        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                  'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
                }); var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', '${process.env.GTM_ANALYTICS_KEY}');
              `,
          }}
        ></Script>

        {/* Google Tag Auditory  */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11246914908"
        ></script>
        <Script
          id="gtag-auditory"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'AW-11246914908');
              `,
          }}
        ></Script>

        <script
          type="application/ld+json"
          id="ld-json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Restaurant",
                "name": "SYODŌ - Доставка Cуші - Львів",
                "image": "https://media.syodo.com.ua/img/IMG_0531.jpg",
                "@id": "",
                "url": "https://syodo.com.ua/",
                "telephone": "+38 (067) 722 93 45",
                "priceRange": "$",
                "menu": "https://syodo.com.ua/",
                "servesCuisine": "Суші",
                "acceptsReservations": "true",
                "address": [{
                  "@type": "PostalAddress",
                  "streetAddress": "вул. Трускавецька 2а",
                  "addressLocality": "Львів",
                  "postalCode": "79000",
                  "addressCountry": "UA"
                },
                           {
                  "@type": "PostalAddress",
                  "streetAddress": "вул. Mалоголосківська, 28",
                  "addressLocality": "Львів",
                  "postalCode": "79000",
                  "addressCountry": "UA"
                }],
                "geo": [{
                  "@type": "GeoCoordinates",
                  "latitude": 49.797632,
                  "longitude": 24.011367
                },
                       {
                  "@type": "GeoCoordinates",
                  "latitude": 49.8670843,
                  "longitude": 23.9975818
                }],
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "10:00",
                  "closes": "21:45"
                },
                "sameAs": [
                  "https://www.instagram.com/syodo.sushi/",
                  "https://www.facebook.com/syodo.sushi.lviv"
                ] 
              }
              `,
          }}
        ></script>
      </head>
      <body id="__next">
        {/* Facebook Pixel Code */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.FB_ANALYTICS_KEY}&ev=PageView&noscript=1`}
            alt="fb-no-script"
          />
        </noscript>

        {/* GTM Code */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ANALYTICS_KEY}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Content Body */}
        <div
          className="font-namu"
          style={{
            backgroundImage: `url('/assets/images/maintheme.png')`,
            backgroundPosition: "center",
          }}
        >
          <Providers>
            <div style={{ minHeight: "100vh" }}>
              <Header />
              <HeaderOffset />
              <div style={{ paddingTop: "20px", paddingBottom: 20 }}>
                {children}
              </div>
            </div>

            <LayoutFooter />
          </Providers>
        </div>
      </body>
    </html>
  );
}
