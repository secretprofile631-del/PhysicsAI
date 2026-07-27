import {
  PhysicsTopicInfo,
  PracticalExperiment,
  ShortNote,
  MediaReference,
  QuizQuestion,
} from '../types';

export const PHYSICS_TOPICS: PhysicsTopicInfo[] = [
  {
    id: 'mechanics',
    name: 'Mechanics',
    code: 'UNIT 01 - 02',
    description: 'Kinematics, Newton’s Laws, Work, Energy, Power, Momentum, Circular & Rotational Motion, Gravitation.',
    iconName: 'Compass',
    subtopics: [
      'Units & Dimensions',
      'Vectors & Relative Velocity',
      'Kinematics & Projectile Motion',
      'Newton’s Laws & Friction',
      'Work, Energy & Power',
      'Linear Momentum & Collisions',
      'Circular Motion & Centripetal Force',
      'Rotational Dynamics & Moment of Inertia',
      'Universal Gravitation & Satellites',
    ],
    keyEquations: [
      'v = u + at',
      's = ut + ½at²',
      'v² = u² + 2as',
      'F = ma',
      'p = mv',
      'E_k = ½mv²',
      'a_c = v²/r = ω²r',
      'τ = Iα',
      'F = G(m₁m₂)/r²',
    ],
  },
  {
    id: 'oscillations_waves',
    name: 'Oscillations & Waves',
    code: 'UNIT 03',
    description: 'Simple Harmonic Motion (SHM), Damped/Forced Oscillations, Sound Waves, Resonance, Wave Optics.',
    iconName: 'Activity',
    subtopics: [
      'Simple Harmonic Motion (SHM)',
      'Simple & Compound Pendulums',
      'Transverse & Longitudinal Waves',
      'Sound Intensity & Decibel Scale',
      'Doppler Effect',
      'Stationary Waves on Strings & Air Columns',
      'Interference, Diffraction & Polarization',
    ],
    keyEquations: [
      'a = -ω²x',
      'T = 2π√(m/k) = 2π√(l/g)',
      'v = fλ',
      'I = P / (4πr²)',
      'f\' = f(v ± v_o)/(v ∓ v_s)',
      'f_n = (n v) / (2L)',
      'd sinθ = mλ',
    ],
  },
  {
    id: 'thermal_physics',
    name: 'Thermal Physics',
    code: 'UNIT 04',
    description: 'Temperature, Thermal Expansion, Calorimetry, Kinetic Theory of Gases, Thermodynamics, Heat Transfer.',
    iconName: 'Flame',
    subtopics: [
      'Thermometry & Temperature Scales',
      'Thermal Expansion of Solids & Liquids',
      'Calorimetry & Latent Heat',
      'Ideal Gas Laws & Kinetic Theory',
      'First Law of Thermodynamics',
      'Heat Conduction, Convection & Radiation (Stefan\'s Law)',
    ],
    keyEquations: [
      'Q = mcΔT = CΔT',
      'PV = nRT',
      'P = ⅓ ρ <c²>',
      'E_k = ⅜ k_B T',
      'ΔU = Q - W',
      'dQ/dt = -kA (dT/dx)',
      'P = ε σ A T⁴',
    ],
  },
  {
    id: 'gravitational_fields',
    name: 'Gravitational Fields',
    code: 'UNIT 05.1',
    description: 'Gravitational field strength, potential, orbital mechanics, escape velocity, and equipotential surfaces.',
    iconName: 'Globe',
    subtopics: [
      'Newton’s Law of Gravitation',
      'Gravitational Field Intensity (g)',
      'Gravitational Potential (V)',
      'Orbital Velocity & Geostationary Satellites',
      'Escape Velocity from Planets',
    ],
    keyEquations: [
      'g = GM / r²',
      'V = -GM / r',
      'U_p = -GMm / r',
      'v_orbit = √(GM/r)',
      'v_escape = √(2GM/R)',
    ],
  },
  {
    id: 'electrostatic_fields',
    name: 'Electrostatic Fields',
    code: 'UNIT 05.2',
    description: 'Coulomb’s Law, Electric Field Strength, Potential, Gauss’s Law, Capacitors & Energy Storage.',
    iconName: 'Zap',
    subtopics: [
      'Coulomb’s Law',
      'Electric Field Intensity (E)',
      'Electric Potential (V) & Equipotential Lines',
      'Capacitance & Parallel Plate Capacitors',
      'Energy Stored in Capacitors & Dielectrics',
    ],
    keyEquations: [
      'F = (1/4πε₀) (q₁q₂/r²)',
      'E = F/q = (1/4πε₀) (Q/r²)',
      'V = (1/4πε₀) (Q/r)',
      'C = Q/V = ε₀A/d',
      'U = ½CV² = ½Q²/C',
    ],
  },
  {
    id: 'magnetic_fields',
    name: 'Magnetic Fields',
    code: 'UNIT 05.3',
    description: 'Magnetic Force on Moving Charges & Wires, Biot-Savart Law, Ampere’s Law, Electromagnetic Induction.',
    iconName: 'Magnet',
    subtopics: [
      'Magnetic Field (B) & Lorentz Force',
      'Force on Current-Carrying Conductor',
      'Torque on Current Loop & Galvanometers',
      'Electromagnetic Induction & Faraday’s/Lenz’s Law',
      'Self & Mutual Inductance, Transformers',
    ],
    keyEquations: [
      'F = qvB sinθ',
      'F = BIL sinθ',
      'B = (μ₀ I) / (2π r)',
      'ε = -dΦ/dt = -N (dΦ/dt)',
      'V_s / V_p = N_s / N_p',
    ],
  },
  {
    id: 'current_electricity',
    name: 'Current Electricity',
    code: 'UNIT 06',
    description: 'Ohm’s Law, Resistors, Kirchhoff’s Laws, Internal Resistance, Potentiometer, Meter Bridge.',
    iconName: 'Cpu',
    subtopics: [
      'Current Density & Drift Velocity',
      'Resistance, Resistivity & Temperature Coefficient',
      'Electromotive Force (e.m.f.) & Internal Resistance',
      'Kirchhoff’s Current & Voltage Laws',
      'Wheatstone Bridge & Meter Bridge',
      'Potentiometer & Applications',
    ],
    keyEquations: [
      'I = n A v_d e',
      'V = IR',
      'R = ρ L / A',
      'E = V + Ir',
      'P = VI = I²R = V²/R',
      'E₁/E₂ = l₁/l₂',
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    code: 'UNIT 07',
    description: 'Semiconductors, p-n Junction Diodes, Rectification, Bipolar Junction Transistors, Op-Amps, Logic Gates.',
    iconName: 'Layers',
    subtopics: [
      'Intrinsic & Extrinsic Semiconductors',
      'p-n Junction Diode & Half/Full Wave Rectifiers',
      'Zener Diode Voltage Regulator',
      'Transistor Switches & Amplifiers',
      'Operational Amplifier (Op-Amp) Inverting & Non-inverting',
      'Digital Logic Gates & Truth Tables',
    ],
    keyEquations: [
      'I_E = I_B + I_C',
      'β = I_C / I_B',
      'V_out = - (R_f / R_in) V_in (Inverting Op-Amp)',
      'V_out = (1 + R_f / R_in) V_in (Non-Inverting Op-Amp)',
    ],
  },
  {
    id: 'properties_matter',
    name: 'Mechanical Properties of Matter',
    code: 'UNIT 08',
    description: 'Elasticity, Young’s Modulus, Hydrostatic Pressure, Surface Tension, Fluid Viscosity & Streamline Flow.',
    iconName: 'Droplet',
    subtopics: [
      'Stress, Strain & Hooke’s Law',
      'Young’s Modulus & Elastic Energy Density',
      'Hydrostatic Pressure & Buoyancy (Archimedes)',
      'Surface Tension, Capillary Action & Excess Pressure',
      'Viscosity, Poiseuille’s Formula & Stoke’s Law',
      'Bernoulli’s Principle & Continuity Equation',
    ],
    keyEquations: [
      'Stress = F/A, Strain = e/L',
      'Y = (F/A) / (e/L) = FL / (Ae)',
      'U_elastic = ½ F e',
      'P = h ρ g',
      'γ = F / (2L) = (h r ρ g) / (2 cosθ)',
      'F_viscous = 6π η r v',
      'A₁v₁ = A₂v₂',
    ],
  },
  {
    id: 'matter_radiation',
    name: 'Matter & Radiation',
    code: 'UNIT 09',
    description: 'Photoelectric Effect, Photons, Wave-Particle Duality, X-Rays, Atomic Energy Levels & Line Spectra.',
    iconName: 'Sun',
    subtopics: [
      'Quantum Theory of Radiation & Photons',
      'Photoelectric Effect & Einstein’s Equation',
      'De Broglie Wavelength & Wave-Particle Duality',
      'Production of X-Rays & Continuous/Characteristic Spectra',
      'Bohr Model of Hydrogen Atom',
    ],
    keyEquations: [
      'E = hf = hc/λ',
      'hf = Φ + K_max = hf₀ + eV_s',
      'λ = h / p = h / (mv)',
      'eV_max = h c / λ_min',
      '1/λ = R_H (1/n₁² - 1/n₂²)',
    ],
  },
  {
    id: 'nuclear_physics',
    name: 'Nuclear Physics & Radioactivity',
    code: 'UNIT 10',
    description: 'Nuclear Structure, Binding Energy, Mass Defect, Radioactivity Decay Law, Half-Life, Fission & Fusion.',
    iconName: 'Atom',
    subtopics: [
      'Atomic Nucleus & Isotopes',
      'Mass Defect & Nuclear Binding Energy',
      'Radioactive Decay (Alpha, Beta, Gamma)',
      'Decay Law, Activity & Half-Life',
      'Nuclear Fission & Fusion Reactions',
    ],
    keyEquations: [
      'E = Δm c²',
      'A = -dN/dt = λN',
      'N(t) = N₀ e^(-λt)',
      'T_½ = ln(2) / λ ≈ 0.693 / λ',
      'Activity A = A₀ e^(-λt)',
    ],
  },
  {
    id: 'geometrical_optics',
    name: 'Geometrical Optics',
    code: 'UNIT 11',
    description: 'Refraction at Plane & Curved Surfaces, Lenses, Prisms, Spectrometer, Optical Instruments & Defect Correction.',
    iconName: 'Eye',
    subtopics: [
      'Reflection & Refraction at Spherical Mirrors/Interfaces',
      'Refractive Index & Critical Angle / Total Internal Reflection',
      'Thin Lenses & Lens Maker Formula',
      'Prism Deviation & Minimum Deviation (D_min)',
      'Astronomical Telescope & Compound Microscope',
    ],
    keyEquations: [
      '1/f = 1/v + 1/u',
      'n = sin(i) / sin(r)',
      'sin(C) = 1 / n',
      'n = sin((A + D_min)/2) / sin(A/2)',
      'm = v/u',
    ],
  },
];

export const DEFAULT_PRACTICALS: PracticalExperiment[] = [
  {
    id: 'vernier_micrometer',
    topicId: 'mechanics',
    topicName: 'Mechanics (Measurements)',
    title: 'Vernier Caliper & Micrometer Screw Gauge Measurements',
    objective: 'Determine the density of a metallic sphere or cylinder by measuring diameter and mass using precision instruments.',
    apparatus: ['Vernier Calipers', 'Micrometer Screw Gauge', 'Metallic sphere/cylinder', 'Electronic top-loading balance'],
    theory: 'Least count (LC) is the smallest measurement readable. Vernier LC = 1 main scale div - 1 vernier scale div (usually 0.1 mm or 0.02 mm). Micrometer LC = Pitch / No. of circular scale divisions (usually 0.01 mm). Zero error must be added/subtracted.',
    formula: 'Volume V = (4/3)π(d/2)³ ; Density ρ = Mass / Volume = M / V',
    variablesToGraph: {
      xAxis: 'Diameter d (mm)',
      yAxis: 'Mass M (g)',
      gradientRepresents: 'Proportionality to density & volume constant',
    },
    procedureSteps: [
      'Find zero error of Vernier calipers and micrometer screw gauge.',
      'Measure diameter of sphere at 4 different orientations to average out non-spherical defects.',
      'Record Main Scale Reading (MSR) and Vernier/Circular Scale Reading (VSR/CSR).',
      'Calculate corrected average diameter d = Observed d - Zero Error.',
      'Weigh sphere on digital balance to record mass M.',
      'Calculate Volume V and Density ρ with uncertainty calculation.',
    ],
    precautions: [
      'Do not overtighten micrometer screw gauge; use the ratchet knob until it clicks twice.',
      'Clean jaw faces of Vernier caliper before recording zero error.',
      'Take readings at different diameters to eliminate parallax and non-uniform shape errors.',
    ],
    sourcesOfError: ['Zero error uncorrected', 'Parallax error reading linear scale', 'Deformation of soft sample due to excessive force'],
    sampleCalculation: {
      inputs: [
        { name: 'Mass M', symbol: 'M', unit: 'g', defaultValue: 28.5 },
        { name: 'Diameter d', symbol: 'd', unit: 'mm', defaultValue: 19.05 },
      ],
      formulaDescription: 'Volume = (π/6) * d³; Density ρ = M / Volume',
      calculate: (inputs) => {
        const M_kg = (inputs.M || 28.5) / 1000;
        const d_m = (inputs.d || 19.05) / 1000;
        const vol = (Math.PI / 6) * Math.pow(d_m, 3);
        const rho = M_kg / vol;
        return {
          result: Math.round(rho),
          unit: 'kg m⁻³',
          errorMargin: '± 25 kg m⁻³',
        };
      },
    },
    commonVivaQuestions: [
      { question: 'Why is a ratchet provided in a micrometer screw gauge?', answer: 'To apply a uniform, gentle pressure on the object and prevent overtightening that deforms the sample or damages the spindle threads.' },
      { question: 'What is zero error and how do you correct for a positive zero error?', answer: 'Zero error occurs when scale zeroes do not coincide when jaws meet. Positive zero error means the reading is greater than 0 without sample; subtract it from measured value.' },
    ],
  },
  {
    id: 'simple_pendulum',
    topicId: 'mechanics',
    topicName: 'Mechanics (Oscillations)',
    title: 'Determination of Acceleration due to Gravity (g) using a Simple Pendulum',
    objective: 'Measure the period of oscillation T for various pendulum lengths L and calculate acceleration due to gravity g from the T² vs L graph.',
    apparatus: ['Inextensible cotton thread', 'Heavy small brass bob with hook', 'Split cork clamp & Retort stand', 'Stopwatch (0.1s precision)', 'Meter rule'],
    theory: 'For small angular displacements (θ < 5°), simple pendulum motion is SHM with period T = 2π√(L/g). Squaring both sides yields T² = (4π²/g) * L.',
    formula: 'T² = (4π² / g) * L  =>  g = 4π² / (Gradient of T² vs L graph)',
    variablesToGraph: {
      xAxis: 'Pendulum Length L (m)',
      yAxis: 'Period Squared T² (s²)',
      gradientRepresents: '4π² / g',
      interceptRepresents: 'Should ideally pass through origin (0,0)',
    },
    procedureSteps: [
      'Attach thread to bob and clamp firmly between split cork at the point of suspension.',
      'Measure length L from bottom of split cork to the center of mass of bob.',
      'Displace bob slightly (less than 5 degrees) in a single vertical plane.',
      'Time 20 or 30 complete oscillations using stopwatch; repeat for accuracy and find average time for 1 period T.',
      'Repeat for 6 different thread lengths between 30 cm and 100 cm.',
      'Plot T² on Y-axis against L on X-axis; draw line of best fit and measure gradient m.',
      'Calculate g = 4π² / m.',
    ],
    precautions: [
      'Keep amplitude small (θ < 5°) so sinθ ≈ θ condition for SHM holds true.',
      'Ensure bob swings strictly in a single vertical plane without conical or rotational motion.',
      'Start stopwatch when bob crosses equilibrium position (highest speed, lowest human timing reaction error).',
    ],
    sourcesOfError: ['Human reaction time starting/stopping timer', 'Air resistance dampening oscillation', 'Conical motion instead of planar motion'],
    sampleCalculation: {
      inputs: [
        { name: 'Graph Gradient m (s²/m)', symbol: 'm', unit: 's²/m', defaultValue: 4.02 },
      ],
      formulaDescription: 'g = 4π² / m',
      calculate: (inputs) => {
        const grad = inputs['Graph Gradient m (s²/m)'] || 4.02;
        const gVal = (4 * Math.PI * Math.PI) / grad;
        return {
          result: Number(gVal.toFixed(2)),
          unit: 'm s⁻²',
          errorMargin: '± 0.08 m s⁻²',
        };
      },
    },
    commonVivaQuestions: [
      { question: 'Why must the amplitude be small during simple pendulum oscillations?', answer: 'The restoring force F = -mg sinθ is proportional to displacement x = Lθ ONLY when sinθ ≈ θ (in radians), which is valid for small angles (<5°).' },
      { question: 'Why is it better to measure the time for 20 oscillations instead of 1?', answer: 'Measuring 20 oscillations reduces the relative fractional timing error due to human reaction time by a factor of 20.' },
    ],
  },
  {
    id: 'resonance_tube',
    topicId: 'oscillations_waves',
    topicName: 'Waves & Sound',
    title: 'Speed of Sound in Air using Resonance Tube and Tuning Forks',
    objective: 'Determine the speed of sound in air at room temperature using a closed resonant air column and apply end correction.',
    apparatus: ['Resonance tube set with reservoir & water', 'Set of calibrated tuning forks (e.g. 256, 320, 384, 480, 512 Hz)', 'Rubber mallet', 'Meter rule'],
    theory: 'Air column closed at one end resonates at fundamental mode when tube length l plus end correction e equals λ/4. Since v = fλ, l + e = v / (4f), so l = (v/4) * (1/f) - e.',
    formula: 'l = (v / 4) * (1/f) - e   =>  Speed of sound v = 4 * (Gradient of l vs 1/f graph)',
    variablesToGraph: {
      xAxis: 'Reciprocal Frequency 1/f (s)',
      yAxis: 'Resonating Length l (m)',
      gradientRepresents: 'v / 4',
      interceptRepresents: '-e (Negative end correction)',
    },
    procedureSteps: [
      'Fill resonance tube system with water; adjust water height to top level.',
      'Strike tuning fork of frequency f with rubber mallet and hold vibrating prongs horizontally right above open top end.',
      'Lower water level gradually until first loud resonance sound is heard.',
      'Record resonating length l₁ of air column from top edge of tube to water meniscus.',
      'Repeat process for other tuning forks of known frequencies.',
      'Plot resonating length l on Y-axis against 1/f on X-axis.',
      'Calculate gradient m; speed of sound v = 4m. Y-intercept gives end correction e.',
    ],
    precautions: [
      'Hold vibrating tuning fork prongs horizontally and avoid touching the metal rim of the tube.',
      'Locate exact position of maximum sound intensity by moving water level up and down repeatedly.',
      'Record room temperature to convert measured speed v to 0°C if required.',
    ],
    sourcesOfError: ['Difficulty identifying exact peak loudness', 'Temperature fluctuations during experiment', 'Parallax error reading water meniscus'],
    sampleCalculation: {
      inputs: [
        { name: 'Gradient m (m s)', symbol: 'm', unit: 'm s', defaultValue: 85.5 },
      ],
      formulaDescription: 'v = 4 * Gradient',
      calculate: (inputs) => {
        const m = inputs['Gradient m (m s)'] || 85.5;
        const v = 4 * m;
        return {
          result: Number(v.toFixed(1)),
          unit: 'm s⁻¹',
          errorMargin: '± 3 m s⁻¹',
        };
      },
    },
    commonVivaQuestions: [
      { question: 'What is end correction in a resonance tube?', answer: 'An antinode of vibrating air forms slightly outside the open end of the tube (by distance e ≈ 0.6r where r is tube radius), so effective vibrating length is l + e.' },
      { question: 'How does temperature affect speed of sound in air?', answer: 'Speed of sound is proportional to square root of absolute temperature v ∝ √T. Higher temperature increases molecular kinetic speed and speed of sound.' },
    ],
  },
  {
    id: 'meter_bridge',
    topicId: 'current_electricity',
    topicName: 'Current Electricity',
    title: 'Determination of Specific Resistance (Resistivity) using Meter Bridge',
    objective: 'Find the unknown resistance of a metallic wire using Wheatstone bridge principle on a Meter Bridge, and calculate wire resistivity.',
    apparatus: ['Meter bridge setup with 1m uniform resistance wire', 'Unknown resistance wire', 'Standard resistance box R', 'Galvanometer', 'Jockey', 'DC power supply / Leclanche cell', 'Micrometer screw gauge'],
    theory: 'At balance point (null deflection in galvanometer), R / S = l₁ / (100 - l₁), where l₁ is balance length in cm. Unknown resistance S = R * (100 - l₁) / l₁. Resistivity ρ = S * (πd²/4) / L.',
    formula: 'S = R * (100 - l₁) / l₁ ; Resistivity ρ = S * A / L = S * (πd² / 4) / L',
    variablesToGraph: {
      xAxis: 'Resistance Box R (Ω)',
      yAxis: 'Length Ratio l₁ / (100 - l₁)',
      gradientRepresents: 'Proportional balance constant',
    },
    procedureSteps: [
      'Connect DC source, standard resistance box R in left gap, unknown wire S in right gap, and central galvanometer with jockey.',
      'Select suitable resistance R so balance point falls near middle 40-60 cm (maximum bridge sensitivity).',
      'Tap jockey along meter bridge wire until galvanometer shows ZERO deflection.',
      'Record balancing length l₁ from left end; calculate l₂ = 100 - l₁.',
      'Calculate unknown resistance S = R * l₂ / l₁ for 5 different values of R.',
      'Measure diameter d of unknown wire with micrometer screw gauge and total length L with meter rule.',
      'Calculate average S and wire resistivity ρ.',
    ],
    precautions: [
      'Do not drag jockey along meter bridge wire; tap gently to avoid scratching wire cross-section uniformity.',
      'Keep current low and switch off when taking breaks to prevent heating wire and changing resistance.',
      'Ensure all terminal screws are clean and tightly secured to minimize end contact resistances.',
    ],
    sourcesOfError: ['Non-uniformity of meter bridge wire cross-section', 'End contact resistances at copper strip joints', 'Heating of wire changing resistance'],
    sampleCalculation: {
      inputs: [
        { name: 'Unknown Resistance S', symbol: 'S', unit: 'Ω', defaultValue: 4.8 },
        { name: 'Wire Diameter d', symbol: 'd', unit: 'mm', defaultValue: 0.45 },
        { name: 'Wire Length L', symbol: 'L', unit: 'cm', defaultValue: 50.0 },
      ],
      formulaDescription: 'ρ = S * (π d² / 4) / L',
      calculate: (inputs) => {
        const S = inputs['Unknown Resistance S'] || 4.8;
        const d_m = (inputs['Wire Diameter d'] || 0.45) / 1000;
        const L_m = (inputs['Wire Length L'] || 50.0) / 100;
        const area = (Math.PI / 4) * d_m * d_m;
        const rho = (S * area) / L_m;
        return {
          result: Number((rho * 1e6).toFixed(3)),
          unit: '×10⁻⁶ Ω m',
          errorMargin: '± 0.02 ×10⁻⁶ Ω m',
        };
      },
    },
    commonVivaQuestions: [
      { question: 'Why should the balance point lie near the middle (40 cm to 60 cm) of the meter bridge wire?', answer: 'The fractional error in measuring balancing length Δl/l is minimized near 50 cm, giving maximum percentage accuracy and bridge sensitivity.' },
      { question: 'Why is a meter bridge wire made of Manganin or Constantan?', answer: 'These alloys have high resistivity and a very low temperature coefficient of resistance, so resistance remains constant even if wire warms slightly.' },
    ],
  },
  {
    id: 'spectrometer_prism',
    topicId: 'geometrical_optics',
    topicName: 'Geometrical Optics',
    title: 'Determination of Refractive Index of Glass Prism using Spectrometer',
    objective: 'Measure angle of prism A and angle of minimum deviation D_min for sodium light using a calibrated optical spectrometer.',
    apparatus: ['Optical Spectrometer (Collimator, Telescope, Prism Table)', 'Glass Prism', 'Sodium vapor lamp (Monochromatic yellow light source, λ = 589 nm)', 'Magnifying glass for Vernier scale'],
    theory: 'When light passes symmetrically through glass prism at minimum deviation D_min, angle of incidence equals angle of emergence (i = e). Refractive index n = sin((A + D_min)/2) / sin(A/2).',
    formula: 'n = sin( (A + D_min) / 2 ) / sin( A / 2 )',
    variablesToGraph: {
      xAxis: 'Angle of Incidence i (°)',
      yAxis: 'Angle of Deviation D (°)',
      gradientRepresents: 'Minimum point on U-shaped graph gives D_min',
    },
    procedureSteps: [
      'Perform initial spectrometer adjustments: focus telescope for parallel rays, level prism table, adjust collimator slit width.',
      'Measure Angle of Prism A: Place prism edge pointing at collimator; reflected rays from both faces measured with telescope Vernier scales; A = ½ (Difference in readings).',
      'Measure Angle of Minimum Deviation D_min: Pass light through prism, rotate table until spectral line turns back. Note telescope reading at exact turning point.',
      'Record direct reading without prism; D_min = Difference between minimum deviation reading and direct ray reading.',
      'Calculate refractive index n using the prism formula.',
    ],
    precautions: [
      'Telescope and collimator must be accurately focused for parallel light before taking angular readings.',
      'Prism table must be leveled using leveling screws and spirit level.',
      'Use both Vernier scales (V1 and V2) located 180° apart to eliminate eccentricity error of circular scale.',
    ],
    sourcesOfError: ['Inaccurate leveling of prism table', 'Error in locating turning point of spectrum', 'Vernier reading parallax error'],
    sampleCalculation: {
      inputs: [
        { name: 'Prism Angle A', symbol: 'A', unit: 'degrees', defaultValue: 60.0 },
        { name: 'Min Deviation D_min', symbol: 'D_min', unit: 'degrees', defaultValue: 38.5 },
      ],
      formulaDescription: 'n = sin((A + D_min)/2) / sin(A/2)',
      calculate: (inputs) => {
        const A_rad = ((inputs['Prism Angle A'] || 60.0) * Math.PI) / 180;
        const D_rad = ((inputs['Min Deviation D_min'] || 38.5) * Math.PI) / 180;
        const numerator = Math.sin((A_rad + D_rad) / 2);
        const denominator = Math.sin(A_rad / 2);
        const n = numerator / denominator;
        return {
          result: Number(n.toFixed(3)),
          unit: 'dimensionless',
          errorMargin: '± 0.005',
        };
      },
    },
    commonVivaQuestions: [
      { question: 'What happens to angle of deviation D if angle of incidence i is continuously increased from small value?', answer: 'Angle of deviation D first decreases to a minimum value D_min, and then increases. The minimum point occurs when i = e.' },
      { question: 'Why are two Verniers V1 and V2 placed 180° apart on the spectrometer scale?', answer: 'To eliminate errors caused by non-coincidence of the center of rotation of the telescope with the center of the circular scale (eccentricity error).' },
    ],
  },
  {
    id: 'diode_characteristics',
    topicId: 'electronics',
    topicName: 'Electronics',
    title: 'Characteristic Curves of Forward & Reverse Biased Semiconductor Diode',
    objective: 'Plot I-V characteristic curve of a silicon p-n junction diode and determine barrier knee potential (V_k) and dynamic resistance.',
    apparatus: ['Silicon p-n junction diode (e.g. 1N4007)', 'Variable DC power supply (0-15V)', 'DC Voltmeter (0-3V / 0-30V)', 'DC Milliammeter (0-100mA) & Microammeter (0-100μA)', 'Connecting wires & breadboard'],
    theory: 'Forward bias: When p-type connected to positive terminal, depletion layer shrinks. Current remains zero until forward voltage exceeds knee voltage V_k (~0.7V for Si). Past knee voltage, current increases exponentially. Reverse bias: Microampere leakage current until breakdown.',
    formula: 'Dynamic Forward Resistance r_d = ΔV_F / ΔI_F ; Knee Voltage V_k = X-intercept of steep line extension',
    variablesToGraph: {
      xAxis: 'Diode Voltage V (V)',
      yAxis: 'Diode Current I (mA for forward, μA for reverse)',
      gradientRepresents: 'Reciprocal of dynamic resistance 1 / r_d',
    },
    procedureSteps: [
      'Forward Bias Setup: Connect p-side to positive variable DC supply through milliammeter; voltmeter in parallel across diode.',
      'Increase voltage in small 0.1V steps from 0V to 1.0V; record diode current I in mA.',
      'Observe knee region around 0.6V to 0.7V where current begins rising rapidly.',
      'Reverse Bias Setup: Reverse diode orientation and swap milliammeter for microammeter.',
      'Increase reverse voltage up to 10V; observe small microampere reverse saturation current.',
      'Plot Forward I-V curve in Quadrant I and Reverse I-V curve in Quadrant III.',
      'Measure knee voltage V_k and calculate dynamic forward resistance r_d = ΔV / ΔI.',
    ],
    precautions: [
      'Do not exceed maximum current rating of diode (use current limiting resistor in series).',
      'Use sensitive microammeter for reverse bias as reverse current is extremely tiny (μA).',
      'Disconnect power immediately after taking readings to avoid thermal heating of p-n junction.',
    ],
    sourcesOfError: ['Internal resistance of ammeter affecting low voltage readings', 'Temperature rise changing diode current', 'Zero error of sensitive ammeter'],
    sampleCalculation: {
      inputs: [
        { name: 'ΔV_F (Volts)', symbol: 'ΔV', unit: 'V', defaultValue: 0.1 },
        { name: 'ΔI_F (mA)', symbol: 'ΔI', unit: 'mA', defaultValue: 12.0 },
      ],
      formulaDescription: 'Dynamic Resistance r_d = ΔV_F / ΔI_F',
      calculate: (inputs) => {
        const dV = inputs['ΔV_F (Volts)'] || 0.1;
        const dI_A = (inputs['ΔI_F (mA)'] || 12.0) / 1000;
        const rd = dV / dI_A;
        return {
          result: Number(rd.toFixed(1)),
          unit: 'Ω',
          errorMargin: '± 0.5 Ω',
        };
      },
    },
    commonVivaQuestions: [
      { question: 'What is the barrier potential (knee voltage) for Silicon and Germanium diodes?', answer: 'For Silicon diodes, knee voltage is approximately 0.7 V. For Germanium diodes, it is approximately 0.3 V.' },
      { question: 'Why does reverse saturation current remain almost constant when reverse voltage increases?', answer: 'Reverse current is due to thermally generated minority charge carriers. Its magnitude depends on junction temperature, not applied reverse voltage.' },
    ],
  },
];

export const DEFAULT_SHORT_NOTES: ShortNote[] = [
  {
    id: 'note_mechanics_kinematics',
    topicId: 'mechanics',
    topicName: 'Mechanics',
    subtopic: 'Kinematics & Motion under Gravity',
    title: 'Kinematics Equations, Vector Motion & Trajectory Analysis',
    summary: 'Master constant acceleration equations, vector components, projectile trajectory relations, and velocity-time graph gradient/area interpretations.',
    coreConcepts: [
      'Gradient of Displacement-Time graph = Velocity v = ds/dt.',
      'Gradient of Velocity-Time graph = Acceleration a = dv/dt.',
      'Area under Velocity-Time graph = Total Displacement s.',
      'Area under Acceleration-Time graph = Change in Velocity Δv.',
      'For projectile motion with initial velocity u at angle θ: Horizontal speed u_x = u cosθ remains constant (no horizontal air drag). Vertical speed u_y = u sinθ undergoes free fall acceleration -g.',
      'Time of flight T = (2 u sinθ) / g. Maximum height H_max = (u² sin²θ) / (2g). Horizontal Range R = (u² sin 2θ) / g.',
    ],
    keyFormulas: [
      { name: 'Linear Kinematics 1', symbolicFormula: 'v = u + a t', variableDefinitions: 'u = initial velocity, v = final velocity, a = acceleration, t = time', units: 'm s⁻¹' },
      { name: 'Linear Kinematics 2', symbolicFormula: 's = u t + ½ a t²', variableDefinitions: 's = displacement, u = initial velocity, a = acceleration, t = time', units: 'm' },
      { name: 'Linear Kinematics 3', symbolicFormula: 'v² = u² + 2 a s', variableDefinitions: 'v = final velocity, u = initial velocity, a = acceleration, s = displacement', units: 'm² s⁻²' },
      { name: 'Projectile Range', symbolicFormula: 'R = (u² sin 2θ) / g', variableDefinitions: 'R = maximum range at launch angle θ', units: 'm' },
    ],
    examTraps: [
      'Forgetting vector signs (+/-) in vertical free-fall equations. Always pick upward or downward as strictly positive throughout working.',
      'Confusing speed (scalar) with velocity (vector) when calculating average velocity over a curved path.',
      'Assuming horizontal range is maximum at 45° when launch height is elevated above landing ground. (Only 45° for level ground!)',
    ],
    derivationSummary: 'Derive s = ut + ½at² by recognizing average velocity for constant acceleration v_avg = ½(u + v). Then s = v_avg * t = ½(u + u + at) t = ut + ½at².',
  },
  {
    id: 'note_current_elec_potentiometer',
    topicId: 'current_electricity',
    topicName: 'Current Electricity',
    subtopic: 'Potentiometer & E.M.F. Comparison',
    title: 'Potentiometer Principle, Internal Resistance & Sensitivity',
    summary: 'Comprehensive guide to the null-method potentiometer for precise e.m.f. measurements without drawing current from test cells.',
    coreConcepts: [
      'A potentiometer measures electric potential difference without drawing any current from the circuit at balance point (ideal infinite resistance voltmeter).',
      'Potential Gradient k = V_wire / L_wire = (I_primary * ρ_wire) / A_wire. For uniform wire and constant primary current, k is constant.',
      'At balance length l for cell e.m.f. E: E = k * l = (V_AB / L) * l.',
      'To compare two cell e.m.f.s E₁ and E₂: E₁ / E₂ = l₁ / l₂.',
      'To measure internal resistance r of cell E: r = R * ( (l₁ - l₂) / l₂ ), where l₁ is open-circuit balance length and l₂ is balance length with shunt resistor R.',
      'To increase potentiometer sensitivity, decrease potential gradient k (e.g. increase total wire length L or add series rheostat R_s in primary circuit).',
    ],
    keyFormulas: [
      { name: 'Potential Gradient', symbolicFormula: 'k = V_AB / L', variableDefinitions: 'k = potential drop per unit length, V_AB = voltage across wire AB, L = wire length', units: 'V m⁻¹' },
      { name: 'Cell EMF Balance', symbolicFormula: 'E = k l₁', variableDefinitions: 'E = unknown emf, l₁ = balance length', units: 'V' },
      { name: 'Internal Resistance Formula', symbolicFormula: 'r = R ( (l₁ / l₂) - 1 )', variableDefinitions: 'r = internal resistance, R = shunt load, l₁ = open circuit length, l₂ = closed circuit length', units: 'Ω' },
    ],
    examTraps: [
      'Primary driver battery e.m.f. MUST be greater than the test cell e.m.f. E, otherwise no balance point will exist on the wire!',
      'Positive terminal of driver battery and positive terminal of test cell MUST be connected to the SAME end A of the wire.',
      'Excessive primary current heats wire, altering wire resistance and gradient k during test.',
    ],
    derivationSummary: 'r derivation: Open circuit E = k l₁. Closed circuit terminal voltage V = k l₂ = E R / (R + r). Substituting E = k l₁ into V yields k l₂ = k l₁ R / (R + r) => (R + r)/R = l₁/l₂ => r = R (l₁/l₂ - 1).',
  },
  {
    id: 'note_optics_prism',
    topicId: 'geometrical_optics',
    topicName: 'Geometrical Optics',
    subtopic: 'Refraction through Prisms',
    title: 'Prism Deviation, Minimum Deviation & Dispersion Formulae',
    summary: 'Complete theory on prism refraction, angle of deviation D, minimum deviation condition D_min, refractive index, and chromatic dispersion.',
    coreConcepts: [
      'Total deviation through prism D = (i₁ - r₁) + (i₂ - r₂) = i₁ + i₂ - A, where A is angle of prism A = r₁ + r₂.',
      'At minimum deviation D_min: Ray passes symmetrically through prism, angle of incidence i₁ equals angle of emergence i₂, and r₁ = r₂ = A/2.',
      'Prism Formula: n = sin( (A + D_min)/2 ) / sin( A/2 ).',
      'For thin prism (A < 10°): Deviation D ≈ (n - 1) A.',
      'Angular Dispersion = D_violet - D_red = (n_v - n_r) A.',
      'Dispersive Power ω = (n_v - n_r) / (n_mean - 1), where n_mean is refractive index for yellow sodium line.',
    ],
    keyFormulas: [
      { name: 'Prism Deviation', symbolicFormula: 'D = i₁ + i₂ - A', variableDefinitions: 'D = total deviation angle, i₁, i₂ = incidence & emergence angles, A = prism angle', units: 'degrees' },
      { name: 'Prism Refractive Index', symbolicFormula: 'n = sin( (A + D_min)/2 ) / sin( A/2 )', variableDefinitions: 'n = refractive index, D_min = minimum deviation angle, A = apex angle', units: 'dimensionless' },
      { name: 'Thin Prism Deviation', symbolicFormula: 'D = (n - 1) A', variableDefinitions: 'Valid for small apex angles A < 10°', units: 'degrees' },
    ],
    examTraps: [
      'Confusing angle of prism A with angle of deviation D.',
      'Forgetting that minimum deviation occurs ONLY when ray travels parallel to base inside an isosceles/equilateral prism.',
      'Mixing up degree and radian mode when computing sines in calculator!',
    ],
  },
];

export const MEDIA_REFERENCES: MediaReference[] = [
  {
    title: 'PhET Interactive Physics Simulations (University of Colorado Boulder)',
    type: 'simulation',
    platform: 'PhET Boulder',
    url: 'https://phet.colorado.edu/en/simulations/filter?subjects=physics',
    searchQuery: 'PhET Physics simulations online interactive',
    description: 'HTML5 interactive simulations for Mechanics, Circuit Construction Kit, Wave Interference, Photoelectric Effect, and Quantum Physics.',
    topicId: 'mechanics',
    badge: 'Interactive Lab',
  },
  {
    title: 'HyperPhysics Concepts & Mind Maps (Georgia State University)',
    type: 'website',
    platform: 'HyperPhysics GSU',
    url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html',
    searchQuery: 'HyperPhysics Georgia State University reference',
    description: 'Gold-standard concept maps, quick formula derivations, and numerical solvers across all Advanced Level physics domains.',
    topicId: 'mechanics',
    badge: 'Core Reference',
  },
  {
    title: 'The Physics Classroom Tutorial & Interactive Modules',
    type: 'website',
    platform: 'PhysicsClassroom',
    url: 'https://www.physicsclassroom.com/Class',
    searchQuery: 'The Physics Classroom tutorials problem sets',
    description: 'Clear step-by-step written tutorials, vector diagrams, animation applets, and concept builders for A/L students.',
    topicId: 'mechanics',
    badge: 'Tutorials',
  },
  {
    title: 'Walter Lewin - Classical Mechanics & E&M Lectures (MIT OpenCourseWare)',
    type: 'video',
    platform: 'YouTube / MIT OCW',
    url: 'https://www.youtube.com/results?search_query=Walter+Lewin+Physics+Lectures+MIT',
    searchQuery: 'Walter Lewin Physics Lectures MIT Classical Mechanics Electromagnetism',
    description: 'World-famous live demonstration lectures by Prof. Walter Lewin explaining Newton’s Laws, Pendulums, Resonance, and Faraday’s Law.',
    topicId: 'mechanics',
    badge: 'Video Course',
  },
  {
    title: 'MinutePhysics & Veritasium Physics Video Series',
    type: 'video',
    platform: 'YouTube',
    url: 'https://www.youtube.com/results?search_query=MinutePhysics+Veritasium+Physics+Concepts',
    searchQuery: 'MinutePhysics Veritasium Physics visual explanations',
    description: 'Engaging visual hand-drawn animations clarifying tricky concepts like wave-particle duality, thermodynamics, and special relativity.',
    topicId: 'matter_radiation',
    badge: 'Visual Insights',
  },
  {
    title: 'Khan Academy Advanced Physics Lessons & Practice Problems',
    type: 'website',
    platform: 'Khan Academy',
    url: 'https://www.khanacademy.org/science/physics',
    searchQuery: 'Khan Academy AP Physics A Level Physics videos and exercises',
    description: 'Comprehensive structured video tutorials with interactive self-check quizzes covering electricity, magnetism, optics, and nuclear physics.',
    topicId: 'current_electricity',
    badge: 'Practice Portal',
  },
];

export const SAMPLE_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'mechanics',
    questionText: 'A ball is thrown vertically upwards with an initial speed u. Assuming air resistance is negligible, what is its velocity at the highest point of its trajectory, and what is its acceleration at that same highest point?',
    options: [
      'Velocity = 0, Acceleration = 0',
      'Velocity = 0, Acceleration = g downwards',
      'Velocity = u, Acceleration = g downwards',
      'Velocity = 0, Acceleration = g upwards',
    ],
    correctAnswerIndex: 1,
    explanation: 'At maximum height, vertical velocity momentarily becomes zero (v = 0). However, gravity continues to act constantly on the ball with acceleration g downwards. If acceleration were zero, the ball would remain suspended at the top!',
    difficulty: 'Medium',
  },
  {
    id: 'q2',
    topicId: 'current_electricity',
    questionText: 'In a meter bridge experiment, a standard resistance R = 10 Ω is connected in the left gap and an unknown resistance S is in the right gap. The null balance point is found at l₁ = 40 cm from the left end. What is the value of unknown resistance S?',
    options: ['15 Ω', '6.67 Ω', '25 Ω', '10 Ω'],
    correctAnswerIndex: 0,
    explanation: 'Wheatstone bridge balance condition: R / S = l₁ / (100 - l₁). Here l₁ = 40 cm, so (100 - l₁) = 60 cm. Thus 10 / S = 40 / 60 = 2 / 3. S = (10 * 3) / 2 = 15 Ω.',
    difficulty: 'Medium',
  },
  {
    id: 'q3',
    topicId: 'oscillations_waves',
    questionText: 'A closed resonance tube has fundamental resonating length l₁ = 16 cm with a 512 Hz tuning fork. If end correction e = 1 cm, what is the speed of sound in air calculated from this single observation?',
    options: ['348 m/s', '327.6 m/s', '348.1 m/s', '348.16 m/s'],
    correctAnswerIndex: 3,
    explanation: 'For closed tube fundamental mode: l₁ + e = λ / 4  =>  λ = 4 * (16 + 1) cm = 4 * 17 cm = 68 cm = 0.68 m. Speed of sound v = f λ = 512 Hz * 0.68 m = 348.16 m/s.',
    difficulty: 'A/L Past Paper Style',
  },
  {
    id: 'q4',
    topicId: 'geometrical_optics',
    questionText: 'A glass prism with apex angle A = 60° produces a minimum deviation D_min = 30°. What is the refractive index n of the prism glass?',
    options: ['1.33', '1.414 (√2)', '1.50', '1.732 (√3)'],
    correctAnswerIndex: 1,
    explanation: 'n = sin((A + D_min)/2) / sin(A/2) = sin((60° + 30°)/2) / sin(30°) = sin(45°) / sin(30°) = (1/√2) / (1/2) = 2 / √2 = √2 ≈ 1.414.',
    difficulty: 'A/L Past Paper Style',
  },
];
