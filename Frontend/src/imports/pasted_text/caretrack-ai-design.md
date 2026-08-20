# CARETRACK AI — PREMIUM AI HEALTHCARE EXPERIENCE

Design and build a complete, high-end frontend experience for an AI-powered healthcare application called **CareTrack AI**.

This should NOT look like a typical hospital website, medical dashboard, Bootstrap template, generic SaaS landing page, or basic student project.

The design should feel like a **premium health-tech product created by an experienced product design team**.

Take inspiration from the provided "Foldcraft" creative-studio prompt in terms of:

* Fullscreen compositions
* Strong typography
* Cinematic visual hierarchy
* Generous whitespace
* Smooth transitions
* Layered depth
* Minimal but expressive UI
* Sophisticated animations
* Editorial-style layouts
* Premium interaction design
* Responsive behavior
* Strong visual storytelling

But **DO NOT copy Foldcraft's visual design literally**.

Create a completely original visual identity specifically for **CareTrack AI**.

---

# 1. PRODUCT IDENTITY

## Product Name

**CareTrack AI**

## Product positioning

CareTrack AI is an AI-powered symptom analysis and health guidance platform.

The user provides:

1. Personal information
2. Patient details
3. Symptoms
4. Confirmation of information

The backend AI system then analyzes the submitted symptoms and produces a health-analysis report.

The frontend should make the experience feel:

> Calm → Intelligent → Trustworthy → Human → Premium

The application should feel closer to a modern health-tech product such as an advanced AI healthcare platform than a traditional hospital portal.

---

# 2. CORE DESIGN DIRECTION

Create a **minimalist cinematic health-tech aesthetic**.

Avoid:

* Generic medical blue dashboards
* Excessive cards
* Excessive gradients
* Cartoon medical illustrations
* Stock doctor photographs everywhere
* Huge medical crosses
* Old-fashioned hospital UI
* Dense tables
* Overly colorful interfaces
* Clutter
* Excessive rounded rectangles
* Cheap-looking glassmorphism

Instead use:

* Premium typography
* Soft neutral backgrounds
* Deep charcoal / off-white foundation
* Restrained indigo/blue healthcare accent
* Subtle gradients
* Fine borders
* Soft shadows
* Large typography
* Editorial spacing
* Carefully designed cards
* Elegant icons
* Micro-interactions
* Subtle motion
* Clear information hierarchy

The overall design should communicate:

**"AI-powered healthcare, designed with confidence and empathy."**

---

# 3. TYPOGRAPHY

Use a premium modern sans-serif.

Preferred:

**Geist**

Fallback:

* Inter
* SF Pro Display
* Plus Jakarta Sans

Typography should have:

* Tight tracking for large headings
* Excellent readability
* Strong weight hierarchy
* Large editorial headlines
* Small uppercase metadata labels
* Comfortable body text

Use typography as a major part of the visual identity.

---

# 4. COLOR SYSTEM

Create a sophisticated healthcare palette.

Primary background:

* Warm white / very light neutral

Secondary:

* Soft cool gray
* Off-white

Primary accent:

* Deep indigo / electric blue

Supporting accent:

* Soft cyan

Success:

* Muted green

Warning:

* Warm amber

Critical:

* Muted red

Text:

* Near-black for primary
* Slate gray for secondary

Borders:

* Very subtle gray

Do not make every component blue.

Use the accent color selectively for:

* Primary CTA
* Active state
* Progress
* AI indicators
* Important highlights

---

# 5. GLOBAL NAVIGATION

Create a responsive premium navbar.

Desktop:

Left:

**CareTrack AI**

Use a sophisticated text-based logo with a subtle AI/health symbol if appropriate.

Navigation:

* Home
* How It Works
* Health Analysis
* About

Right:

* Log In
* Get Started

The navbar should become transparent/minimal on the homepage and transition into a more solid navigation style on internal application pages.

Mobile:

