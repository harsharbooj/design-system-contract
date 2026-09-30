/* ---------- shared nav include ---------- */
fetch("nav.html").then(r=>r.text()).then(html=>{
  const tmp=document.createElement("div");
  tmp.innerHTML=html;
  document.getElementById("nav-mount").replaceWith(tmp.querySelector("header"), tmp.querySelector(".scrim"));
  document.getElementById("sidebar-mount").replaceWith(tmp.querySelector("aside"));

  const here=location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll(".nav-item").forEach(a=>{ if(a.getAttribute("href")===here) a.classList.add("active"); });

  /* ---------- theme ---------- */
  const root=document.documentElement, sun=document.getElementById("ic-sun"), moon=document.getElementById("ic-moon");
  function curTheme(){ const s=root.getAttribute("data-theme"); if(s) return s; return matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"; }
  function paintToggle(){ const dark=curTheme()==="dark"; sun.style.display=dark?"none":"block"; moon.style.display=dark?"block":"none"; }
  paintToggle();
  document.getElementById("themeBtn").addEventListener("click",()=>{ const next=curTheme()==="dark"?"light":"dark"; root.setAttribute("data-theme",next); try{localStorage.setItem("ds-theme",next);}catch(e){} paintToggle(); });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change",paintToggle);

  /* ---------- mobile nav ---------- */
  const body=document.body;
  document.getElementById("menuBtn").addEventListener("click",()=>body.classList.toggle("nav-open"));
  document.getElementById("scrim").addEventListener("click",()=>body.classList.remove("nav-open"));
});

/* ---------- segmented control wiring (shared by component playgrounds) ---------- */
function wireSegs(selector,st,render){
  document.querySelectorAll(selector).forEach(seg=>{
    const axis=seg.dataset.axis;
    seg.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
      seg.querySelectorAll('button').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); st[axis]=b.dataset.v; render();
    }));
  });
}

/* ---------- copy contract ---------- */
document.querySelectorAll(".copybtn").forEach(btn=>{
  btn.addEventListener("click",async()=>{
    const el=document.getElementById(btn.dataset.copytarget); if(!el) return;
    try{ await navigator.clipboard.writeText(el.textContent.trim()); const o=btn.innerHTML; btn.innerHTML="Copied"; setTimeout(()=>btn.innerHTML=o,1400); }catch(e){}
  });
});
