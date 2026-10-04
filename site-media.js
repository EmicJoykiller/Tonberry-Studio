(() => {
  const style = document.createElement('style');
  style.textContent = `
    .navlinks a[href="#work"]{color:#2458e8}
    .hero-art{min-height:0;display:block}
    .hero-real{position:relative;margin:0;overflow:hidden;min-height:390px;border-radius:30px;background:#202638;box-shadow:0 24px 70px #1c48c328}
    .hero-real img{display:block;width:100%;height:430px;object-fit:cover;object-position:center 54%;opacity:.96}
    .hero-real figcaption{position:absolute;left:18px;right:18px;bottom:18px;padding:14px 17px;border:1px solid #ffffff34;border-radius:17px;background:#172526bb;color:white;backdrop-filter:blur(10px)}
    .hero-real figcaption span{display:block;color:#e5edff;font-size:.68rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase}
    .hero-real figcaption strong{display:block;margin-top:3px;font:500 1.4rem Georgia,serif}
    .portfolio{background:#fffefa}
    .portfolio-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
    .portfolio-card{overflow:hidden;margin:0;border:1px solid #e7e5dc;border-radius:19px;background:#fbf9f3}
    .portfolio-card img{display:block;width:100%;height:300px;object-fit:cover;object-position:center;transition:transform .35s ease}
    .portfolio-card:hover img{transform:scale(1.025)}
    .portfolio-card--portrait img{object-position:center 35%}
    .portfolio-card--sword img{object-fit:contain;background:#e9e9e6;padding:10px}
    .portfolio-card--print img{object-position:center 55%}
    .portfolio-caption{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 16px 17px}
    .portfolio-caption strong{font:500 1.15rem Georgia,serif}
    .portfolio-caption span{flex-shrink:0;color:#61716b;font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
    .process-showcase{background:#edf2ff}
    .process-layout{display:grid;grid-template-columns:.8fr 1.2fr;gap:28px;align-items:start}
    .process-photo{position:sticky;top:112px;overflow:hidden;margin:0;border-radius:24px;background:#202638}
    .process-photo img{display:block;width:100%;height:500px;object-fit:cover;object-position:center 60%}
    .process-photo figcaption{padding:14px 17px 17px;color:white;font-size:.82rem}
    .clip-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .clip-card{overflow:hidden;border:1px solid #d9e1f4;border-radius:17px;background:#fff}
    .clip-card video{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#26334c}
    .clip-card figcaption{padding:11px 13px 13px;font-size:.78rem;font-weight:750}
    .clip-card figcaption span{display:block;margin-top:3px;color:#75817d;font-size:.68rem;font-weight:600}
    @media (min-width:681px) and (max-width:860px){.menu-toggle{display:block}.navlinks{display:none;position:absolute;top:78px;left:0;right:0;padding:18px 24px 24px;background:#fbf9f3;border-bottom:1px solid #e7e5dc;box-shadow:0 14px 24px #1725260c;align-items:stretch;gap:0;flex-direction:column}.navlinks.open{display:flex}.navlinks a{padding:12px 0;border-bottom:1px solid #e7e5dc}}
    @media(max-width:860px){.portfolio-card img{height:260px}.process-layout{grid-template-columns:1fr 1.3fr;gap:17px}.process-photo img{height:440px}}
    @media(max-width:680px){.hero-real{min-height:0;border-radius:24px}.hero-real img{height:auto;aspect-ratio:4/4.3;object-position:center 53%}.portfolio-grid{grid-template-columns:1fr 1fr;gap:10px}.portfolio-card{border-radius:15px}.portfolio-card img{height:220px}.portfolio-caption{display:block;padding:11px 12px 13px}.portfolio-caption strong{display:block;font-size:1.03rem}.portfolio-caption span{display:block;margin-top:3px}.process-layout{grid-template-columns:1fr;gap:18px}.process-photo{position:static}.process-photo img{height:280px}.clip-grid{grid-template-columns:1fr 1fr;gap:9px}.clip-card{border-radius:13px}.clip-card figcaption{padding:9px;font-size:.72rem}}
    @media(max-width:410px){.portfolio-grid,.clip-grid{grid-template-columns:1fr}.portfolio-card img{height:270px}}
    @media(prefers-reduced-motion:reduce){.portfolio-card img{transition:none}}
  `;
  document.head.appendChild(style);

  const nav = document.querySelector('.navlinks');
  if (nav && !nav.querySelector('[href="#work"]')) {
    const workLink = document.createElement('a');
    workLink.href = '#work';
    workLink.textContent = 'Our work';
    nav.prepend(workLink);
  }

  const heroArt = document.querySelector('.hero-art');
  if (heroArt) {
    heroArt.innerHTML = `<figure class="hero-real"><img src="assets/IMG_1966.jpg" alt="A black 3D-printed cat figure with bright yellow eyes" width="1824" height="1368" fetchpriority="high"><figcaption><span>A real Tonberry print</span><strong>Small details. Big character.</strong></figcaption></figure>`;
  }

  const hero = document.querySelector('#top');
  if (!hero) return;
  hero.insertAdjacentHTML('afterend', `
    <section class="section portfolio" id="work" aria-labelledby="work-title">
      <div class="wrap">
        <div class="section-head"><div><div class="eyebrow">Made in our studio</div><h2 class="display" id="work-title">A few things we’ve brought to life.</h2></div><p>Character pieces, keepsakes, and experiments from the print bench. This gallery will grow as the studio does.</p></div>
        <div class="portfolio-grid">
          <figure class="portfolio-card portfolio-card--portrait"><img src="assets/IMG_1961.jpg" alt="White 3D-printed sculpted portrait bust" width="1549" height="1600" loading="lazy" decoding="async"><figcaption class="portfolio-caption"><strong>Portrait bust</strong><span>Sculpted figure</span></figcaption></figure>
          <figure class="portfolio-card"><img src="assets/IMG_1963.jpg" alt="Blue-haired character figure assembled from blue, black, and cream printed parts" width="1824" height="1368" loading="lazy" decoding="async"><figcaption class="portfolio-caption"><strong>Character figure</strong><span>Multi-part print</span></figcaption></figure>
          <figure class="portfolio-card"><img src="assets/IMG_1966.jpg" alt="Black 3D-printed cat figure with golden eyes" width="1824" height="1368" loading="lazy" decoding="async"><figcaption class="portfolio-caption"><strong>Little black cat</strong><span>Character print</span></figcaption></figure>
          <figure class="portfolio-card"><img src="assets/IMG_1978.jpeg" alt="White-haired fantasy character figure with gold and blue details" width="1824" height="1368" loading="lazy" decoding="async"><figcaption class="portfolio-caption"><strong>Fantasy figure</strong><span>Colour and detail</span></figcaption></figure>
          <figure class="portfolio-card portfolio-card--sword"><img src="assets/IMG_1976.jpeg" alt="Tall light and dark 3D-printed fantasy sword-style object" width="1069" height="2048" loading="lazy" decoding="async"><figcaption class="portfolio-caption"><strong>Long-form print</strong><span>Prop study</span></figcaption></figure>
          <figure class="portfolio-card portfolio-card--print"><img src="assets/IMG_6515.jpg" alt="Colourful sculptural model being 3D-printed in a printer" width="1368" height="1824" loading="lazy" decoding="async"><figcaption class="portfolio-caption"><strong>Mid-print</strong><span>From the print bench</span></figcaption></figure>
        </div>
      </div>
    </section>
    <section class="section process-showcase" id="making" aria-labelledby="making-title">
      <div class="wrap">
        <div class="section-head"><div><div class="eyebrow">Behind the layers</div><h2 class="display" id="making-title">A little studio time.</h2></div><p>Watch a few moments from the making process. The clips play muted and loop while you browse.</p></div>
        <div class="process-layout">
          <div class="clip-grid">
            <figure class="clip-card"><video muted loop playsinline preload="none"><source src="assets/video_2026-09-22_21-46-14_4.MP4" type="video/mp4"><a href="assets/video_2026-09-22_21-46-14_4.MP4">Open this studio clip</a></video><figcaption>Studio clip 1</figcaption></figure>
            <figure class="clip-card"><video muted loop playsinline preload="none"><source src="assets/video_2026-09-25_21-44-35_4.MP4" type="video/mp4"><a href="assets/video_2026-09-25_21-44-35_4.MP4">Open this studio clip</a></video><figcaption>Studio clip 2</figcaption></figure>
            <figure class="clip-card"><video muted loop playsinline preload="none"><source src="assets/video_2026-09-27_18-39-43_4.MP4" type="video/mp4"><a href="assets/video_2026-09-27_18-39-43_4.MP4">Open this studio clip</a></video><figcaption>Studio clip 3</figcaption></figure>
            <figure class="clip-card"><video muted loop playsinline preload="none"><source src="assets/video_2026-09-29_19-29-45_4.MP4" type="video/mp4"><a href="assets/video_2026-09-29_19-29-45_4.MP4">Open this studio clip</a></video><figcaption>Studio clip 4</figcaption></figure>
          </div>
        </div>
        <p class="fineprint">The clips play muted and loop while you browse.</p>
      </div>
    </section>`);
})();