Use a clean hamburger menu with an elegant animated open/close transition.

Do not use a generic sidebar everywhere.

---

# 6. HOMEPAGE

Create a **full-screen cinematic hero section**.

The homepage should immediately communicate what CareTrack AI does.

Hero structure:

Small eyebrow:

**AI-POWERED HEALTH ANALYSIS**

Main headline:

**Understand your symptoms.
Track your health.
Take the next step with confidence.**

Alternative supporting line:

**CareTrack AI helps you organize your symptoms and receive an intelligent health analysis through a simple, guided experience.**

Primary CTA:

**Start Health Check**

Secondary CTA:

**How It Works**

Use a subtle animated visual on the right side / background.

Possible visual direction:

A sophisticated abstract AI health visualization:

* flowing diagnostic lines
* subtle neural network structures
* human body outline
* pulse waveform
* floating symptom nodes
* data particles

Do NOT use a cheesy medical illustration.

The visual should feel like:

**AI + human biology + data**

---

# 7. HOMEPAGE MOTION

The homepage should have subtle cinematic motion.

On initial load:

1. Navbar fades in
2. Eyebrow fades/slides upward
3. Headline reveals line by line
4. Description fades upward
5. CTA buttons appear
6. AI visualization slowly moves

Use staggered animation.

Avoid excessive animation.

The interaction should feel:

**expensive, calm, intentional.**

---

# 8. LOGIN / REGISTER EXPERIENCE

Create a premium authentication page.

Do not make it look like a generic centered white card.

Use a split-screen or immersive layout.

Left side:

Large CareTrack AI branding.

Headline:

**Your health journey starts here.**

Supporting text:

**Securely manage your health information and continue your personalized CareTrack experience.**

Add a subtle AI-health visual.

Right side:

Authentication interface.

Tabs:

**Login | Create Account**

Login fields:

* Email
* Password

Actions:

**Sign In**

Secondary:

**Forgot password?**

Register fields:

* Full Name
* Email
* Password
* Confirm Password

Primary:

**Create Account**

Include:

**Continue with Google**

Keep authentication clean and trustworthy.

---

# 9. PATIENT DETAILS PAGE

After authentication, the user enters the health-analysis flow.

Create a dedicated patient details page.

Top:

Small progress indicator:

**01 / 04 — Patient Details**

Headline:

**Let's start with you.**

Supporting text:

**A few details help CareTrack AI understand your situation better.**

Fields:

* Full Name
* Age
* Gender
* Date of Birth where appropriate
* Contact information where appropriate
* Relevant basic information

Use progressive disclosure instead of displaying an enormous form.

Primary CTA:

**Continue to Symptoms**

Secondary:

**Back**

The page should feel calm and non-clinical.

---

# 10. SYMPTOM SELECTION — MAIN CATEGORY PAGE

This is one of the most important screens.

Create a sophisticated **symptom discovery interface**.

Top progress:

**02 / 04 — Symptoms**

Headline:

**What are you experiencing?**

Supporting text:

**Choose the areas or types of symptoms you'd like to describe. You can select symptoms from multiple categories.**

Show selected symptom count:

**3 symptoms selected**

or:

**No symptoms selected**

---

# 11. SYMPTOM CATEGORY STRUCTURE

Do NOT simply show all 377 symptoms on one page.

The uploaded CSV contains 377 symptom/feature columns.

Organize them into meaningful healthcare-oriented categories for navigation.

The categories should be derived from the actual symptom vocabulary in the CSV.

Suggested category architecture:

### General & Whole Body

Examples from the dataset:

* Fever
* Chills
* Fatigue
* Weakness
* Feeling ill
* Feeling hot
* Feeling cold
* Sweating
* Weight gain
* Recent weight loss
* Appetite changes
* Ache all over

### Head & Neurological

Examples:

