(() => {
  if (window.__tonberryInteractionsInstalled) return;
  window.__tonberryInteractionsInstalled = true;

  const install = () => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.tonberry-hello').forEach((node) => node.remove());
    const style = document.createElement('style');
    style.textContent = `
      .tonberry-cursor-cat{position:fixed;left:0;top:0;z-index:99999;width:62px;height:62px;display:grid;place-items:center;pointer-events:none;opacity:0;transform:translate(-50%,-48%) rotate(var(--cat-tilt,0deg)) scale(.78);transition:opacity .16s ease,transform .18s ease;will-change:left,top,transform}
      .tonberry-cursor-cat.is-ready{opacity:1;transform:translate(-50%,-48%) rotate(var(--cat-tilt,0deg)) scale(1)}
      .tonberry-cursor-cat svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 3px 4px rgba(29,35,50,.35));animation:tonberry-cat-bob .5s ease-in-out infinite alternate}
      .tonberry-cat-tail{transform-box:view-box;transform-origin:24px 66px;animation:tonberry-tail-wag .38s ease-in-out infinite alternate}
      @keyframes tonberry-cat-bob{to{transform:translateY(-3px) rotate(-2deg)}}
      @keyframes tonberry-tail-wag{to{transform:rotate(18deg)}}
      body.tonberry-cat-cursor-on,body.tonberry-cat-cursor-on a,body.tonberry-cat-cursor-on button,body.tonberry-cat-cursor-on [role="button"]{cursor:none!important}
      body.tonberry-cat-cursor-on input,body.tonberry-cat-cursor-on textarea,[contenteditable="true"]{cursor:text!important}
      .tonberry-hi{position:fixed;z-index:99998;left:16px;bottom:16px;display:flex;align-items:center;gap:10px;max-width:min(310px,calc(100vw - 32px));padding:10px 38px 10px 10px;border:1px solid rgba(40,47,64,.12);border-radius:22px;background:#fffdf8;box-shadow:0 15px 48px rgba(28,38,59,.22);opacity:0;transform:translate3d(-125%,0,0);pointer-events:none;transition:opacity .35s ease,transform .5s cubic-bezier(.2,.8,.2,1)}
      .tonberry-hi.is-visible{opacity:1;transform:translate3d(0,0,0);pointer-events:auto}
      .tonberry-hi svg{width:68px;height:68px;overflow:visible;flex:none;filter:drop-shadow(0 2px 3px rgba(29,35,50,.2));animation:tonberry-cat-bob .65s ease-in-out infinite alternate}
      .tonberry-hi p{margin:0;color:#202638;font:700 14px/1.35 system-ui,sans-serif}
      .tonberry-hi p span{display:block;margin-top:4px;color:#647087;font-weight:500;font-size:12px}
      .tonberry-hi button{position:absolute;right:8px;top:7px;width:26px;height:26px;border:0;border-radius:50%;background:#eef1f6;color:#273249;font:700 17px/1 system-ui,sans-serif;cursor:pointer}
      .tonberry-video-showcase{display:grid;grid-template-columns:minmax(230px,.85fr) minmax(0,1.4fr);gap:clamp(16px,3vw,30px);align-items:stretch;margin:24px 0 42px}
      .tonberry-slideshow{position:relative;min-height:360px;overflow:hidden;border-radius:24px;background:#202637;color:white;box-shadow:0 18px 50px rgba(32,42,64,.16)}
      .tonberry-slideshow img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:1;transition:opacity .28s ease}
      .tonberry-slideshow img.is-changing{opacity:.08}
      .tonberry-slideshow:after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(17,23,38,.78));pointer-events:none}
      .tonberry-slide-caption{position:absolute;z-index:1;left:18px;right:18px;bottom:16px;color:white;font:700 17px/1.3 system-ui,sans-serif;text-shadow:0 2px 10px #182033}
      .tonberry-slide-caption small{display:block;margin-top:5px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.8}
      .tonberry-slide-controls{position:absolute;z-index:2;top:12px;right:12px;display:flex;gap:8px}
      .tonberry-slide-controls button{width:38px;height:38px;border:1px solid rgba(255,255,255,.5);border-radius:50%;background:rgba(27,35,53,.56);color:white;font:600 23px/1 system-ui,sans-serif;cursor:pointer;backdrop-filter:blur(8px)}
      .tonberry-clip-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-content:start}
      .tonberry-clip-grid .clip-card{min-width:0;margin:0;overflow:hidden;border-radius:18px;background:#f3f5f9}
      .tonberry-clip-grid video{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;background:#171b25}
      .tonberry-clip-grid .clip-card figcaption{display:block;padding:9px 12px 11px;color:#273047;font:650 12px/1.4 system-ui,sans-serif}
      @media(max-width:760px){.tonberry-video-showcase{grid-template-columns:1fr}.tonberry-slideshow{min-height:320px}.tonberry-clip-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:420px){.tonberry-clip-grid{grid-template-columns:1fr}}
      @media(prefers-reduced-motion:reduce){.tonberry-cursor-cat,.tonberry-hi,.tonberry-slideshow img{transition:none!important}.tonberry-cursor-cat svg,.tonberry-cat-tail,.tonberry-hi svg{animation:none!important}}
    `;
    document.head.append(style);

    const normalizeBrand = (value) => value.replace(/tonberry\s+studio/gi, 'Tonberry Studio');
    document.title = normalizeBrand(document.title);
    const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (textWalker.nextNode()) {
      const node = textWalker.currentNode;
      if (node.parentElement && node.parentElement.closest('script,style')) continue;
      node.nodeValue = normalizeBrand(node.nodeValue);
    }
    document.querySelectorAll('[alt],[title],[aria-label],[placeholder],meta[content]').forEach((element) => {
      ['alt','title','aria-label','placeholder','content'].forEach((attribute) => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, normalizeBrand(element.getAttribute(attribute)));
      });
    });

    const catDrawing = '<svg viewBox="0 0 96 96" role="presentation"><path class="tonberry-cat-tail" d="M25 67C8 77 8 60 17 55c5-3 10 0 11 5" fill="none" stroke="#e78532" stroke-width="8" stroke-linecap="round"/><path d="M24 72c0-15 11-25 29-25 17 0 27 10 27 25v8H24z" fill="#ed913f" stroke="#703e25" stroke-width="2.5"/><ellipse cx="53" cy="68" rx="12" ry="13" fill="#fff3df"/><circle cx="36" cy="78" r="7" fill="#fff3df" stroke="#703e25" stroke-width="2"/><circle cx="68" cy="78" r="7" fill="#fff3df" stroke="#703e25" stroke-width="2"/><path d="M27 39 29 14l20 17c5-2 10-2 15 0l19-17 1 26c0 16-12 27-29 27S27 55 27 39Z" fill="#ed913f" stroke="#703e25" stroke-width="2.7" stroke-linejoin="round"/><path d="m34 23 10 9-12 3zM73 23 63 32l12 3z" fill="#f6b4a4"/><ellipse cx="40" cy="43" rx="3.2" ry="4.4" fill="#35271f"/><ellipse cx="61" cy="43" rx="3.2" ry="4.4" fill="#35271f"/><ellipse cx="50.5" cy="51" rx="10" ry="7" fill="#fff3df"/><path d="m48 49 2.5-2 2.5 2-2.5 2.2z" fill="#d87572"/><path d="M50.5 51.5v3m0 0c-2.2 2-4.3 2-6 0m6 0c2.2 2 4.3 2 6 0" fill="none" stroke="#6b4434" stroke-width="1.5" stroke-linecap="round"/><path d="m40 52-9-1m9 4-9 2m31-5 9-1m-9 4 9 2" stroke="#6b4434" stroke-width="1.2" stroke-linecap="round"/></svg>';
    const cursorCat = document.createElement('div');
    cursorCat.className = 'tonberry-cursor-cat';
    cursorCat.setAttribute('aria-hidden', 'true');
    cursorCat.innerHTML = catDrawing;
    const interactionRoot = document.getElementById('tonberry-site') || document.body;
    interactionRoot.append(cursorCat);
    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let lastX = targetX;
    let lastY = targetY;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const follow = reducedMotion ? 1 : .36;
      currentX += (targetX - currentX) * follow;
      currentY += (targetY - currentY) * follow;
      cursorCat.style.left = `${currentX}px`;
      cursorCat.style.top = `${currentY}px`;
      if (Math.abs(targetX-currentX) + Math.abs(targetY-currentY) > .5) raf = requestAnimationFrame(paint);
    };
    const showCursorAt = (event) => {
      if (event.pointerType === 'touch') return;
      targetX = currentX = event.clientX;
      targetY = currentY = event.clientY;
      cursorCat.style.left = `${currentX}px`;
      cursorCat.style.top = `${currentY}px`;
      document.body.classList.add('tonberry-cat-cursor-on');
      cursorCat.classList.add('is-ready');
    };
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      if (!cursorCat.classList.contains('is-ready')) showCursorAt(event);
      targetX = event.clientX;
      targetY = event.clientY;
      const dx = targetX - lastX;
      const dy = targetY - lastY;
      cursorCat.style.setProperty('--cat-tilt', `${Math.max(-14,Math.min(14,dx*.18 + dy*.1))}deg`);
      lastX = targetX;
      lastY = targetY;
      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive:true });
    document.documentElement.addEventListener('pointerleave', () => {
      cursorCat.classList.remove('is-ready');
      document.body.classList.remove('tonberry-cat-cursor-on');
    });
    document.documentElement.addEventListener('pointerenter', showCursorAt);

    const hello = document.createElement('aside');
      hello.className = 'tonberry-hi';
      hello.setAttribute('aria-live', 'polite');
      hello.innerHTML = catDrawing+'<p>Hi, we’re Tonberry!<span>Toronto-made ideas, in 3D.</span></p><button type="button" aria-label="Dismiss cat greeting">×</button>';
      interactionRoot.append(hello);
      let idleTimer;
      let hideTimer;
      let dismissed = false;
      const hide = () => hello.classList.remove('is-visible');
      const scheduleHello = () => {
        clearTimeout(idleTimer);
        clearTimeout(hideTimer);
        if (dismissed || hello.matches(':hover') || hello.contains(document.activeElement)) return;
        hide();
        idleTimer = setTimeout(() => {
          hello.classList.add('is-visible');
          hideTimer = setTimeout(() => {
            if (!hello.matches(':hover') && !hello.contains(document.activeElement)) hide();
          }, 6500);
      }, 4500);
    };
      ['pointermove','keydown','scroll'].forEach((name) => window.addEventListener(name, scheduleHello, {passive:true}));
    hello.querySelector('button').addEventListener('click', () => { dismissed = true; hide(); });
    scheduleHello();

    const photoSet = [
      { src:'assets/IMG_1961.jpg', alt:'White 3D-printed portrait bust with sculpted curls', label:'A portrait in fine detail' },
      { src:'assets/IMG_1963.jpg', alt:'Blue and black 3D-printed character figure', label:'A colourful character build' },
      { src:'assets/IMG_1966.jpg', alt:'Black cat-shaped 3D-printed planter', label:'A cat-shaped desk companion' },
      { src:'assets/IMG_1976.jpeg', alt:'Long twisted 3D-printed fantasy prop', label:'A fantasy prop study' },
      { src:'assets/IMG_1978.jpeg', alt:'White-haired fantasy character figure', label:'A character brought to life' },
      { src:'assets/IMG_6515.jpg', alt:'Colourful sculpture printing inside a 3D printer', label:'A print taking shape' }
    ];
    let visibleVideoNumber = 0;
    const cards = Array.from(document.querySelectorAll('.clip-card')).filter((card) => {
      const video = card.querySelector('video');
      if (!video) return false;
      const refs = [video.getAttribute('src'), ...Array.from(video.querySelectorAll('source,a'), (item) => item.getAttribute('src') || item.getAttribute('href'))].filter(Boolean);
      if (refs.some((ref) => /IMG_1967\.MOV/i.test(ref))) { card.remove(); return false; }
      video.removeAttribute('controls');
      video.controls = false;
      video.autoplay = false;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('muted','');
      video.setAttribute('loop','');
      video.setAttribute('playsinline','');
      video.removeAttribute('autoplay');
      video.setAttribute('preload','none');
      const source = video.querySelector('source');
      const ref = source?.getAttribute('src') || video.getAttribute('src') || '';
      const caption = card.querySelector('figcaption');
      if (caption) caption.textContent = `Studio clip ${++visibleVideoNumber}`;
      if (!video.dataset.tonberryPlaybackReady) {
        video.dataset.tonberryPlaybackReady = 'true';
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) video.play().catch(() => {});
              else video.pause();
            });
          }, {rootMargin:'120px 0px'});
          observer.observe(video);
        } else {
          video.play().catch(() => {});
        }
      }
      return true;
    });

    if (!cards.length) return;
    const section = cards[0].closest('section');
    if (!section || section.querySelector('.tonberry-video-showcase')) return;
    const showcase = document.createElement('div');
    showcase.className = 'tonberry-video-showcase';
    const slideshow = document.createElement('div');
    slideshow.className = 'tonberry-slideshow';
    slideshow.setAttribute('aria-label','Tonberry Studio project photo slideshow');
    slideshow.innerHTML = '<img src="'+photoSet[0].src+'" alt="'+photoSet[0].alt+'"><div class="tonberry-slide-caption"><span>'+photoSet[0].label+'</span><small>Made in Toronto · Our work</small></div><div class="tonberry-slide-controls"><button type="button" data-step="-1" aria-label="Previous photo">‹</button><button type="button" data-step="1" aria-label="Next photo">›</button></div>';
    const clipGrid = document.createElement('div');
    clipGrid.className = 'tonberry-clip-grid';
    const oldParents = new Set(cards.map((card) => card.parentElement));
    cards.forEach((card) => clipGrid.append(card));
    oldParents.forEach((parent) => {
      if (parent !== section && parent.children.length === 0 && !parent.textContent.trim()) parent.remove();
    });
    showcase.append(slideshow,clipGrid);
    const heading = Array.from(section.querySelectorAll('h2,h3')).find((node) => !node.closest('.clip-card'));
    if (heading) heading.insertAdjacentElement('afterend',showcase);
    else section.prepend(showcase);

    let current = 0;
    const image = slideshow.querySelector('img');
    const caption = slideshow.querySelector('.tonberry-slide-caption span');
    const show = (delta) => {
      current = (current + delta + photoSet.length) % photoSet.length;
      const next = photoSet[current];
      image.classList.add('is-changing');
      setTimeout(() => {
        image.src = next.src;
        image.alt = next.alt;
        caption.textContent = next.label;
        image.classList.remove('is-changing');
      }, reducedMotion ? 0 : 180);
    };
    slideshow.querySelectorAll('[data-step]').forEach((button) => button.addEventListener('click', () => show(Number(button.dataset.step))));
    if (!reducedMotion) setInterval(() => {
      if (!document.hidden && !slideshow.matches(':hover') && !slideshow.contains(document.activeElement)) show(1);
    }, 4200);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, {once:true});
  else install();
})();
