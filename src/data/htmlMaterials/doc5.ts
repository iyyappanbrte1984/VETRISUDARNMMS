export const doc5Html = `<!DOCTYPE html>
<html lang="ta">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NMMS - SAT-அறிவியல் | கணினி காட்சித் தொடர்பு</title>
    <style>
        :root {
            --primary-grad: linear-gradient(135deg, #4f46e5, #06b6d4);
            --bg-light: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #475569;
            --accent-success: #10b981;
            --accent-warning: #f59e0b;
            --accent-danger: #ef4444;
            --accent-info: #3b82f6;
            --radius-lg: 16px;
            --radius-md: 12px;
            --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
            --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            scroll-behavior: smooth;
        }

        body {
            background-color: var(--bg-light);
            color: var(--text-main);
            line-height: 1.6;
            padding-bottom: 60px;
        }

        .progress-sticky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            z-index: 1000;
            border-bottom: 1px solid #e2e8f0;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: var(--shadow-sm);
        }

        .progress-container {
            flex-grow: 1;
            margin: 0 20px;
            background-color: #e2e8f0;
            border-radius: 9999px;
            height: 12px;
            overflow: hidden;
            position: relative;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #4f46e5, #10b981);
            width: 0%;
            transition: width 0.4s ease;
        }

        .progress-text {
            font-weight: 700;
            font-size: 0.95rem;
            color: #4f46e5;
            min-width: 120px;
            text-align: right;
        }

        .btn-reset {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s;
        }
        .btn-reset:hover {
            background: #e2e8f0;
            color: var(--accent-danger);
        }

        header {
            background: var(--primary-grad);
            color: white;
            padding: 60px 20px 40px;
            text-align: center;
            border-bottom-left-radius: 32px;
            border-bottom-right-radius: 32px;
            box-shadow: var(--shadow-lg);
            margin-top: 40px;
        }

        header h1 {
            font-size: 2.2rem;
            margin-bottom: 10px;
        }
        header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .main-container {
            max-width: 1000px;
            margin: 30px auto;
            padding: 0 15px;
        }

        .section-card {
            background: var(--card-bg);
            border-radius: var(--radius-lg);
            padding: 30px;
            margin-bottom: 35px;
            box-shadow: var(--shadow-md);
            border: 1px solid #f1f5f9;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .section-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 9999px;
            color: white;
            font-weight: 700;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 15px;
        }

        .badge-engage { background: #ec4899; }
        .badge-visualize { background: #8b5cf6; }
        .badge-explore { background: #3b82f6; }
        .badge-understand { background: #06b6d4; }
        .badge-experiment { background: #10b981; }
        .badge-connect { background: #6366f1; }
        .badge-remember { background: #f59e0b; }
        .badge-practice { background: #14b8a6; }
        .badge-exam { background: #ef4444; }

        h2 {
            font-size: 1.6rem;
            color: var(--text-main);
            margin-bottom: 15px;
        }

        p.intro-text {
            font-size: 1.05rem;
            color: var(--text-muted);
            margin-bottom: 20px;
        }

        .sim-box {
            background: #0f172a;
            border-radius: var(--radius-md);
            padding: 20px;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px 0;
        }

        .canvas-container {
            display: flex;
            gap: 20px;
            justify-content: center;
            width: 100%;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .canvas-wrapper {
            background: #1e293b;
            border: 2px solid #334155;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            flex: 1;
            min-width: 260px;
        }

        .canvas-wrapper h4 {
            margin-bottom: 10px;
            color: #e2e8f0;
        }

        .sim-canvas {
            background: #ffffff;
            border-radius: 4px;
            width: 100%;
            max-width: 240px;
            height: 240px;
        }

        .sim-controls {
            width: 100%;
            max-width: 500px;
            text-align: center;
        }

        .sim-controls label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: #cbd5e1;
        }

        .sim-slider {
            width: 100%;
            accent-color: #3b82f6;
            margin-bottom: 10px;
        }

        .challenge-container {
            background: #fffbeb;
            border: 2px dashed #f59e0b;
            border-radius: var(--radius-md);
            padding: 20px;
            margin: 20px 0;
        }
        
        .challenge-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }

        @media(max-width: 600px) {
            .challenge-options { grid-template-columns: 1fr; }
        }

        .btn-opt {
            background: white;
            border: 2px solid #cbd5e1;
            padding: 12px;
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
            text-align: left;
        }
        .btn-opt:hover {
            border-color: #f59e0b;
            background: #fff8e1;
        }

        .challenge-feedback {
            margin-top: 15px;
            padding: 15px;
            border-radius: 8px;
            display: none;
            font-weight: 500;
        }

        .concept-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .concept-card {
            background: #fafafa;
            border-left: 5px solid #06b6d4;
            border-radius: var(--radius-md);
            padding: 20px;
            box-shadow: var(--shadow-sm);
            transition: all 0.3s;
        }
        .concept-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        .concept-card h3 {
            color: #0891b2;
            margin-bottom: 10px;
        }

        .concept-field {
            margin-bottom: 8px;
            font-size: 0.95rem;
        }
        .concept-field strong {
            color: #1e293b;
        }

        .flashcard-deck {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 20px;
        }

        .flashcard-container {
            perspective: 1000px;
            width: 280px;
            height: 180px;
            cursor: pointer;
        }

        .flashcard {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s;
            box-shadow: var(--shadow-md);
            border-radius: var(--radius-md);
        }

        .flashcard.flipped {
            transform: rotateY(180deg);
        }

        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            border-radius: var(--radius-md);
            text-align: center;
        }

        .face-front {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            font-weight: 700;
            font-size: 1.2rem;
        }

        .face-back {
            background: white;
            color: var(--text-main);
            transform: rotateY(180deg);
            border: 2px solid #3b82f6;
            font-size: 0.95rem;
        }

        .lab-flow {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: var(--radius-md);
            padding: 20px;
        }

        .lab-steps {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 15px;
        }

        .lab-step-node {
            background: white;
            border: 1px solid #e2e8f0;
            padding: 12px 18px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .lab-step-node:hover {
            border-color: #10b981;
            background: #f8fafc;
        }

        .lab-step-node.active-step {
            border-left: 5px solid #10b981;
            background: #e8f5e9;
            font-weight: 600;
        }

        .step-num {
            background: #10b981;
            color: white;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 700;
            flex-shrink: 0;
        }

        .lab-viewer {
            background: white;
            border: 2px solid #cbd5e1;
            border-radius: var(--radius-md);
            padding: 20px;
            margin-top: 20px;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .hub-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .hub-table th, .hub-table td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
        }
        .hub-table th {
            background: #f1f5f9;
            color: var(--text-main);
        }
        .clickable-row {
            cursor: pointer;
            transition: background 0.2s;
        }
        .clickable-row:hover {
            background: #f8fafc;
        }

        .diagram-container {
            position: relative;
            max-width: 500px;
            margin: 20px auto;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: var(--radius-md);
            padding: 25px;
        }

        .diagram-box-wrapper {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            gap: 15px;
        }

        .dia-card {
            background: white;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            width: 45%;
            box-shadow: var(--shadow-sm);
            position: relative;
        }

        .dia-label-text {
            display: block;
            margin-top: 10px;
            font-weight: bold;
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px;
            border-radius: 4px;
            transition: opacity 0.3s;
        }

        .dia-label-hidden {
            opacity: 0;
        }

        .diagram-controls {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;
        }

        .misconception-card {
            background: #fff5f5;
            border: 1px solid #fed7d7;
            border-radius: var(--radius-md);
            padding: 20px;
            margin-top: 15px;
        }
        .mis-wrong { color: #c53030; margin-bottom: 5px; }
        .mis-right { color: #2f855a; margin-bottom: 5px; }

        .spotlight-tier {
            margin-top: 15px;
            border-radius: var(--radius-md);
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .tier-header {
            padding: 12px 20px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            background: #f1f5f9;
        }
        .tier-header.must { background: #fee2e2; color: #991b1b; }
        .tier-header.imp { background: #ffedd5; color: #9a3412; }
        .tier-header.vimp { background: #fef9c3; color: #854d0e; }

        .tier-body {
            padding: 20px;
            background: white;
            display: none;
        }

        .quiz-item {
            background: #fafafa;
            border: 1px solid #e2e8f0;
            border-radius: var(--radius-md);
            padding: 20px;
            margin-bottom: 20px;
        }
        .quiz-question { font-weight: 600; margin-bottom: 12px; }
        .quiz-options-list { display: flex; flex-direction: column; gap: 8px; }
        .quiz-opt-lbl {
            background: white;
            border: 1px solid #cbd5e1;
            padding: 10px 15px;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .quiz-opt-lbl:hover { background: #f1f5f9; }
        .quiz-explanation {
            margin-top: 12px;
            padding: 10px 15px;
            border-radius: 6px;
            background: #e0f2fe;
            color: #0369a1;
            font-size: 0.9rem;
            display: none;
        }

        .challenge-box-panel {
            background: #0f172a;
            color: white;
            border-radius: var(--radius-lg);
            padding: 30px;
            text-align: center;
        }
        .challenge-timer {
            font-size: 2rem;
            font-weight: bold;
            color: #f59e0b;
            font-family: monospace;
            margin: 15px 0;
        }
        .btn-start-challenge {
            background: var(--accent-success);
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.1rem;
            font-weight: 700;
            border-radius: 9999px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .btn-start-challenge:hover { transform: scale(1.05); }

        .timed-quiz-area { display: none; text-align: left; margin-top: 20px; }
        .timed-results-area { display: none; margin-top: 20px; }
        
        .badge-rating {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 4px;
            font-weight: 700;
            margin-top: 10px;
        }
        .rating-strong { background: #d1fae5; color: #065f46; }
        .rating-revision { background: #fef9c3; color: #854d0e; }
        .rating-again { background: #fee2e2; color: #991b1b; }

        .svg-map-container {
            width: 100%;
            overflow-x: auto;
            background: #f8fafc;
            border-radius: var(--radius-md);
            padding: 15px;
            border: 1px solid #e2e8f0;
        }
        
        .action-footer-btn {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 15px;
            transition: background 0.2s;
        }
        .action-footer-btn:hover { background: #4338ca; }

        ul.revision-list {
            padding-left: 20px;
        }
        ul.revision-list li {
            margin-bottom: 12px;
            color: var(--text-muted);
        }
        ul.revision-list strong {
            color: var(--text-main);
        }
    </style>
</head>
<body>

    <div class="progress-sticky">
        <div style="font-weight: 700; color: #1e293b;">பாடம் தேர்ச்சி நிலை:</div>
        <div class="progress-container">
            <div id="masteryBar" class="progress-bar"></div>
        </div>
        <div id="masteryText" class="progress-text">0% நிறைவுற்றது</div>
        <button class="btn-reset" onclick="resetProgress()">மீட்டமை (Reset)</button>
    </div>

    <header>
        <h1>NMMS - SAT-அறிவியல் திருப்புதல் தளம்</h1>
        <p>7 ஆம் வகுப்பு - பருவம் 1 | பாடம் 7: கணினி காட்சித் தொடர்பு (Computer Visual Communication)</p>
    </header>

    <div class="main-container">

        <div id="sec-engage" class="section-card">
            <span class="section-badge badge-engage">🌟 Engage (ஈர்ப்பு)</span>
            <h2>ஒரு புகைப்படத்தை எவ்வளவுதான் பெரிதாக்கினாலும் அது உடையாமல் இருக்க முடியுமா?</h2>
            <p class="intro-text">
                நமது அன்றாட வாழ்வில் திறன்பேசிகளிலோ அல்லது கணினிகளிலோ ஒரு புகைப்படத்தை விரல்களால் பெரிதுபடுத்திப் (Zoom) பார்க்கும்போது, ஒரு கட்டத்திற்கு மேல் அது தெளிவிழந்து, சிறிய சதுரக் கட்டங்களாக மாறுவதைக் கவனித்திருக்கிறீர்களா? ஆனால், சில வரைபடங்கள் மற்றும் லோகோக்களை (Logos) எவ்வளவு பெரிதாக்கினாலும் அதன் துல்லியம் மாறுவதே இல்லை! இதற்குப் பின்னால் இருக்கும் அறிவியல் என்னவென்று உங்களுக்குத் தெரியுமா? வாருங்கள், காட்சித் தொடர்பின் ரகசியங்களை இந்தத் தளத்தில் ஆராய்வோம்!
            </p>
            <button class="action-footer-btn" onclick="markRead('sec-engage', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-visualize" class="section-card">
            <span class="section-badge badge-visualize">👀 Visualize (காட்சிப்படுத்துதல்)</span>
            <h2>ராஸ்டர் (Raster) VS வெக்டர் (Vector) காட்சி வேறுபாடு மென்பொருள் சிமுலேட்டர்</h2>
            <p class="intro-text">
                கீழே உள்ள ஸ்லைடரை (Slider) நகர்த்தி, ராஸ்டர் படம் படப்புள்ளிகளால் (Pixels) உடைவதையும், கணித அடிப்படையிலான வெக்டர் படம் எப்போதும் கூர்மையாகவும் துல்லியமாகவும் இருப்பதையும் கண்கூடாகக் காணுங்கள்.
            </p>
            
            <div class="sim-box">
                <div class="canvas-container">
                    <div class="canvas-wrapper">
                        <h4>ராஸ்டர் வரைகலை (Pixels அடிப்படையிலானது)</h4>
                        <canvas id="rasterCanvas" class="sim-canvas" width="240" height="240"></canvas>
                    </div>
                    <div class="canvas-wrapper">
                        <h4>வெக்டர் வரைகலை (கணித அடிப்படையிலானது)</h4>
                        <canvas id="vectorCanvas" class="sim-canvas" width="240" height="240"></canvas>
                    </div>
                </div>
                <div class="sim-controls">
                    <label for="zoomSlider">பெரிதாக்குதல் அளவு (Zoom Scale): <span id="zoomVal">1x</span></label>
                    <input type="range" id="zoomSlider" class="sim-slider" min="1" max="15" value="1" step="1" oninput="updateZoomSim(this.value)">
                    <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 5px;">
                        * ஸ்லைடரை 15x நோக்கி இழுக்கும்போது ராஸ்டர் வட்டத்தில் செவ்வக அடுக்குக் கட்டங்கள் (Pixels) தோன்றுவதைக் கவனிக்கவும்!
                    </p>
                </div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-visualize', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-explore" class="section-card">
            <span class="section-badge badge-explore">🔍 Explore (ஆராய்ந்து அறிதல்)</span>
            <h2>கணினித் தகவல் கையாளுதல் முறை சவால்</h2>
            <p class="intro-text">கணினியை நாம் முதன்மையாக நாடுவதற்கு அதன் <strong>வேகம்</strong> மற்றும் <strong>சேமிப்பு திறன்</strong> தான் முக்கியக் காரணம் ஆகும்.</p>
            
            <div class="challenge-container">
                <h3>❓ கணிப்புச் சவால் (What Happens If...?)</h3>
                <p><strong>கேள்வி:</strong> ஒரு புகைப்படக் கலைஞர் மிக உயர்தர டிஜிட்டல் கேமரா (Camera) மற்றும் ஸ்கேனர் (Scanner) மூலம் படங்களை எடுத்துப் பெரிய அளவில் அச்சிட விரும்புகிறார். அவர் எந்த வரைகலை வடிவத்தைப் பயன்படுத்தினால் படத்தின் துல்லியம் மாறாமல் இருக்கும்?</p>
                <div class="challenge-options">
                    <button class="btn-opt" onclick="revealPrediction(1)">அ) ராஸ்டர் வரைகலை வடிவம் (.jpg)</button>
                    <button class="btn-opt" onclick="revealPrediction(2)">ஆ) வெக்டர் வரைகலை வடிவம் (.svg)</button>
                </div>
                <div id="predictionFeedback" class="challenge-feedback"></div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-explore', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-understand" class="section-card">
            <span class="section-badge badge-understand">🧠 Understand (கருத்து உணர்தல்)</span>
            <h2>முக்கியக் பாடக் கருத்து அட்டைகள் (Concept Cards)</h2>
            <p class="intro-text">பாடத்தின் மிக முக்கியமான வரையறைகள் மற்றும் கோட்பாடுகளை ஆழமாகப் புரிந்து கொள்ளுங்கள்.</p>
            
            <div class="concept-grid">
                <div class="concept-card">
                    <h3>கோப்பு (File)</h3>
                    <div class="concept-field"><strong>🔑 முக்கியக் கருத்து:</strong> செயலிகளின் வெளியீடு</div>
                    <div class="concept-field"><strong>📖 விளக்கம்:</strong> கணினியில் இடம் பெற்றிருக்கும் ஏதேனும் ஒரு செயலி (Application) மூலம் உருவாக்கப்படும் எந்த ஒரு வெளியீடும் கோப்பு எனப்படும்.</div>
                    <div class="concept-field"><strong>🌍 உதாரணம்:</strong> Notepad-ல் தட்டச்சு செய்த குறிப்பு அல்லது Paint-ல் வரைந்த ஒரு படம்.</div>
                </div>
                
                <div class="concept-card" style="border-left-color: #8b5cf6;">
                    <h3>கோப்புத் தொகுப்பு (Folder)</h3>
                    <div class="concept-field"><strong>🔑 முக்கியக் கருத்து:</strong> கோப்புகளின் பெட்டகம்</div>
                    <div class="concept-field"><strong>📖 விளக்கம்:</strong> பல கோப்புகளை உள்ளடக்கிய ஒரு பெட்டகம் போன்ற அமைப்பு கோப்புத் தொகுப்பு (Folder) ஆகும். விருப்பப்படி கோப்புகளை இதில் சேமிக்கலாம்.</div>
                    <div class="concept-field"><strong>🧠 நினைவூட்டி:</strong> புத்தகங்களை உள்ளடக்கிய அலமாரி = Folder; அலமாரியில் உள்ள புத்தகங்கள் = Files.</div>
                </div>

                <div class="concept-card" style="border-left-color: #10b981;">
                    <h3>இயக்கத்தளம் (OS)</h3>
                    <div class="concept-field"><strong>🔑 முக்கியக் கருத்து:</strong> அடிப்படை இயக்கு மென்பொருள்</div>
                    <div class="concept-field"><strong>📖 விளக்கம்:</strong> கணினியை இயக்க உதவும் அடிப்படை மென்பொருள்கள். தற்காலத்தில் அதிகமானவர்களால் பயன்படுத்தப்படும் இயக்க மென்பொருள்கள் விண்டோஸ் (Windows) மற்றும் லினக்ஸ் (Linux) ஆகும்.</div>
                </div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-understand', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-experiment" class="section-card">
            <span class="section-badge badge-experiment">🔬 Experiment (செயல்முறை ஆய்வகம்)</span>
            <h2>மெய்நிகர் ஆய்வகம்: இங்க்ஸ்கேப் (Inkscape) மூலம் வெக்டர் படம் உருவாக்குதல்</h2>
            <p class="intro-text">நாம் காகிதத்தில் வரைந்த சாதாரணப் படங்களை வெக்டர் படங்களாக மாற்ற இங்ஸ்கேப் மென்பொருள் எவ்வாறு பயன்படுகிறது என்பதைப் படிகளில் கிளிக் செய்து செயல்முறையை ஆராயுங்கள்.</p>
            
            <div class="lab-flow">
                <div style="font-weight:700; color:#16a34a; margin-bottom:10px;">ஆய்வின் நோக்கம்: காகிதப் படத்தை துல்லியமான வெக்டர் கோப்பாக மாற்றுதல்</div>
                <div class="lab-steps">
                    <div id="labstep1" class="lab-step-node active-step" onclick="runLabStep(1)">
                        <div class="step-num">1</div>
                        <div>படி 1: வரைந்த படத்தினை வருடி (Scanner) மூலமாக ஸ்கேன் செய்தல்.</div>
                    </div>
                    <div id="labstep2" class="lab-step-node" onclick="runLabStep(2)">
                        <div class="step-num">2</div>
                        <div>படி 2: இங்க்ஸ்கேப் மென்பொருளில் திறந்து, படம் முழுவதையும் தேர்வு செய்தல்.</div>
                    </div>
                    <div id="labstep3" class="lab-step-node" onclick="runLabStep(3)">
                        <div class="step-num">3</div>
                        <div>படி 3: PATH எனும் தேர்வில் TRACE BITMAP என்பதை கிளிக் செய்தல்.</div>
                    </div>
                    <div id="labstep4" class="lab-step-node" onclick="runLabStep(4)">
                        <div class="step-num">4</div>
                        <div>படி 4: தோன்றும் சிறிய திரையில் திருத்தங்களைச் செய்து, UPDATE செய்து பின் OK கொடுத்தல்.</div>
                    </div>
                    <div id="labstep5" class="lab-step-node" onclick="runLabStep(5)">
                        <div class="step-num">5</div>
                        <div>படி 5: திரையில் தோன்றும் புதிய வெக்டர் படத்தை கிளிக் செய்து இழுத்து சேமித்தல் (Save).</div>
                    </div>
                </div>

                <div id="labViewerBox" class="lab-viewer">
                    <strong style="color: #15803d;">ஆய்வக நேரடி நிலைக்காட்சி:</strong>
                    <p id="labViewerText">படி 1: காகிதப் படம் கணினியினுள் டிஜிட்டல் வடிவில் வருடி (Scanner) மூலம் கொண்டு வரப்படுகிறது.</p>
                </div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-experiment', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-definitions" class="section-card">
            <span class="section-badge badge-connect">📚 Definition Master (வரையறை மேலாளர்)</span>
            <h2>கலைச்சொல் மற்றும் அறிவியல் வரையறை அட்டைகள்</h2>
            <p class="intro-text">அட்டையைக் கிளிக் செய்து அதன் பின்புறம் உள்ள பாடப் புத்தக அதிகாரப்பூர்வ வரையறையைக் கற்றுக்கொள்ளுங்கள்.</p>
            
            <div class="flashcard-deck">
                <div class="flashcard-container" onclick="toggleFlip(this)">
                    <div class="flashcard">
                        <div class="card-face face-front">
                            காட்சித் தொடர்பு சாதனம்<br>(Visual Communication Device)
                        </div>
                        <div class="card-face face-back">
                            படங்கள் வழியாகக் குறிப்பிட்ட கருத்தினை நமக்கு எளிதில் புரிய வைப்பவை காட்சித் தொடர்பு சாதனங்கள் ஆகும். (எ.கா: நிழற்படங்கள், வரைபடங்கள், அசைவூட்டப் படங்கள், திரைப்படம்).
                        </div>
                    </div>
                </div>

                <div class="flashcard-container" onclick="toggleFlip(this)">
                    <div class="flashcard">
                        <div class="card-face face-front">
                            மெய்நிகர் தொழில் நுட்பம்<br>(Virtual Reality - VR)
                        </div>
                        <div class="card-face face-back">
                            கணினியால் உருவாக்கப்பட்ட தோற்றங்களை உண்மையான உருவம் போலக் காட்டுவதாகும். இதன் மூலம் விளையாடும் போது உண்மையாக மைதானத்தில் விளையாடுவது போன்ற உணர்வு ஏற்படும்.
                        </div>
                    </div>
                </div>

                <div class="flashcard-container" onclick="toggleFlip(this)">
                    <div class="flashcard">
                        <div class="card-face face-front">
                            ராஸ்டர் வரைகலை படம்<br>(Raster Graphics)
                        </div>
                        <div class="card-face face-back">
                            படப்புள்ளிகளை (Pixels) அடிப்படையாகக் கொண்டு உருவாக்கப்படும் படங்கள். இவற்றை பெரிதாக்கும் போது செவ்வக அடுக்குக் கட்டங்களாக உடையும் தன்மையுடையவை.
                        </div>
                    </div>
                </div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-definitions', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-hub" class="section-card">
            <span class="section-badge badge-practice">🧮 மென்பொருள் & விகுதிகள் ஆய்வகம் (Hub)</span>
            <h2>கோப்பு நீட்டிப்புகள் மற்றும் மென்பொருள் ஒப்பீடு</h2>
            <p class="intro-text">தேர்வுக்கு மிக முக்கியமான கோப்பு நீட்டிப்பு (File Extensions) மற்றும் பயன்பாட்டு மென்பொருள் அட்டவணை.</p>
            
            <table class="hub-table">
                <thead>
                    <tr>
                        <th>வகை / செயலி</th>
                        <th>கோப்பு வடிவங்கள் / நீட்டிப்புகள்</th>
                        <th>முக்கியக் குறிப்பு</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="clickable-row">
                        <td><strong>ராஸ்டர் கோப்பு வகைகள் (Raster Types)</strong></td>
                        <td>.png, .jpg, .jpeg, .gif, .tiff, .psd</td>
                        <td>கேமரா மற்றும் ஸ்கேனர் மூலமாகப் பெறப்படும் படங்கள் இந்த வகையைச் சார்ந்தவை.</td>
                    </tr>
                    <tr class="clickable-row">
                        <td><strong>வெக்டர் கோப்பு வகைகள் (Vector Types)</strong></td>
                        <td>.eps, .ai, .pdf, .svg, sketch</td>
                        <td>அளவில் மிகக் குறைந்தது. பெரிதாக்கினாலும் துல்லியம் மாறாது. லோகோக்களுக்குச் சிறந்தது.</td>
                    </tr>
                    <tr class="clickable-row">
                        <td><strong>அடோபி போட்டோஷாப் (Photoshop)</strong></td>
                        <td>.psd (ராஸ்டர் எடிட்டிங்)</td>
                        <td>புகைப்படங்களை அழகுபடுத்தவும் மாறுதல்களைச் செய்யவும் புகைப்படக்காரர்கள் பயன்படுத்துகின்றனர்.</td>
                    </tr>
                    <tr class="clickable-row">
                        <td><strong>வெக்டர் எடிட்டிங் மென்பொருள்கள்</strong></td>
                        <td>Adobe Illustrator, Sketch, Inkscape</td>
                        <td>கணிதவியல் புள்ளிகள் அடிப்படையில் கோடுகளைத் திருத்தவும் வரையவும் பயன்படுபவை.</td>
                    </tr>
                </tbody>
            </table>
            <button class="action-footer-btn" onclick="markRead('sec-hub', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-diagram" class="section-card">
            <span class="section-badge badge-visualize">✏️ Diagram Master (வரைபடப் பயிற்சி)</span>
            <h2>2D மற்றும் 3D பரிமாணப் புரிதல் மாதிரி</h2>
            <p class="intro-text">இருபரிமாண (2D) மற்றும் முப்பரிமாண (3D) படங்களுக்கு இடையேயான முக்கிய வேறுபாட்டைப் புரிந்துகொள்ள லேபிள்களை மறைத்து/காட்டிப் பயிற்சி எடுங்கள்.</p>
            
            <div class="diagram-container">
                <div class="diagram-controls">
                    <button class="btn-reset" onclick="toggleLabels(false)">லேபிள்களை மறை (Hide Labels)</button>
                    <button class="btn-reset" style="background:#e0f2fe;" onclick="toggleLabels(true)">லேபிள்களைக் காட்டு (Show Labels)</button>
                </div>

                <div class="diagram-box-wrapper">
                    <div class="dia-card">
                        <div style="width:60px; height:60px; background:#3b82f6; margin:0 auto; border-radius:4px;"></div>
                        <span style="font-size:0.85rem; display:block; margin-top:5px;">சதுரம் (Flat View)</span>
                        <span id="label2d" class="dia-label-text">2D பரிமாணம் (நீளம் × அகலம் மட்டும்)</span>
                    </div>

                    <div class="dia-card">
                        <div style="width:60px; height:60px; background:#10b981; margin:0 auto; border-radius:4px; transform: rotateX(20deg) rotateY(20deg); box-shadow: 5px 5px 0px #065f46;"></div>
                        <span style="font-size:0.85rem; display:block; margin-top:5px;">கனசதுரம் (Solid View)</span>
                        <span id="label3d" class="dia-label-text">3D பரிமாணம் (நீளம் × அகலம் × உயரம்)</span>
                    </div>
                </div>
                <p style="margin-top:15px; font-size:0.9rem; color:var(--text-muted); text-align:center;">
                    💡 <strong>தேர்வு குறிப்பு:</strong> முப்பரிமாணக் காணொளிகள் காட்சிகளை நம் கண்முன் நிகழ் உலகில் நடப்பது போலக் காட்டும் தன்மையுடையவை.
                </p>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-diagram', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-misconceptions" class="section-card">
            <span class="section-badge badge-remember">⚠️ Don't Get Confused! (குழப்பமடையாதீர்!)</span>
            <h2>தேர்வில் வரும் பொதுவான தவறான புரிதல்கள்</h2>
            
            <div class="misconception-card">
                <div class="mis-wrong">❌ <strong>தவறான எண்ணம்:</strong> அனிமேஷன் மற்றும் புகைப்படங்கள் அனைத்தும் ஒரே வகையான வரைகலை கோப்புகள் ஆகும்.</div>
                <div class="mis-right">✓ <strong>சரியான புரிதல்:</strong> கணினிப் படங்கள் அமைப்பின்படி இருவகைப்படும்: 1. ராஸ்டர் (படப்புள்ளிகள்), 2. வெக்டர் (கணிதவியல் வடிவம்). இரண்டும் முற்றிலும் வேறுபட்டவை!</div>
            </div>

            <div class="misconception-card" style="background:#fffbeb; border-color:#fef08a;">
                <div class="mis-wrong" style="color:#b45309;">❌ <strong>தவறான எண்ணம்:</strong> மைக்ரோசாஃப்ட் போட்டோ ஸ்டோரி (Photo Story) என்பது ஒரு போட்டோ எடிட்டிங் (Photo Editing) சாஃப்ட்வேர்.</div>
                <div class="mis-right" style="color:#16a34a;">✓ <strong>சரியான புரிதல்:</strong> போட்டோ ஸ்டோரி என்பது புகைப்படங்களை வரிசைப்படுத்தி, இசை சேர்த்து ஒரு <strong>காணொளியாக (Video)</strong> மாற்றும் மென்பொருள் ஆகும். திருத்தங்கள் செய்ய போட்டோஷாப் பயன்படுகிறது.</div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-misconceptions', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-spotlight" class="section-card">
            <span class="section-badge badge-exam">🎯 Exam Spotlight (தேர்வு உற்றுநோக்கு)</span>
            <h2>மதிப்பெண் வாரியாக முக்கியக் கேள்விகள் வினா-விடைத் தொகுப்பு</h2>
            
            <div class="spotlight-tier">
                <div class="tier-header must" onclick="toggleAccordion('tier1')">⭐ கண்டிப்பாகத் தெரிய வேண்டியவை (Must Know) <span>▼</span></div>
                <div id="tier1" class="tier-body">
                    <p><strong>கேள்வி:</strong> புதிய கோப்புத் தொகுப்பினை (Folder) உருவாக்க சுட்டியை (Mouse) எவ்வாறு பயன்படுத்த வேண்டும்?</p>
                    <p><strong>பதில்:</strong> சுட்டியின் வலது பொத்தானை (Right Click) அழுத்தி, தோன்றும் பட்டியலில் 'New' என்பதைத் தேர்வு செய்து, அதில் 'Folder' என்பதனைத் தேர்ந்தெடுக்க வேண்டும்.</p>
                </div>
            </div>

            <div class="spotlight-tier">
                <div class="tier-header imp" onclick="toggleAccordion('tier2')">⭐⭐ முக்கிய வினாக்கள் (Important) <span>▼</span></div>
                <div id="tier2" class="tier-body">
                    <p><strong>கேள்வி:</strong> மைக்ரோசாஃப்ட் போட்டோ ஸ்டோரியில் ஒரு புதிய கதையினை உருவாக்கத் தொடங்கும் போது முதலில் கிளிக் செய்ய வேண்டிய பொத்தான் எது?</p>
                    <p><strong>Bதில்:</strong> BEGIN A NEW STORY என்பதைத் தேர்வு செய்து NEXT என்பதைக் கிளிக் செய்ய வேண்டும்.</p>
                </div>
            </div>

            <div class="spotlight-tier">
                <div class="tier-header vimp" onclick="toggleAccordion('tier3')">⭐⭐⭐ மிக மிக முக்கிய வினாக்கள் (Very Important) <span>▼</span></div>
                <div id="tier3" class="tier-body">
                    <p><strong>கேள்வி:</strong> ராஸ்டர் படங்களை விட அளவில் மிகக் குறைந்தது எது? ஏன்?</p>
                    <p><strong>பதில்:</strong> வெக்டர் வரைகலைப் படங்கள். இவை கணித சமன்பாடுகளின் புள்ளி அடிப்படையில் உருவாக்கப்படுவதால் அளவில் மிகக் குறைவாகவும், அதே நேரம் துல்லியம் மாறாமலும் இருக்கும்.</p>
                </div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-spotlight', 8)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-quiz" class="section-card">
            <span class="section-badge badge-practice">📝 Interactive Quiz (சுய மதிப்பீட்டு வினாடி-வினா)</span>
            <h2>பாடப்பகுதி முழுமையான 10 பயிற்சி வினாக்கள்</h2>
            <p class="intro-text">ஒவ்வொரு வினாவிற்கும் சரியான விடையைத் தேர்ந்தெடுத்து உங்கள் உடனடிப் பின்னூட்டத்தைப் பெறுங்கள்.</p>

            <div id="quizContainer"></div>
            <button class="action-footer-btn" onclick="markRead('sec-quiz', 10)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-challenge" class="section-card">
            <span class="section-badge badge-exam">⏱️ 5-Minute Exam Challenge (நேர மேலாண்மைச் சவால்)</span>
            <h2>NMMS மாதிரி நேரக் கட்டுப்பாட்டுப் பரீட்சை முறை</h2>
            <p class="intro-text">உண்மையான தேர்வுச் சூழலில் 5 நிமிடங்களுக்குள் இந்த விரைவுத் தேர்வை முடித்து உங்கள் மதிப்பெண் மற்றும் திறமை நிலையை அறியுங்கள்!</p>

            <div class="challenge-box-panel">
                <div id="challengeIntro">
                    <p>இந்தத் தேர்வில் 5 சிறப்பு வினாக்கள் இடம் பெற்றுள்ளன. கால அளவு: 5 நிமிடங்கள் (300 நொடிகள்).</p>
                    <button class="btn-start-challenge" onclick="startTimedChallenge()">தேர்வைத் தொடங்கு (Start Exam)</button>
                </div>

                <div id="timedQuizArea" class="timed-quiz-area">
                    <div style="display:flex; justify-content:space-between; color:#94a3b8; font-weight:bold; margin-bottom:10px;">
                        <span id="timedQuestionNum">வினா 1/5</span>
                        <span>மீதமுள்ள நேரம்: <span id="timerDisplay" class="challenge-timer" style="font-size:1.2rem; margin:0; color:#f59e0b;">05:00</span></span>
                    </div>
                    <div id="timedQuestionText" style="font-size:1.1rem; margin-bottom:15px; font-weight:600;">விவரம் இங்கே வரும்...</div>
                    <div id="timedOptionsArea" class="quiz-options-list"></div>
                </div>

                <div id="timedResultsArea" class="timed-results-area">
                    <h3>🏆 உங்கள் தேர்வு முடிவு அறிக்கை!</h3>
                    <div style="font-size:2.5rem; font-weight:bold; margin:15px 0;" id="timedScoreTxt">0 / 5</div>
                    <p id="masteryPercentTxt" style="font-weight:bold; color:#a7f3d0;"></p>
                    <div id="ratingBadge" class="badge-rating">நிலை</div>
                    <p id="recommendationText" style="margin-top:15px; font-size:0.95rem; color:#cbd5e1;"></p>
                    <button class="btn-start-challenge" style="background:#4f46e5; margin-top:20px;" onclick="resetTimedChallenge()">மீண்டும் தேர்வு எழுது</button>
                </div>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-challenge', 10)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-revision" class="section-card">
            <span class="section-badge badge-remember">⚡ 60-Second Revision (மின்னல் வேக திருப்புதல்)</span>
            <h2>தேர்வு வழிகாட்டி முக்கிய 10 குறிப்புகள்</h2>
            <ul class="revision-list">
                <li>1. கணினியை நாடுவதற்கான முக்கிய காரணங்கள் அதன் <strong>வேகமும் சேமிப்பு திறனும்</strong> ஆகும்.</li>
                <li>2. கணினிச் செயலி மூலம் உருவாக்கப்படும் எந்த ஒரு வெளியீடும் <strong>கோப்பு (File)</strong> எனப்படும்.</li>
                <li>3. பல கோப்புகளை உள்ளடக்கிய பெட்டகம் போன்ற அமைப்பு <strong>கோப்புத் தொகுப்பு (Folder)</strong> ஆகும்.</li>
                <li>4. விண்டோஸ் (Windows) கணினியில் குறிப்புகளைச் சேமிக்க <strong>Notepad</strong> செயலியும், படங்கள் வரைய <strong>Paint</strong> செயலியும் பயன்படுகின்றன.</li>
                <li>5. குறிப்பிட்ட கருத்தினை எளிதில் புரிய வைக்கும் சாதனங்கள் <strong>காட்சித் தொடர்பு சாதனங்கள்</strong> எனப்படும். இதற்கு மிகச் சிறந்த சான்று <strong>திரைப்படம்</strong> ஆகும்.</li>
                <li>6. <strong>மைக்ரோசாஃப்ட் போட்டோ ஸ்டோரி</strong> மென்பொருள் மூலம் படங்களை வரிசைப்படுத்தி, இசை சேர்த்து <strong>காணொளியாக (Video)</strong> மாற்றலாம்.</li>
                <li>7. வரைகலைப் படங்கள் இருவகைப்படும்: அவை <strong>ராஸ்டர் (Raster)</strong> மற்றும் <strong>வெக்டர் (Vector)</strong> ஆகும்.</li>
                <li>8. <strong>ராஸ்டர் படங்கள்</strong> படப்புள்ளிகளை (Pixels) அடிப்படையாகக் கொண்டவை; பெரிதாக்கினால் செவ்வக அடுக்காக உடையும்.</li>
                <li>9. <strong>வெக்டர் படங்கள்</strong> கணித அடிப்படையில் உருவாவதால் எவ்வளவு பெரிதாக்கினாலும் அதன் துல்லியம் மாறாது.</li>
                <li>10. <strong>மெய்நிகர் (Virtual Reality - VR)</strong> என்பது கணினியால் உருவாக்கப்பட்ட தோற்றங்களை உண்மையான உருவம் போலக் காட்டும் தொழில்நுட்பம் ஆகும்.</li>
            </ul>
            <button class="action-footer-btn" onclick="markRead('sec-revision', 10)">படித்தாயிற்று ✓</button>
        </div>

        <div id="sec-bigpicture" class="section-card">
            <span class="section-badge badge-connect">🧠 Big Picture (ஒட்டுமொத்தக் கருத்து வரைபடம்)</span>
            <h2>கணினி காட்சித் தொடர்பு - கட்டமைப்புப் படிநிலை வரைபடம்</h2>
            <p class="intro-text">முழுப் பாடத்தின் தொடர்புகளையும் ஒரே பார்வையில் எளிமையாகப் புரிந்துகொள்ளுங்கள்.</p>
            
            <div class="svg-map-container">
                <svg width="800" height="280" viewBox="0 0 800 280" style="display:block; margin:0 auto;">
                    <line x1="400" y1="40" x2="200" y2="100" stroke="#cbd5e1" stroke-width="3"/>
                    <line x1="400" y1="40" x2="600" y2="100" stroke="#cbd5e1" stroke-width="3"/>
                    <line x1="200" y1="140" x2="100" y2="200" stroke="#cbd5e1" stroke-width="2"/>
                    <line x1="200" y1="140" x2="300" y2="200" stroke="#cbd5e1" stroke-width="2"/>
                    <line x1="600" y1="140" x2="500" y2="200" stroke="#cbd5e1" stroke-width="2"/>
                    <line x1="600" y1="140" x2="700" y2="200" stroke="#cbd5e1" stroke-width="2"/>

                    <rect x="300" y="10" width="200" height="40" rx="8" fill="#4f46e5"/>
                    <text x="400" y="35" fill="white" font-weight="bold" text-anchor="middle" font-size="14">கணினி காட்சித் தொடர்பு</text>

                    <rect x="100" y="100" width="200" height="40" rx="6" fill="#06b6d4"/>
                    <text x="200" y="125" fill="white" font-weight="bold" text-anchor="middle" font-size="13">கோப்பு அமைப்புகள்</text>

                    <rect x="500" y="100" width="200" height="40" rx="6" fill="#8b5cf6"/>
                    <text x="600" y="125" fill="white" font-weight="bold" text-anchor="middle" font-size="13">வரைகலை வடிவங்கள்</text>

                    <rect x="20" y="200" width="160" height="40" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
                    <text x="100" y="225" fill="#0f172a" text-anchor="middle" font-size="12">கோப்பு (File)</text>

                    <rect x="220" y="200" width="160" height="40" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
                    <text x="300" y="225" fill="#0f172a" text-anchor="middle" font-size="12">கோப்புத்தொகுப்பு (Folder)</text>

                    <rect x="420" y="200" width="160" height="40" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
                    <text x="500" y="225" fill="#0f172a" text-anchor="middle" font-size="12">ராஸ்டர் (.jpg, படப்புள்ளி)</text>

                    <rect x="620" y="200" width="160" height="40" rx="4" fill="#f1f5f9" stroke="#cbd5e1"/>
                    <text x="700" y="225" fill="#0f172a" text-anchor="middle" font-size="12">வெக்டர் (.svg, கணிதம்)</text>
                </svg>
            </div>
            <button class="action-footer-btn" onclick="markRead('sec-bigpicture', 10)">படித்தாயிற்று ✓</button>
        </div>

    </div>

    <script>
        const totalPointsPossible = 92; 
        let userProgressMap = JSON.parse(localStorage.getItem('nmms_progress_map')) || {};

        function updateProgressDOM() {
            let currentScore = 0;
            for(let key in userProgressMap){
                currentScore += userProgressMap[key];
            }
            if(currentScore > totalPointsPossible) currentScore = totalPointsPossible;
            let percent = Math.round((currentScore / totalPointsPossible) * 100);
            
            document.getElementById('masteryBar').style.width = percent + '%';
            document.getElementById('masteryText').innerText = percent + '% நிறைவுற்றது';
        }

        function markRead(sectionId, points) {
            userProgressMap[sectionId] = points;
            localStorage.setItem('nmms_progress_map', JSON.stringify(userProgressMap));
            updateProgressDOM();
            
            const el = document.getElementById(sectionId);
            if(el) {
                el.style.border = "2px solid #10b981";
                setTimeout(() => { el.style.border = "1px solid #f1f5f9"; }, 2000);
            }
        }

        function resetProgress() {
            if(confirm("உங்கள் பாடத் தேர்ச்சி முன்னேற்றத்தை மீட்டமைக்க வேண்டுமா?")){
                userProgressMap = {};
                localStorage.removeItem('nmms_progress_map');
                updateProgressDOM();
                location.reload();
            }
        }

        function drawCircles(scale) {
            const rCanvas = document.getElementById('rasterCanvas');
            const vCanvas = document.getElementById('vectorCanvas');
            if(!rCanvas || !vCanvas) return;
            
            const rCtx = rCanvas.getContext('2d');
            const vCtx = vCanvas.getContext('2d');
            
            rCtx.clearRect(0,0,240,240);
            vCtx.clearRect(0,0,240,240);
            
            vCtx.save();
            vCtx.translate(120, 120);
            vCtx.scale(scale, scale);
            vCtx.beginPath();
            vCtx.arc(0, 0, 10, 0, 2 * Math.PI);
            vCtx.strokeStyle = "#4f46e5";
            vCtx.lineWidth = 2 / scale; 
            vCtx.stroke();
            vCtx.restore();

            rCtx.save();
            if(scale == 1) {
                rCtx.beginPath();
                rCtx.arc(120, 120, 10, 0, 2 * Math.PI);
                rCtx.strokeStyle = "#ec4899";
                rCtx.lineWidth = 2;
                rCtx.stroke();
            } else {
                let pixelSize = Math.floor(scale * 1.5);
                rCtx.fillStyle = "#ec4899";
                for(let x=0; x<240; x+=pixelSize) {
                    for(let y=0; y<240; y+=pixelSize) {
                        let dx = x - 120;
                        let dy = y - 120;
                        let distance = Math.sqrt(dx*dx + dy*dy);
                        if(distance >= (10*scale - pixelSize) && distance <= (10*scale + pixelSize)) {
                            rCtx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
                        }
                    }
                }
            }
            rCtx.restore();
        }

        function updateZoomSim(val) {
            document.getElementById('zoomVal').innerText = val + 'x';
            drawCircles(parseInt(val));
        }

        function revealPrediction(option) {
            const box = document.getElementById('predictionFeedback');
            box.style.display = "block";
            if(option === 2) {
                box.className = "challenge-feedback";
                box.style.backgroundColor = "#d1fae5";
                box.style.color = "#065f46";
                box.innerHTML = "<strong>✓ சரியான விடை!</strong><br>விளக்கம்: வெக்டர் (Vector) படங்கள் கணிதத்தின் அடிப்படையில் புள்ளிகள் கொண்டு உருவாக்கப்படுவதால், அதனை எவ்வளவு பெரியதாக மாற்றினாலும் அதன் துல்லியத்தன்மை ஒருபோதும் மாறாது!";
                markRead('sec-explore', 6);
            } else {
                box.className = "challenge-feedback";
                box.style.backgroundColor = "#fee2e2";
                box.style.color = "#991b1b";
                box.innerHTML = "<strong>✗ தவறு, மீண்டும் முயல்க!</strong><br>விளக்கம்: ராஸ்டர் (.jpg) வடிவப் படங்களை அளவை விடப் பெரிதாக்கும்போது, அவை படப்புள்ளிகளாக (Pixels) உடைந்து மங்கலாகத் தோன்றும்.";
            }
        }

        const labNarratives = {
            1: "படி 1: காகிதப் படம் கணினியினுள் டிஜிட்டல் வடிவில் வருடி (Scanner) மூலம் கொண்டு வரப்படுகிறது.",
            2: "படி 2: இங்க்ஸ்கேப் மென்பொருளைத் திறந்து, இறக்குமதி செய்யப்பட்ட படப்பகுதியை முழுமையாக மவுஸ் கொண்டு கிளிக் செய்து தேர்வு செய்கிறோம்.",
            3: "படி 3: மென்பொருள் மெனுவில் உள்ள PATH என்ற தேர்வுக்குச் சென்று TRACE BITMAP என்பதைத் தேர்ந்தெடுக்கிறோம்.",
            4: "படி 4: திரையில் பிக்சல்களை பகுப்பாய்வு செய்ய UPDATE பொத்தானைக் கிளிக் செய்து, பின் சரி (OK) என்பதைத் தேர்ந்தெடுக்கிறோம்.",
            5: "படி 5: இப்போது பழைய ராஸ்டர் படத்தின் மீது ஒரு பளபளப்பான புதிய வெக்டர் படம் உருவாகிவிடும்! அதை இழுத்துத் தனியாகச் சேமிக்கலாம்."
        };

        function runLabStep(step) {
            for(let i=1; i<=5; i++) {
                document.getElementById('labstep'+i).classList.remove('active-step');
            }
            document.getElementById('labstep'+step).classList.add('active-step');
            
            const textEl = document.getElementById('labViewerText');
            textEl.style.opacity = 0;
            setTimeout(() => {
                textEl.innerText = labNarratives[step];
                textEl.style.opacity = 1;
            }, 150);
            
            if(step === 5) {
                markRead('sec-experiment', 10);
            }
        }

        function toggleFlip(cardContainer) {
            const card = cardContainer.querySelector('.flashcard');
            card.classList.toggle('flipped');
        }

        function toggleLabels(show) {
            const l2d = document.getElementById('label2d');
            const l3d = document.getElementById('label3d');
            if(show) {
                l2d.classList.remove('dia-label-hidden');
                l3d.classList.remove('dia-label-hidden');
            } else {
                l2d.classList.add('dia-label-hidden');
                l3d.classList.add('dia-label-hidden');
            }
        }

        function toggleAccordion(id) {
            const panel = document.getElementById(id);
            if(panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        }

        const mainQuizData = [
            {q: "கணினியை நாம் முதன்மையாக நாடுவதற்கு அதன் வேகம் மற்றும் ________ முக்கிய காரணம்.", o: ["விலை மலிவு", "அழகு", "சேமிப்பு திறன்", "வடிவம்"], a: 2, e: "புத்தகக் குறிப்பு: கணினியை நாம் நாடுவதற்கான காரணம் அதன் வேகமும் சேமிப்பு திறனும் ஆகும்."},
            {q: "கணினிச் செயலி மூலம் உருவாக்கப்படும் எந்த ஒரு வெளியீடும் எவ்வாறு அழைக்கப்படும்?", o: ["கோப்பு (File)", "கோப்புத் தொகுப்பு (Folder)", "இயக்கத்தளம் (OS)", "நிரல் (Program)"], a: 0, e: "செயலி மூலம் உருவாக்கப்படும் எந்த ஒரு வெளியீடும் கோப்பு (File) ஆகும்."},
            {q: "பல கோப்புகளை உள்ளடக்கிய பெட்டகம் போன்ற அமைப்பு எது?", o: ["Notepad", "கோப்புத் தொகுப்பு (Folder)", "Paint", "சுட்டி"], a: 1, e: "புத்தக ஒப்பீடு: கோப்புத் தொகுப்பு என்பது பல கோப்புகளை உள்ளடக்கிய அலமாரி போன்ற பெட்டகம் ஆகும்."},
            {q: "புதிய கோப்புத் தொகுப்பை (Folder) உருவாக்க சுட்டியின் எந்தப் பக்க பொத்தானை அழுத்த வேண்டும்?", o: ["இடது பொத்தான்", "வலது பொத்தான்", "நடு சக்கரம்", "எதுவுமில்லை"], a: 1, e: "சுட்டியின் வலது பொத்தானை (Right Click) அழுத்தினால் 'New' -> 'Folder' எனத் தோன்றும்."},
            {q: "விண்டோஸ் இயக்கத்தளத்தில் குறிப்புகளைத் தட்டச்சு செய்து சேகரிக்க உதவும் செயலி எது?", o: ["Paint", "Notepad", "Photoshop", "Inkscape"], a: 1, e: "Notepad செயலி குறிப்புகளைத் தட்டச்சு செய்யப் பயன்படுகிறது."},
            {q: "காட்சித் தொடர்பு சாதனத்திற்கு மிகச் சிறந்த சான்று எது?", o: ["Notepad", "திரைப்படம் (Cinema)", "வருடி (Scanner)", "சுட்டி"], a: 1, e: "படங்கள் வழியாகக் கருத்துக்களைப் புரிய வைக்கும் சாதனங்களில் திரைப்படமே சிறந்த சான்றாகும்."},
            {q: "புகைப்படங்களை அழகுபடுத்தவும் மாறுதல்களைச் செய்யவும் பயன்படும் மென்பொருள் எது?", o: ["Paint", "Inkscape", "அடோபி போட்டோஷாப் (Photoshop)", "Notepad"], a: 2, e: "புகைப்படக்காரர்கள் தங்களின் புகைப்படங்களை அழகுபடுத்த போட்டோஷாப் மென்பொருளையே நாடுகின்றனர்."},
            {q: "படப்புள்ளிகளை (Pixels) அடிப்படையாகக் கொண்டு உருவாக்கப்படும் வரைகலை எது?", o: ["வெக்டர் வரைகலை", "ராஸ்டர் வரைகலை", "இருபரிமாண வரைகலை", "முப்பரிமாண வரைகலை"], a: 1, e: "ராஸ்டர் வரைகலைப் படங்கள் படப்புள்ளிகளை (Pixels) அடிப்படையாகக் கொண்டவை."},
            {q: "கீழே கொடுக்கப்பட்டுள்ளவற்றுள் வெக்டர் வரைகலை கோப்பு நீட்டிப்பு வகை எது?", o: [".jpg", ".png", ".gif", ".svg"], a: 3, e: ".svg (Scalable Vector Graphics) என்பது ஒரு குறிப்பிட்ட மிக முக்கிய வெக்டர் கோப்பு வடிவமாகும்."},
            {q: "கணினியால் உருவாக்கப்பட்ட தோற்றங்களை உண்மையான உருவம் போலக் காட்டும் தொழில்நுட்பம் எது?", o: ["ராஸ்டர் வரைகலை", "மெய்நிகர் (Virtual Reality)", "2D அசைவூட்டம்", "போட்டோ ஸ்டோரி"], a: 1, e: "மெய்நிகர் (VR) என்பது கணினி வழி நிஜ உலக தோற்ற உணர்வை ஏற்படுத்தும் தொழில்நுட்பம் ஆகும்."}
        ];

        function renderQuiz() {
            const container = document.getElementById('quizContainer');
            let html = "";
            mainQuizData.forEach((item, index) => {
                html += '<div class="quiz-item">' +
                    '<div class="quiz-question">' + (index + 1) + ') ' + item.q + '</div>' +
                    '<div class="quiz-options-list">';
                item.o.forEach((opt, optIdx) => {
                    html += '<label class="quiz-opt-lbl">' +
                            '<input type="radio" name="mainquiz_' + index + '" value="' + optIdx + '" onclick="checkMainQuizAnswer(' + index + ', ' + optIdx + ', ' + item.a + ')">' +
                            opt +
                        '</label>';
                });
                html += '</div>' +
                    '<div id="quiz_exp_' + index + '" class="quiz-explanation"></div>' +
                '</div>';
            });
            container.innerHTML = html;
        }

        function checkMainQuizAnswer(qIdx, selectedIdx, correctIdx) {
            const expBox = document.getElementById('quiz_exp_' + qIdx);
            expBox.style.display = "block";
            if(selectedIdx === correctIdx) {
                expBox.style.backgroundColor = "#d1fae5";
                expBox.style.color = "#065f46";
                expBox.innerHTML = "<strong>✓ சரி!</strong> " + mainQuizData[qIdx].e;
            } else {
                expBox.style.backgroundColor = "#fee2e2";
                expBox.style.color = "#991b1b";
                expBox.innerHTML = "<strong>✗ தவறு, மீண்டும் சிந்தியுங்கள்!</strong><br>" + mainQuizData[qIdx].e;
            }
        }

        const challengeData = [
            {q: "புத்தக அலமாரியை கோப்புத் தொகுப்புடனும் (Folder), புத்தகத்தை எதனுடன் ஒப்பிடலாம்?", o: ["இயக்கத்தளம்", "கோப்பு (File)", "செயலி", "மவுஸ்"], a: 1},
            {q: "மைக்ரோசாஃப்ட் போட்டோ ஸ்டோரியில் நமது கதையை இறுதியாகக் காண எதைக் கிளிக் செய்ய வேண்டும்?", o: ["IMPORT PICTURE", "SELECT MUSIC", "SETTINGS", "VIEW YOUR STORY"], a: 3},
            {q: "ராஸ்டர் படங்களை விட அளவில் மிகக் குறைவான வரைகலை வடிவம் எது?", o: ["போட்டோஷாப் கோப்புகள்", "வெக்டர் படங்கள்", "டிஜிட்டல் புகைப்படங்கள்", "ஸ்கேனர் கோப்புகள்"], a: 1},
            {q: "கீழ்க்கண்டவற்றுள் எது இருபரிமாண (2D) வடிவத்தின் கூறுகள்?", o: ["நீளம் மட்டும்", "நீளம் மற்றும் அகலம்", "நீளம், அகலம் மற்றும் உயரம்", "உயரம் மட்டும்"], a: 1},
            {q: "மெய்நிகர் செயலிகள் தற்போது எவற்றிலும் பயன்பாட்டிற்கு வந்துவிட்டன?", o: ["வானொலி", "தொலைக்காட்சி பெட்டி", "திறன்பேசிகள் (Smartphones)", "டைப்ரைட்டர்"], a: 2}
        ];

        let challengeIndex = 0;
        let challengeScore = 0;
        let challengeTimer = null;
        let timeLeft = 300;

        function startTimedChallenge() {
            document.getElementById('challengeIntro').style.display = "none";
            document.getElementById('timedQuizArea').style.display = "block";
            challengeIndex = 0;
            challengeScore = 0;
            timeLeft = 300;
            
            clearInterval(challengeTimer);
            challengeTimer = setInterval(() => {
                timeLeft--;
                let mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                let secs = (timeLeft % 60).toString().padStart(2, '0');
                document.getElementById('timerDisplay').innerText = mins + ':' + secs;
                
                if(timeLeft <= 0) {
                    endTimedChallenge();
                }
            }, 1000);

            showTimedQuestion();
        }

        function showTimedQuestion() {
            if(challengeIndex >= challengeData.length) {
                endTimedChallenge();
                return;
            }
            
            document.getElementById('timedQuestionNum').innerText = "வினா " + (challengeIndex + 1) + " / " + challengeData.length;
            const currentQ = challengeData[challengeIndex];
            document.getElementById('timedQuestionText').innerText = currentQ.q;
            
            const optArea = document.getElementById('timedOptionsArea');
            optArea.innerHTML = "";
            
            currentQ.o.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = "btn-opt";
                btn.style.width = "100%";
                btn.style.marginBottom = "8px";
                btn.innerText = opt;
                btn.onclick = () => {
                    if(idx === currentQ.a) {
                        challengeScore++;
                    }
                    challengeIndex++;
                    showTimedQuestion();
                };
                optArea.appendChild(btn);
            });
        }

        function endTimedChallenge() {
            clearInterval(challengeTimer);
            document.getElementById('timedQuizArea').style.display = "none";
            document.getElementById('timedResultsArea').style.display = "block";
            
            document.getElementById('timedScoreTxt').innerText = challengeScore + " / " + challengeData.length;
            let masteryPercent = Math.round((challengeScore / challengeData.length) * 100);
            document.getElementById('masteryPercentTxt').innerText = "கருத்துத் தேர்ச்சி விகிதம்: " + masteryPercent + "%";
            
            const badge = document.getElementById('ratingBadge');
            const rec = document.getElementById('recommendationText');
            
            if(challengeScore >= 4) {
                badge.className = "badge-rating rating-strong";
                badge.innerText = "🟢 மிக நன்று (Strong)";
                rec.innerText = "வாழ்த்துகள்! நீங்கள் இந்த அலகில் உள்ள அனைத்துக் கருத்துகளையும் மிகச் சரியாகப் புரிந்து கொண்டுள்ளீர்கள். தேர்வுக்கு முற்றிலும் தயாராக உள்ளீர்கள்!";
                markRead('sec-challenge', 10);
            } else if(challengeScore >= 2) {
                badge.className = "badge-rating rating-revision";
                badge.innerText = "🟡 திருப்புதல் தேவை (Needs Revision)";
                rec.innerText = "நன்றாக முயன்றீர்கள். வரைகலை வேறுபாடுகள் மற்றும் கோப்பு நீட்டிப்பு அட்டவணையை மீண்டும் ஒருமுறை படித்துத் தெளிவு பெறுங்கள்.";
            } else {
                badge.className = "badge-rating rating-again";
                badge.innerText = "🔴 மீண்டும் படிக்கவும் (Review Again)";
                rec.innerText = "பாடப் புத்தகக் கருத்து அட்டைகள் மற்றும் மின்னல் வேக திருப்புதல் பகுதிகளை மீண்டும் படித்து வினாடி வினாவில் பயிற்சி பெறுங்கள்.";
            }
        }

        function resetTimedChallenge() {
            document.getElementById('timedResultsArea').style.display = "none";
            document.getElementById('challengeIntro').style.display = "block";
        }

        window.onload = function() {
            updateProgressDOM();
            drawCircles(1);
            renderQuiz();
        };
    </script>
</body>
</html>`;