* Headache
* Frontal headache
* Dizziness
* Seizures
* Fainting
* Loss of sensation
* Paresthesia
* Memory disturbance
* Slurring words
* Focal weakness
* Sleepiness
* Sleepwalking
* Nightmares
* Stuttering/stammering

### Respiratory

Examples:

* Cough
* Difficulty breathing
* Shortness of breath
* Wheezing
* Rapid breathing
* Congestion in chest
* Coughing up sputum
* Hemoptysis
* Hurts to breathe
* Abnormal breathing sounds
* Apnea

### Heart & Circulation

Examples:

* Palpitations
* Irregular heartbeat
* Increased heart rate
* Decreased heart rate
* Poor circulation
* Peripheral edema
* Flushing
* Chest-related symptoms

### Eyes & Vision

Examples:

* Diminished vision
* Double vision
* Eye pain
* Eye redness
* Itchiness of eye
* Watery eyes
* Blindness
* Eye strain
* Foreign body sensation
* Cloudy eye
* Swollen eye
* Eyelid swelling
* Spots/clouds in vision

### Ear, Nose & Throat

Examples:

* Ear pain
* Ringing in ear
* Plugged ear feeling
* Hearing reduction
* Nasal congestion
* Sneezing
* Nosebleed
* Sinus congestion
* Painful sinuses
* Sore throat
* Throat irritation
* Difficulty swallowing
* Hoarse voice
* Throat swelling
* Tonsil swelling/redness

### Digestive / Stomach

Examples:

* Nausea
* Vomiting
* Diarrhea
* Constipation
* Heartburn
* Flatulence
* Abdominal pain
* Upper abdominal pain
* Lower abdominal pain
* Stomach bloating
* Abdominal distention
* Changes in stool appearance
* Blood in stool
* Rectal bleeding
* Melena

### Urinary & Kidney

Examples:

* Frequent urination
* Painful urination
* Blood in urine
* Low urine output
* Urine retention
* Unusual urine color/odor
* Pus in urine
* Excessive nighttime urination
* Kidney-related symptoms
* Bladder symptoms

### Musculoskeletal

Examples:

* Joint pain
* Joint swelling
* Muscle pain
* Muscle weakness
* Muscle stiffness
* Back pain
* Neck pain
* Shoulder pain
* Knee pain
* Hip pain
* Wrist pain
* Elbow pain
* Ankle pain
* Foot/toe pain
* Arm pain
* Leg pain

### Skin & Hair

Examples:

* Skin rash
* Skin irritation
* Itching of skin
* Skin dryness
* Skin lesion
* Skin swelling
* Acne
* Skin growth
* Skin pain
* Warts
* Moles
* Nail abnormalities
* Scalp itching
* Dry/flaky scalp
* Unwanted hair

### Mouth, Teeth & Jaw

Examples:

* Toothache
* Mouth ulcer
* Mouth pain
* Gum pain
* Bleeding gums
* Tongue pain
* Tongue lesions
* Swollen tongue
* Jaw pain
* Jaw swelling
* Lip swelling
* Lip sore

### Reproductive & Women's Health

Examples:

* Vaginal itching
* Vaginal dryness
* Vaginal discharge
* Vaginal pain
* Vaginal redness
* Vaginal bleeding
* Painful menstruation
* Heavy menstrual flow
* Irregular menstruation
* Absent menstruation
* Hot flashes
* Pelvic pain
* Pregnancy-related symptoms
* Breast symptoms

### Men's Health

Examples:

* Testicular pain
* Scrotal swelling
* Scrotal mass
* Groin pain
* Penis pain
* Penile discharge
* Penis redness
* Premature ejaculation
* Erectile problems
* Prostate symptoms

### Mental & Behavioral

Examples:

* Anxiety/nervousness
* Depression
* Emotional symptoms
* Fears/phobias
* Excessive anger
* Hostile behavior
* Obsessions/compulsions
* Low self-esteem
* Sleep-related symptoms
* Delusions/hallucinations
* Behavioral changes

