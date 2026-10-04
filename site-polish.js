(() => {
  const install = () => {
    const style = document.createElement('style');
    style.textContent = `
      .hero-logo-card{position:relative;display:grid;place-items:center;min-height:360px;margin:0;padding:clamp(18px,3vw,34px);overflow:hidden;border-radius:28px;background:linear-gradient(145deg,#fffaf0 0%,#fff 58%,#edf5ff 100%);box-shadow:0 24px 70px rgba(31,53,91,.12)}
      .hero-logo-card:before,.hero-logo-card:after{content:"";position:absolute;border-radius:50%;pointer-events:none}
      .hero-logo-card:before{width:150px;height:150px;right:-52px;top:-52px;background:#ffd451;opacity:.42}
      .hero-logo-card:after{width:110px;height:110px;left:-42px;bottom:-44px;background:#ff796e;opacity:.28}
      .hero-logo-card img{position:relative;z-index:1;width:min(100%,480px);max-height:410px;object-fit:contain;filter:drop-shadow(0 14px 20px rgba(39,43,58,.1))}
      .keyring img{display:block;width:76px;height:76px;object-fit:contain}
      .tonberry-hello{position:fixed;z-index:10000;right:22px;bottom:20px;display:flex;align-items:center;gap:12px;width:min(330px,calc(100vw - 32px));padding:12px 42px 12px 12px;border:1px solid rgba(36,46,62,.12);border-radius:22px;background:#fffdf8;box-shadow:0 18px 56px rgba(22,35,57,.2);opacity:0;transform:translate3d(115%,0,0);pointer-events:none;transition:transform .55s cubic-bezier(.2,.8,.2,1),opacity .35s ease}
      .tonberry-hello.is-visible{opacity:1;transform:translate3d(0,0,0);pointer-events:auto}
      .tonberry-hello img{width:76px;height:76px;flex:none;object-fit:contain}
      .tonberry-hello p{margin:0;color:#252b39;font:600 15px/1.35 sans-serif}
      .tonberry-hello p span{display:block;margin-top:4px;color:#657087;font-size:12px;font-weight:500}
      .tonberry-hello button{position:absolute;right:10px;top:8px;width:28px;height:28px;border:0;border-radius:50%;background:#f1f3f8;color:#31394a;font:700 18px/1 sans-serif;cursor:pointer}
      @media (max-width:600px){.hero-logo-card{min-height:270px;border-radius:22px}.tonberry-hello{right:12px;bottom:12px}}
      @media (prefers-reduced-motion:reduce){.tonberry-hello{transition:none}}
    `;
    document.head.append(style);

    const hero = document.querySelector('.hero-art');
    if (hero) {
      hero.innerHTML = '<figure class="hero-logo-card"><img src="assets/logo-refined.svg" alt="Tonberry Studio logo: two cats curled together and touching paws"></figure>';
    }

    document.querySelectorAll('.keyring').forEach((badge) => {
      badge.innerHTML = '<img src="assets/tonberry-cat-mark.svg" alt="Tonberry Studio cat logo">';
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
      hello.innerHTML = '<img src="assets/tonberry-cat-mark.svg" alt=""><p>Hi, we’re Tonberry!<span>Toronto-made ideas, in 3D.</span></p><button type="button" aria-label="Dismiss cat greeting">×</button>';
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
