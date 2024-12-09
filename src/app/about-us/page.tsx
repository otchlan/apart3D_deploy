import React from 'react';
import Image from 'next/image';
import Button from '@/components/button';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <main className="flex-grow">
        {/* Sekcja Hero */}
        <section className="container mx-auto px-4 py-20 text-center pt-28">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">O nas</h1>
          <p className="text-xl text-gray-600">Specjalizujemy się w dostarczaniu zaawansowanych rozwiązań 3D dla różnych branż, ale przede wsztstkim dla rynku nieruchomości. 
          </p>
          <p className="text-xl text-gray-600">Dzięki nowoczesnym technologiom wizualizacji, umożliwiamy naszym klientom efektywną prezentację przestrzeni jeszcze przed jej fizycznym ukończeniem. 
          </p>
          <p className="text-xl text-gray-600">Nasze usługi pomagają agentom nieruchomości, firmom budowlanym i deweloperom wyróżniać się na rynku, przyspieszać sprzedaż oraz budować zaufanie u potencjalnych klientów.
          </p>
        </section>

        {/* Sekcja Nasza Historia */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Co oferujemy?</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src="/hs.png"
                  alt="Nasz Budynek"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-gray-600 mb-4">
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Agentom nieruchomości</strong> pomagamy zwiększyć sprzedaż i oszczędzić czas, oferując wirtualne spacery i interaktywne prezentacje nieruchomości. Dzięki tym rozwiązaniom klienci mogą obejrzeć oferty bez wychodzenia z domu, co skutecznie eliminuje konieczność fizycznych wizyt.
                  </li>
                  <li>
                    <strong>Firmom budowlanym</strong> umożliwiamy promocję mieszkań na etapie budowy, przyciągając potencjalnych nabywców i inwestorów. Nasze wizualizacje pozwalają dokładnie przedstawić projekty, które jeszcze nie zostały zrealizowane, co przyspiesza proces sprzedaży i zmniejsza liczbę reklamacji.
                  </li>
                  <li>
                    <strong>Deweloperom i inwestorom</strong> dostarczamy narzędzia, które pomagają w podejmowaniu decyzji inwestycyjnych. Dzięki naszym wizualizacjom mogą oni w pełni zaprezentować przyszłe przestrzenie, budując tym samym większe zaufanie do realizowanych projektów.
                  </li>
                </ul>                
                 {/* 
                <p className="text-gray-600 mb-4">
                  Nasz zespół doświadczonych architektów, projektantów i deweloperów pracuje niestrudzenie, aby każde mieszkanie było idealnym połączeniem stylu i komfortu, dostosowanym do unikalnego stylu życia naszych mieszkańców.
                </p>
                <Button>Dowiedz się więcej o naszych projektach</Button>
                */}

              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 text-center pt-28">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dlaczego my?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Nasze rozwiązania pozwalają na redukcję kosztów marketingowych i zwiększenie efektywności sprzedaży, dzięki nowoczesnym narzędziom, które angażują klientów i skutecznie wyróżniają ofertę na tle konkurencji.
          </p>
        </section>

        {/* Sekcja Nasze Wartości */}
        {/*
        <section className="bg-gradient-to-r from-purple-100 to-indigo-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Nasze Wartości</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Innowacja', description: 'Przekraczamy granice nowoczesnego życia dzięki technologiom smart home i nowoczesnemu designowi.' },
                { title: 'Jakość', description: 'Stosujemy materiały najwyższej jakości i zatrudniamy wykwalifikowanych rzemieślników, aby zapewnić trwałą wartość każdego domu.' },
                { title: 'Zrównoważony rozwój', description: 'Wprowadzamy ekologiczne rozwiązania i energooszczędne systemy we wszystkich naszych inwestycjach.' }
              ].map((value, index) => (
                <div key={index} className="text-center p-6 rounded-lg shadow-lg bg-white">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* Sekcja Zespół */}
        {/*
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">Poznaj Nasz Zespół</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Jane Doe', role: 'Główny Architekt', image: '/api/placeholder/300/300' },
              { name: 'John Smith', role: 'Manager Rozwoju', image: '/api/placeholder/300/300' },
              { name: 'Emily Brown', role: 'Projektant Wnętrz', image: '/api/placeholder/300/300' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
        */}

        {/* Sekcja CTA */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Gotowy/a, aby mieć ciągle klientów?</h2>
            <p className="text-xl mb-8">Zarezerwuj konsultacje z naszym agentem.</p>
            <a
              href="https://calendly.com/mstachura-deeptechlabs/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="large">
                Umów się na wizytę
              </Button>
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutUsPage;