### Other / Miscellaneous

Use this category for symptoms that do not fit cleanly into another category.

---

# IMPORTANT CATEGORY RULE

The categories above are a UX organization layer.

The actual underlying symptom identifiers must remain connected to the original CSV field names.

For example:

Display:

**Headache**

Internal key:

`headache`

Display:

**Frontal Headache**

Internal key:

`frontal_headache`

Display:

**Difficulty Breathing**

Internal key:

`difficulty_breathing`

Do NOT invent a different dataset.

The CSV remains the source of truth.

---

# 12. MAIN CATEGORY UI

Each category should appear as a visually rich interactive tile.

Example:

[ icon ]

**General & Whole Body**

"Energy, temperature, appetite and whole-body symptoms"

**12 symptoms**

Arrow →

Other examples:

**Head & Neurological**

"Headaches, dizziness, sensation and neurological changes"

**Respiratory**

"Breathing, cough, congestion and chest symptoms"

Cards should have:

* subtle hover movement
* icon animation
* border transition
* accent glow
* arrow movement

Do not make them giant generic cards.

---

# 13. CATEGORY → SUBCATEGORY NAVIGATION

When the user clicks:

**General & Whole Body**

navigate to:

**General & Whole Body**

Headline:

**Tell us what you're feeling.**

Show the relevant symptoms from the dataset.

For example:

* Fever
* Chills
* Fatigue
* Weakness
* Feeling ill
* Feeling hot
* Feeling cold
* Sweating
* Weight gain
* Recent weight loss
* Decreased appetite
* Excessive appetite
* Ache all over

Each symptom should have an interactive selection state.

---

# 14. SYMPTOM SELECTION UI

Do NOT use boring checkboxes only.

Create elegant selectable symptom pills/cards.

Example:

○ Headache

When selected:

✓ Headache

Use subtle background/border transformation.

Selected state should be unmistakable.

Allow multiple selections.

Each symptom should have:

* icon where appropriate
* readable label
* internal selection state
* hover state
* selected state

---

# 15. PERSISTENT SELECTION

This interaction is extremely important.

Suppose the user:

1. Opens General & Whole Body
2. Selects Fever
3. Selects Fatigue
4. Selects Chills
5. Clicks "Select More Symptoms"

They should return to the **main category page**.

The selected symptoms must remain selected.

Example:

**3 symptoms selected**

Categories with selected symptoms should visually indicate this.

For example:

General & Whole Body

**3 selected**

Head & Neurological

**2 selected**

Respiratory

**1 selected**

---

# 16. SELECT MORE SYMPTOMS

At the bottom of every symptom subcategory page:

Primary button:

**Select More Symptoms**

This returns the user to the main category selection page.

Secondary button:

**Continue**

The selected symptoms must NOT be lost.

---

# 17. SYMPTOM SELECTION SUMMARY

Create a persistent bottom/side summary depending on screen size.

Desktop:

A floating summary panel.

Example:

**Selected Symptoms**

6 symptoms

* Fever
* Headache
* Fatigue
* Cough
* Nausea
* Stomach pain

Actions:

**Edit Symptoms**

**Continue**

Mobile:

Use a sticky bottom bar:

**6 symptoms selected**

[Review] [Continue]

---

# 18. DATA PERSISTENCE DESIGN

The frontend should be architected so that selected symptoms can later be persisted in the backend database.

For the Figma prototype, simulate the state correctly.

The data structure should conceptually resemble:

```text
patient
    ↓
health_assessment
    ↓
selected_symptoms
    ↓
symptom_category
    ↓
symptom_key
```

Each selected symptom should preserve:

* display name
* original CSV key
* category
* selection state

Do NOT treat the CSV as a frontend-only static list that will be discarded later.

The design should be prepared for future backend integration.

---

# 19. CONFIRMATION PAGE

