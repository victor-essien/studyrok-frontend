import type { VideoExplainer, VideoScript } from '@/types';

export const mockVideoScripts: VideoScript[] = [
  {
    description: 'An engaging 5-minute explanation of photosynthesis for students',
    script: `[INTRO - 30 seconds]
Hey there! Today we're diving into one of nature's most amazing processes - photosynthesis. 

[Show animation of sun shining on a plant]

You know that feeling when you're out in the sun and you feel energized? Well, plants literally capture that energy and turn it into food. Let's see how!

[SEGMENT 1: THE BASICS - 90 seconds]
So, what exactly is photosynthesis? 

[Show simple diagram]

It's the process where plants take three ingredients - sunlight, water, and carbon dioxide - and create two things: glucose (that's sugar, their food) and oxygen (which we breathe).

[Animation showing the equation]

Think of it like a recipe: 6 parts carbon dioxide, plus 6 parts water, plus energy from light, equals 1 glucose molecule and 6 oxygen molecules.

[SEGMENT 2: WHERE IT HAPPENS - 90 seconds]
Now, where does this magical process happen? Inside tiny structures called chloroplasts!

[Zoom into leaf, then cell, then chloroplast]

Chloroplasts have this green pigment called chlorophyll - and that's what makes plants green! The chlorophyll is like a solar panel, capturing that light energy.

There are two main areas: the thylakoid membranes where light reactions happen, and the stroma where the Calvin Cycle occurs.

[SEGMENT 3: THE TWO STAGES - 90 seconds]
Photosynthesis happens in two main stages.

First, the light-dependent reactions. This is where the plant captures light energy and splits water molecules. This produces ATP (energy) and NADPH (electron carriers), and releases oxygen as a bonus!

[Show animation of light reactions]

Then comes the Calvin Cycle - the light-independent reactions. Here's where the plant uses that ATP and NADPH to convert CO₂ into glucose. No direct light needed for this part!

[Show Calvin Cycle animation]

[CONCLUSION - 30 seconds]
So there you have it! Plants are basically running on solar power, turning sunlight into food and giving us oxygen to breathe. Pretty amazing, right?

[Call to action]

Now go outside and thank a plant for all its hard work! See you in the next video!`,
    segments: [
      { title: 'Intro', duration: 30, text: 'Introduction to photosynthesis topic' },
      { title: 'The Basics', duration: 90, text: 'What is photosynthesis and the basic equation' },
      { title: 'Where It Happens', duration: 90, text: 'Chloroplasts and chlorophyll explanation' },
      { title: 'The Two Stages', duration: 90, text: 'Light-dependent and light-independent reactions' },
      { title: 'Conclusion', duration: 30, text: 'Summary and closing' },
    ],
    visualCues: [
      'Sun shining on plant animation',
      'Photosynthesis equation diagram',
      'Zoom sequence: leaf → cell → chloroplast',
      'Chlorophyll structure visualization',
      'Light-dependent reactions animation',
      'Calvin Cycle animation',
      'Plant in nature footage',
    ],
  },
];

export const mockVideos: VideoExplainer[] = [
  {
    id: 'video-1',
    studyBoardId: 'board-1',
    studyNoteId: 'note-1',
    userId: 'user-1',
    title: 'Photosynthesis Explained: Introduction',
    description: 'A comprehensive introduction to photosynthesis, covering the basic process and its importance',
    script: mockVideoScripts[0].script,
    videoUrl: 'https://storage.studyrok.com/videos/photosynthesis-intro.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800',
    durationSeconds: 300,
    generationStatus: 'completed',
    generationProvider: 'd-id',
    viewCount: 45,
    lastWatchedPosition: 120,
    createdAt: '2024-03-10T12:00:00Z',
  },
  {
    id: 'video-2',
    studyBoardId: 'board-1',
    studyNoteId: 'note-2',
    userId: 'user-1',
    title: 'Light-Dependent Reactions Deep Dive',
    description: 'Detailed explanation of light-dependent reactions in photosynthesis',
    script: '[Script content for light-dependent reactions...]',
    durationSeconds: 420,
    generationStatus: 'generating',
    generationProvider: 'synthesia',
    viewCount: 0,
    lastWatchedPosition: 0,
    createdAt: '2024-03-10T13:00:00Z',
  },
];