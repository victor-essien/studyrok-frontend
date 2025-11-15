import type { StudyNote, KeyConcept } from '@/types';

export const mockKeyConcepts: KeyConcept[] = [
  {
    term: 'Photosynthesis',
    definition: 'The process by which green plants convert light energy into chemical energy',
    examples: ['Plants using sunlight', 'Algae in water'],
  },
  {
    term: 'Chlorophyll',
    definition: 'The green pigment in plants that absorbs light energy',
    examples: ['Found in chloroplasts', 'Gives plants their green color'],
  },
  {
    term: 'Glucose',
    definition: 'Simple sugar produced during photosynthesis, used for energy',
    examples: ['C6H12O6', 'Plant food'],
  },
];

export const mockNotes: StudyNote[] = [
  {
    id: 'note-1',
    studyBoardId: 'board-1',
    userId: 'user-1',
    title: 'Introduction to Photosynthesis',
    content: `# Introduction to Photosynthesis

## What is Photosynthesis?

Photosynthesis is the remarkable process by which plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose molecules. This process is fundamental to life on Earth as it:

- Produces oxygen that we breathe
- Creates food for the plant
- Forms the base of most food chains

## The Basic Equation

The overall chemical equation for photosynthesis is:

**6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂**

This means: Carbon dioxide + Water + Light → Glucose + Oxygen

## Why is it Important?

1. **Oxygen Production**: Plants release oxygen as a byproduct, which is essential for animal respiration
2. **Food Source**: Plants produce glucose, which serves as food for themselves and other organisms
3. **Carbon Cycle**: Removes CO₂ from the atmosphere, helping regulate climate
4. **Energy Storage**: Converts solar energy into a usable form

## Key Components Needed

- **Sunlight**: Provides the energy
- **Water (H₂O)**: Absorbed through roots
- **Carbon Dioxide (CO₂)**: Taken in through leaf pores (stomata)
- **Chlorophyll**: The green pigment that captures light energy`,
    segmentOrder: 1,
    summary:
      'Photosynthesis is the process where plants convert light energy into chemical energy, producing oxygen and glucose. It is essential for life on Earth.',
    keyConcepts: mockKeyConcepts,
    learningObjectives: [
      'Understand what photosynthesis is',
      'Identify the key components needed',
      'Explain why photosynthesis is important',
    ],
    readTimeMinutes: 5,
    aiGenerated: true,
    confidenceScore: 0.95,
    isCompleted: true,
    createdAt: '2024-03-10T10:35:00Z',
    updatedAt: '2024-03-10T10:35:00Z',
  },
  {
    id: 'note-2',
    studyBoardId: 'board-1',
    userId: 'user-1',
    title: 'Light-Dependent Reactions',
    content: `# Light-Dependent Reactions

## Overview

The light-dependent reactions occur in the **thylakoid membranes** of chloroplasts and require direct light energy. These reactions are the first stage of photosynthesis.

## The Process

### Step 1: Light Absorption
- Chlorophyll and other pigments in Photosystem II absorb light energy
- This energy excites electrons to a higher energy state
- Water molecules are split (photolysis), releasing oxygen

### Step 2: Electron Transport Chain
- Excited electrons move through a series of proteins
- Energy from electrons pumps H⁺ ions across the membrane
- Creates a concentration gradient

### Step 3: ATP Synthesis
- H⁺ ions flow through ATP synthase
- This flow drives the production of ATP
- ATP provides energy for the Calvin cycle

### Step 4: NADPH Formation
- Electrons reach Photosystem I
- More light energy excites electrons again
- NADP⁺ accepts electrons to form NADPH

## Products

The light-dependent reactions produce:
1. **ATP** - Energy currency
2. **NADPH** - Electron carrier
3. **Oxygen (O₂)** - Released as waste

## Location

These reactions occur in the **thylakoid membrane** inside chloroplasts.`,
    segmentOrder: 2,
    summary:
      'Light-dependent reactions occur in thylakoid membranes, using light to split water and produce ATP, NADPH, and oxygen.',
    keyConcepts: [
      {
        term: 'Thylakoid',
        definition: 'Membrane-bound compartments inside chloroplasts where light reactions occur',
      },
      {
        term: 'Photolysis',
        definition: 'The splitting of water molecules using light energy',
      },
    ],
    learningObjectives: [
      'Describe the light-dependent reactions',
      'Identify products of light reactions',
      'Explain the role of thylakoid membranes',
    ],
    readTimeMinutes: 7,
    aiGenerated: true,
    confidenceScore: 0.92,
    isCompleted: false,
    createdAt: '2024-03-10T10:38:00Z',
    updatedAt: '2024-03-10T10:38:00Z',
  },
  {
    id: 'note-3',
    studyBoardId: 'board-1',
    userId: 'user-1',
    title: 'Calvin Cycle (Light-Independent Reactions)',
    content: `# Calvin Cycle

## Overview

The Calvin Cycle, also called the light-independent reactions or dark reactions, occurs in the **stroma** of chloroplasts. It doesn't require direct light but uses products from light-dependent reactions.

## Three Main Phases

### Phase 1: Carbon Fixation
- CO₂ enters the cycle
- RuBisCO enzyme attaches CO₂ to RuBP (5-carbon molecule)
- Forms unstable 6-carbon compound that splits into two 3-carbon molecules (3-PGA)

### Phase 2: Reduction
- 3-PGA molecules are converted to G3P (glyceraldehyde-3-phosphate)
- Uses ATP and NADPH from light reactions
- Some G3P exits to form glucose
- Most G3P continues in the cycle

### Phase 3: Regeneration
- Remaining G3P molecules regenerate RuBP
- Uses ATP
- Cycle can continue

## The Numbers

For **one glucose molecule**, the cycle must turn **6 times**:
- Uses: 18 ATP and 12 NADPH
- Requires: 6 CO₂
- Produces: 1 glucose (C₆H₁₂O₆)

## Products

- **Glucose** - Used for energy and building plant structures
- **Other sugars** - Can be converted to starch for storage`,
    segmentOrder: 3,
    summary:
      'The Calvin Cycle uses CO₂, ATP, and NADPH to produce glucose through carbon fixation, reduction, and regeneration phases.',
    keyConcepts: [
      {
        term: 'RuBisCO',
        definition: 'Enzyme that catalyzes the first step of carbon fixation',
      },
      {
        term: 'Stroma',
        definition: 'Fluid-filled space inside chloroplasts where Calvin cycle occurs',
      },
    ],
    learningObjectives: [
      'Explain the three phases of Calvin Cycle',
      'Calculate inputs and outputs',
      'Understand glucose production',
    ],
    readTimeMinutes: 8,
    aiGenerated: true,
    confidenceScore: 0.94,
    isCompleted: false,
    createdAt: '2024-03-10T10:40:00Z',
    updatedAt: '2024-03-10T10:40:00Z',
  },
  {
    id: 'note-4',
    studyBoardId: 'board-1',
    userId: 'user-1',
    title: 'Factors Affecting Photosynthesis',
    content: `# Factors Affecting Photosynthesis

## Key Limiting Factors

Several environmental factors can limit the rate of photosynthesis:

## 1. Light Intensity

**Effect:**
- Low light = Slow photosynthesis
- Optimal light = Maximum rate
- Too much light = Can damage chlorophyll

**Real-world Examples:**
- Plants grow slowly in shade
- Greenhouse supplemental lighting
- Seasonal variations in plant growth

## 2. Carbon Dioxide Concentration

**Effect:**
- More CO₂ (up to a point) = Faster photosynthesis
- Atmospheric CO₂ is often limiting factor
- Greenhouses sometimes add CO₂

**Typical Values:**
- Atmospheric CO₂: ~400 ppm
- Optimal for plants: 1000-1500 ppm

## 3. Temperature

**Effect:**
- Too cold = Enzymes work slowly
- Optimal (25-35°C) = Peak rate
- Too hot = Enzymes denature

**Why it Matters:**
- Explains plant distribution across climates
- Important for crop production
- Climate change impacts

## 4. Water Availability

**Effect:**
- Insufficient water = Stomata close
- Closed stomata = Less CO₂ intake
- Also needed as raw material

**Plant Adaptations:**
- Desert plants (CAM photosynthesis)
- Waxy leaf coatings
- Deep root systems

## 5. Chlorophyll Content

**Effect:**
- More chlorophyll = Better light absorption
- Nutrient deficiencies affect chlorophyll
- Magnesium is key component

## The Law of Limiting Factors

At any given time, the **slowest factor** determines the overall rate. Increasing other factors won't help if one factor is limiting.`,
    segmentOrder: 4,
    summary:
      'Photosynthesis rate is affected by light intensity, CO₂ concentration, temperature, water, and chlorophyll. The slowest factor limits overall rate.',
    keyConcepts: [
      {
        term: 'Limiting Factor',
        definition: 'The factor in shortest supply that restricts the rate of a process',
      },
    ],
    learningObjectives: [
      'Identify factors affecting photosynthesis',
      'Explain how each factor impacts the rate',
      'Apply law of limiting factors',
    ],
    readTimeMinutes: 6,
    aiGenerated: true,
    confidenceScore: 0.93,
    isCompleted: false,
    createdAt: '2024-03-10T10:43:00Z',
    updatedAt: '2024-03-10T10:43:00Z',
  },
];