After symptoms are selected:

Navigate to:

**03 / 04 — Review**

Headline:

**Review your information**

Supporting text:

**Make sure everything looks right before CareTrack AI analyzes your symptoms.**

Create a premium summary interface.

Sections:

### Patient Details

Name
Age
Gender
Other entered information

### Selected Symptoms

Show every selected symptom.

Group them by category.

Example:

**General & Whole Body**

* Fever
* Fatigue

**Head & Neurological**

* Headache

**Respiratory**

* Cough

**Digestive**

* Nausea

Allow:

**Edit**

next to each section.

Primary CTA:

**Analyze My Symptoms**

Small reassurance:

**Your information is used to generate your health analysis.**

---

# 20. ANALYSIS / PROCESSING EXPERIENCE

Before the report appears, create a beautiful AI analysis state.

This should NOT be a generic spinner.

Create an immersive transition:

Headline:

**CareTrack AI is analyzing your symptoms**

Supporting text:

**Reviewing the symptom patterns you've provided...**

Visual:

A sophisticated animated AI visualization.

Possible stages:

**Reviewing symptoms**

→

**Analyzing patterns**

→

**Preparing insights**

→

**Generating report**

Use subtle progress animation.

Do not imply medical certainty.

---

# 21. REPORT PAGE

This is the final major screen.

Progress:

**04 / 04 — Health Analysis**

Headline:

**Your CareTrack Health Analysis**

Create a premium report experience.

The report should eventually be populated by backend AI results.

For the frontend prototype, use clearly marked placeholder/mock content only where necessary.

Do NOT fabricate actual medical predictions as if they are real.

---

# 22. REPORT STRUCTURE

Create sections for:

## Analysis Overview

A concise AI-generated summary.

## Potential Conditions / Findings

Display backend-provided results.

Each result may contain:

* Condition name
* Probability/confidence
* Supporting symptoms
* Severity indicator where supplied by backend

Do not invent medical probabilities in the design itself.

---

# 23. SYMPTOMS ANALYZED

Show:

**Symptoms considered**

with all selected symptoms.

Example:

* Fever
* Headache
* Fatigue
* Cough

This creates transparency about what the AI analyzed.

---

# 24. AI INSIGHT SECTION

Create a visually distinctive section:

**AI Insight**

Use a subtle AI visual marker.

Text will later come from the backend.

The UI should support:

* summary
* observations
* relevant symptom correlations
* recommendations if provided by backend

---

# 25. MEDICAL DISCLAIMER

Include a visible but tasteful disclaimer:

**CareTrack AI provides informational health analysis and is not a substitute for professional medical diagnosis or treatment. If symptoms are severe, sudden, or concerning, seek appropriate medical care.**

Do not make the disclaimer visually overwhelming.

---

# 26. REPORT ACTIONS

Provide:

**Save Report**

**Download Report**

**Start New Assessment**

**Review Symptoms**

Design these actions professionally.

---

# 27. RESPONSIVE DESIGN

The entire experience must be fully responsive.

Desktop:

* cinematic layouts
* multi-column sections
* floating panels
* spacious navigation

Tablet:

* reduced spacing
* adaptive grids

Mobile:

* single-column
* sticky CTA
* bottom symptom summary
* large touch targets
* mobile navigation
* compact category cards

Do not simply shrink desktop.

Redesign layouts intelligently for mobile.

---

# 28. PAGE TRANSITIONS

Every navigation step should have smooth transitions.

Examples:

Patient Details
↓
Symptoms
↓
Category
↓
Subcategory
↓
Symptoms Summary
↓
Confirmation
↓
AI Analysis
↓
Report

Use subtle:

* fade
* slide
* scale
* blur
* shared-element-like transitions where appropriate

Do not over-animate.

---

# 29. INTERACTION DETAILS

Include polished micro-interactions:

Buttons:

* hover lift
* subtle scale
* icon movement

Cards:

