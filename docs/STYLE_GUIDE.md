Your Brand Style Direction
Core design style
Modern × Human-Tech × Infrastructure-oriented
Not:
flashy startup
neon tech
corporate blue consulting
You are:
👉 a digital infrastructure partner for the Syrian market.
Think:
systems, gateways, bridges, flows, structure.

Design personality
Clear
Structured
Calm
Confident
Future-ready
Not aggressive
Not playful

Visual style type
✅ Modern
✅ Tech-driven
✅ Minimal
✅ Editorial layout
✅ Grid-based
Avoid:
❌ futuristic sci-fi
❌ cyber / hacker visuals
❌ marketing hype layouts

Color strategy (important)
You must avoid:
blue
purple
neon green
gradients-on-everything
They are overused by agencies.

Recommended main palette (not overused)
Primary color
Deep Charcoal Blue-Green
Hex:
#0F1F1E
Why:
feels technological
feels stable
works well in Middle East branding
not a startup cliché

Secondary accent
Warm sand / light desert tone
Hex:
#E6D8B8
Why:
subtle regional reference
humanizes the brand
separates you from pure tech brands

Signal accent (very limited use)
Soft AI mint
Hex:
#4ED1B2
Use only for:
CTAs
icons
key highlights

Backgrounds
White and near-white only:
#FFFFFF
#F6F7F7

Typography direction
Use:
Primary font style
Humanist sans / modern grotesk
Look for:
Inter
Manrope
Plus Jakarta Sans
Avoid:
futuristic fonts
rounded playful fonts
geometric heavy fonts (like Poppins as main)

Logo style (you already started correctly)
Your logo must always be:
flat
monochrome first
scalable
geometry-based
no effects
You already picked the right direction (gateway / road / portal).
That fits your positioning perfectly.

Layout & UI style
Always:
strong margins
wide white space
left aligned content
grid layouts
large section spacing
No:
centered marketing hero blocks
cluttered cards
heavy shadows

Graphic language
Use abstract shapes based on:
frames
portals
pathways
nodes
directional lines
Not:
stock people images
fake business meetings
smiling teams

Illustration & imagery rule
If you use imagery:
Use:
abstract tech illustrations
system diagrams
simplified scenes
Avoid:
Western startup clichés
stock laptops & coffee shots

Brand tone (very important for your market)
Your tone should be:
practical
simple language
solution-oriented
non-technical for clients
technical internally

Positioning sentence style (for all pages)
You should always sound like:
We build digital infrastructure for business growth in Syria — using AI, automation and modern systems.
Not:
We help brands shine and grow digitally.

Summary — your branding approach
Infrastructure-first digital agency
Not a creative studio.
Not a marketing shop.
You are a:
👉 digital operating layer for businesses.

Very short brand DNA
Style: modern, calm, structured
Colors: dark tech base + warm regional neutral + light AI accent
Visuals: gateways, systems, flows
Tone: professional, accessible, trustworthy

Typography Standard
English default font
Use `font-brand` for all English/LTR base text containers.
Font stack:
'Google Sans Flex', var(--font-jakarta), system-ui, -apple-system, sans-serif

English display headings
Use `font-brand-display` for major headings, titles, and numeric display text.
This class uses the same font stack with display variation settings:
'wght' 500, 'wdth' 100, 'opsz' 48

Arabic text
Arabic must stay on Cairo.
Use `font-cairo` for Arabic page-level containers and `arabic-text` for Arabic inline/section text.

Do
Use `font-brand` as the English default at page/section root.
Use `font-brand-display` for h1/h2/h3-style content and prominent metrics.
Keep Arabic conditionals intact with `arabic-text` and `font-cairo`.

Do not
Do not use `font-inter` for new English UI text.
Do not use `font-[var(--font-jakarta)]` directly in class strings.
Do not apply English display variation settings to Arabic content.

Button Standard
Primary website button style
Use a stronger mint glass style for main actions.
Visual direction:
richer mint tint
stronger blur
clear glass highlight
subtle lift on hover

Secondary button style
Use a softer neutral glass style for secondary actions.
Visual direction:
light translucent surface
subtle mint edge on hover
lower visual emphasis than primary

Source of truth
Button tiers are defined in `src/components/ui/button.tsx` using shared variants.
Primary and secondary are separate visual tiers.

Do
Use `variant="brand"` for primary actions.
Use `variant="secondary"` (or outline-style secondary variants) for secondary actions.
Keep utility actions (for example theme toggles) on `ghost` when they should remain low emphasis.
Keep destructive actions visually distinct.

Do not
Do not reintroduce old solid gradient/button fills for primary CTAs.
Do not style secondary actions with the same visual weight as primary.
Do not create one-off primary button styles in section files when the shared variant can be used.
