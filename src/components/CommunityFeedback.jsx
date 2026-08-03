import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Upload, CheckCircle, ShieldCheck, AlertCircle, RefreshCw, FileText, Image as ImageIcon } from 'lucide-react';

export default function CommunityFeedback({ lang, onSubmitFeedback }) {
  const [feedbackType, setFeedbackType] = useState('Feature Request');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [screenshotName, setScreenshotName] = useState('');

  // Math CAPTCHA anti-spam state
  const [captchaNum1, setCaptchaNum1] = useState(3);
  const [captchaNum2, setCaptchaNum2] = useState(4);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Submission result state
  const [submittedRefNumber, setSubmittedRefNumber] = useState(null);
  const [formError, setFormError] = useState('');

  // Automatically captured browser & device details
  const [metadata, setMetadata] = useState({
    pageUrl: '',
    browser: '',
    operatingSystem: '',
    deviceType: ''
  });

  useEffect(() => {
    // Generate fresh CAPTCHA numbers
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaNum1(num1);
    setCaptchaNum2(num2);

    // Auto-detect client info
    const userAgent = navigator.userAgent;
    let browser = 'Unknown Browser';
    if (userAgent.includes('Chrome')) browser = 'Google Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Mozilla Firefox';
    else if (userAgent.includes('Safari')) browser = 'Apple Safari';
    else if (userAgent.includes('Edg')) browser = 'Microsoft Edge';

    let os = 'Unknown OS';
    if (userAgent.includes('Win')) os = 'Windows OS';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Android')) os = 'Android OS';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

    let deviceType = 'Desktop';
    if (/Mobi|Android|iPhone|iPad/i.test(userAgent)) {
      deviceType = window.innerWidth < 768 ? 'Mobile' : 'Tablet';
    }

    setMetadata({
      pageUrl: window.location.href,
      browser,
      operatingSystem: os,
      deviceType
    });
  }, []);

  // Handle Image File Upload (convert to Data URL with max 5MB size limit)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(lang === 'en' ? 'Only image files (PNG, JPG, WEBP) are allowed.' : 'చిత్ర ఫైళ్లు మాత్రమే అనుమతించబడతాయి.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(lang === 'en' ? 'Image file size must be less than 5 MB.' : 'చిత్రం సైజు 5 MB కన్నా తక్కువ ఉండాలి.');
      return;
    }

    setScreenshotName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setCaptchaError('');

    // Validation
    if (!title.trim()) {
      setFormError(lang === 'en' ? 'Please provide a title for your feedback.' : 'దయచేసి శీర్షికను నమోదు చేయండి.');
      return;
    }

    if (title.length > 100) {
      setFormError(lang === 'en' ? 'Title must be 100 characters or less.' : 'శీర్షిక 100 అక్షరాల కంటే తక్కువ ఉండాలి.');
      return;
    }

    if (!description.trim()) {
      setFormError(lang === 'en' ? 'Please describe your feedback.' : 'దయచేసి వివరాలను నమోదు చేయండి.');
      return;
    }

    // CAPTCHA Validation
    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      setCaptchaError(lang === 'en' ? 'Incorrect CAPTCHA answer. Please try again.' : 'సరికాని జవాబు. దయచేసి మళ్లీ ప్రయత్నించండి.');
      return;
    }

    // Generate unique reference number: TU-2026-XXXXXX
    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    const refNum = `TU-2026-${randomSeq}`;

    const newFeedbackItem = {
      id: `fb-${Date.now()}`,
      refNumber: refNum,
      feedbackType,
      title: title.trim(),
      description: description.trim(),
      name: name.trim() || 'Anonymous Devotee',
      email: email.trim() || 'Not Provided',
      pageUrl: metadata.pageUrl,
      browser: metadata.browser,
      operatingSystem: metadata.operatingSystem,
      deviceType: metadata.deviceType,
      screenshotUrl: screenshotUrl || null,
      status: 'New', // New, Under Review, Planned, In Progress, Completed, Rejected, Closed
      adminNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmitFeedback(newFeedbackItem);
    setSubmittedRefNumber(refNum);
  };

  const resetForm = () => {
    setSubmittedRefNumber(null);
    setTitle('');
    setDescription('');
    setName('');
    setEmail('');
    setScreenshotUrl('');
    setScreenshotName('');
    setCaptchaAnswer('');
    setFormError('');
    setCaptchaError('');
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaNum1(num1);
    setCaptchaNum2(num2);
  };

  return (
    <div className="space-y-6 py-4 max-w-3xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-l-4 border-l-[#FFD700] border-[#D4AF37]/30 space-y-2 bg-[#0B0E14] shadow-2xl">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-7 h-7 text-[#FFD700]" />
          <div>
            <h2 className="font-serif text-2xl font-extrabold gold-gradient-text">
              {lang === 'en' ? 'Community Feedback & Suggestions' : 'అభిప్రాయాలు & సలహాలు'}
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              {lang === 'en'
                ? 'Help us improve the Tirumala Utsavam Portal! Report bugs, request features, or share content corrections without signing in.'
                : 'పోర్టల్ అభివృద్ధి కోసం మీ సలహాలు మరియు సూచనలను సమర్పించండి.'}
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION SCREEN */}
      {submittedRefNumber ? (
        <div className="glass-card p-8 border-2 border-emerald-500/50 bg-[#0B0E14] text-center space-y-4 shadow-2xl rounded-2xl animate-slide-up">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
          
          <h3 className="font-serif text-2xl font-bold text-white">
            {lang === 'en' ? 'Thank You for Your Feedback!' : 'మీ అభిప్రాయానికి ధన్యవాదాలు!'}
          </h3>

          <p className="text-sm text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Your submission has been received and will be reviewed by our administration team to help improve the Tirumala Utsavam Portal.'
              : 'మీ వివరాలు సమర్పించబడ్డాయి. మా బృందం త్వరలో పరిశీలిస్తుంది.'}
          </p>

          {/* Reference Number Box */}
          <div className="p-4 rounded-xl bg-[#141923] border border-[#FFD700]/50 max-w-xs mx-auto space-y-1">
            <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">
              Reference Number
            </span>
            <span className="font-mono text-xl font-extrabold text-[#FFD700] tracking-wider">
              {submittedRefNumber}
            </span>
          </div>

          <button
            onClick={resetForm}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black font-extrabold text-xs inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-transform mt-4"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{lang === 'en' ? 'Submit Another Feedback' : 'మరో అభిప్రాయం పంపండి'}</span>
          </button>
        </div>
      ) : (
        /* FEEDBACK FORM */
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 border-2 border-[#D4AF37]/40 bg-[#0B0E14] space-y-5 shadow-2xl rounded-2xl">
          
          {formError && (
            <div className="p-3.5 rounded-xl bg-[#990000]/20 border border-[#FF5722] text-[#FF5722] text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Feedback Type Selector */}
          <div>
            <label className="text-xs font-extrabold text-[#FFD700] block mb-2">
              {lang === 'en' ? 'Feedback Type *' : 'అభిప్రాయం రకం *'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Bug Report',
                'Feature Request',
                'Content Correction',
                'UI/UX Suggestion',
                'General Feedback'
              ].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFeedbackType(type)}
                  className={`p-2.5 rounded-xl text-xs font-extrabold border transition-all text-center ${
                    feedbackType === type
                      ? 'bg-gradient-to-r from-[#FF5722] to-[#FFD700] text-black border-[#FFD700] shadow-md ring-2 ring-[#FFD700]'
                      : 'bg-[#141923] text-[#94A3B8] border-white/10 hover:border-[#D4AF37] hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="text-xs font-extrabold text-[#FFD700] block mb-1">
              {lang === 'en' ? 'Title * (Max 100 chars)' : 'శీర్షిక *'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder={lang === 'en' ? 'Brief summary of your feedback...' : 'అభిప్రాయం యొక్క ముఖ్యాంశం...'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="text-xs font-extrabold text-[#FFD700] block mb-1">
              {lang === 'en' ? 'Detailed Description *' : 'వివరము *'}
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === 'en' ? 'Provide steps to reproduce bugs or detailed feature ideas...' : 'పూర్తి వివరాలు పంచుకోండి...'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141923] border border-[#D4AF37]/50 text-white text-xs placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              required
            ></textarea>
          </div>

          {/* Optional Name & Email Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#94A3B8] block mb-1">
                {lang === 'en' ? 'Your Name (Optional)' : 'మీ పేరు (ఐచ్ఛికం)'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Devotee Name"
                className="w-full px-3.5 py-2 rounded-xl bg-[#141923] border border-white/10 text-white text-xs placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#94A3B8] block mb-1">
                {lang === 'en' ? 'Email Address (Optional)' : 'ఇమెయిల్ (ఐచ్ఛికం)'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2 rounded-xl bg-[#141923] border border-white/10 text-white text-xs placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
              />
            </div>
          </div>

          {/* Screenshot Upload (Optional) */}
          <div className="p-4 rounded-xl bg-[#141923] border border-white/10 space-y-2">
            <label className="text-xs font-extrabold text-[#FFD700] flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-[#FF5722]" />
              <span>{lang === 'en' ? 'Attach Screenshot (Optional, Max 5MB)' : 'స్క్రీన్‌షాట్ జత చేయండి (ఐచ్ఛికం)'}</span>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-xs text-[#94A3B8] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#FF5722] file:text-white hover:file:brightness-110 cursor-pointer"
            />

            {screenshotName && (
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Attached: {screenshotName}</span>
              </div>
            )}
          </div>

          {/* Automatically Captured Info Badge */}
          <div className="p-3 rounded-xl bg-[#141923]/60 border border-white/5 text-[11px] font-mono text-[#94A3B8] space-y-1">
            <div className="flex items-center gap-1.5 text-[#FFD700] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Automatically Captured System Diagnostic Info:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px]">
              <div>OS: {metadata.operatingSystem}</div>
              <div>Browser: {metadata.browser}</div>
              <div>Device: {metadata.deviceType}</div>
              <div>URL: Portal Main</div>
            </div>
          </div>

          {/* Anti-Spam CAPTCHA */}
          <div className="p-4 rounded-xl bg-[#141923] border border-[#FFD700]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-white block">
                Human Verification (Anti-Spam)
              </span>
              <span className="text-xs font-mono text-[#FFD700] font-bold">
                What is {captchaNum1} + {captchaNum2} = ?
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Answer"
                className="w-24 px-3 py-1.5 rounded-lg bg-[#0B0E14] border border-[#FFD700]/50 text-white text-xs font-mono font-bold text-center focus:outline-none"
                required
              />
            </div>
          </div>

          {captchaError && (
            <p className="text-xs text-[#FF5722] font-bold">{captchaError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] via-[#FFD700] to-[#FF5722] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-2xl hover:brightness-110 transition-all"
          >
            <Send className="w-4 h-4 text-black" />
            <span>{lang === 'en' ? 'Submit Feedback' : 'సమర్పించండి'}</span>
          </button>

        </form>
      )}

    </div>
  );
}
