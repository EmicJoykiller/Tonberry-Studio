(() => {
  const install = () => {
    const style = document.createElement('style');
    style.textContent = `
      .hero-logo-card{position:relative;display:block;width:100%;aspect-ratio:1;margin:0;padding:0;overflow:hidden;border:0;border-radius:0;background:transparent;box-shadow:none}
      .hero-logo-card:before,.hero-logo-card:after{content:none;display:none}
      .hero-logo-card img{display:block;width:100%;height:100%;max-height:none;object-fit:cover;object-position:center;filter:none}
      #tonberry-site .hero{display:block!important}
      .hero-art{position:relative;width:100%!important;height:auto!important;min-height:0!important;max-width:none!important;display:block!important;overflow:visible!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;isolation:auto!important}
      .hero-art:before,.hero-art:after{content:none!important;display:none!important}
      .hero-art>.hero-logo-card{width:100%!important;height:auto!important;aspect-ratio:1!important}
      .keyring img{display:block;width:76px;height:76px;object-fit:contain}
      .tonberry-hello{position:fixed;z-index:10000;right:22px;bottom:20px;display:flex;align-items:center;gap:12px;width:min(330px,calc(100vw - 32px));padding:12px 42px 12px 12px;border:1px solid rgba(36,46,62,.12);border-radius:22px;background:#fffdf8;box-shadow:0 18px 56px rgba(22,35,57,.2);opacity:0;transform:translate3d(115%,0,0);pointer-events:none;transition:transform .55s cubic-bezier(.2,.8,.2,1),opacity .35s ease}
      .tonberry-hello.is-visible{opacity:1;transform:translate3d(0,0,0);pointer-events:auto}
      .tonberry-hello img{width:76px;height:76px;flex:none;object-fit:contain}
      .tonberry-hello p{margin:0;color:#252b39;font:600 15px/1.35 sans-serif}
      .tonberry-hello p span{display:block;margin-top:4px;color:#657087;font-size:12px;font-weight:500}
      .tonberry-hello button{position:absolute;right:10px;top:8px;width:28px;height:28px;border:0;border-radius:50%;background:#f1f3f8;color:#31394a;font:700 18px/1 sans-serif;cursor:pointer}
      @media (max-width:600px){.hero-art{width:100%!important;min-height:0!important}.hero-logo-card{width:min(100%,440px)!important;margin-inline:auto}.tonberry-hello{right:12px;bottom:12px}}
      @media (max-width:680px){#tonberry-site .hero-copy{width:100%;min-width:0}#tonberry-site .hero h1{max-width:100%;font-size:clamp(2.25rem,9.5vw,3rem)!important;line-height:1.04;white-space:normal;overflow-wrap:anywhere}#tonberry-site .hero h1 em{display:block;font-size:inherit!important;white-space:normal!important}#tonberry-site .hero-copy>p{width:100%;max-width:100%;font-size:15px;white-space:normal;overflow-wrap:anywhere}#tonberry-site .hero-actions{display:grid!important;grid-template-columns:minmax(0,1fr)!important;flex-wrap:wrap!important;justify-items:start;gap:10px}#tonberry-site .hero-actions .button{max-width:100%;white-space:normal}}
      @media (prefers-reduced-motion:reduce){.tonberry-hello{transition:none}}
    `;
    document.head.append(style);

    const hero = document.querySelector('.hero-art');
    if (hero) {
      hero.innerHTML = '<figure class="hero-logo-card"><img src="assets/tonberry-studio-banner.png" alt="Tonberry Studio logo artwork featuring the orange and tuxedo cats"></figure>';
    }

    document.querySelectorAll('.keyring').forEach((badge) => {
      badge.innerHTML = '<img src="assets/tonberry-cat-logo.png" alt="Tonberry Studio cats logo">';
    });

    document.querySelectorAll('video').forEach((video) => {
      const mediaRefs = [video.getAttribute('src'), ...Array.from(video.querySelectorAll('source,a'), (item) => item.getAttribute('src') || item.getAttribute('href'))].filter(Boolean);
      if (mediaRefs.some((ref) => /(?:^|\/)IMG_1967\.MOV(?:[?#]|$)/i.test(ref))) {
        (video.closest('.clip-card') || video.closest('figure') || video).remove();
      }
    });

    document.querySelectorAll('.poss-card').forEach((card, index) => {
      if (index !== 2) return;
      const heading = card.querySelector('h2,h3,h4');
      const paragraph = card.querySelector('p');
      if (heading) heading.textContent = 'Make it yours';
      if (paragraph) paragraph.textContent = 'We do custom design, too. Bring us your idea—anything you want to make—and we’ll help shape it into a one-of-a-kind print for your PC, shelf, desk, or any small space.';
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const replacements = new Map([
      ['Long-form print', 'Cosplay props'],
      ['Long-form Print', 'Cosplay props'],
      ['Mid-print', 'PC & small-space pieces'],
      ['Mid Print', 'PC & small-space pieces']
    ]);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const updated = replacements.get(node.nodeValue.trim());
      if (updated) node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), updated);
    }

    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const hello = document.createElement('aside');
      hello.className = 'tonberry-hello';
      hello.setAttribute('aria-live', 'polite');
      hello.setAttribute('aria-label', 'A greeting from Tonberry Studio');
      hello.innerHTML = '<img src="assets/tonberry-cat-logo.png" alt=""><p>Hi, we’re Tonberry!<span>Toronto-made ideas, in 3D.</span></p><button type="button" aria-label="Dismiss cat greeting">×</button>';
      document.body.append(hello);
      let timer;
      let dismissed = false;
      const hide = () => hello.classList.remove('is-visible');
      const schedule = () => {
        clearTimeout(timer);
        if (hello.matches(':hover') || hello.contains(document.activeElement)) return;
        hide();
        if (dismissed) return;
        timer = setTimeout(() => {
          hello.classList.add('is-visible');
          setTimeout(() => {
            if (!hello.matches(':hover') && !hello.contains(document.activeElement)) hide();
          }, 7000);
        }, 7000);
      };
      ['pointermove', 'keydown', 'scroll', 'touchstart'].forEach((eventName) => window.addEventListener(eventName, schedule, { passive: true }));
      hello.querySelector('button').addEventListener('click', () => { dismissed = true; hide(); });
      schedule();
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();
