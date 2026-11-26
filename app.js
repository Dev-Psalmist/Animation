(() => {
  const BASE = 'https://reel-ref-try-the-look.vercel.app/assets/';
  const SHOP = 'https://nike-makknzjs.myshopify.com';
  const variants = {
    'tatum-5-orbit-copy': ['57015167025457','57015167058225','57015167090993','57015167123761','57015167156529','57015167189297','57015167222065'],
    'tatum-5-orbit': ['57015166730545','57015166763313','57015166796081','57015166828849','57015166861617','57015166894385','57015166927153'],
    'air-jordan-12-retro-copy': ['57015176364337','57015176397105','57015176429873','57015176462641','57015176495409','57015176528177','57015176560945'],
    tshirt: ['56835911582001','56835911614769','56835911647537','56835911680305'],
    sweatshirt: ['56835806396721','56835806429489','56835806462257','56835806495025'],
    'sweatshirt-plus': ['56836143743281','56836143776049','56836143808817','56836143841585'],
    hoodie: ['56836002185521','56836002218289','56836002251057','56836002283825'],
    'hoodie-black': ['56836251681073','56836251713841','56836251746609','56836251779377']
  };
  const products = {
    'tatum-5-orbit-copy': {name:'Air Jordan 12 Retro',vendor:'Nikey | Password: 1',price:149,image:'source-tatum-5-orbit-copy.webp',sizes:['40','41','42','43','44','45','46'],url:SHOP+'/products/tatum-5-orbit-copy',shoe:true},
    tshirt:{name:'Tshirt',vendor:'Nike',price:199,image:'source-tshirt.webp',sizes:['S','L','M','XL'],url:SHOP+'/products/tshirt'},
    sweatshirt:{name:'Sweatshirt',vendor:'Nike',price:199,image:'source-sweatshirt.webp',sizes:['S','L','M','XL'],url:SHOP+'/products/sweatshirt'},
    'tatum-5-orbit':{name:'Tatum 5 Orbit',vendor:'Nikey | Password: 1',price:149,image:'source-tatum-5-orbit.webp',sizes:['40','41','42','43','44','45','46'],url:SHOP+'/products/tatum-5-orbit',shoe:true},
    'hoodie-black':{name:'Hoodie Black',vendor:'Nike',price:199,image:'source-hoodie-black.webp',sizes:['S','L','M','XL'],url:SHOP+'/products/hoodie-black'},
    'sweatshirt-plus':{name:'Sweatshirt Plus',vendor:'Nike',price:199,image:'source-sweatshirt-plus.webp',sizes:['S','L','M','XL'],url:SHOP+'/products/sweatshirt-plus'},
    hoodie:{name:'Hoodie',vendor:'Nike',price:199,image:'source-hoodie.webp',sizes:['S','L','M','XL'],url:SHOP+'/products/hoodie'},
    'air-jordan-12-retro-copy':{name:'Luka 5',vendor:'Nikey | Password: 1',price:149,image:'source-air-jordan-12-retro-copy.webp',sizes:['40','41','42','43','44','45','46'],url:SHOP+'/products/air-jordan-12-retro-copy',shoe:true}
  };
  const looks = [
    {name:'The City Edit',image:'model-1-640.webp',original:'original-look-1.webp',desc:'A charcoal knit and easy denim.',items:['tatum-5-orbit-copy','tshirt','sweatshirt'],pins:[[47,27],[48,58],[45,96]]},
    {name:'Gallery Opening',image:'model-5-640.webp',original:'original-look-5.webp',desc:'A clean white tee and relaxed denim.',items:['tatum-5-orbit','hoodie-black','tshirt'],pins:[[50,28],[48,58],[45,88]],fresh:['hoodie-black']},
    {name:'Gallery Opening',image:'model-4-640.webp',original:'original-look-4.webp',desc:'Olive knitwear. A grounded palette.',items:['sweatshirt-plus','tatum-5-orbit','tshirt'],pins:[[50,28],[48,58],[45,88]],fresh:['tatum-5-orbit']},
    {name:'Studio Day',image:'model-6-640.webp',original:'original-look-6.webp',desc:'Black, white and laid-back denim.',items:['hoodie-black','tatum-5-orbit-copy','tshirt'],pins:[[50,28],[48,58],[45,88]]},
    {name:'Studio Day',image:'model-3-640.webp',original:'original-look-3.webp',desc:'Burgundy layers. A tailored perspective.',items:['sweatshirt','tatum-5-orbit','tshirt'],pins:[[50,28],[48,58],[45,88]]},
    {name:'Studio Day',image:'model-2-640.webp',original:'original-look-2.webp',desc:'A grey crew and your favourite denim.',items:['hoodie','air-jordan-12-retro-copy','tshirt'],pins:[[50,28],[48,58],[45,88]]}
  ];
  const money = n => '$'+n.toFixed(2);
  const section = document.querySelector('runway-section');
  if (!section) return;

  class RunwaySection extends HTMLElement {
    connectedCallback() {
      if (this.initialized) return;
      this.initialized = true;
      this.index = 0; this.target = 0; this.playing = false; this.engaged = false;
      this.drag = null; this.timer = null; this.frame = null; this.visible = true;
      this.stage = this.querySelector('[data-rw-stage]');
      this.actors = this.querySelector('[data-rw-actors]');
      this.heroes = this.querySelector('[data-rw-heroes]');
      this.ticks = this.querySelector('[data-rw-ticks]');
      this.panels = this.querySelector('[data-rw-panels]');
      this.popup = this.querySelector('[data-rw-popup]');
      this.live = this.querySelector('[data-rw-live]');
      this.build();
      this.measure();
      this.bind();
      this.setIndex(0, true);
      this.observe();
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches && this.dataset.autoplay === 'true') this.play(true);
      requestAnimationFrame(() => this.classList.add('is-ready'));
    }
    build() {
      looks.forEach((look,i) => {
        const model = document.createElement('div');
        model.className = 'rw__model'; model.dataset.rwModel = ''; model.dataset.index = i; model.setAttribute('aria-hidden','true');
        model.innerHTML = '<span class="rw__shadow"></span><div class="rw__figure"><div class="rw__art"><img data-model-image alt="'+look.name+'" src="'+BASE+look.image+'" srcset="'+BASE+look.image+' 640w, '+BASE+look.original+' 1080w" sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px" width="1100" height="1956" loading="eager" decoding="async" draggable="false"><button class="rw__hit" data-rw-go="'+i+'" aria-label="Look '+(i+1)+': '+look.name+'" tabindex="-1"></button></div></div>';
        this.actors.append(model);
        const hero = document.createElement('div');
        hero.className = 'rw__hero'; hero.dataset.rwHero = ''; hero.dataset.index = i; hero.dataset.name = look.name; hero.dataset.label = 'Look '+(i+1)+': '+look.name; hero.dataset.probe = BASE+look.image; hero.setAttribute('aria-hidden',i===0?'false':'true');
        hero.innerHTML = '<div class="rw__morph"><span class="rw__shadow"></span><div class="rw__figure"><div class="rw__art"><img alt="'+look.name+'" src="'+BASE+look.image+'" width="1100" height="1956" loading="eager" decoding="async"><button class="rw__zoom" data-rw-zoom aria-label="View look: '+look.name+'" tabindex="'+(i===0?'0':'-1')+'"></button><div class="rw__pins">'+look.items.map((id,n)=>'<button class="rw__pin" data-rw-pin="'+(n+1)+'" data-product="'+id+'" data-tip="'+products[id].name+'" style="left:'+look.pins[n][0]+'%;top:'+look.pins[n][1]+'%;--pi:'+(n+1)+'" aria-label="'+(n+1)+': '+products[id].name+'" tabindex="-1"><span class="rw__pin-dot">'+(n+1)+'</span></button>').join('')+'</div></div></div></div>';
        this.heroes.append(hero);
        const tick = document.createElement('button'); tick.className='rw__tick'; tick.dataset.rwTick=i; tick.setAttribute('aria-current','false'); tick.setAttribute('aria-label','Look '+(i+1)+': '+look.name);
        tick.innerHTML='<span class="rw__tick-bar"></span><span class="rw__tick-label">0'+(i+1)+'<span class="rw__tick-name">&nbsp;&nbsp;'+look.name+'</span></span>'; this.ticks.append(tick);
        const panel = document.createElement('div'); panel.className='rw__look-panel'; panel.dataset.rwPanel=i; panel.hidden=i!==0;
        panel.innerHTML='<div class="rw__mhead"><span class="rw__mhead-title">'+look.name+'</span><span class="rw__label">3 pieces</span></div><ul class="rw__items" role="list">'+look.items.map((id,n)=>this.productRow(id,n,look)).join('')+'</ul><div class="rw__bundle"><h3 class="rw__bundle-title">Complete the look</h3><p class="rw__bundle-note">Bundle all 3 and save 10%</p><div class="rw__bundle-prices"><s>$547.00</s><strong>$492.30</strong></div><button class="rw__bundle-cta" data-add-full>Add full look — $492.30</button></div><template data-rw-pieces-text>3 pieces</template>';
        this.panels.append(panel);
        const img = hero.querySelector('img'); this.decodeImage(img);
      });
      this.actors.querySelectorAll('img').forEach(img=>this.decodeImage(img));
      [...this.actors.children].forEach(body=>{const clone=body.cloneNode(true);clone.dataset.rwClone='';clone.querySelectorAll('img').forEach(img=>{img.loading='lazy';});this.actors.append(clone);});
    }
    productRow(id,n,look) {
      const p=products[id], fresh=(look.fresh||[]).includes(id);
      return '<li class="rw__item" data-rw-card="'+(n+1)+'" data-product="'+id+'" style="--i:'+(n+1)+'">'+(fresh?'<span class="rw__tag"><span class="rw__tag-text">New</span></span>':'')+
        '<a class="rw__media" href="'+p.url+'" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true"><img src="'+BASE+p.image+'" loading="lazy" decoding="async" alt="" width="400" height="'+(p.shoe?400:(id==='tshirt'?563:id==='sweatshirt'?581:id==='sweatshirt-plus'?610:id==='hoodie'?555:536))+'"><span class="rw__num">'+(n+1)+'</span></a>'+
        '<div class="rw__info"><span class="rw__type">'+p.vendor+'</span><a class="rw__name" href="'+p.url+'" target="_blank" rel="noopener noreferrer">'+p.name+'</a><span class="rw__price">'+money(p.price)+'</span></div>'+
        '<button class="rw__add" data-rw-add aria-expanded="false" aria-label="Choose size for: '+p.name+'">+</button>'+
        '<div class="rw__picker" hidden role="group" aria-label="'+(p.shoe?'Shoe size':'Size')+' for '+p.name+'">'+p.sizes.map((size,j)=>'<button type="button" data-size="'+size+'" data-variant="'+variants[id][j]+'" aria-pressed="'+(j===0?'true':'false')+'">'+size+'</button>').join('')+'<button type="button" class="rw__confirm" data-confirm-piece>Add to bag</button></div></li>';
    }
    decodeImage(img) {
      const reveal=()=>img.classList.add('is-decoded');
      if (img.complete && img.naturalWidth) reveal();
      else if (img.decode) img.decode().then(reveal).catch(()=>{if(img.naturalWidth)reveal();});
      else img.addEventListener('load',reveal,{once:true});
    }
    measure() {
      const phone=innerWidth<=749, header=document.querySelector('.shopify-section-group-header-group');
      const headerH=header?header.getBoundingClientRect().height:88;
      const frame=phone?innerHeight*1.09:Math.max(380,innerHeight-headerH);
      this.style.setProperty('--rw-frame-h',Math.round(frame)+'px');
      const rect=this.stage.getBoundingClientRect(), h=Math.max(200,Math.round(phone?rect.height-42:(rect.height-52)/1.08));
      this.style.setProperty('--rw-model-h',h+'px');
      this.stage.style.setProperty('--rw-hx',(phone?rect.width*.3:rect.width*.5)+'px');
      this.stage.style.setProperty('--rw-hy',(phone?22:34)+'px');
      this.unit=Math.max(phone?90:120,rect.width*(phone?.32:.3));
      this.phone=phone; this.render();
    }
    render() {
      const W=this.stage.clientWidth,H=this.stage.clientHeight,cx=W/2,R=W*.62,P=W*1.65,step=Math.PI/6;
      const cur=this.target, phone=this.phone;
      this.actors.querySelectorAll('.rw__model').forEach((el,a)=>{
        const phi=((a-cur)*step)%(Math.PI*2), wrapped=((phi+Math.PI*3)%(Math.PI*2))-Math.PI;
        const z=R*(1-Math.cos(wrapped)),persp=P/(P+z),slots=Math.abs(wrapped)/step;
        const scale=persp*(1+.08*Math.max(0,1-slots));
        const x=phone?W*(.3+Math.max(-1,Math.min(2,((a-cur+12)%12)))*.32):cx+R*Math.sin(wrapped)*persp;
        const bottom=phone?22+Math.max(0,((a-cur+12)%12))*22:H-(.36*H+(H-34-.36*H)*persp);
        const opacity=phone?Math.max(0,1-.13*Math.max(0,((a-cur+12)%12))):Math.max(0,Math.min(1,(Math.cos(wrapped)+.55)/.3));
        const blur=phone?Math.min(.9*Math.max(0,((a-cur+12)%12)),3.2):Math.min(1.8*slots,6.5);
        const w=el.querySelector('.rw__figure').offsetWidth;
        el.style.transform='translate3d('+x+'px,'+(-bottom)+'px,0) translateX(-50%) scale('+scale+')';
        el.style.opacity=(a===this.index?0:opacity).toFixed(3);el.style.filter=blur>.05?'blur('+blur.toFixed(1)+'px)':'none';el.style.zIndex=String(Math.round(scale*1000));
        el.style.visibility=opacity<.01?'hidden':'visible';
      });
      this.heroes.querySelectorAll('.rw__hero').forEach((hero,i)=>{hero.style.left=(phone?'30%':'50%');hero.style.bottom=(phone?'22px':'34px');hero.style.setProperty('--rw-fs',phone?'1':'1.08')});
    }
    setIndex(i,silent=false) {
      const next=(i+looks.length)%looks.length, changed=next!==this.index;this.index=next;
      this.target=next;this.render();
      this.heroes.querySelectorAll('.rw__hero').forEach((h,j)=>{h.classList.toggle('is-on',j===next);h.setAttribute('aria-hidden',j===next?'false':'true');h.querySelector('[data-rw-zoom]').tabIndex=j===next?0:-1;});
      this.querySelectorAll('[data-rw-panel]').forEach((p,j)=>p.hidden=j!==next);
      this.ticks.querySelectorAll('.rw__tick').forEach((t,j)=>{t.setAttribute('aria-current',j===next?'true':'false');t.classList.toggle('is-past',j<next)});
      this.style.setProperty('--rw-progress',((next+1)/6).toFixed(3));
      this.live.textContent='Look '+(next+1)+': '+looks[next].name;
      if(!silent&&changed){this.popup.hidden=true;this.stage.classList.remove('is-sweep');void this.stage.offsetWidth;this.stage.classList.add('is-sweep');}
      this.restartTimer();
    }
    next(){this.setIndex(this.index+1)}
    prev(){this.setIndex(this.index-1)}
    play(on){this.playing=!!on;const b=this.querySelector('[data-rw-auto]');b.classList.toggle('is-playing',this.playing);b.setAttribute('aria-pressed',String(this.playing));this.restartTimer()}
    restartTimer(){clearTimeout(this.timer);if(this.playing&&!this.engaged)this.timer=setTimeout(()=>{if(this.visible&&!document.hidden&&!this.drag)this.next();else this.restartTimer()},5000)}
    openPopup() {
      this.engaged=true;this.play(false);
      const look=looks[this.index],img=BASE+look.original;
      this.popup.innerHTML='<div class="rw__lb-card"><img src="'+img+'" alt="'+look.name+'"><button class="rw__lb-close" data-popup-close aria-label="Close look">×</button><div class="rw__lb-pins">'+look.items.map((id,n)=>'<button class="rw__pin" data-popup-product="'+id+'" style="left:'+look.pins[n][0]+'%;top:'+look.pins[n][1]+'%" aria-label="'+products[id].name+'"><span class="rw__pin-dot">'+(n+1)+'</span></button>').join('')+'</div></div>';
      this.popup.hidden=false;
    }
    bind() {
      this.querySelector('[data-rw-prev]').addEventListener('click',()=>this.prev());
      this.querySelector('[data-rw-next]').addEventListener('click',()=>this.next());
      this.querySelector('[data-rw-auto]').addEventListener('click',()=>{this.engaged=false;this.play(!this.playing)});
      this.ticks.addEventListener('click',e=>{const t=e.target.closest('[data-rw-tick]');if(t)this.setIndex(Number(t.dataset.rwTick))});
      this.stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();this.next()}if(e.key==='ArrowLeft'){e.preventDefault();this.prev()}if(e.key==='Enter'||e.key===' '){if(e.target===this.stage){e.preventDefault();this.openPopup()}}});
      this.stage.addEventListener('click',e=>{const go=e.target.closest('[data-rw-go]');if(go){this.setIndex(Number(go.dataset.rwGo));return}const pin=e.target.closest('[data-rw-pin]');if(pin){this.engaged=true;this.play(false);this.highlightProduct(Number(pin.dataset.rwPin));return}if(e.target.closest('[data-rw-zoom]'))this.openPopup()});
      this.stage.addEventListener('pointerdown',e=>{if(e.button!==undefined&&e.button!==0)return;this.drag={x:e.clientX,y:e.clientY,start:this.index,moved:false};});
      this.stage.addEventListener('pointerup',e=>{if(!this.drag)return;const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;this.drag=null;if(Math.abs(dx)>30&&Math.abs(dx)>Math.abs(dy)*1.2)this.setIndex(this.index+(dx<0?1:-1))});
      this.stage.addEventListener('pointercancel',()=>this.drag=null);
      this.stage.addEventListener('pointermove',e=>{const c=this.querySelector('[data-rw-cursor]');if(c&&!this.phone){const rect=this.stage.getBoundingClientRect();c.style.left=(e.clientX-rect.left)+'px';c.style.top=(e.clientY-rect.top)+'px'}});
      this.querySelector('[data-rw-panels]').addEventListener('click',e=>{
        const add=e.target.closest('[data-rw-add]');if(add){this.engaged=true;this.play(false);const row=add.closest('.rw__item'),picker=row.querySelector('.rw__picker');picker.hidden=!picker.hidden;if(!picker.hidden&&!picker.dataset.selectedVariant){const first=picker.querySelector('[data-size]');picker.dataset.selectedSize=first.dataset.size;picker.dataset.selectedVariant=first.dataset.variant}add.setAttribute('aria-expanded',String(!picker.hidden));add.textContent=picker.hidden?'+':'−';return}
        const size=e.target.closest('[data-size]');if(size){const picker=size.closest('.rw__picker');picker.querySelectorAll('[data-size]').forEach(b=>b.setAttribute('aria-pressed',String(b===size)));picker.dataset.selectedSize=size.dataset.size;picker.dataset.selectedVariant=size.dataset.variant;return}const confirm=e.target.closest('[data-confirm-piece]');if(confirm){const row=confirm.closest('.rw__item'),picker=row.querySelector('.rw__picker');if(!picker.dataset.selectedVariant){this.toast('Please choose an available size.');return}this.addToBag(row.dataset.product,picker.dataset.selectedSize,picker.dataset.selectedVariant);picker.hidden=true;row.querySelector('[data-rw-add]').textContent='+';row.querySelector('[data-rw-add]').setAttribute('aria-expanded','false');return}
        const full=e.target.closest('[data-add-full]');if(full){const panel=full.closest('.rw__look-panel'),rows=[...panel.querySelectorAll('.rw__item')];const missing=rows.filter(r=>!r.querySelector('.rw__picker').dataset.selectedVariant);if(missing.length){missing.forEach(r=>{r.querySelector('.rw__picker').hidden=false;r.querySelector('[data-rw-add]').textContent='−';r.querySelector('[data-rw-add]').setAttribute('aria-expanded','true')});this.toast('Pick a size for: '+missing.map(r=>products[r.dataset.product].name).join(', '));return}rows.forEach(r=>this.addToBag(r.dataset.product,r.querySelector('.rw__picker').dataset.selectedSize,r.querySelector('.rw__picker').dataset.selectedVariant));this.toast('Full look added to your styling bag');}
      });
      this.popup.addEventListener('click',e=>{if(e.target.closest('[data-popup-close]'))this.popup.hidden=true;const pin=e.target.closest('[data-popup-product]');if(pin){const id=pin.dataset.popupProduct;this.popup.hidden=true;this.highlightProduct(looks[this.index].items.indexOf(id)+1)}});
      this.querySelector('.rw__panel').addEventListener('pointerenter',()=>{if(this.playing){clearTimeout(this.timer)}});
      this.querySelector('.rw__panel').addEventListener('pointerleave',()=>this.restartTimer());
      window.addEventListener('resize',()=>{clearTimeout(this.resizeTimer);this.resizeTimer=setTimeout(()=>this.measure(),120)});
    }
    highlightProduct(n){const row=this.querySelector('[data-rw-panel="'+this.index+'"] [data-rw-card="'+n+'"]');if(!row)return;row.scrollIntoView({behavior:'smooth',block:'center'});row.classList.add('is-hot');setTimeout(()=>row.classList.remove('is-hot'),1500)}
    observe(){const io=new IntersectionObserver(entries=>{this.visible=entries[0].isIntersecting;if(this.visible)this.restartTimer();else clearTimeout(this.timer)},{threshold:0});io.observe(this)}
    toast(message){const el=document.getElementById('bag-status');el.textContent=message;el.classList.add('is-visible');clearTimeout(this.toastTimer);this.toastTimer=setTimeout(()=>el.classList.remove('is-visible'),2600)}
    addToBag(id,size,variant){const bag=JSON.parse(localStorage.getItem('runway-styling-bag-v3')||'[]');const p=products[id];const existing=bag.find(item=>item.variant===variant);if(existing)existing.quantity=Math.min(20,(existing.quantity||1)+1);else bag.push({id,name:p.name,size,variant,quantity:1,price:p.price,image:p.image,url:p.url});localStorage.setItem('runway-styling-bag-v3',JSON.stringify(bag));renderBag();this.toast(p.name+' added to styling bag')}
  }
  if(!customElements.get('runway-section'))customElements.define('runway-section',RunwaySection);
  const bagDialog=document.getElementById('bag-dialog');
  function renderBag(){
    const bag=JSON.parse(localStorage.getItem('runway-styling-bag-v3')||'[]');
    document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=bag.reduce((total,item)=>total+(item.quantity||1),0));
    document.querySelector('[data-bag-items]').innerHTML=bag.length?bag.map((p,i)=>'<div class="bag-row"><img src="'+BASE+p.image+'" alt="'+p.name+'"><div><strong>'+p.name+'</strong><br>Size '+p.size+' · Quantity '+(p.quantity||1)+' · '+money(p.price*(p.quantity||1))+'<br><a href="'+p.url+'" target="_blank" rel="noopener noreferrer">View original piece ↗</a></div><button data-remove-bag="'+i+'" aria-label="Remove '+p.name+'">×</button></div>').join(''):'<p class="bag-empty">Your styling bag is empty.</p>';
    document.querySelector('[data-bag-total]').textContent='Reference subtotal '+money(bag.reduce((sum,p)=>sum+p.price*(p.quantity||1),0));const exportButton=document.querySelector('[data-export-bag]');if(exportButton)exportButton.disabled=!bag.length;
  }
  document.getElementById('open-bag').addEventListener('click',()=>{renderBag();bagDialog.showModal()});
  document.querySelector('[data-close-bag]').addEventListener('click',()=>bagDialog.close());
  document.querySelector('[data-export-bag]').addEventListener('click',()=>{const bag=JSON.parse(localStorage.getItem('runway-styling-bag-v3')||'[]');if(!bag.length)return;const lines=['RUNWAY — STYLING SHORTLIST','Reference prices; no order or payment has been placed.','',...bag.flatMap(p=>[p.name+' · Size '+p.size+' · Quantity '+(p.quantity||1),p.url])];const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='runway-outfit-shortlist.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
  document.querySelector('[data-bag-items]').addEventListener('click',e=>{const b=e.target.closest('[data-remove-bag]');if(!b)return;const bag=JSON.parse(localStorage.getItem('runway-styling-bag-v3')||'[]');bag.splice(Number(b.dataset.removeBag),1);localStorage.setItem('runway-styling-bag-v3',JSON.stringify(bag));renderBag()});
  renderBag();
})();