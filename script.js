'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#service').value=link.dataset.service;}));
const slider=document.querySelector('.comparison-stage input');
slider.addEventListener('input',()=>slider.parentElement.style.setProperty('--split',slider.value+'%'));
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
const form=document.querySelector('#quote-form');
let summary='';
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);summary=`APEX AUTO DETAIL — QUOTE REQUEST\n\nName: ${data.get('name').trim()}\nPhone: ${data.get('phone').trim()}\nVehicle: ${data.get('vehicle')}\nService: ${data.get('service')}\nMessage: ${data.get('message').trim()||'None'}\n\nDemo only — not submitted or booked.`;document.querySelector('#request-summary').textContent=summary;const result=document.querySelector('#form-result');result.hidden=false;document.querySelector('#copy-status').textContent='';result.focus();});
document.querySelector('#copy-request').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(summary);status.textContent='Request copied.';}catch{status.textContent='Copy is unavailable in this browser. Select and copy the request text above.';const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(document.querySelector('#request-summary'));selection.removeAllRanges();selection.addRange(range);}});
