// All 19 compressors + accessories + air purification data
window.STARK_DATA = {
  compressors: [
    {
      id: "dd-100", name: "Stark DD-100", types: ["electric"], spec: "Stark DD 100.pdf",
      flow: "100 CFM", pressure: "6,000 PSI", motor: "100 HP TEFC, 230/460V, 1750 RPM",
      drive: "Direct Drive", cylinders: "6 cyl / 5 stage", lube: "Pressure lube, 11 qt",
      features: "Waterproof control box · 316 SS gauge panel · inter-stage & oil pressure gauges · low oil shutdown · adjustable high pressure switch · auto condensate drain · spin-off oil filter · oil sight glass · oil fill extension & bell mouth.",
      options: "Remote control box · remote drain silencer · air purification with CO monitor · air storage (ASME or DOT) · fill station (class 2)."
    },
    {
      id: "dd-80", name: "Stark DD-80", types: ["electric"], spec: "Stark DD 80.pdf",
      flow: "80 CFM", pressure: "6,000 PSI", motor: "75 HP, 240V, 3-phase, 192 Amps",
      drive: "Direct Drive",
      features: "Motor controls & overload protection · inter-stage gauges · low oil shutdown · high air pressure shutdown · manual or automatic drain valves.",
      quote: "These machines are manufactured at our 40,000 sq ft facility in Houston, TX. A complete supply of spare parts is on our shelves."
    },
    {
      id: "dd-58", name: "Stark DD-58", types: ["electric", "breathing"], spec: "Stark DD 58.pdf",
      flow: "58 CFM", pressure: "6,000 PSI", motor: "50 HP, 240V, 3-phase, 116 Amps",
      drive: "Direct Drive", dim: "65″ × 45″ × 54″ H", weight: "2,800 lbs",
      features: "Oil fill extension & bell mouth · oil level sight glass · 316 SS gauge panel · spin-off oil filter.",
      quote: "Direct Drive — No Belts — Smooth Operation — Compact Package — Better Access to All Components."
    },
    {
      id: "v-51", name: "Stark V-51", types: ["electric", "vertical", "belt"], spec: "Stark V 51.pdf",
      flow: "58 CFM", pressure: "6,000 PSI", motor: "50 HP TEFC, 230/460V, 1750 RPM",
      drive: "Vertical Belt Drive", cylinders: "6 cyl / 5 stage",
      features: "Smallest footprint possible · Weatherproof control box · 316 SS gauge panel · low oil shutdown · adjustable high pressure switch · auto condensate drain · spin-off oil filter · oil sight glass.",
      options: "Remote control panel · remote DSS · air purification with CO monitor · air storage · fill station."
    },
    {
      id: "244-seismic", name: "Stark 244 Seismic", types: ["electric", "seismic"], spec: "Stark 244 Seismic.pdf",
      flow: "244 CFM", pressure: "2,500 PSI", motor: "200 HP TEFC, 460V, 230 Amps, 60 Hz",
      drive: "Electric Seismic", dim: "18'6″ × 6'8″ × 11' H", weight: "13,000 lbs",
      features: "PLC Controls & safety shutdown · soft start motor controls · auto condensate drain & reservoir · auto pressure control · auto 8-minute cool down · totally enclosed sound container (72 dBA @ 3')."
    },
    {
      id: "dd-40-seismic", name: "Stark DD-40 Seismic", types: ["diesel", "seismic"], spec: "Stark DD 40 Seismic Compressor New.pdf",
      flow: "40 CFM", pressure: "5,000 PSI", motor: "Kubota 3600T Turbo Diesel",
      drive: "Diesel Direct Drive", dim: "48″ × 80″ × 66″ H", weight: "4,000 lbs",
      features: "Air-cooled, 4-stage · 25 gallon fuel (8-hour run time) · offshore chassis · drip pan · 4-point lift eyes · forklift slots · auto high pressure unloader · low oil shutdown · auto condensate drain."
    },
    {
      id: "dd-55-diesel", name: "Stark DD-55 Diesel", types: ["diesel"], spec: "Stark DD 55 Diesel Compressor.pdf",
      flow: "55 CFM", pressure: "5,000 PSI", motor: "Kubota V3600T",
      drive: "Diesel Direct Drive", dim: "55″ × 100″ × 76″ H", weight: "4,700 lbs",
      features: "Air-cooled, 5-stage · 25 gallon fuel (8-hour run time) · offshore chassis · drip pan · 4-point lift · forklift slots · corrosion prevention treatment · auto condensate drain · low oil shutdown.",
      quote: "An extremely heavy duty package. Very smooth running compressor. Weather Proof Control Panel."
    },
    {
      id: "jd-100", name: "Stark 100 (JD-100)", types: ["diesel", "seismic"], spec: "Stark Model JD 100.pdf",
      flow: "100 CFM", pressure: "5,000 PSI", motor: "John Deere 4045 Turbo Diesel, Tier III",
      drive: "Diesel Seismic Direct Drive", dim: "55″ × 100″ × 76″ H", weight: "5,200 lbs",
      features: "Air-cooled, 5-stage · 30 gallon fuel (8-hour run time) · cage with doors for operator safety · offshore chassis & drip pan · certified 4-point lift · corrosion prevention · ASME surge tank · Stark DSS · autonomous (self-contained)."
    },
    {
      id: "ultra-lite", name: "Stark Ultra-Lite", types: ["diesel"], spec: "Stark Ultralite New.pdf",
      flow: "100 CFM", pressure: "5,000 PSI", motor: "Detroit Diesel 4-53",
      drive: "Diesel Direct Drive", dim: "55″ × 100″ × 70″ H", weight: "3,795 lbs",
      features: "Aluminum chassis (35% lighter than standard 6,000 lb unit) · Air-cooled, 5-stage · external fuel source required."
    },
    {
      id: "4r15-de", name: "Stark 4R15-DE", types: ["diesel", "seismic"], spec: "Stark 4R15 DE.pdf",
      flow: "15 CFM", pressure: "6,000 PSI", motor: "24.8 HP @ 1800 RPM, 100% duty cycle",
      drive: "Diesel · Explosion Proof", dim: "37″ × 60″ × 50″ H", weight: "1,275 lbs",
      features: "True FAD · ~5 gallon fuel (7-8 hour run time) · forestry spark-arresting muffler · run-away engine shutdown · wind-up mechanical starter (NO battery, NO air required) · manual condensate drain · drip pan for offshore. Optional APA-58 Purifier for breathing air.",
      quote: "Totally free of electrical controls for more reliable offshore service — no battery, no alternator, no switches."
    },
    {
      id: "v-5", name: "Stark V-5 Breathing Air", types: ["electric", "breathing", "vertical"], spec: "Stark V 5.pdf",
      flow: "5 CFM", pressure: "6,000 PSI", motor: "5 HP, 220/440V, 3-phase",
      drive: "Vertical", dim: "17″ × 20″ × 28″ H", weight: "275 lbs",
      features: "Purifier APA-10 · low oil level shutdown · high air pressure shutdown · manual final trap drain · auto inter-stage drain valve.",
      quote: "We have had this compressor up to 8,000 PSI. It is a very durable and long lasting machine."
    },
    {
      id: "v-8", name: "Stark V-8 Breathing Air", types: ["electric", "breathing", "vertical"], spec: "Stark V 8 E 3.pdf",
      flow: "8 CFM", pressure: "5,000 PSI", motor: "7.5 HP TEFC, 220V, 3-phase, 16 Amps",
      drive: "Vertical, 3-stage air-cooled", dim: "24″ × 30″ × 48″ H", weight: "450 lbs",
      features: "Purifier P-24 · high pressure shutdown (auto stop / manual restart) · hour meter · auto or manual drain valves · oil sight glass. Explosion Proof version available."
    },
    {
      id: "v-12-e1", name: "Stark V-12 E-1", types: ["electric", "breathing", "vertical"], spec: "Stark V 12 E1.pdf",
      flow: "12 CFM", pressure: "4,500 PSI", motor: "10 HP, 220/440V, Single Phase",
      drive: "Vertical Breathing Air", dim: "32″ × 30″ × 65″ H", weight: "975 lbs",
      features: "Purifier APA-58 (trap & 2 tall chambers) · up to 600 SCUBA tank fills per cartridge change · industrial grade compressor block · 3.5 gal oil reservoir · oil cooler & full-flow oil filter · inter-stage gauges · vertical powder coated chassis. Includes 1-year guarantee, service manual, training."
    },
    {
      id: "v-15-e3", name: "Stark V-15 E-3", types: ["electric", "breathing", "vertical"], spec: "Stark V 15.pdf",
      flow: "15 CFM", pressure: "4,500 PSI", motor: "15 HP, 220/440V, 3-phase",
      drive: "Vertical Breathing Air", dim: "32″ × 30″ × 65″ H", weight: "975 lbs",
      features: "Purifier APA-58 · 3.5 gal oil reservoir · oil cooler & full-flow oil filter · oil sight glass · inter-stage gauges · low oil & high air pressure switches · vertical powder coated chassis."
    },
    {
      id: "h-15-e3", name: "Stark H-15 E-3", types: ["electric", "breathing"], spec: "Stark H 15.pdf",
      flow: "15 CFM", pressure: "4,500 PSI", motor: "15 HP, 220/440V, 3-phase",
      drive: "Horizontal Breathing Air", dim: "32″ × 30″ × 65″ H", weight: "975 lbs",
      features: "Purifier APA-58 · industrial grade block · 3.5 gal oil reservoir · oil cooler & full-flow oil filter · oil sight glass · inter-stage gauges · low oil pressure & high air pressure switch. Includes 1-year guarantee, service manual, training."
    },
    {
      id: "v-17", name: "Stark V-17 Breathing Air", types: ["electric", "breathing", "vertical"], spec: "Stark V 17.pdf",
      flow: "17 CFM", pressure: "6,000 PSI", motor: "15 HP, 240/380/480V, 3-phase, 50/60 Hz",
      drive: "Vertical Breathing Air", dim: "34″ × 32″ × 65″ H", weight: "850 lbs",
      features: "Purifier APA-58 (trap & 2 tall chambers) · purifier may be wall-mounted separately for easier servicing · auto stop/manual restart OR auto start/stop wiring · inter-stage gauges · low oil & high air pressure switches · auto drain valve."
    },
    {
      id: "v-27", name: "Stark V-27 Breathing Air", types: ["electric", "breathing", "vertical"], spec: "Stark V 27.pdf",
      flow: "22.5 CFM", pressure: "5,000 PSI", motor: "20 HP, 220/440V, 3-phase",
      drive: "Vertical Breathing Air", dim: "35″ × 42″ × 62″ H", weight: "1,350 lbs",
      features: "Purifier APA-120 (trap & 3 tall chambers) · inter-stage gauges · low oil switch · high air pressure switch · automatic or manual drain valves · vertical small footprint. Includes 1-year guarantee, service manual, training."
    },
    {
      id: "v-35-e3", name: "Stark V-35 E-3", types: ["electric", "breathing", "vertical"], spec: "Stark V 35.pdf",
      flow: "35 CFM", pressure: "6,000 PSI", motor: "30 HP, 220/440V, 3-phase",
      drive: "Vertical, 4-stage radial", dim: "36″ × 42″ × 66″ H", weight: "1,500 lbs",
      features: "Purifier APA-140-5 (four tall chambers) · motor controls & overload · inter-stage gauges · oil sight glass · low oil & high air pressure shutdowns · auto condensate drain · vertical small footprint.",
      quote: "Stark Industries has consistently stayed away from programmable controllers. The conventional controls on all of our equipment manufactured since 1969 have been extremely reliable and are still running today. Simplicity translates directly to reliability & long life."
    },
    {
      id: "v-45-e3", name: "Stark V-45 E-3", types: ["electric", "breathing", "vertical"], spec: "Stark V 45.pdf",
      flow: "43.3 CFM", pressure: "5,000 PSI", motor: "40 HP, 220/440V, 3-phase",
      drive: "Vertical, 4-stage radial", dim: "36″ × 42″ × 66″ H", weight: "1,500 lbs",
      features: "Purifier APA-140-5 (four tall chambers) · motor controls & overload · inter-stage gauges · oil sight glass · low oil & high air pressure shutdowns · auto condensate drain · vertical small footprint. Conventional controls — no PLCs."
    }
  ],
  airPurification: [
    { model: "AP-10", flow: "5 CFM", volume: "10,000 cu ft", chambers: "1 catalyst", dim: "16″×6″×16″", weight: "60 lbs" },
    { model: "AP-24", flow: "15 CFM", volume: "24,000 cu ft", chambers: "1 catalyst", dim: "16″×6″×34″", weight: "80 lbs" },
    { model: "AP-58", flow: "30 CFM", volume: "58,000 cu ft", chambers: "1 desic + 1 cat", dim: "21″×6″×34″", weight: "100 lbs" },
    { model: "AP-120", flow: "50 CFM", volume: "120,000 cu ft", chambers: "2 desic + 1 cat", dim: "26″×6″×34″", weight: "100 lbs" },
    { model: "AP-220", flow: "50 CFM", volume: "220,000 cu ft", chambers: "4 desic + 2 cat", dim: "41″×14″×41″", weight: "~400 lbs" },
    { model: "AP-350", flow: "80 CFM", volume: "450,000 cu ft", chambers: "6 desic + 2 cat", dim: "41″×14″×41″", weight: "~400 lbs" },
    { model: "AP-450", flow: "120 CFM", volume: "450,000 cu ft", chambers: "9 desic + 3 cat", dim: "41″×16″×41″", weight: "555 lbs" }
  ],
  customers: [
    "Texaco", "ConocoPhillips", "Shell", "BP", "ExxonMobil", "Schlumberger",
    "Halliburton", "Apache", "Baker Hughes", "Cameron", "Dow", "CGG Veritas",
    "Tesla", "Geokinetics", "Fugro", "SeaBed", "Seascan", "Glori",
    "Weatherford", "Sprint Safety", "Paramount Pictures", "Cirque"
  ],
  accessories: [
    { cat: "Cascade Systems", title: "Cascade DOT", lines: ["Modular — works with any number of cylinders: 2400, 4500, 5000, 6000 PSI", "Line valves allow servicing without depressurizing tanks", "Self-venting regulator", "Left gauge indicates pressure in each cylinder as opened"] },
    { cat: "Cascade Systems", title: "Cascade Basic Seismic", lines: ["Four ASME cylinders in 2×2 with lifting eyes & forklift slots", "All plumbed as a single storage source", "507 cu ft per cylinder @ 5,000 PSI", "Available 4, 6, or 8 cylinder configs"] },
    { cat: "Cascade Systems", title: "ASME-8-5 Free Standing Cascade", lines: ["Eight 5,000 PSI ASME cylinders", "Free standing rack, Basic Fill Control Panel", "48″ × 36″ × 70″ tall · 2,560 lbs", "Available up to 8,000 PSI"] },
    { cat: "Storage", title: "ASME Storage Cylinder (8BA513)", lines: ["2004 ASME Section VIII Div 1 — U-Stamp Vessel", "MAWP 5,000 PSI · CRO-MO Steel SA 372 Grade F Class 70", "Air Volume: 507 Cu Ft @ 5,000 PSI", "64.5″ × 9.25″ OD · 300 lbs"] },
    { cat: "Storage", title: "DOT/ISO Storage Cylinders", lines: ["4500 PSI: 444 Cu Ft / 9 5/16″ OD × 54″ tall / 144 lbs", "5000 PSI: 472 Cu Ft / 2750 in³ water volume", "Spec: DOT-E 9421-4500 · CGA347 Valve", "Available 4500, 5000, 6000 PSI"] },
    { cat: "Storage", title: "Stark ISO-4500-6 Storage System", lines: ["Six ISO/DOT 4500 PSI cylinders", "2,664 Cu Ft @ 4500 PSI (197 lbs of air)", "Structural steel rack · forklift & 2-point crane lift", "36″ × 44″ × 65″ H · 1,400 lbs empty"] },
    { cat: "Storage", title: "Portable 4-Bottle DOT Storage", lines: ["1,776 Cu Ft @ 4500 PSI", "Forklift capable & single point lift ring", "20″ × 20″ × 58″ H · 700 lbs empty", "Available 2400, 4500, 5000, 6000 PSI"] },
    { cat: "Storage", title: "Storage System — Seismic 4-ASME-B", lines: ["Four ASME 5000 PSI cylinders", "2,028 Cu Ft @ 5,000 PSI", "Stainless steel fittings & tubing", "65″ × 36″ × 40″ H · 1,713 lbs"] },
    { cat: "Control & Distribution", title: "Control Panel ACP-04", lines: ["High pressure regulator with upstream & downstream gauges", "3 modes: fill from storage (compressor off / on) or fill from compressor only", "Compatible with any DOT or ASME cylinders & fill whips"] },
    { cat: "Control & Distribution", title: "Air Distribution Manifold", lines: ["ASME Nat'l Board certified", "Max Working Pressure: 5,200 PSI @ 200°F", "5 inlet ports (¼″ FPT) · 2 outlet ports (½″ FPT)", "6¼″ OD × 35″ OAL · 120 lbs"] },
    { cat: "Control & Distribution", title: "Low Pressure Manifold (8 workers)", lines: ["8 locking quick-connector outlets", "Incoming: 2,400 PSI · Operating: 140 PSI adjustable", "Low air pressure alarm bell at 500 PSI", "18″ × 10″ × 17″ H · 15 lbs"] },
    { cat: "Control & Distribution", title: "High Flow Regulator", lines: ["Piston type hand-loading balanced poppet", "Inlet: 6,000 PSI max · Outlet: 5,000 PSI max", "Flow Coefficient: 0.8 CV (0.23″ orifice)", "Length: 6.5″"] },
    { cat: "Control & Distribution", title: "Relief Valve SI-RV-316-6K-1/4″", lines: ["316 Stainless Steel · up to 6,000 PSI · 100+ CFM", "Adjustable 750–6,000 PSI (6 spring sizes, color coded)", "Fully trapped O-ring · 6 exhaust ports", "Wrench: ¾″ · Inlet: ¼″ MPT"] },
    { cat: "Drain Systems", title: "Stark DSS — Drain Separator/Silencer", lines: ["7-stage separation removes oil & water from high pressure condensate", "Makes automatic drain discharge clean, quiet & safe", "40″ tall × 8.5″ diameter · 70 lbs", "Free-standing base or wall-mount bracket"] },
    { cat: "Drain Systems", title: "Stark Mark IV Auto Drain (MK-4)", lines: ["Separate valves for each stage — no check valves needed", "Externally visible operation", "20,000 cycle valve life · manual override available", "Suffix indicates trap count (MK-4-5 = 5 traps)"] },
    { cat: "Training", title: "Compressors for Dummies", lines: ["172+ page comprehensive manual", "Topics: theory, purification, ancillaries, electrical, troubleshooting", "Free training at Stark Industries or worldwide", "Email jstark@starkindustries.com — subject \"CFD Update\" for free updates"] }
  ]
};
