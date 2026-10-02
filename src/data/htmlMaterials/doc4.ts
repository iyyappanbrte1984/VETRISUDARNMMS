export const doc4Html = `<!DOCTYPE html>
<html lang="ta">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NMMS - SAT-அறிவியல் | 8-ஆம் வகுப்பு - தாவர உலகம்</title>
    <style>
        :root {
            --bg-primary: #f0fdf4;
            --text-main: #1e293b;
            --primary: #059669;
            --primary-dark: #047857;
            --primary-light: #a7f3d0;
            --accent: #d97706;
            --accent-light: #fef3c7;
            --danger: #dc2626;
            --danger-light: #fee2e2;
            --card-bg: #ffffff;
            --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --radius: 16px;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background-color: var(--bg-primary);
            color: var(--text-main);
            line-height: 1.6;
            padding-bottom: 60px;
        }

        .sticky-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 8px;
            background: #e2e8f0;
            z-index: 1000;
        }
        .progress-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #10b981, #3b82f6);
            transition: width 0.3s ease;
        }

        header {
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            box-shadow: var(--shadow);
            margin-bottom: 30px;
            position: relative;
        }

        header h1 {
            font-size: 1.8rem;
            margin-bottom: 8px;
        }

        header p {
            font-size: 1rem;
            opacity: 0.9;
        }

        .mastery-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 6px 16px;
            border-radius: 20px;
            display: inline-block;
            margin-top: 12px;
            font-weight: bold;
            backdrop-filter: blur(5px);
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 15px;
        }

        section {
            background: var(--card-bg);
            border-radius: var(--radius);
            padding: 24px;
            margin-bottom: 25px;
            box-shadow: var(--shadow);
            border: 1px solid rgba(0,0,0,0.05);
            transition: transform 0.2s ease;
        }

        .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.4rem;
            color: var(--primary-dark);
            margin-bottom: 20px;
            border-bottom: 3px solid var(--primary-light);
            padding-bottom: 8px;
        }

        .btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .btn:hover { background-color: var(--primary-dark); }
        .btn-accent { background-color: var(--accent); }
        .btn-accent:hover { background-color: #b45309; }
        .btn-secondary { background-color: #64748b; }
        .btn-secondary:hover { background-color: #475569; }

        .mystery-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%);
            border-left: 5px solid var(--accent);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 15px;
        }

        .sim-container {
            background: #0f172a;
            color: #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-top: 15px;
        }
        .sim-controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }
        .sim-btn {
            background: #334155;
            color: white;
            border: 2px solid #475569;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
            font-size: 0.85rem;
            transition: all 0.2s;
        }
        .sim-btn.active {
            background: var(--primary);
            border-color: var(--primary-light);
        }
        .sim-display {
            background: #1e293b;
            border-radius: 8px;
            padding: 20px;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .plant-graphic {
            width: 80px;
            height: 80px;
            background: var(--primary);
            border-radius: 50% 50% 0 0;
            position: relative;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .vascular-flow {
            position: absolute;
            width: 4px;
            height: 100%;
            background: #3b82f6;
            left: 50%;
            transform: translateX(-50%);
            display: none;
        }
        .vascular-flow.active {
            display: block;
            animation: flowAnimation 1.5s infinite linear;
        }
        @keyframes flowAnimation {
            0% { top: 100%; cubic-bezier(0.4, 0, 0.2, 1); }
            100% { top: -100%; }
        }

        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        .concept-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            position: relative;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .concept-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }
        .card-badge {
            font-size: 0.75rem;
            padding: 3px 8px;
            border-radius: 12px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 10px;
        }
        .badge-primary { background: var(--primary-light); color: var(--primary-dark); }

        .flashcard-wrapper {
            perspective: 1000px;
            width: 100%;
            height: 220px;
            margin: 20px auto;
        }
        .flashcard {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        .flashcard.flipped {
            transform: rotateY(180deg);
        }
        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 25px;
            text-align: center;
            box-shadow: var(--shadow);
        }
        .card-front {
            background: linear-gradient(135deg, #047857 0%, #069669 100%);
            color: white;
        }
        .card-back {
            background: white;
            color: var(--text-main);
            transform: rotateY(180deg);
            border: 2px solid var(--primary);
        }

        .diagram-container {
            position: relative;
            background: #f8fafc;
            border-radius: 12px;
            padding: 15px;
            text-align: center;
            overflow: auto;
        }
        .node-tree {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin: 10px 0;
        }
        .tree-row {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }
        .tree-node {
            background: white;
            border: 2px solid var(--primary);
            padding: 10px 15px;
            border-radius: 8px;
            min-width: 120px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: all 0.2s;
        }
        .tree-node.hidden-label span {
            visibility: hidden;
        }
        .tree-node.hidden-label::after {
            content: '?';
            display: block;
            color: var(--accent);
        }

        .matrix-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 0.9rem;
        }
        .matrix-table th, .matrix-table td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
        }
        .matrix-table th {
            background-color: #f1f5f9;
            color: var(--text-main);
        }
        .warning-banner {
            background: linear-gradient(135deg, #fee2e2 0%, #fff5f5 100%);
            border-left: 5px solid var(--danger);
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }

        .quiz-option {
            background: #f1f5f9;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 18px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .quiz-option:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
        }
        .quiz-option.correct {
            background: #d1fae5;
            border-color: #10b981;
            color: #065f46;
        }
        .quiz-option.wrong {
            background: #fee2e2;
            border-color: #ef4444;
            color: #991b1b;
        }
        .feedback-box {
            margin-top: 12px;
            padding: 12px;
            border-radius: 6px;
            display: none;
            font-size: 0.9rem;
            animation: fadeIn 0.3s ease;
        }

        .challenge-box {
            background: #f8fafc;
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        .timer-display {
            font-size: 1.8rem;
            font-weight: bold;
            color: var(--danger);
            margin: 10px 0;
        }
        .hud-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            font-size: 0.85rem;
            font-weight: 600;
        }

        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .stat-card {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
        }
        .stat-num {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-dark);
        }
        .stat-lbl {
            font-size: 0.75rem;
            color: #64748b;
        }

        .footer-controls {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
            header h1 { font-size: 1.4rem; }
            section { padding: 16px; }
            .sim-controls { grid-template-columns: 1fr; }
        }
        
        @media prefers-reduced-motion: reduce {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    </style>
</head>
<body>

    <div class="sticky-progress"><div class="progress-fill" id="pageProgress"></div></div>

    <header>
        <h1>NMMS - SAT-அறிவியல்</h1>
        <p>வகுப்பு 8 | பாடம் 17 - தாவர உலகம் (Plant Kingdom)</p>
        <div class="mastery-badge">பாடத் தேர்ச்சி நிலை: <span id="masteryPercent">0%</span></div>
    </header>

    <div class="container">

        <!-- 🌟 ENGAGE -->
        <section id="engage">
            <div class="section-title">🌟 அறிமுக விடுகதை (Engage)</div>
            <div class="mystery-box">
                <h3>உங்களுக்குத் தெரியுமா? 🌍</h3>
                <p>நமது பூமியில் சுமார் 8.7 மில்லியன் உயிரினங்கள் வாழ்கின்றன. இதில் நிலத்தில் 6.5 மில்லியனும், நீரில் 2.2 மில்லியனும் உள்ளன. இதில் பூக்கும் தாவரங்கள் மட்டுமே சுமார் 4 இலட்சம் உயிரினங்கள் ஆகும்!</p>
                <p><strong>கேள்வி:</strong> காளான்கள் பச்சையாக இருப்பதில்லை, ஏன்? அவை தங்களுக்குத் தேவையான உணவைத் தாமே தயாரித்துக் கொள்ள முடியுமா?</p>
                <button class="btn btn-accent style-btn" style="margin-top: 12px;" onclick="revealEngageAnswer()">விடை மற்றும் காரணத்தைக் காண்</button>
            </div>
            <div id="engageAnswer" class="feedback-box" style="background:#e0f2fe; color:#0369a1;">
                💡 <strong>விடை:</strong> காளான்களில் பச்சையம் (Chlorophyll) கிடையாது! எனவே அவற்றால் ஒளிச்சேர்க்கை செய்ய முடியாது. அவை தங்களின் உணவிற்குப் பிற உயிரினங்களைச் சார்ந்திருக்கும் பிறசார்பு (Heterotrophic) உயிரினங்கள் ஆகும்.
            </div>
        </section>

        <!-- 📊 STATS & SPECIES HUB -->
        <section id="stats-hub">
            <div class="section-title">📊 புள்ளிவிவரக் களஞ்சியம் (Data Hub)</div>
            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-num">8.7 M</div>
                    <div class="stat-lbl">உலக உயிரினங்கள் மொத்தம்</div>
                </div>
                <div class="stat-card">
                    <div class="stat-num">6.5 M</div>
                    <div class="stat-lbl">நிலத்தில் வாழ்பவை</div>
                </div>
                <div class="stat-card">
                    <div class="stat-num">2.2 M</div>
                    <div class="stat-lbl">நீரில் வாழ்பவை</div>
                </div>
                <div class="stat-card">
                    <div class="stat-num">4 இலட்சம்</div>
                    <div class="stat-lbl">பூக்கும் தாவரங்கள் வகைகள்</div>
                </div>
            </div>
        </section>

        <!-- 👀 VISUALIZE & 🔍 EXPLORE (Simulator) -->
        <section id="explore">
            <div class="section-title">🔍 தாவர வகைப்பாட்டியல் ஆய்வகம் (Virtual Lab)</div>
            <p>கீழே உள்ள தாவரத் தொகுதிகளைத் தேர்ந்தெடுத்து, அவற்றின் உடலமைப்பு, கடத்தும் திசுக்கள் (Vascular Tissues) மற்றும் விதை அமைப்புகளை ஆய்வகத் திரையில் சோதிக்கவும்.</p>
            
            <div class="sim-container">
                <div class="sim-controls">
                    <button class="sim-btn active" onclick="runSimulation('thallophyta', this)">பாசிகள் (Thallophyta)</button>
                    <button class="sim-btn" onclick="runSimulation('bryophyta', this)">பிரையோஃபைட்டா</button>
                    <button class="sim-btn" onclick="runSimulation('pteridophyta', this)">டெரிடோஃபைட்டா</button>
                    <button class="sim-btn" onclick="runSimulation('gymnosperm', this)">ஜிம்னோஸ்பெர்ம்</button>
                    <button class="sim-btn" onclick="runSimulation('angiosperm', this)">ஆஞ்சியோஸ்பெர்ம்</button>
                </div>
                <div class="sim-display" id="simDisplay">
                    <div class="plant-graphic" id="simPlant" style="height: 40px; background: #10b981;">
                        <div class="vascular-flow" id="simFlow"></div>
                    </div>
                    <div id="simText" style="margin-top:15px; text-align:center; font-size:0.95rem;">
                        <strong>ஆய்வக முடிவு:</strong> பாசிகள் எளிய உடலமைப்பு (தாலஸ்) கொண்டவை. வேர், தண்டு, இலை வேறுபாடு கிடையாது. கடத்தும் திசுக்கள் இல்லை!
                    </div>
                </div>
            </div>
        </section>

        <!-- 🧠 UNDERSTAND & CONCEPT CARDS -->
        <section id="understand">
            <div class="section-title">🧠 முக்கியக் கோட்பாடுகள் (Understand)</div>
            <p>பாடத்தின் மிக முக்கியமான பகுதிகள் எளிய கார்டுகளாகத் தொகுக்கப்பட்டுள்ளன. ஒவ்வொரு கார்டையும் கவனமாகப் படிக்கவும்.</p>
            
            <div class="card-grid" style="margin-top:15px;">
                <div class="concept-card">
                    <span class="card-badge badge-primary">வகைப்பாட்டியல் (Taxonomy)</span>
                    <p>🔑 <strong>முக்கிய யோசனை:</strong> உயிரினங்களை அடையாளம் காணுதல், வகைப்படுத்துதல், விவரித்தல் மற்றும் பெயரிடுதல் ஆகியவற்றை உள்ளடக்கிய அறிவியல் பிரிவு.</p>
                    <p>🌍 <strong>சொல் விளக்கம்:</strong> Taxis (வகைப்படுத்துதல்) + Nomos (விதிகள்) என்ற இரு கிரேக்கச் சொற்களின் கூட்டு வடிவம்.</p>
                    <p>🎯 <strong>தேர்வு குறிப்பு:</strong> முதன்முதலில் இச்சொல்லை உருவாக்கியவர் <strong>அகஸ்டின் பைரமிஸ் டி காண்டோல்</strong>.</p>
                </div>

                <div class="concept-card">
                    <span class="card-badge badge-primary">இருசொல் பெயரிடுதல்</span>
                    <p>🔑 <strong>முக்கிய யோசனை:</strong> ஓர் உயிரினத்திற்கு பேரினம் (Genus), சிற்றினம் (Species) என இரு சொற்களால் பெயரிடும் முறை.</p>
                    <p>🌍 <strong>எடுத்துக்காட்டு:</strong> மாமரத்தின் தாவரவியல் பெயர் <em>Mangifera indica</em>. இதில் <em>Mangifera</em> என்பது பேரினம், <em>indica</em> என்பது சிற்றினம்.</p>
                    <p>🎯 <strong>தேர்வு குறிப்பு:</strong> 1623-இல் காஸ்பர்டு பாஹின் அறிமுகப்படுத்தினார், 1753-இல் <strong>கரோலஸ் லின்னேயஸ்</strong> நடைமுறைப்படுத்தினார். இவர் நவீன வகைப்பாட்டியலின் தந்தை என அழைக்கப்படுகிறார்.</p>
                </div>
            </div>
        </section>

        <!-- 📚 DEFINITION MASTER -->
        <section id="definitions">
            <div class="section-title">📚 கலைச்சொல் அகராதி (Definition Master)</div>
            <p>அட்டையைத் தொட்டு திருப்பி (Flip) அதன் வரையறையை அறிந்து கொள்ளவும்.</p>
            
            <div class="flashcard-wrapper">
                <div class="flashcard" id="mainFlashcard" onclick="flipCard()">
                    <div class="card-face card-front">
                        <h2 id="defTerm">உலர் தாவரத் தொகுப்பு (Herbarium)</h2>
                        <p style="font-size: 0.85rem; margin-top: 15px; opacity: 0.8;">மறுபக்கம் காண அட்டையைத் தொடவும் ↺</p>
                    </div>
                    <div class="card-face card-back">
                        <p id="defMeaning">தாவரப் பகுதிகளை நன்கு அழுத்தி, உலர்த்தி, தாளில் ஒட்டி, ஏற்றுக் கொள்ளப்பட்ட வகைப்பாட்டின்படி வரிசைப்படுத்தி வைக்கப்படும் தொகுப்பு ஆகும். இந்தியாவின் மிகப்பெரிய ஹெர்பாரியம் <strong>கொல்கத்தாவில்</strong> உள்ளது.</p>
                        <button class="btn btn-primary" style="margin-top: 15px;" onclick="nextDefinition(event)">அடுத்த சொல்</button>
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <button class="btn btn-secondary" onclick="markDefKnown()">இந்தச் சொல் எனக்குத் தெரியும் ✓</button>
            </div>
        </section>

        <!-- ✏️ DIAGRAM MASTER -->
        <section id="diagrams">
            <div class="section-title">✏️ வரைபடப் பயிற்சி (Diagram Master)</div>
            <p>பெந்தம் மற்றும் ஹூக்கரின் இயற்கை வகைப்பாட்டு முறையின் சுருக்கம் கீழே கொடுக்கப்பட்டுள்ளது. தேர்வுப் பயிற்சிக்காக 'பயிற்சி பயன்முறை' (Hide Labels) பொத்தானைப் பயன்படுத்தி உங்களை நீங்களே சோதித்துப் பாருங்கள்!</p>
            
            <div style="margin-bottom: 15px; text-align: center;">
                <button class="btn" id="toggleLabelsBtn" onclick="toggleDiagramLabels()">பயிற்சி பயன்முறை (Hide Labels)</button>
            </div>

            <div class="diagram-container">
                <div class="node-tree">
                    <div class="tree-node"><span>விதைத் தாவரங்கள் (202 குடும்பங்கள்)</span></div>
                    <div class="tree-row">
                        <div class="node-tree">
                            <div class="tree-node label-node"><span>வகுப்பு I: இருவித்திலை தாவரங்கள் (165)</span></div>
                            <div class="tree-row">
                                <div class="tree-node label-node"><span>துணை வகுப்பு 1: பாலிபெட்டலே</span></div>
                                <div class="tree-node label-node"><span>துணை வகுப்பு 2: கேமோபெட்டலே</span></div>
                                <div class="tree-node label-node"><span>துணை வகுப்பு 3: மோனோக்ளமைடியே</span></div>
                            </div>
                        </div>
                        <div class="node-tree">
                            <div class="tree-node label-node"><span>வகுப்பு II: ஜிம்னோஸ்பெர்ம்கள் (3)</span></div>
                        </div>
                        <div class="node-tree">
                            <div class="tree-node label-node"><span>வகுப்பு III: ஒருவித்திலை தாவரங்கள் (34)</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="warning-banner" style="background:#f0fdf4; border-left-color: var(--primary);">
                💡 <strong>தேர்வு வரைபட டிப்:</strong> பெந்தம் மற்றும் ஹூக்கர் தங்களது வகைப்பாட்டை <strong>"ஜெனிரா பிளான்டாரம்"</strong> என்ற 3 தொகுதிகள் கொண்ட நூலில் விளக்கியுள்ளனர். இது உலகளவில் ஹெர்பாரியங்களில் பயன்படுகிறது.
            </div>
        </section>

        <!-- 🔗 CONNECT & COMPARISON MATRIX -->
        <section id="comparison">
            <div class="section-title">🔗 வேறுபாடுகள் அறிவோம் (Comparison Matrix)</div>
            <table class="matrix-table">
                <thead>
                    <tr>
                        <th>பண்புகள்</th>
                        <th>பாசிகள் (Algae)</th>
                        <th>பூஞ்சைகள் (Fungi)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>ஊட்டமுறை</strong></td>
                        <td>தற்சார்பு உயிரி (Autotrophic)</td>
                        <td>பிறசார்பு உயிரி (Heterotrophic)</td>
                    </tr>
                    <tr>
                        <td><strong>பச்சையம்</strong></td>
                        <td>உண்டு</td>
                        <td>இல்லை</td>
                    </tr>
                    <tr>
                        <td><strong>சேமிப்பு உணவு</strong></td>
                        <td>ஸ்டார்ச் (Starch)</td>
                        <td>கிளைகோஜன் மற்றும் எண்ணெய்</td>
                    </tr>
                    <tr>
                        <td><strong>செல் வகை</strong></td>
                        <td>சில புரோகாரியோடிக், பல யூகாரியோடிக்</td>
                        <td>அனைத்தும் யூகாரியோடிக் (எ.கா. ஈஸ்ட்)</td>
                    </tr>
                </tbody>
            </table>

            <div class="warning-banner">
                ⚠️ <strong>ஒருபோதும் குழம்ப வேண்டாம்!</strong> பாசிகள் தங்களுக்குத் தேவையான உணவைத் தாமே தயாரிக்கும், ஆனால் பூஞ்சைகளால் உணவைத் தயாரிக்க முடியாது, செல்சுவர் <strong>கைட்டின் (Chitin)</strong> என்ற வேதிப்பொருளால் ஆனது.
            </div>
        </section>

        <!-- ⚠️ COMMON MISCONCEPTIONS -->
        <section id="misconceptions">
            <div class="section-title">⚠️ தவறான புரிதல்கள் (Don't Get Confused!)</div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="background:#fee2e2; padding:12px; border-radius:6px;">
                    <span style="color:var(--danger); font-weight:bold;">❌ தவறான எண்ணம்:</span> பிரையோஃபைட்டா தாவரங்கள் முழுமையான நிலத் தாவரங்கள் ஆகும்.
                </div>
                <div style="background:#d1fae5; padding:12px; border-radius:6px;">
                    <span style="color:var(--primary-dark); font-weight:bold;">✓ சரியான உண்மை:</span> இல்லை! பிரையோஃபைட்டுகள் <strong>"தாவர உலகின் இருவாழ்விகள்"</strong> ஆகும். இவை நிலத்தில் வாழ்ந்தாலும், தங்களின் இனப்பெருக்க சுழற்சியை முடிக்க <strong>நீர் இன்றியமையாதது</strong>.
                </div>
                <hr style="border:0; border-top:1px solid #e2e8f0;">
                <div style="background:#fee2e2; padding:12px; border-radius:6px;">
                    <span style="color:var(--danger); font-weight:bold;">❌ தவறான எண்ணம்:</span> ஜிம்னோஸ்பெர்ம்கள் கனிகளை உருவாக்குகின்றன.
                </div>
                <div style="background:#d1fae5; padding:12px; border-radius:6px;">
                    <span style="color:var(--primary-dark); font-weight:bold;">✓ சரியான உண்மை:</span> இல்லை, அவை <strong>திறந்த விதைத் தாவரங்கள்</strong> ஆகும். அவற்றின் சூலானது சூற்பையால் சூழப்பட்டிருப்பதில்லை, எனவே அவை கனிகளை உருவாக்குவதில்லை!
                </div>
            </div>
        </section>

        <!-- 🎯 EXAM SPOTLIGHT -->
        <section id="spotlight">
            <div class="section-title">🎯 தேர்வு நோக்கு - மருத்துவ தாவரங்கள் (Exam Spotlight)</div>
            <p>தேர்வுக்கு மிக முக்கியமான 5 மருத்துவ தாவரங்களின் அறிவியல் பெயர்கள் மற்றும் பயன்கள் அட்டவணைப்படுத்தப்பட்டுள்ளது:</p>
            <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 12px;">
                <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
                    <strong>1. குப்பைமேனி (Acalypha indica):</strong> யூஃபோர்பியேசி குடும்பம். இலையை அரைத்து தீக்காயங்களுக்கு பூசலாம். இலைச்சாறு + எலுமிச்சை சாறு வயிற்றில் உள்ள <strong>உருளைப்புழுக்களை</strong> அழிக்கும். ⭐⭐⭐
                </div>
                <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
                    <strong>2. வில்வம் (Aegle marmelos):</strong> ரூட்டேசி குடும்பம். இதன் காய் செரிமான குறைபாடுகளைச் சரிசெய்யும். சீதபேதியைக் குணப்படுத்தும். ⭐⭐
                </div>
                <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
                    <strong>3. தூதுவளை (Solanum trilobatum):</strong> சொலனேசி குடும்பம். இலை மற்றும் கனி சளி, இருமலுக்கு மருந்தாகும். <strong>காசநோய் (TB)</strong>, ஆஸ்துமாவிற்கு சிறந்தது. ⭐⭐⭐
                </div>
                <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
                    <strong>4. கீழாநெல்லி (Phyllanthus amarus):</strong> <strong>மஞ்சள் காமாலை</strong> நோய்க்கு மிகச்சிறந்த மருந்து. கல்லீரலுக்கு வலிமை அளிக்கிறது. ⭐⭐⭐
                </div>
                <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
                    <strong>5. சோற்றுக் கற்றாழை (Aloe vera):</strong> லில்லியேசி குடும்பம். மூல நோய், தோல் அலர்ஜி மற்றும் <strong>வயிற்றுப் புண்ணுக்கு (Ulcer)</strong> சிறந்த மருந்து. ⭐⭐
                </div>
            </div>
        </section>

        <!-- 📝 PRACTICE QUIZ (10 Questions) -->
        <section id="quiz">
            <div class="section-title">📝 சுய மதிப்பீட்டு வினாடி வினா (Interactive Quiz)</div>
            <p style="margin-bottom:15px;">சரியான விடையைத் தேர்ந்தெடுத்து உங்கள் அறிவைச் சோதிக்கவும்:</p>
            
            <div id="quizContainer">
                <h4 id="quizQuestionText" style="margin-bottom: 12px;">கேள்வி 1</h4>
                <div id="quizOptions"></div>
                <div id="quizFeedback" class="feedback-box"></div>
                <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <span id="quizIndexLabel" style="font-size: 0.85rem; color: #64748b;">கேள்வி 1 / 10</span>
                    <button class="btn" id="quizNextBtn" onclick="nextQuizQuestion()" disabled>அடுத்த கேள்வி</button>
                </div>
            </div>
        </section>

        <!-- ⏱️ 5-MINUTE EXAM CHALLENGE -->
        <section id="challenge">
            <div class="section-title">⏱️ 5-நிமிட விரைவுத் தேர்வு (Exam Challenge)</div>
            <div class="challenge-box" id="challengeBox">
                <p>தேர்வுக்கூட சூழலில் உங்களைச் சோதிக்கத் தயாரா? 5 நிமிடங்களில் 5 முக்கியமான வினாக்களுக்கு விடையளிக்க வேண்டும்!</p>
                <button class="btn btn-accent" style="margin-top: 15px;" onclick="startChallenge()">தேர்வைத் தொடங்கு</button>
            </div>

            <div id="challengeActivePanel" style="display: none;">
                <div class="hud-bar">
                    <span id="challengeProgressLabel">கேள்வி: 1 / 5</span>
                    <span class="timer-display" id="challengeTimer">05:00</span>
                </div>
                <div style="height: 6px; background: #e2e8f0; border-radius: 3px; margin-bottom: 20px; overflow: hidden;">
                    <div id="challengeProgressBar" style="width: 20%; height: 100%; background: var(--accent); transition: width 0.3s;"></div>
                </div>
                <h4 id="challengeQuestionText" style="margin-bottom:15px;">கேள்வி உரை</h4>
                <div id="challengeOptionsContainer"></div>
            </div>

            <div id="challengeResultPanel" class="feedback-box" style="background: #f8fafc; border: 1px solid #e2e8f0; color: var(--text-main); text-align: center;">
                <h3>தேர்வு முடிவுகள் 🏆</h3>
                <div style="font-size: 2.5rem; font-weight: bold; margin: 15px 0; color: var(--primary-dark);" id="challengeScoreLabel">0 / 5</div>
                <p id="challengeEvaluationText">மதிப்பீடு செய்யப்படுகிறது...</p>
                <button class="btn btn-secondary" style="margin-top: 15px;" onclick="resetChallenge()">மீண்டும் முயற்சி செய்</button>
            </div>
        </section>

        <!-- ⚡ 60-SECOND REVISION -->
        <section id="revision">
            <div class="section-title">⚡ 60-வினாடி மின்னல் திருப்புதல் (Rapid Revision)</div>
            <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                <li><strong>வகைப்பாட்டியல்:</strong> உயிரினங்களை அடையாளம் கண்டு, பெயரிட்டு, வகைப்படுத்தும் அறிவியல்.</li>
                <li><strong>டி காண்டோல்:</strong> வகைப்பாட்டியல் என்ற சொல்லை முதன்முதலில் அறிமுகப்படுத்தியவர்.</li>
                <li><strong>கரோலஸ் லின்னேயஸ்:</strong> நவீன வகைப்பாட்டியலின் தந்தை; செயற்கை வகைப்பாட்டு முறையை உருவாக்கினார்.</li>
                <li><strong>இயற்கை வகைப்பாடு:</strong> பெந்தம் மற்றும் ஹூக்கரால் உருவாக்கப்பட்டு, 'ஜெனிரா பிளான்டாரம்' நூலில் வெளியிடப்பட்டது.</li>
                <li><strong>இருசொல் பெயரிடுதல்:</strong> பேரினம் + சிற்றினம் முறை (எ.கா. <em>Mangifera indica</em>).</li>
                <li><strong>பாசிகள்:</strong> பச்சையமுடைய எளிய தற்சார்பு தாவரங்கள்; அகார் அகார் சிவப்பு பாசிகளிலிருந்து பெறப்படுகிறது.</li>
                <li><strong>பூஞ்சைகள்:</strong> பச்சையமற்ற பிறசார்பு உயிரினங்கள்; செல்சுவர் கைட்டினால் ஆனது; மருந்துகளின் ராணி பென்சிலின் ஆகும்.</li>
                <li><strong>பிரையோஃபைட்டா:</strong> தாவர உலகின் இருவாழ்விகள்; கடத்தும் திசுக்கள் அற்ற பூவாத் தாவரங்கள்.</li>
                <li><strong>டெரிடோஃபைட்டா:</strong> கடத்தும் திசுக்கள் உடைய முதல் உண்மை நிலத் தாவரங்கள் (பூவாத் தாவரங்கள்).</li>
                <li><strong>ஜிம்னோஸ்பெர்ம்கள்:</strong> திறந்த விதைத் தாவரங்கள்; சூற்பை இல்லாததால் கனிகள் உருவாவதில்லை.</li>
                <li><strong>ஆஞ்சியோஸ்பெர்ம்கள்:</strong> மூடிய விதைத் தாவரங்கள்; பூக்கும் தாவரங்களில் மிகப்பெரிய தொகுதி.</li>
                <li><strong>கீழாநெல்லி:</strong> மஞ்சள் காமாலை நோய்க்குச் சிறந்த மருந்து (கல்லீரலைப் பாதுகாக்கும்).</li>
            </ul>
        </section>

        <!-- 🧠 BIG PICTURE (Concept Map) -->
        <section id="concept-map">
            <div class="section-title">🧠 முழுமையான பாடம் ஒரே பார்வையில் (Big Picture)</div>
            <p style="margin-bottom: 15px;">தாவர உலகப் பாடத்தின் முழுமையான வரைபடம் கீழே கொடுக்கப்பட்டுள்ளது:</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; font-size: 0.9rem;">
                <div style="text-align: center; font-weight: bold; background: var(--primary-light); padding: 8px; border-radius: 6px;">தாவர உலகம் (Plant Kingdom)</div>
                <div style="display: flex; justify-content: space-between; margin-top: 20px; gap: 10px;">
                    <div style="flex: 1; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; background: white;">
                        <div style="font-weight: bold; color: var(--accent);">1. பூவாத் தாவரங்கள் (Cryptogamae)</div>
                        <ul style="padding-left: 15px; margin-top: 5px; font-size: 0.8rem;">
                            <li>தாலோஃபைட்டா (பாசிகள், பூஞ்சைகள்)</li>
                            <li>பிரையோஃபைட்டா (இருவாழ்விகள்)</li>
                            <li>டெரிடோஃபைட்டா (வாஸ்குலார் கிரிப்டோகாம்ஸ்)</li>
                        </ul>
                    </div>
                    <div style="flex: 1; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; background: white;">
                        <div style="font-weight: bold; color: var(--primary-dark);">2. பூக்கும் தாவரங்கள் (Phanerogamae)</div>
                        <ul style="padding-left: 15px; margin-top: 5px; font-size: 0.8rem;">
                            <li>ஜிம்னோஸ்பெர்ம்கள் (திறந்த விதைத் தாவரங்கள்)</li>
                            <li>ஆஞ்சியோஸ்பெர்ம்கள் (மூடிய விதைத் தாவரங்கள் - ஒருவித்திலை/இருவித்திலை)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <div class="footer-controls">
            <button class="btn btn-secondary" onclick="resetAllProgress()">பாட முன்னேற்ற நிலையை மீட்டமை (Reset Progress)</button>
        </div>

    </div>

    <script>
        let appState = {
            engageRevealed: false,
            knownDefinitionsCount: 0,
            definitionsViewed: new Set(),
            quizScores: {},
            simulationTries: new Set(),
            challengeScore: 0
        };

        const definitionsData = [
            { term: "வகைப்பாட்டியல் (Taxonomy)", meaning: "உயிரினங்களை அடையாளம் காணுதல், வகைப்படுத்துதல், விவரித்தல் மற்றும் பெயரிடுதல் ஆகியவற்றை உள்ளடக்கிய அறிவியல் பிரிவு ஆகும்." },
            { term: "செயற்கை வகைப்பாட்டு முறை", meaning: "தாவரங்களின் புறத்தோற்றப் பண்புகளின் (மகரந்தத்தாள்களின் எண்ணிக்கை/அமைப்பு) அடிப்படையில் வகைப்படுத்தும் முறை. எ.கா. கரோலஸ் லின்னேயஸ் முறை." },
            { term: "இயற்கை வகைப்பாட்டு முறை", meaning: "தாவரங்களின் புறத்தோற்ற மற்றும் இனப்பெருக்க பண்புகளின் அடிப்படையில் வகைப்படுத்தும் முறை. எ.கா. பெந்தம் மற்றும் ஹூக்கர் முறை." },
            { term: "இருசொல் பெயரிடுதல்", meaning: "ஓர் உயிரினத்தை பேரினம், சிற்றினம் என இரண்டு சொற்களால் பெயரிட்டு அழைக்கும் முறை ஆகும் (எ.கா. மாஞ்சிஃபெரா இண்டிகா)." },
            { term: "தாலஸ் (Thallus)", meaning: "வேர், தண்டு, இலை என வேறுபடுத்த இயலாத எளிய தாவர உடலமைப்பு ஆகும் (எ.கா. பாசிகள்)." }
        ];

        const quizData = [
            { q: "வகைப்பாட்டியல் (Taxonomy) என்னும் சொல்லை முதன்முதலில் உருவாக்கியவர் யார்?", o: ["கரோலஸ் லின்னேயஸ்", "R.H. விட்டேக்கர்", "அகஸ்டின் பைரமிஸ் டி காண்டோல்", "பெந்தம் மற்றும் ஹூக்கர்"], c: 2, e: "அகஸ்டின் பைரமிஸ் டி காண்டோல் முதன்முதலில் இச்சொல்லை உருவாக்கினார்." },
            { q: "நவீன வகைப்பாட்டியலின் தந்தை என்று அழைக்கப்படுபவர் யார்?", o: ["காஸ்பர்டு பாஹின்", "கரோலஸ் லின்னேயஸ்", "அகஸ்டின் டி காண்டோல்", "பெந்தம்"], c: 1, e: "கரோலஸ் லின்னேயஸ் நவீன வகைப்பாட்டியலின் தந்தை ஆவார். அவரே இருசொல் முறையை நடைமுறைப்படுத்தினார்." },
            { q: "பெந்தம் மற்றும் ஹூக்கரின் இயற்கை வகைப்பாட்டு நூல் எது?", o: ["ஸ்பீசிஸ் பிளான்டாரம்", "ஜெனிரா பிளான்டாரம்", "பிலாசபி ஜுவாலஜி", "மைக்ரோகிராபியா"], c: 1, e: "பெந்தம் மற்றும் ஹூக்கர் தங்களது வகைப்பாட்டை 'ஜெனிரா பிளான்டாரம்' என்ற நூலில் 3 தொகுதிகளாக வெளியிட்டனர்." },
            { q: "தாவர உலகின் இருவாழ்விகள் என அழைக்கப்படுபவை எவை?", o: ["பாசிகள்", "பூஞ்சைகள்", "பிரையோஃபைட்டா", "டெரிடோஃபைட்டா"], c: 2, e: "பிரையோஃபைட்டுகள் நிலத்திலும் நீரிலும் வாழும் தன்மையுடையதால் தாவர உலகின் இருவாழ்விகள் எனப்படும்." },
            { q: "கடத்தும் திசுக்களைக் (சைலம், புளோயம்) கொண்ட முதல் உண்மை நிலத் தாவரங்கள் எவை?", o: ["பிரையோஃபைட்டா", "டெரிடோஃபைட்டா", "ஜிம்னோஸ்பெர்ம்கள்", "ஆஞ்சியோஸ்பெர்ம்கள்"], c: 1, e: "டெரிடோஃபைட்டுகள் கடத்தும் திசுக்களைக் கொண்ட முதல் உண்மை நிலத் தாவரங்கள் (வாஸ்குலார் கிரிப்டோகாம்ஸ்) ஆகும்." },
            { q: "மஞ்சள் காமாலை நோய்க்கு மிகச்சிறந்த மருத்துவத் தாவரம் எது?", o: ["குப்பைமேனி", "வில்வம்", "தூதுவளை", "கீழாநெல்லி"], c: 3, e: "கீழாநெல்லி (Phyllanthus amarus) மஞ்சள் காமாலை நோய்க்குச் சிறந்த மருந்தாகும், இது கல்லீரலைப் பாதுகாக்கிறது." },
            { q: "பூஞ்சைகளின் செல்சுவர் எந்த வேதிப்பொருளால் ஆனது?", o: ["செல்லுலோஸ்", "கைட்டின்", "பெக்டின்", "லிக்னின்"], c: 1, e: "பூஞ்சைகளின் செல்சுவர் கைட்டின் (Chitin) என்ற கடினமான வேதிப்பொருளால் ஆனது." },
            { q: "மருந்துகளின் அரசி அல்லது மருந்துகளின் ராணி என அழைக்கப்படும் பூஞ்சை எது?", o: ["ஈஸ்ட்", "அகாரிகஸ்", "பெனிசிலின்", "அஸ்பர்ஜில்லஸ்"], c: 2, e: "1928-இல் சர் அலெக்சாண்டர் பிளெமிங் கண்டுபிடித்த பெனிசிலின் மருந்துகளின் ராணி என அழைக்கப்படுகிறது." },
            { q: "திறந்த விதைத் தாவரங்கள் என்று அழைக்கப்படும் தொகுதி எது?", o: ["ஜிம்னோஸ்பெர்ம்கள்", "ஆஞ்சியோஸ்பெர்ம்கள்", "டெரிடோஃபைட்டுகள்", "ஒருவித்திலை தாவரங்கள்"], c: 0, e: "ஜிம்னோஸ்பெர்ம்கள் சூற்பை அற்ற திறந்த விதைத் தாவரங்கள் ஆகும்." },
            { q: "வயிற்றுப் புண் (Ulcer) மற்றும் மூல நோயைக் குணப்படுத்தும் மருத்துவத் தாவரம் எது?", o: ["தூதுவளை", "சோற்றுக் கற்றாழை", "வில்வம்", "குப்பைமேனி"], c: 1, e: "சோற்றுக் கற்றாழை (அலோவேரா) வயிற்றுப் புண் மற்றும் தோல் அலர்ஜியைக் குணப்படுத்தும் லில்லியேசி குடும்பத் தாவரம்." }
        ];

        const challengeData = [
            { q: "இந்தியாவின் மிகப்பெரிய உலர் தாவரத் தொகுப்பு (Herbarium) எங்கு அமைந்துள்ளது?", o: ["சென்னை", "டெல்லி", "கொல்கத்தா", "மும்பை"], c: 2 },
            { q: "இருசொல் பெயரிடும் முறையை 1623 ஆம் ஆண்டு முதன்முதலில் அறிமுகப்படுத்தியவர் யார்?", o: ["கரோலஸ் லின்னேயஸ்", "காஸ்பர்டு பாஹின்", "அரிஸ்டாட்டில்", "பிளினி"], c: 1 },
            { q: "சிவப்பு பாசிகளிலிருந்து (Gelidium) ஆய்வக வளர்ச்சி ஊக்கியாகப் பெறப்படும் பொருள் எது?", o: ["அகார் அகார்", "அயோடின்", "புரதம்", "வைட்டமின்"], c: 0 },
            { q: "சளி மற்றும் இருமலுக்கு மருந்தாகவும், காசநோயைக் குணப்படுத்தவும் பயன்படும் தாவரம் எது?", o: ["கீழாநெல்லி", "குப்பைமேனி", "தூதுவளை", "வில்வம்"], c: 2 },
            { q: "பெந்தம் மற்றும் ஹூக்கர் வகைப்பாட்டில் உள்ள விதைத் தாவரங்களின் மொத்த குடும்பங்கள் எத்தனை?", o: ["165", "202", "34", "3"], c: 1 }
        ];

        let currentDefIndex = 0;
        let currentQuizIndex = 0;
        let challengeIndex = 0;
        let challengeTimerInterval = null;
        let challengeTimeRemaining = 300;
        let activeChallengeAnswers = [];

        window.addEventListener('DOMContentLoaded', () => {
            loadSavedProgress();
            renderQuizQuestion();
            updateUIMastery();
        });

        function loadSavedProgress() {
            const saved = localStorage.getItem('nmms_botany_progress');
            if(saved) {
                try {
                    const parsed = JSON.parse(saved);
                    appState = { ...appState, ...parsed };
                    if(parsed.definitionsViewed) appState.definitionsViewed = new Set(parsed.definitionsViewed);
                    if(parsed.simulationTries) appState.simulationTries = new Set(parsed.simulationTries);
                } catch(e) {
                    console.error("Error loading saved state", e);
                }
            }
        }

        function saveProgress() {
            const copy = { ...appState };
            copy.definitionsViewed = Array.from(appState.definitionsViewed);
            copy.simulationTries = Array.from(appState.simulationTries);
            localStorage.setItem('nmms_botany_progress', JSON.stringify(copy));
            updateUIMastery();
        }

        function updateUIMastery() {
            let score = 0;
            if(appState.engageRevealed) score += 10;
            score += Math.min(appState.definitionsViewed.size * 4, 20);
            score += Math.min(appState.simulationTries.size * 6, 30);
            
            let quizCount = Object.keys(appState.quizScores).length;
            score += Math.min(quizCount * 4, 40);

            let finalPercent = Math.min(score, 100);
            document.getElementById('masteryPercent').innerText = finalPercent + "%";
            document.getElementById('pageProgress').style.width = finalPercent + "%";
        }

        function resetAllProgress() {
            localStorage.removeItem('nmms_botany_progress');
            appState = {
                engageRevealed: false,
                knownDefinitionsCount: 0,
                definitionsViewed: new Set(),
                quizScores: {},
                simulationTries: new Set(),
                challengeScore: 0
            };
            currentDefIndex = 0;
            currentQuizIndex = 0;
            updateUIMastery();
            renderQuizQuestion();
            document.getElementById('engageAnswer').style.display = 'none';
            alert("உங்களது பாட முன்னேற்ற நிலை மீட்டமைக்கப்பட்டது!");
        }

        function revealEngageAnswer() {
            document.getElementById('engageAnswer').style.display = 'block';
            appState.engageRevealed = true;
            saveProgress();
        }

        function runSimulation(type, btn) {
            const btns = document.querySelectorAll('.sim-btn');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const plant = document.getElementById('simPlant');
            const flow = document.getElementById('simFlow');
            const text = document.getElementById('simText');

            appState.simulationTries.add(type);
            saveProgress();

            if(type === 'thallophyta') {
                plant.style.height = "40px";
                plant.style.width = "80px";
                plant.style.borderRadius = "50% 50% 0 0";
                plant.style.background = "#10b981";
                flow.classList.remove('active');
                text.innerHTML = "<strong>ஆய்வக முடிவு (பாசிகள்):</strong> எளிய உடலமைப்பு (தாலஸ்). வேர், தண்டு வேறுபாடு இல்லை. கடத்தும் திசுக்கள் (Vascular Bundle) இல்லை.";
            } else if(type === 'bryophyta') {
                plant.style.height = "60px";
                plant.style.width = "50px";
                plant.style.borderRadius = "12px 12px 0 0";
                plant.style.background = "#047857";
                flow.classList.remove('active');
                text.innerHTML = "<strong>ஆய்வக முடிவு (பிரையோஃபைட்டா):</strong> தாவர உலகின் இருவாழ்விகள். சிறிய உடலமைப்பு, கடத்தும் திசுக்கள் அற்ற பூவாத் தாவரங்கள்.";
            } else if(type === 'pteridophyta') {
                plant.style.height = "90px";
                plant.style.width = "40px";
                plant.style.borderRadius = "4px";
                plant.style.background = "#065f46";
                flow.classList.add('active');
                text.innerHTML = "<strong>ஆய்வக முடிவு (டெரிடோஃபைட்டா):</strong> கடத்தும் திசுக்கள் (வாஸ்குலார் கற்றை) உடைய முதல் உண்மை நிலத் தாவரங்கள் ஆகும்!";
            } else if(type === 'gymnosperm') {
                plant.style.height = "130px";
                plant.style.width = "30px";
                plant.style.borderRadius = "50% 50% 0 0";
                plant.style.background = "#1e3a8a";
                flow.classList.add('active');
                text.innerHTML = "<strong>ஆய்வக முடிவு (ஜிம்னோஸ்பெர்ம்):</strong> திறந்த விதைத் தாவரங்கள். கூம்பு வடிவ அமைப்புகள் மூலம் விந்தகங்கள் உருவாகும். கனிகள் இல்லை.";
            } else if(type === 'angiosperm') {
                plant.style.height = "150px";
                plant.style.width = "60px";
                plant.style.borderRadius = "20px 20px 0 0";
                plant.style.background = "#db2777";
                flow.classList.add('active');
                text.innerHTML = "<strong>ஆய்வக முடிவு (ஆஞ்சியோஸ்பெர்ம்):</strong> மிக உயர்ந்த மூடிய விதைத் தாவரங்கள். மலர்கள், கனிகள் மற்றும் மேம்பட்ட வாஸ்குலார் கற்றைகள் கொண்டவை.";
            }
        }

        function flipCard() {
            const card = document.getElementById('mainFlashcard');
            card.classList.toggle('flipped');
            appState.definitionsViewed.add(currentDefIndex);
            saveProgress();
        }

        function nextDefinition(event) {
            event.stopPropagation();
            const card = document.getElementById('mainFlashcard');
            card.classList.remove('flipped');
            
            setTimeout(() => {
                currentDefIndex = (currentDefIndex + 1) % definitionsData.length;
                document.getElementById('defTerm').innerText = definitionsData[currentDefIndex].term;
                document.getElementById('defMeaning').innerText = definitionsData[currentDefIndex].meaning;
            }, 200);
        }

        function markDefKnown() {
            appState.definitionsViewed.add(currentDefIndex);
            saveProgress();
            alert("வாழ்த்துகள்! இந்த கலைச்சொல் உங்களது தேர்ச்சிப் பட்டியலில் சேர்க்கப்பட்டது.");
        }

        function toggleDiagramLabels() {
            const nodes = document.querySelectorAll('.label-node');
            const btn = document.getElementById('toggleLabelsBtn');
            
            nodes.forEach(n => {
                n.classList.toggle('hidden-label');
            });

            if(nodes[0].classList.contains('hidden-label')) {
                btn.innerText = "விடைகளைக் காட்டு (Show Labels)";
                btn.classList.add('btn-accent');
            } else {
                btn.innerText = "பயிற்சி பயன்முறை (Hide Labels)";
                btn.classList.remove('btn-accent');
            }
        }

        function renderQuizQuestion() {
            const qObj = quizData[currentQuizIndex];
            document.getElementById('quizQuestionText').innerText = (currentQuizIndex + 1) + '. ' + qObj.q;
            document.getElementById('quizIndexLabel').innerText = 'கேள்வி ' + (currentQuizIndex + 1) + ' / ' + quizData.length;
            
            const optDiv = document.getElementById('quizOptions');
            optDiv.innerHTML = '';
            
            const feedback = document.getElementById('quizFeedback');
            feedback.style.display = 'none';
            document.getElementById('quizNextBtn').disabled = true;

            qObj.o.forEach((opt, idx) => {
                const item = document.createElement('div');
                item.className = 'quiz-option';
                item.innerHTML = '<span>' + opt + '</span>';
                item.onclick = () => selectQuizOption(idx, item);
                optDiv.appendChild(item);
            });
        }

        function selectQuizOption(selectedIdx, element) {
            const qObj = quizData[currentQuizIndex];
            const options = document.querySelectorAll('.quiz-option');
            
            options.forEach(o => o.onclick = null);
            
            const feedback = document.getElementById('quizFeedback');
            feedback.style.display = 'block';

            if(selectedIdx === qObj.c) {
                element.classList.add('correct');
                feedback.className = 'feedback-box';
                feedback.style.background = '#d1fae5';
                feedback.style.color = '#065f46';
                feedback.innerHTML = '<strong>✓ சரி!</strong> ' + qObj.e;
                appState.quizScores[currentQuizIndex] = true;
            } else {
                element.classList.add('wrong');
                options[qObj.c].classList.add('correct');
                feedback.className = 'feedback-box';
                feedback.style.background = '#fee2e2';
                feedback.style.color = '#991b1b';
                feedback.innerHTML = '<strong>✗ தவறு!</strong> சரியான விடை: ' + qObj.o[qObj.c] + '. <br>' + qObj.e;
                appState.quizScores[currentQuizIndex] = false;
            }

            document.getElementById('quizNextBtn').disabled = false;
            saveProgress();
        }

        function nextQuizQuestion() {
            currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
            renderQuizQuestion();
        }

        function startChallenge() {
            document.getElementById('challengeBox').style.display = 'none';
            document.getElementById('challengeActivePanel').style.display = 'block';
            document.getElementById('challengeResultPanel').style.display = 'none';
            
            challengeIndex = 0;
            challengeTimeRemaining = 300;
            activeChallengeAnswers = [];
            
            startChallengeTimer();
            renderChallengeQuestion();
        }

        function startChallengeTimer() {
            clearInterval(challengeTimerInterval);
            challengeTimerInterval = setInterval(() => {
                challengeTimeRemaining--;
                if(challengeTimeRemaining <= 0) {
                    endChallenge();
                } else {
                    let mins = Math.floor(challengeTimeRemaining / 60);
                    let secs = challengeTimeRemaining % 60;
                    document.getElementById('challengeTimer').innerText = 
                        mins.toString().padStart(2,'0') + ':' + secs.toString().padStart(2,'0');
                }
            }, 1000);
        }

        function renderChallengeQuestion() {
            const qObj = challengeData[challengeIndex];
            document.getElementById('challengeQuestionText').innerText = (challengeIndex + 1) + '. ' + qObj.q;
            document.getElementById('challengeProgressLabel').innerText = 'கேள்வி: ' + (challengeIndex + 1) + ' / ' + challengeData.length;
            document.getElementById('challengeProgressBar').style.width = ((challengeIndex + 1) / challengeData.length * 100) + "%";

            const container = document.getElementById('challengeOptionsContainer');
            container.innerHTML = '';

            qObj.o.forEach((opt, idx) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option';
                btn.innerHTML = '<span>' + opt + '</span>';
                btn.onclick = () => submitChallengeAnswer(idx);
                container.appendChild(btn);
            });
        }

        function submitChallengeAnswer(idx) {
            activeChallengeAnswers.push(idx);
            challengeIndex++;
            if(challengeIndex >= challengeData.length) {
                endChallenge();
            } else {
                renderChallengeQuestion();
            }
        }

        function endChallenge() {
            clearInterval(challengeTimerInterval);
            document.getElementById('challengeActivePanel').style.display = 'none';
            const resultPanel = document.getElementById('challengeResultPanel');
            resultPanel.style.display = 'block';

            let score = 0;
            challengeData.forEach((q, i) => {
                if(activeChallengeAnswers[i] === q.c) score++;
            });

            document.getElementById('challengeScoreLabel').innerText = score + ' / ' + challengeData.length;
            
            let evalText = "";
            if(score === 5) {
                evalText = "🟢 அற்புதம்! நீங்கள் தாவர உலகம் பாடத்தில் முழுமையான தேர்ச்சி அடைந்துவிட்டீர்கள்! தேர்வுக்கு முற்றிலும் தயார்.";
            } else if (score >= 3) {
                evalText = "🟡 நன்று! சில தவறுகள் உள்ளன. வினாடி வினா மற்றும் 60 வினாடி திருப்புதல் பகுதிகளை மீண்டும் ஒருமுறை படிக்கவும்.";
            } else {
                evalText = "🔴 மீண்டும் திருப்புதல் செய்யவும்! மருத்துவ தாவரங்கள் மற்றும் பெந்தம்-ஹூக்கர் அட்டவணையை இன்னும் கவனமாகப் படிக்க வேண்டியது அவசியம்.";
            }
            document.getElementById('challengeEvaluationText').innerText = evalText;
        }

        function resetChallenge() {
            document.getElementById('challengeResultPanel').style.display = 'none';
            document.getElementById('challengeBox').style.display = 'block';
        }
    </script>
</body>
</html>`;
