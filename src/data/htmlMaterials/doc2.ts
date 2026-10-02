export const doc2Html = `<!doctype html>
<html lang="ta">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#14213d">
<title>NMMS - SAT - கணிதம் | வகுப்பு 8 | அளவைகள்</title>
<style>
:root{
 --ink:#172033;--muted:#60708a;--paper:#fff;--bg:#f4f8ff;--blue:#2563eb;--cyan:#06b6d4;
 --green:#16a34a;--amber:#f59e0b;--red:#ef4444;--violet:#7c3aed;--pink:#db2777;
 --shadow:0 16px 40px rgba(24,39,75,.10);--r:24px;
}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:"Noto Sans Tamil","Latha","Nirmala UI",system-ui,sans-serif;color:var(--ink);
background:
radial-gradient(circle at 10% 5%,#dff7ff 0 10%,transparent 26%),
radial-gradient(circle at 90% 10%,#efe4ff 0 10%,transparent 28%),var(--bg);line-height:1.65}
button,input{font:inherit}.skip{position:absolute;left:-999px}.skip:focus{left:12px;top:12px;z-index:99;background:#fff;padding:10px}
.hero{min-height:92vh;display:grid;place-items:center;padding:78px 18px 54px;position:relative;overflow:hidden;
background:linear-gradient(135deg,#0f172a,#172554 46%,#0e7490);color:#fff}
.hero:before,.hero:after{content:"";position:absolute;border:1px solid #ffffff25;border-radius:50%}
.hero:before{width:430px;height:430px;left:-160px;top:-120px}.hero:after{width:600px;height:600px;right:-260px;bottom:-280px}
.hero-inner{width:min(1120px,100%);display:grid;grid-template-columns:1.15fr .85fr;gap:40px;align-items:center;z-index:1}
.badge{display:inline-flex;gap:8px;align-items:center;padding:8px 14px;border-radius:999px;background:#ffffff17;border:1px solid #ffffff2c;font-weight:800}
.hero h1{font-size:clamp(2.3rem,6vw,5rem);line-height:1.08;margin:18px 0 8px}.hero h2{font-size:clamp(1.25rem,2.5vw,2rem);margin:0 0 12px;color:#a5f3fc}
.hero p{max-width:700px;color:#dbeafe;font-size:1.08rem}.cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
.btn{border:0;border-radius:14px;padding:12px 18px;font-weight:900;cursor:pointer;transition:.2s;min-height:48px}
.btn:hover{transform:translateY(-2px)}.btn:focus-visible{outline:4px solid #facc15;outline-offset:3px}
.btn.primary{background:#facc15;color:#172033}.btn.ghost{background:#ffffff14;color:#fff;border:1px solid #ffffff40}
.geo{height:420px;position:relative}.circle{position:absolute;border-radius:50%;border:5px solid #67e8f9;width:240px;height:240px;left:70px;top:70px}
.radius{position:absolute;width:112px;height:4px;background:#facc15;left:190px;top:188px;transform:rotate(-34deg);transform-origin:left}
.sector{position:absolute;width:105px;height:105px;border-radius:0 100% 0 0;background:#a78bfa99;left:190px;top:85px}
.square{position:absolute;width:100px;height:100px;border:4px solid #fda4af;right:12px;bottom:38px;transform:rotate(12deg)}
.cube{position:absolute;left:5px;bottom:20px;width:100px;height:100px;border:4px solid #86efac}
.cube:before{content:"";position:absolute;width:100%;height:100%;border:4px solid #86efac;left:22px;top:-22px}.cube:after{content:"";position:absolute;width:28px;height:4px;background:#86efac;left:82px;top:-13px;transform:rotate(-45deg);box-shadow:-83px 83px 0 #86efac,-83px -1px 0 #86efac,0 83px 0 #86efac}
.formula-float{position:absolute;padding:10px 14px;background:#fff;color:#172033;border-radius:14px;font-weight:900;box-shadow:var(--shadow)}
.f1{right:15px;top:28px}.f2{left:10px;top:240px}.f3{right:35px;top:260px}
.progress-wrap{position:fixed;z-index:50;top:12px;right:12px;background:#ffffffee;border:1px solid #dbeafe;box-shadow:var(--shadow);border-radius:18px;padding:10px 12px;width:190px;color:var(--ink)}
.progress-top{display:flex;justify-content:space-between;font-size:.8rem;font-weight:900}.bar{height:9px;background:#e5e7eb;border-radius:999px;overflow:hidden;margin-top:6px}.bar>i{display:block;height:100%;width:0;background:linear-gradient(90deg,#22c55e,#06b6d4)}
nav{position:sticky;top:0;z-index:40;background:#ffffffeb;backdrop-filter:blur(12px);border-bottom:1px solid #dbeafe;overflow:auto;white-space:nowrap;padding:10px 12px}
nav a{display:inline-block;text-decoration:none;color:#334155;font-weight:900;padding:9px 12px;border-radius:12px}nav a:hover{background:#e0f2fe}
main{width:min(1160px,calc(100% - 28px));margin:auto;padding:36px 0 80px}.section{scroll-margin-top:76px;margin:34px 0}
.kicker{font-size:.82rem;font-weight:1000;letter-spacing:.08em;text-transform:uppercase;color:var(--blue)}
h2.section-title{font-size:clamp(1.7rem,3vw,2.6rem);margin:4px 0 18px}.lead{font-size:1.08rem;color:#475569;max-width:900px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.card{background:#fff;border:1px solid #e6eefb;border-radius:var(--r);padding:22px;box-shadow:var(--shadow);position:relative;overflow:hidden}
.card h3{margin:0 0 8px}.card .icon{font-size:2rem}.tag{display:inline-block;padding:4px 9px;border-radius:999px;background:#eef2ff;color:#4338ca;font-weight:900;font-size:.78rem}
.concept{border-top:5px solid var(--blue)}.experiment{border-top:5px solid var(--green)}.warning{border-top:5px solid var(--red)}.exam{border-top:5px solid var(--amber)}.quizc{border-top:5px solid var(--violet)}
.bigq{background:linear-gradient(135deg,#fff7ed,#fef3c7);border:1px solid #fde68a;border-radius:28px;padding:26px}
.visual-lab{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center}.sim{background:#0f172a;color:#fff;border-radius:24px;padding:20px;min-height:330px}
.sim-stage{height:220px;display:grid;place-items:center;position:relative}.sim-circle{border-radius:50%;background:#22d3ee22;border:4px solid #67e8f9;position:relative;transition:.25s}
.sim-circle:after{content:"r";position:absolute;left:50%;top:50%;height:3px;width:50%;background:#facc15;color:#fff;transform-origin:left}.controls label{font-weight:900}.controls input{width:100%}
.metric{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}.metric div{background:#ffffff12;border-radius:14px;padding:10px;text-align:center}.metric b{display:block;font-size:1.25rem;color:#fde047}
.formula{font-family:Cambria,Georgia,serif;font-size:1.35rem;background:#eef6ff;padding:12px 14px;border-radius:14px;display:inline-block;margin:5px 0}
.table-wrap{overflow:auto;border-radius:18px;border:1px solid #dbeafe}table{width:100%;border-collapse:collapse;background:#fff;min-width:650px}th,td{padding:12px;border-bottom:1px solid #e5e7eb;text-align:center}th{background:#eff6ff}
.flash{cursor:pointer;min-height:170px;display:grid;place-items:center;text-align:center}.flash .back{display:none}.flash.flipped .front{display:none}.flash.flipped .back{display:block}
.accordion button{width:100%;text-align:left;background:#fff;border:0;padding:14px;font-weight:900;cursor:pointer}.accordion .body{display:none;padding:0 14px 14px}.accordion.open .body{display:block}
.poly-stage{display:flex;align-items:center;justify-content:center;min-height:220px;background:#f8fafc;border-radius:20px}.poly-stage svg{max-width:260px}
.euler{font-size:clamp(2rem,5vw,4rem);font-weight:1000;text-align:center;color:#4338ca}.viewbox{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.view{min-height:150px;border:2px dashed #93c5fd;border-radius:16px;display:grid;place-items:center;text-align:center;background:#eff6ff}
.q{padding:18px;border:1px solid #e5e7eb;border-radius:18px;margin:14px 0;background:#fff}.options{display:grid;gap:8px;margin-top:10px}.option{border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:10px;text-align:left;cursor:pointer}.option.correct{background:#dcfce7;border-color:#22c55e}.option.wrong{background:#fee2e2;border-color:#ef4444}.feedback{font-weight:900;margin-top:8px;min-height:24px}
.timer{font-size:2rem;font-weight:1000}.challenge-head{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}
.mini-progress{height:12px;background:#e5e7eb;border-radius:99px;overflow:hidden}.mini-progress i{display:block;height:100%;background:#7c3aed;width:0}
.map{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap}.node{padding:14px 16px;border-radius:16px;background:#fff;border:2px solid #bfdbfe;font-weight:900;box-shadow:var(--shadow)}.arrow{font-size:1.7rem;color:#2563eb}
.revision{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.revision div{padding:12px 14px;border-radius:14px;background:#fff;border-left:5px solid #06b6d4}
footer{background:#0f172a;color:#dbeafe;padding:42px 18px;text-align:center}footer strong{color:#fff}
.small{font-size:.88rem;color:var(--muted)}.note{background:#fff7ed;border:1px solid #fdba74;border-radius:16px;padding:14px}
@media(max-width:850px){.hero-inner,.visual-lab,.grid2{grid-template-columns:1fr}.hero{min-height:auto}.geo{height:330px}.grid{grid-template-columns:1fr}.progress-wrap{top:auto;bottom:10px;right:10px}.revision{grid-template-columns:1fr}}
@media(max-width:560px){.geo{transform:scale(.82);transform-origin:center}.metric{grid-template-columns:1fr}.viewbox{grid-template-columns:1fr}.hero h1{font-size:2.4rem}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
</style>
</head>
<body>
<a class="skip" href="#main">உள்ளடக்கத்திற்குச் செல்ல</a>
<div class="progress-wrap" aria-label="பாட முன்னேற்றம்"><div class="progress-top"><span>📈 Lesson Mastery</span><span id="pct">0%</span></div><div class="bar"><i id="pbar"></i></div></div>

<header class="hero">
<div class="hero-inner">
<div>
<span class="badge">🎓 NMMS • SAT • தேர்வு தயாரிப்பு</span>
<h1>NMMS - SAT - கணிதம்</h1>
<h2>வகுப்பு 8 • பாடம் 2 — அளவைகள்</h2>
<p>வட்டம் முதல் வட்டக்கோணப்பகுதி, பலகோணங்கள், கூட்டு வடிவங்கள், முப்பரிமாண வடிவங்கள், வலைகள் மற்றும் வெவ்வேறு தோற்றங்கள் வரை — <b>பார்த்து → மாற்றிப் பார்த்து → கணக்கிட்டு → தேர்வுக்குத் தயாராக</b> கற்போம்.</p>
<div class="cta"><button class="btn primary" onclick="document.querySelector('#engage').scrollIntoView()">🚀 கற்கத் தொடங்கு</button><button class="btn ghost" onclick="document.querySelector('#challenge').scrollIntoView()">⏱️ 5 நிமிட சவால்</button></div>
</div>
<div class="geo" aria-hidden="true"><div class="circle"></div><div class="sector"></div><div class="radius"></div><div class="square"></div><div class="cube"></div><div class="formula-float f1">A = πr²</div><div class="formula-float f2">F + V − E = 2</div><div class="formula-float f3">Σ angles = (n−2)×180°</div></div>
</div>
</header>

<nav aria-label="பாட வழிசெலுத்தல்">
<a href="#engage">🌟 தொடக்கம்</a><a href="#circle">⭕ வட்டம்</a><a href="#sector">🍕 வட்டக்கோணப்பகுதி</a><a href="#polygon">🔷 பலகோணம்</a><a href="#area">📐 பரப்பளவு</a><a href="#composite">🧩 கூட்டு வடிவம்</a><a href="#solid">🧊 3-D</a><a href="#views">👁️ தோற்றங்கள்</a><a href="#formula">🧮 Formula Lab</a><a href="#practice">📝 Quiz</a><a href="#challenge">⏱️ Challenge</a><a href="#revision">⚡ Revision</a>
</nav>

<main id="main">
<section id="engage" class="section track">
<div class="kicker">🌟 ENGAGE</div><h2 class="section-title">ஒரே “அளவு” — பல வடிவங்கள்!</h2>
<div class="bigq"><h3>🤔 ஒரு வட்டத்தின் ஆரத்தை 2 மடங்காக்கினால் அதன் பரப்பளவு எத்தனை மடங்கு ஆகும்?</h3>
<p>முதலில் ஊகியுங்கள். பிறகு கீழே உள்ள வட்ட ஆய்வகத்தில் radius-ஐ மாற்றிப் பாருங்கள். இதுவே அளவைகளின் முக்கிய சிந்தனை: <b>நீளம் மாறும்போது சுற்றளவும் பரப்பளவும் எப்படி மாறுகின்றன?</b></p>
<button class="btn primary" onclick="predict(this,'4 மடங்கு. ஏனெனில் A = πr²; r இருமடங்கானால் r² நான்கு மடங்காகும்.')">🔍 விடையை வெளிப்படுத்து</button><div class="feedback"></div></div>
</section>

<section id="circle" class="section track">
<div class="kicker">👀 VISUALIZE + 🔍 EXPLORE</div><h2 class="section-title">வட்ட ஆய்வகம் — π, ஆரம், சுற்றளவு, பரப்பளவு</h2>
<div class="visual-lab">
<div class="sim">
<h3>⭕ TRY IT YOURSELF</h3><div class="sim-stage"><div id="simCircle" class="sim-circle"></div></div>
<div class="controls"><label for="radius">ஆரம் r = <span id="rv">7</span> cm</label><input id="radius" type="range" min="2" max="14" value="7"></div>
<div class="metric"><div>விட்டம்<b id="diam">14 cm</b></div><div>சுற்றளவு<b id="circ">44.00 cm</b></div><div>பரப்பளவு<b id="carea">154.00 cm²</b></div></div>
</div>
<div class="card concept"><span class="tag">KEY IDEA</span><h3>π என்பது என்ன?</h3><p>வட்டத்தின் <b>சுற்றளவு ÷ விட்டம்</b> என்பது ஒரு மாறிலி. பாடத்தில் π-க்கு <b>22/7</b> அல்லது <b>3.14</b> பயன்படுத்தப்படுகிறது.</p>
<p class="formula">C = 2πr = πd</p><p class="formula">A = πr²</p>
<div class="note">🧠 <b>Memory clue:</b> சுற்றளவு = “வட்டத்தைச் சுற்றி”; பரப்பளவு = “வட்டத்தின் உள்ளே”.</div>
</div></div>
</section>

<section id="sector" class="section track">
<div class="kicker">🍕 UNDERSTAND</div><h2 class="section-title">வட்டவில் → வட்டக்கோணப்பகுதி → வட்டத்துண்டு</h2>
<div class="grid">
<div class="card concept"><div class="icon">🌙</div><h3>வட்டவில் (Arc)</h3><p>வட்டத்தின் வட்டப்பரிதியின் ஒரு பகுதி. சிறிய வட்டவில், பெரிய வட்டவில் என பிரிக்கலாம்.</p><p class="formula">l = θ/360° × 2πr</p></div>
<div class="card concept"><div class="icon">🍕</div><h3>வட்டக்கோணப்பகுதி (Sector)</h3><p>இரண்டு ஆரங்களாலும் அவற்றுக்கு இடையிலான வட்டவில்லாலும் சூழப்பட்ட பகுதி.</p><p class="formula">A = θ/360° × πr²</p><p class="formula">P = l + 2r</p></div>
<div class="card concept"><div class="icon">🥧</div><h3>வட்டத்துண்டு (Segment)</h3><p>ஒரு நாண் வட்டத்தை இரண்டு பகுதிகளாகப் பிரிக்கும் போது கிடைக்கும் பகுதிகள்.</p><div class="note">⚠️ Sector-இல் <b>2 radii</b>; Segment-இல் <b>chord</b> முக்கியம்.</div></div>
</div>
<div class="card exam" style="margin-top:18px"><h3>🎯 அரைவட்டம் & கால்வட்டம் — உடனடி நினைவு</h3>
<div class="table-wrap"><table><thead><tr><th>வடிவம்</th><th>மையக்கோணம்</th><th>பரப்பளவு</th><th>வில்லின் நீளம்</th><th>சுற்றளவு</th></tr></thead>
<tbody><tr><td>அரைவட்டம்</td><td>180°</td><td>½πr²</td><td>πr</td><td>πr + 2r</td></tr><tr><td>கால்வட்டம்</td><td>90°</td><td>¼πr²</td><td>½πr</td><td>½πr + 2r</td></tr><tr><td>முழு வட்டம்</td><td>360°</td><td>πr²</td><td>2πr</td><td>2πr</td></tr></tbody></table></div>
</div>
</section>

<section id="polygon" class="section track">
<div class="kicker">🔗 CONNECT</div><h2 class="section-title">பலகோண Pattern Lab</h2>
<div class="visual-lab">
<div class="card concept"><h3>பக்கங்கள் அதிகரிக்கும்போது?</h3><label for="sides"><b>பக்கங்கள் n = <span id="nv">5</span></b></label><input id="sides" type="range" min="3" max="10" value="5">
<div class="poly-stage"><svg id="poly" viewBox="0 0 240 240" aria-label="பலகோண படம்"><polygon id="polyShape" points="" fill="#dbeafe" stroke="#2563eb" stroke-width="6"/></svg></div></div>
<div class="card exam"><h3>🧠 Pattern கண்டுபிடி</h3><p>ஒரு n-பக்க பலகோணத்தின் உள் கோணங்களின் கூடுதல்:</p><div class="euler" id="sumang">540°</div><p class="formula">Σ = (n − 2) × 180°</p><p>ஒழுங்கு பலகோணத்தில் எல்லாப் பக்கங்களும் கோணங்களும் சமம்.</p><div class="note">உதா: முக்கோணம் 180°, நாற்கரம் 360°, ஐங்கோணம் 540°.</div></div>
</div>
</section>

<section id="area" class="section track">
<div class="kicker">📐 FORMULA VISUALS</div><h2 class="section-title">2-D வடிவங்கள் — பரப்பளவு & சுற்றளவு</h2>
<div class="grid">
<div class="card concept"><h3>🔺 முக்கோணம்</h3><p class="formula">A = ½bh</p><p>சுற்றளவு = மூன்று பக்கங்களின் கூடுதல்</p></div>
<div class="card concept"><h3>🔺 சமபக்க முக்கோணம்</h3><p class="formula">A = (√3/4)a²</p><p class="formula">P = 3a</p></div>
<div class="card concept"><h3>▱ இணைகரம்</h3><p class="formula">A = bh</p><p class="formula">P = 2(a+b)</p></div>
<div class="card concept"><h3>▭ செவ்வகம்</h3><p class="formula">A = lb</p><p class="formula">P = 2(l+b)</p></div>
<div class="card concept"><h3>⏢ சரிவகம்</h3><p class="formula">A = ½h(a+b)</p><p>சுற்றளவு = 4 பக்கங்களின் கூடுதல்</p></div>
<div class="card concept"><h3>◇ சாய்சதுரம்</h3><p class="formula">A = ½d₁d₂</p><p class="formula">அல்லது A = bh; P = 4a</p></div>
<div class="card concept"><h3>□ சதுரம்</h3><p class="formula">A = a²</p><p class="formula">P = 4a</p></div>
</div>
</section>

<section id="composite" class="section track">
<div class="kicker">🧩 EXPLORE</div><h2 class="section-title">கூட்டு வடிவங்கள் — “பிரி → கணக்கு → சேர் / கழி”</h2>
<div class="grid2">
<div class="card experiment"><h3>🔬 3-Step Strategy</h3><ol><li>சிக்கலான வடிவத்தை அறிந்த எளிய வடிவங்களாகப் பிரி.</li><li>ஒவ்வொரு பகுதியின் பரப்பளவை தனித்தனியாகக் கணக்கு.</li><li>தேவைக்கேற்ப <b>கூட்டு</b> அல்லது வெட்டப்பட்ட பகுதியை <b>கழி</b>.</li></ol><div class="note">பாடத்தில் சதுரத்திலிருந்து மிகப்பெரிய வட்டம் வெட்டுதல், கால்வட்ட/அரைவட்ட சேர்க்கைகள் போன்ற வடிவங்கள் பயன்படுத்தப்படுகின்றன.</div></div>
<div class="card warning"><h3>⚠️ DON'T GET CONFUSED!</h3><p>❌ சுற்றளவு கணக்கில் உள்ளே மறைந்த கோடுகளையும் சேர்த்தல்.</p><p>✓ வெளிப்புற எல்லையை மட்டும் கணக்கிடு.</p><p>❌ shaded area = எல்லா பகுதிகளின் area என நினைத்தல்.</p><p>✓ shaded பகுதி எது என்பதை முதலில் குறி.</p></div>
</div>
</section>

<section id="solid" class="section track">
<div class="kicker">🧊 3-D LAB</div><h2 class="section-title">முப்பரிமாண வடிவங்கள் — முகம், விளிம்பு, உச்சி</h2>
<div class="grid">
<div class="card concept"><h3>🟦 முகம் (Face)</h3><p>தளப்பகுதிகள் முகங்களாகும்; பலகோண வடிவ மேற்பரப்பு.</p></div>
<div class="card concept"><h3>📏 விளிம்பு (Edge)</h3><p>இரண்டு முகங்களை இணைக்கும் கோடு.</p></div>
<div class="card concept"><h3>📍 உச்சி (Vertex)</h3><p>இரண்டு அல்லது அதற்கு மேற்பட்ட விளிம்புகள் சந்திக்கும் புள்ளி.</p></div>
</div>
<div class="card exam" style="margin-top:18px"><h3>✨ ஆய்லர் தேற்றம் (Euler relation)</h3><div class="euler">F + V − E = 2</div>
<div class="table-wrap"><table><thead><tr><th>வடிவம்</th><th>F</th><th>V</th><th>E</th><th>சரிபார்</th></tr></thead><tbody>
<tr><td>கனச்சதுரம்</td><td>6</td><td>8</td><td>12</td><td>6+8−12=2</td></tr>
<tr><td>கனச்செவ்வகம்</td><td>6</td><td>8</td><td>12</td><td>2</td></tr>
<tr><td>முக்கோணப் பட்டகம்</td><td>5</td><td>6</td><td>9</td><td>2</td></tr>
<tr><td>சதுரப் பிரமிடு</td><td>5</td><td>5</td><td>8</td><td>2</td></tr>
<tr><td>முக்கோணப் பிரமிடு</td><td>4</td><td>4</td><td>6</td><td>2</td></tr></tbody></table></div></div>
</section>

<section id="views" class="section track">
<div class="kicker">👁️ VISUALIZE</div><h2 class="section-title">3-D பொருளை 2-D தோற்றமாகப் பார்ப்பது</h2>
<div class="viewbox"><div class="view">⬆️<br><b>மேல்பக்கத் தோற்றம்</b><br>(Top view)</div><div class="view">⬅️<br><b>முகப்புத் தோற்றம்</b><br>(Front view)</div><div class="view">➡️<br><b>பக்கவாட்டுத் தோற்றம்</b><br>(Side view)</div></div>
<div class="card concept" style="margin-top:18px"><h3>🕵️ Mental Rotation Tip</h3><p>கட்ட வடிவத்தைப் பார்க்கும்போது “எத்தனை cubes இருக்கின்றன?” என்பதற்கு முன், ஒவ்வொரு திசையிலிருந்தும் <b>எத்தனை சதுர முகங்கள் தெரியும்</b> என்று பாருங்கள். பாடத்தின் பயிற்சிகளில் F / T / S தோற்றங்களை அடையாளம் காணும் வினாக்கள் இடம்பெறுகின்றன.</p></div>
</section>

<section id="formula" class="section track">
<div class="kicker">🧮 FORMULA LAB</div><h2 class="section-title">Definition & Formula Master</h2>
<div class="grid">
<div class="card flash" tabindex="0" role="button" onclick="this.classList.toggle('flipped')" onkeydown="if(event.key==='Enter')this.click()"><div class="front"><div class="icon">π</div><h3>π</h3><p>Tap / Enter</p></div><div class="back"><b>π = சுற்றளவு / விட்டம்</b><p>பாடத்தில் 22/7 அல்லது 3.14.</p></div></div>
<div class="card flash" tabindex="0" role="button" onclick="this.classList.toggle('flipped')" onkeydown="if(event.key==='Enter')this.click()"><div class="front"><div class="icon">🍕</div><h3>வட்டக்கோணப்பகுதி</h3><p>Tap / Enter</p></div><div class="back"><p>இரண்டு ஆரங்கள் + அவற்றுக்கு இடையிலான வட்டவில் சூழும் பகுதி.</p></div></div>
<div class="card flash" tabindex="0" role="button" onclick="this.classList.toggle('flipped')" onkeydown="if(event.key==='Enter')this.click()"><div class="front"><div class="icon">🧊</div><h3>விளிம்பு</h3><p>Tap / Enter</p></div><div class="back"><p>இரண்டு முகங்களை இணைக்கும் கோடு.</p></div></div>
</div>
<div class="card exam" style="margin-top:18px"><h3>🎯 EXAM SPOTLIGHT</h3><div class="grid">
<div><b>⭐⭐⭐ மிக முக்கியம்</b><p>Sector area, arc length, sector perimeter; composite shaded area; Euler relation.</p></div>
<div><b>⭐⭐ முக்கியம்</b><p>Polygon angle sum; 2-D area/perimeter formulae; 3-D nets and views.</p></div>
<div><b>⭐ கட்டாய நினைவு</b><p>π values, radius-diameter relation, face-edge-vertex definitions.</p></div>
</div></div>
</section>

<section id="practice" class="section track">
<div class="kicker">📝 PRACTICE</div><h2 class="section-title">Interactive Quiz — 10 வினாக்கள்</h2><p class="lead">ஒவ்வொரு விடைக்கும் உடனடி feedback கிடைக்கும். தவறினால் மீண்டும் முயற்சி செய்யலாம்.</p>
<div id="quiz"></div>
</section>

<section id="challenge" class="section track">
<div class="kicker">⏱️ EXAM READY</div><h2 class="section-title">5-MINUTE EXAM CHALLENGE</h2>
<div class="card quizc">
<div class="challenge-head"><div><b>NMMS Mini Test</b><div class="small">5 வினாக்கள் • 5 நிமிடங்கள்</div></div><div class="timer" id="timer">05:00</div><button class="btn primary" id="startBtn" onclick="startChallenge()">▶ தொடங்கு</button></div>
<div class="mini-progress"><i id="cprog"></i></div><div id="challengeBox" style="margin-top:16px"><p>தயார் ஆனதும் “தொடங்கு” அழுத்தவும்.</p></div>
</div>
</section>

<section id="revision" class="section track">
<div class="kicker">⚡ 60-SECOND REVISION</div><h2 class="section-title">ஒரு நிமிடத்தில் முழுப் பாடம்</h2>
<div class="revision">
<div>1. π = சுற்றளவு ÷ விட்டம்; π ≈ 22/7 அல்லது 3.14.</div><div>2. வட்ட சுற்றளவு = 2πr; பரப்பளவு = πr².</div>
<div>3. Sector area = θ/360° × πr².</div><div>4. Arc length = θ/360° × 2πr.</div>
<div>5. Sector perimeter = arc length + 2r.</div><div>6. பலகோண உள் கோணங்களின் கூடுதல் = (n−2)×180°.</div>
<div>7. முக்கோணம்: ½bh; இணைகரம்: bh; செவ்வகம்: lb.</div><div>8. சரிவகம்: ½h(a+b); சாய்சதுரம்: ½d₁d₂; சதுரம்: a².</div>
<div>9. கூட்டு வடிவம்: பிரி → தனித்தனி area → சேர்/கழி.</div><div>10. 3-D: முகம் (F), உச்சி (V), விளிம்பு (E).</div>
<div>11. ஆய்லர் உறவு: F + V − E = 2.</div><div>12. 3-D பொருள்களுக்கு Front / Top / Side views முக்கியம்.</div>
</div>
</section>

<section class="section track">
<div class="kicker">🧠 BIG PICTURE</div><h2 class="section-title">Concept Map</h2>
<div class="map"><div class="node">அளவைகள்</div><div class="arrow">→</div><div class="node">வட்டம் & Sector</div><div class="arrow">→</div><div class="node">2-D Area / Perimeter</div><div class="arrow">→</div><div class="node">கூட்டு வடிவங்கள்</div><div class="arrow">→</div><div class="node">3-D வடிவங்கள்</div><div class="arrow">→</div><div class="node">Nets & Views</div><div class="arrow">→</div><div class="node">NMMS Practice</div></div>
<div style="text-align:center;margin-top:24px"><button class="btn primary" onclick="resetProgress()">♻️ Reset Progress</button></div>
</section>
</main>

<footer><p><strong>உருவாக்கியவர் : கி. ஐய்யப்பன்</strong><br>ஆசிரியர் பயிற்றுநர்<br>வட்டார வள மையம்<br>காடையாம்பட்டி.</p><p class="small" style="color:#94a3b8">இந்தப் பக்கம் வகுப்பு 8 — “2. அளவைகள்” பதிவேற்றப்பட்ட பாடக்கோப்பின் கருத்துகள் மற்றும் பயிற்சி வடிவங்களை அடிப்படையாகக் கொண்டு உருவாக்கப்பட்டது.</p></footer>

<script>
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function predict(btn,text){btn.nextElementSibling.textContent='✓ '+text; mark('prediction')}
function mark(key){let p=JSON.parse(localStorage.getItem('nmms-mensuration-progress')||'{}');p[key]=1;localStorage.setItem('nmms-mensuration-progress',JSON.stringify(p));updateProgress()}
function updateProgress(){let p=JSON.parse(localStorage.getItem('nmms-mensuration-progress')||'{}');let done=Object.keys(p).length;let total=16;let pct=Math.min(100,Math.round(done/total*100));$('#pct').textContent=pct+'%';$('#pbar').style.width=pct+'%'}
function resetProgress(){localStorage.removeItem('nmms-mensuration-progress');updateProgress();alert('முன்னேற்றம் மீட்டமைக்கப்பட்டது.')}
const rad=$('#radius'); function circleSim(){let r=+rad.value;$('#rv').textContent=r;$('#diam').textContent=2*r+' cm';$('#circ').textContent=(2*22/7*r).toFixed(2)+' cm';$('#carea').textContent=(22/7*r*r).toFixed(2)+' cm²';let d=80+r*10;$('#simCircle').style.width=d+'px';$('#simCircle').style.height=d+'px';mark('circle')}rad.addEventListener('input',circleSim);circleSim();
function polygon(){let n=+$('#sides').value;$('#nv').textContent=n;$('#sumang').textContent=((n-2)*180)+'°';let pts=[];for(let i=0;i<n;i++){let a=-Math.PI/2+i*2*Math.PI/n;pts.push((120+90*Math.cos(a))+','+(120+90*Math.sin(a)))}$('#polyShape').setAttribute('points',pts.join(' '));mark('polygon')}$('#sides').addEventListener('input',polygon);polygon();

const quiz=[
{q:'1. வட்டத்தின் சுற்றளவு சூத்திரம் எது?',o:['πr²','2πr','πr','r²'],a:1,e:'சுற்றளவு C = 2πr.'},
{q:'2. ஆரம் 7 cm எனில் விட்டம்?',o:['3.5 cm','7 cm','14 cm','21 cm'],a:2,e:'விட்டம் d = 2r = 14 cm.'},
{q:'3. 90° sector என்பது?',o:['அரைவட்டம்','கால்வட்டம்','முழுவட்டம்','முக்கால்வட்டம்'],a:1,e:'90° = 360°/4, ஆகவே கால்வட்டம்.'},
{q:'4. வட்டக்கோணப்பகுதியின் பரப்பளவு?',o:['θ/360 × πr²','θ/360 × 2πr','l+2r','πd'],a:0,e:'Sector area = θ/360° × πr².'},
{q:'5. 6 பக்க பலகோணத்தின் உள் கோணங்களின் கூடுதல்?',o:['540°','720°','900°','1080°'],a:1,e:'(6−2)×180° = 720°.'},
{q:'6. சரிவகத்தின் பரப்பளவு?',o:['bh','½h(a+b)','a²','½d₁d₂'],a:1,e:'Trapezium area = ½ × h × (parallel sides sum).'},
{q:'7. சாய்சதுரத்தின் diagonal formula?',o:['d₁+d₂','d₁d₂','½d₁d₂','2d₁d₂'],a:2,e:'Rhombus area = ½d₁d₂.'},
{q:'8. கனச்சதுரம்: F,V,E?',o:['6,8,12','8,6,12','6,12,8','5,8,5'],a:0,e:'Cube: 6 faces, 8 vertices, 12 edges.'},
{q:'9. F+V−E மதிப்பு?',o:['0','1','2','3'],a:2,e:'பாடத்தில் கொடுக்கப்பட்ட Euler relation: F + V − E = 2.'},
{q:'10. Front / Top / Side என்பது எதற்கான பயிற்சி?',o:['வட்டவில்','பலகோணம்','3-D தோற்றங்கள்','π'],a:2,e:'முப்பரிமாண பொருள்களின் வெவ்வேறு 2-D தோற்றங்கள்.'}
];
function renderQuiz(){let box=$('#quiz');box.innerHTML=quiz.map((x,i)=>'<div class="q"><b>'+(i+1)+'. '+x.q+'</b><div class="options">'+x.o.map((v,j)=>'<button class="option" onclick="answer(this,'+i+','+j+')">'+v+'</button>').join('')+'</div><div class="feedback"></div></div>').join('')}
window.answer=(btn,i,j)=>{let q=btn.closest('.q');q.querySelectorAll('.option').forEach(b=>b.classList.remove('wrong','correct'));if(j===quiz[i].a){btn.classList.add('correct');q.querySelector('.feedback').textContent='✓ சரியான விடை! '+quiz[i].e;mark('q'+i)}else{btn.classList.add('wrong');q.querySelector('.feedback').textContent='✗ மீண்டும் முயற்சி செய். குறிப்பு: '+quiz[i].e}};renderQuiz();

const chall=[
{q:'π = 22/7 எனில் r=7 cm வட்டத்தின் பரப்பளவு?',o:['44','154','308','22'],a:1,topic:'வட்டப் பரப்பளவு'},
{q:'120° sector-ன் area, முழு வட்ட area-வின் எத்தனை பகுதி?',o:['1/2','1/3','1/4','2/3'],a:1,topic:'Sector'},
{q:'8 பக்க பலகோணத்தின் angle sum?',o:['720°','900°','1080°','1260°'],a:2,topic:'பலகோணம்'},
{q:'Square pyramid: F,V,E?',o:['5,5,8','4,4,6','5,6,9','6,8,12'],a:0,topic:'3-D'},
{q:'அரைவட்டத்தின் perimeter?',o:['πr','πr+2r','2πr','½πr+2r'],a:1,topic:'அரைவட்டம்'}
]; let ci=0,cs=0,wrong=[],secs=300,tick;
function startChallenge(){clearInterval(tick);ci=0;cs=0;wrong=[];secs=300;$('#startBtn').disabled=true;showC();tick=setInterval(()=>{secs--;let m=String(Math.floor(secs/60)).padStart(2,'0'),s=String(secs%60).padStart(2,'0');$('#timer').textContent=m+':'+s;if(secs<=0)finishC()},1000)}
function showC(){let x=chall[ci];$('#cprog').style.width=(ci/chall.length*100)+'%';$('#challengeBox').innerHTML='<h3>வினா '+(ci+1)+' / '+chall.length+'</h3><p><b>'+x.q+'</b></p><div class="options">'+x.o.map((v,j)=>'<button class="option" onclick="cans('+j+')">'+v+'</button>').join('')+'</div>'}
window.cans=j=>{if(j===chall[ci].a)cs++;else wrong.push(chall[ci].topic);ci++;if(ci<chall.length)showC();else finishC()}
function finishC(){clearInterval(tick);$('#startBtn').disabled=false;$('#cprog').style.width='100%';let pct=Math.round(cs/chall.length*100),level=pct>=80?'🟢 Strong':pct>=50?'🟡 Needs Revision':'🔴 Review Again';$('#challengeBox').innerHTML='<h3>🏆 YOUR RESULT</h3><div class="euler">'+cs+' / '+chall.length+'</div><p><b>Concept Mastery: '+pct+'% — '+level+'</b></p><p>'+(wrong.length?'மீள்பார்க்க: '+[...new Set(wrong)].join(', '):'அனைத்து கருத்துகளிலும் சிறப்பு!')+'</p>';mark('challenge')}
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)mark('sec'+$$('.track').indexOf(e.target))}),{threshold:.45});$$('.track').forEach(s=>obs.observe(s));updateProgress();
</script>
</body></html>`;