* border transition
* slight elevation
* icon movement

Symptom selection:

* smooth selected-state transition
* check animation

Navigation:

* smooth page transition

AI analysis:

* ambient animation

Loading:

* skeleton/progress state

---

# 30. ICONOGRAPHY

Use **Lucide React icons**.

Use icons relevant to:

* Brain
* Heart
* Lungs
* Thermometer
* Eye
* Ear
* Stomach
* Bone
* Skin
* Mouth
* Kidney
* User
* Activity
* Shield
* ArrowRight
* Check
* ChevronRight
* Search
* Menu
* X

Do not use random emojis.

Icons should remain stylistically consistent.

---

# 31. SEARCH / SYMPTOM DISCOVERY

Because the dataset contains hundreds of symptoms, the symptom experience should include a search option.

Example:

**Search symptoms**

Placeholder:

"Search for a symptom..."

Search should work across the actual CSV symptom names.

Examples:

Typing:

"head"

could surface:

* Headache
* Frontal Headache

Typing:

"breath"

could surface:

* Difficulty Breathing
* Shortness of Breath
* Hurts to Breathe
* Breathing Fast

This will make the large symptom dataset usable.

---

# 32. DATASET-DRIVEN DESIGN

The CSV is the source of truth for symptom availability.

Do not randomly invent symptoms.

The uploaded dataset contains symptoms such as:

* headache
* fever
* nausea
* vomiting
* diarrhea
* cough
* nasal congestion
* sore throat
* difficulty breathing
* wheezing
* palpitations
* irregular heartbeat
* abdominal pain
* stomach bloating
* constipation
* back pain
* neck pain
* joint pain
* muscle pain
* eye pain
* diminished vision
* ear pain
* ringing in ear
* skin rash
* itching of skin
* vaginal symptoms
* urinary symptoms
* neurological symptoms
* behavioral/mental symptoms
* and many more.

Use the actual dataset vocabulary and map it into intuitive UX categories.

The CSV also contains a `diseases` column with disease labels.

Do NOT expose all disease labels on the symptom-selection screens.

Disease prediction belongs to the backend analysis/report stage.

---

# 33. HEALTHCARE UX SAFETY

The design should avoid claiming:

"Diagnose yourself"

"100% accurate diagnosis"

"You have this disease"

Instead use language such as:

**Health Analysis**

**Potential Findings**

**AI-Generated Insights**

**Symptoms Associated With**

**Discuss With a Healthcare Professional**

The final disease/condition results will be supplied by the backend.

---

# 34. VISUAL STYLE REFERENCE

The final result should feel like a combination of:

**Premium AI product**
+
**Modern healthcare platform**
+
**Editorial portfolio quality**
+
**Cinematic interaction design**

Think:

* Apple-level restraint
* Linear-level product polish
* modern AI interface aesthetics
* premium health-tech trust

But do NOT copy any specific existing product.

---

# 35. LANDING PAGE VISUAL LANGUAGE

The homepage should especially use the spirit of the Foldcraft prompt:

* fullscreen hero
* large typography
* immersive visual background
* staggered entrance animations
* responsive navbar
* minimal CTA
* strong visual hierarchy

However, replace the creative-studio visual language with:

**AI + health + human care**

For example, instead of a video of a creative studio, use an abstract dynamic health visualization.

---

# 36. DESIGN SYSTEM

Create a consistent design system for the entire application.

Define:

### Typography

* Display
* H1
* H2
* H3
* Body
* Caption
* Label

### Spacing

Use a consistent spacing scale.

### Radius

Use restrained corner radii.

### Buttons

* Primary
* Secondary
* Ghost
* Destructive

### Inputs

* Default
* Focus
* Error
* Disabled

### Cards

* Standard
* Interactive
* Selected
* Result

### Status

* Success
* Warning
* Critical
* Informational

---

# 37. IMPORTANT COMPONENT ARCHITECTURE

