// Dijital QR Menü — kategori filtresi, kayan aktif gösterge, sağa/sola
// kaydırarak kategori değiştirme ve ürün kartları. GSAP yüklenemezse kartlar
// CSS animasyonuyla gelir; menü her durumda eksiksiz çalışır.
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const MOTION = hasGsap && !REDUCED;
  if (hasGsap) document.documentElement.classList.add('has-gsap');

  // --- MENÜ VERİSİ ---
  // Gerçek bir veritabanı yerine sabit örnek veri.
  const IMG = (id) => `https://images.unsplash.com/${id}?q=75&w=240&h=240&auto=format&fit=crop`;

  const menuData = {
    popular: [
      {
        name: 'Çilek Rüyası',
        desc: 'Sütlü çikolata, bol çilek, fındık ve beyaz sos.',
        price: '185',
        img: IMG('photo-1702355791694-e9cab84360aa'),
        type: 'waffle',
      },
      {
        name: 'Choco Bomb',
        desc: 'Bitter taban, oreo parçaları, brownie ve çikolata sos.',
        price: '210',
        img: IMG('photo-1721078917681-40f74d16d7b7'),
        type: 'waffle',
      },
      {
        name: 'Berry Mix',
        desc: 'Orman meyveleri, beyaz çikolata ve dondurma.',
        price: '230',
        img: IMG('photo-1666052137730-e2c5c87f5671'),
        type: 'waffle',
      },
      {
        name: 'Ice Latte',
        desc: 'Espresso ve soğuk sütün mükemmel uyumu.',
        price: '95',
        img: IMG('photo-1517701550927-30cf4ba1dba5'),
        type: 'drink',
      },
    ],
    waffles: [
      {
        name: 'Klasik Waffle',
        desc: 'Kendi malzemeni seç! Sadece hamur ve taban çikolatası.',
        price: '150',
        img: IMG('photo-1562376552-0d160a2f238d'),
        type: 'waffle',
      },
      {
        name: 'Sandviç Waffle',
        desc: 'İki kat waffle arasında dondurma ve meyve.',
        price: '190',
        img: IMG('photo-1562513872-634b8fae6dbe'),
        type: 'waffle',
      },
      {
        name: 'Brüksel Usulü',
        desc: 'Kare, daha çıtır hamur yapısı ile.',
        price: '160',
        img: IMG('photo-1773533276932-4ee7ea1d6361'),
        type: 'waffle',
      },
    ],
    drinks: [
      {
        name: 'Türk Kahvesi',
        desc: 'Geleneksel lezzet, çifte kavrulmuş.',
        price: '60',
        img: IMG('photo-1661685249316-a06e692e1cb2'),
        type: 'drink',
      },
      {
        name: 'Filtre Kahve',
        desc: '%100 Arabica çekirdeklerinden.',
        price: '75',
        img: IMG('photo-1442512595331-e89e73853f31'),
        type: 'drink',
      },
      {
        name: 'Limonata',
        desc: 'Ev yapımı, naneli taze limonata.',
        price: '80',
        img: IMG('photo-1555949366-819808d99159'),
        type: 'drink',
      },
      {
        name: 'Çay',
        desc: 'Taze demlenmiş Rize çayı.',
        price: '30',
        img: IMG('photo-1579005162638-11c872e1586e'),
        type: 'drink',
      },
    ],
    fruits: [
      {
        name: 'Çilek',
        desc: 'Taze dilimlenmiş.',
        price: '+20',
        img: IMG('photo-1587393855524-087f83d95bc9'),
        type: 'ingredient',
      },
      {
        name: 'Muz',
        desc: 'Yerli Anamur muzu.',
        price: '+15',
        img: IMG('photo-1571771894821-ce9b6c11b08e'),
        type: 'ingredient',
      },
      {
        name: 'Kivi',
        desc: 'Egzotik tat.',
        price: '+20',
        img: IMG('photo-1679065103638-7360cb935fac'),
        type: 'ingredient',
      },
      {
        name: 'Ananas',
        desc: 'Tatlı ve sulu.',
        price: '+25',
        img: IMG('photo-1550828434-e516cdc55aa0'),
        type: 'ingredient',
      },
    ],
    toppings: [
      {
        name: 'Fındık',
        desc: 'Kavrulmuş Giresun fındığı.',
        price: '+10',
        img: IMG('photo-1767709383373-2e7c2e192e6d'),
        type: 'ingredient',
      },
      {
        name: 'Fıstık',
        desc: 'Antep fıstığı parçaları.',
        price: '+15',
        img: IMG('photo-1704079662049-d00890d21a69'),
        type: 'ingredient',
      },
      {
        name: 'Hindistan Cevizi',
        desc: 'Rendelenmiş.',
        price: '+5',
        img: IMG('photo-1597636319015-1fce74db8798'),
        type: 'ingredient',
      },
      {
        name: 'Bonibon',
        desc: 'Renkli drajeler.',
        price: '+10',
        img: IMG('photo-1622873904690-76c655368668'),
        type: 'ingredient',
      },
    ],
    chocolates: [
      {
        name: 'Sütlü Çikolata',
        desc: 'Belçika menşeili.',
        price: '+25',
        img: IMG('photo-1623660053975-cf75a8be0908'),
        type: 'ingredient',
      },
      {
        name: 'Bitter',
        desc: '%70 Kakao oranı.',
        price: '+25',
        img: IMG('photo-1772986258634-a729cd51aea4'),
        type: 'ingredient',
      },
      {
        name: 'Beyaz Çikolata',
        desc: 'Yumuşak lezzet.',
        price: '+25',
        img: IMG('photo-1770998868042-7ee81050b2ce'),
        type: 'ingredient',
      },
      {
        name: 'Karamel Sos',
        desc: 'Ev yapımı tuzlu karamel.',
        price: '+15',
        img: IMG('photo-1568657704598-602700bd9694'),
        type: 'ingredient',
      },
    ],
  };

  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  const grid = document.getElementById('menuGrid');
  const title = document.getElementById('categoryTitle');
  const bar = document.querySelector('[data-pills]');
  const ind = document.querySelector('.cat-ind');
  const pills = Array.from(document.querySelectorAll('.cat-pill'));

  function renderItems(category) {
    const items = menuData[category] || [];

    grid.innerHTML = items
      .map((item, index) => {
        // Malzemeler (meyve/süsleme/çikolata) yuvarlak küçük görselle gösterilir
        const extraClass = item.type === 'ingredient' ? 'small-item' : '';
        // GSAP yoksa kartlar CSS ile sırayla, 0.05 sn arayla belirir
        const delay = index * 0.05;

        return `
          <div class="product-card ${extraClass}" style="animation-delay: ${delay}s">
            <img src="${esc(item.img)}" alt="${esc(item.name)}" class="product-img" loading="lazy" width="240" height="240">
            <div class="product-info">
              <h3 class="product-name">${esc(item.name)}</h3>
              <p class="product-desc">${esc(item.desc)}</p>
            </div>
            <span class="product-price">₺${esc(item.price)}</span>
          </div>`;
      })
      .join('');

    if (MOTION) {
      gsap.from(grid.children, {
        y: 26,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'expo.out',
        clearProps: 'transform,opacity,visibility',
      });
    }
  }

  // --- AKTİF GÖSTERGE ---
  function placeIndicator(pill, instant) {
    if (!ind || !pill) return;
    if (instant) ind.style.transition = 'none';
    ind.style.width = `${pill.offsetWidth}px`;
    ind.style.transform = `translateX(${pill.offsetLeft}px)`;
    if (instant) {
      void ind.offsetWidth;
      ind.style.transition = '';
    }
  }
  if (ind) document.body.classList.add('has-ind');

  function select(pill) {
    const category = pill.dataset.category;
    pills.forEach((p) => {
      const on = p === pill;
      p.classList.toggle('active', on);
      p.setAttribute('aria-pressed', String(on));
    });
    placeIndicator(pill);

    // seçili kategori şeritte görünür kalsın
    const left = pill.offsetLeft - (bar.clientWidth - pill.offsetWidth) / 2;
    if (MOTION) gsap.to(bar, { scrollLeft: Math.max(0, left), duration: 0.6, ease: 'expo.out' });
    else bar.scrollLeft = Math.max(0, left);

    // Başlık butondan alınır; yalnızca 'Popüler' için ek yapılır
    const text = pill.textContent.trim() + (category === 'popular' ? ' Lezzetler' : '');
    if (MOTION) {
      gsap.fromTo(
        title,
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out' },
      );
    }
    title.textContent = text;
    renderItems(category);
  }

  pills.forEach((pill) => pill.addEventListener('click', () => select(pill)));

  // --- SAĞA / SOLA KAYDIRARAK KATEGORİ DEĞİŞTİR ---
  const area = document.querySelector('.menu-container');
  let sx = 0;
  let sy = 0;
  area.addEventListener(
    'touchstart',
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true },
  );
  area.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 60 || Math.abs(dy) > 45) return;
      const i = pills.findIndex((p) => p.classList.contains('active'));
      const next = pills[i + (dx < 0 ? 1 : -1)];
      if (next) select(next);
    },
    { passive: true },
  );

  // --- BAŞLAT ---
  renderItems('popular');
  const first = pills.find((p) => p.classList.contains('active'));
  placeIndicator(first, true);
  window.addEventListener('resize', () =>
    placeIndicator(
      pills.find((p) => p.classList.contains('active')),
      true,
    ),
  );
  if (document.fonts) {
    document.fonts.ready.then(() =>
      placeIndicator(
        pills.find((p) => p.classList.contains('active')),
        true,
      ),
    );
  }
})();