Design the interface as reusable components.

Conceptually:

```text
CareTrackApp
│
├── Navbar
├── Homepage
│
├── Auth
│   ├── Login
│   └── Register
│
├── PatientDetails
│
├── SymptomFlow
│   ├── SymptomCategories
│   ├── SymptomSubcategory
│   ├── SymptomSearch
│   ├── SelectedSymptoms
│   └── SymptomSummary
│
├── Confirmation
│
├── AnalysisLoading
│
└── HealthReport
```

Reusable components:

```text
Button
Input
Select
ProgressIndicator
CategoryCard
SymptomCard
SymptomChip
SelectedSymptomsBar
SectionHeader
AIInsightCard
ReportCard
```

---

# 38. FRONTEND STATE MODEL

Prepare the UI architecture for future backend integration.

Maintain state conceptually for:

```text
patientDetails
selectedSymptoms
selectedCategories
currentCategory
currentSubcategory
assessmentId
analysisStatus
analysisResult
```

Selected symptoms must survive navigation between:

* category page
* subcategory page
* category page again
* confirmation page

Do not reset them during navigation.

---

# 39. FUTURE BACKEND INTEGRATION

The frontend will later connect to a backend.

Therefore create clear boundaries between:

### Frontend data

Patient details
Selected symptoms

### Backend request

Assessment payload

### Backend response

AI analysis result

### Frontend report

Rendered AI result

Do not tightly couple the visual components to fake data.

Use clean mock data only as temporary placeholders where needed for the prototype.

---

# 40. WHAT I EXPECT FROM FIGMA

Generate the complete frontend experience, not just the homepage.

Create designs for:

1. Homepage
2. Login
3. Register
4. Patient Details
5. Main Symptom Categories
6. Symptom Subcategory
7. Multiple Symptom Selection
8. Selected Symptoms Summary
9. Confirmation / Review
10. AI Analysis Loading
11. Health Analysis Report

Include:

* Desktop
* Tablet where useful
* Mobile
* Hover states
* Selected states
* Loading states
* Empty states
* Error states
* Navigation transitions
* Symptom selection states

---

# 41. FINAL QUALITY BAR

The final CareTrack AI frontend must NOT look like:

"college project UI"

It should look like:

> **a real AI health-tech startup preparing for production.**

The interface should be impressive enough to demonstrate in:

* hackathons
* technical interviews
* project demonstrations
* portfolio
* startup presentations
* academic evaluation

The first impression should be:

**"This is a serious product."**

not:

**"This is a template."**

---

# 42. MOST IMPORTANT DESIGN PRINCIPLE

Do not sacrifice usability for visual effects.

The user must always understand:

**Where am I?**

**What do I need to do?**

**What have I already selected?**

**What happens next?**

The symptom-selection flow should be especially intuitive.

The final experience should feel like a guided conversation with an intelligent health platform rather than filling out a long medical form.

---

# FINAL PRODUCT FLOW

Implement this exact high-level experience:

```text
HOME
  ↓
LOGIN / REGISTER
  ↓
PATIENT DETAILS
  ↓
SYMPTOM CATEGORIES
  ↓
SELECT CATEGORY
  ↓
SYMPTOM SUBCATEGORY
  ↓
SELECT SYMPTOMS
  ↓
SELECT MORE SYMPTOMS
  ↓
BACK TO CATEGORIES
  ↓
PREVIOUS SELECTIONS REMAIN
  ↓
REVIEW SELECTED SYMPTOMS
  ↓
CONFIRMATION
  ↓
AI ANALYSIS
  ↓
HEALTH ANALYSIS REPORT
```

The user must be able to move backward without losing entered information.

The symptom-selection state must persist throughout the entire assessment.

The final report must be designed to receive real backend AI results later.

**Build this as a polished, production-minded, premium CareTrack AI health-tech experience—not as a generic healthcare template.**
