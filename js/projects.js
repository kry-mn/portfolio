/* ============================================================
   PROJECTS DATA
   ============================================================

   FIELD GUIDE:
   - title       : Project name
   - category    : e.g. "VFX | Compositing"
   - year        : e.g. "2025"
   - thumbnail   : Card thumbnail image path
   - duration    : e.g. "6 weeks"
   - videoFile   : Local .mp4 shown at top  (leave "" if none)
   - video       : YouTube/Vimeo embed URL  (leave "" if none)
                   YouTube: "https://www.youtube.com/embed/VIDEO_ID"
                   Vimeo:   "https://player.vimeo.com/video/VIDEO_ID"
   - blurb       : Atmospheric teaser shown below the video
   - content     : Ordered array — rendered as text block first, then image grid.
                   { type: "intro",  value: "..." }  ← slightly larger (18px)
                   { type: "text",   value: "..." }  ← standard body (16px)
                   { type: "image",  value: "path" } ← collected into grid below
   - tags        : Array of software/skill tags
   - link        : External URL (leave "" if none)

   ============================================================ */

const PROJECTS = [

  {
    title: "Afterburn",
    category: "FX | Simulation",
    year: "2026",
    thumbnail: "assets/projects/afterburn/afterburn_thumbnail.png",
    hoverColor: "rgb(215, 55, 40)",
    duration: "5 weeks",
    videoFile: "assets/projects/afterburn/afterburn_final.mp4",
    blurb: "My VFX-428 class final project of a car drifting in a parking lot, rendered through Houdini and Blender.",
    content: [
      {
        type: "intro",
        value: "A night-time car burnout sequence combining vehicle animation from Houdini with pyro and smoke simulation for tire smoke, composited in Blender and After Effects."
      },
      {
        type: "text",
        value: "The main challenge was cross-application material portability — Blender's Cycles node graphs don't map to Houdini's MaterialX pipeline, so textures were baked flat before transfer. Camera and geometry data were exported via Alembic to preserve lens and transform data for the final composite. Environment assets were a mix of BlenderKit kitbashing and original modelling in Blender."
      },
      {
        type: "text",
        value: 'Read the <a class="proj-blog-link" data-blog-slug="blog-01">full blog</a> for a detailed breakdown.'
      },
      { type: "image", value: "assets/projects/afterburn/afterburn_still1.png" },
      { type: "image", value: "assets/projects/afterburn/afterburn_still2.png" },
      { type: "image", value: "assets/projects/afterburn/afterburn_still3.png" }
    ],
    tags: ["Houdini", "Blender", "After Effects"],
    link: ""
  }

  ,

  {
    title: "Underwater Foliage",
    category: "Simulation | Texturing",
    year: "2026",
    thumbnail: "assets/projects/underwater_foliage/kelp_thumbnail.png",
    hoverColor: "rgb(0, 168, 107)",
    duration: "3 weeks",
    videoFile: "assets/projects/underwater_foliage/kelp_final.mp4",
    video: "",
    blurb: "Underwater kelp forest brought to life through vellum cloth simulation, capturing the natural sway and drift of fronds suspended in current.",
    content: [
      {
        type: "intro", value: "This project explores natural underwater motion through a cloth simulation of a kelp forest, focusing on how fronds move and interact when suspended in current."
      },
      { type: "text", value: "The goal was to capture organic, layered movement — long ribbon-like leaves drifting and overlapping in a believable, non-repetitive way, rather than a uniform sway." },
      { type: "text", value: "Rendered in Karma, textured through Substance Designer." },
      { type: "text", value: 'I wrote a short blog about it <a class="proj-blog-link" data-blog-slug="blog-02">here</a>.' },
      { type: "image", value: "assets/projects/underwater_foliage/kelp_still1.png" },
      { type: "image", value: "assets/projects/underwater_foliage/kelp_still2.png" }
    ],
    tags: ["Houdini", "Blender", "Substance Designer"],
    link: ""
  }

  ,

  {
    title: "Bone Dissolve",
    category: "FX | Simulation",
    year: "2026",
    thumbnail: "assets/projects/bone_dissolve/bonedissolve_thumbnail.png",
    hoverColor: "rgb(100, 180, 255)",
    thumbScale: 1.7,
    thumbOrigin: "30% 55%",
    duration: "1 week",
    videoFile: "assets/projects/bone_dissolve/bonedissolve_vid.mp4",
    blurb: "Skeletal arm disintegration built in Houdini, using attribute-transfer-driven dissolve and age-based MaterialX emission rendered in Karma.",
    content: [
      {
        type: "intro",
        value: "This piece breaks down a skeletal arm using an attribute-transfer-driven dissolve, giving more control over the disintegration pattern than a simple noise-based approach."
      },
      {
        type: "text",
        value: "The breaking edges are lit with age-based MaterialX emission, rendered in Karma, giving the piece a glowing, ember-like quality as it falls apart."
      },
      {
        type: "text",
        value: "A key challenge was flickering on the fine geometry near the disintegration front, traced to specular noise interacting with small-scale detail. Rendered entirely in Karma, textured in Substance Painter. Arm and wall assets from BlenderKit."
      },
      { type: "image", value: "assets/projects/bone_dissolve/bonedissolve_still1.png" },
      { type: "image", value: "assets/projects/bone_dissolve/bonedissolve_still2.png" },
    ],
    tags: ["Houdini", "Blender", "Substance Painter"],
    link: ""
  }

  ,

  {
    title: "Cold Case",
    category: "Virtual Production | FX",
    year: "2026",
    thumbnail: "assets/projects/coldcase/coldcase_still2.png",
    hoverColor: "rgb(100, 200, 150)",
    duration: "6 weeks",
    videoFile: "assets/projects/coldcase/coldcase_video.mp4",
    video: "",
    blurb: "In the quiet shadows of Upper Nyack, New York, a late-night stop at a desolate gas station becomes an unspoken mystery...",
    content: [
      {
        type: "intro",
        value: "My final project for Virtual Production with Prof. Diriwaechter — a 6-week collaborative cinematic built in Unreal Engine 5, my first time with the engine."
      },
      {
        type: "text",
        value: "I handled kitbashing, texturing, and set dressing throughout the project, and got my first crack at Niagara particles — used for the fridge shot. Version control was managed through Diversion, with Dropbox as a fallback for larger transfers."
      },
      { type: "image", value: "assets/projects/coldcase/coldcase_still1.png" },
      { type: "image", value: "assets/projects/coldcase/coldcase_still2.png" },
      { type: "image", value: "assets/projects/coldcase/coldcase_still3.png" },
      { type: "image", value: "assets/projects/coldcase/coldcase_still4.png" },
      { type: "image", value: "assets/projects/coldcase/coldcase_still5.png" }
    ],
    tags: ["Unreal Engine 5", "Niagara", "Blender", "Maya", "Substance Painter", "DaVinci Resolve"],
    link: "https://kunsharyaman.framer.website/work/cold-case/"
  }

  ,

  {
    title: "Unfurl",
    category: "3D | Simulation",
    year: "2025",
    thumbnail: "assets/projects/unfurl/unfurl_still1.png",
    hoverColor: "rgb(80, 200, 100)",
    duration: "2 weeks",
    videoFile: "assets/projects/unfurl/unfurl_v2.mp4",
    video: "",
    blurb: "A timelapse of life taking root — flowers blooming, moss creeping, and time unfolding through Blender's geometry nodes.",
    content: [
      { type: "intro", value: "A personal project exploring Blender's geometry nodes — a timelapse of flowers blooming and moss spreading across logs." },
      { type: "text", value: "Log assets from BlenderKit, textured in Substance Painter, animated and rendered in Blender. Looking forward to pushing geo nodes further and eventually bringing similar work into Houdini." },
      { type: "image", value: "assets/projects/unfurl/unfurl_still1.png" },
      { type: "image", value: "assets/projects/unfurl/unfurl_still2.png" },
      { type: "image", value: "assets/projects/unfurl/unfurl_still3.png" }
    ],
    tags: ["Blender", "Substance Painter"],
    link: ""
  }

  ,

  {
    title: "KRACO Cordless",
    category: "3D Modelling | Texturing",
    year: "2024",
    thumbnail: "assets/projects/KRACO_cordless/KRACO_prod_01.png",
    hoverColor: "rgb(220, 160, 80)",
    duration: "2 weeks",
    videos: [
      { src: "assets/projects/KRACO_cordless/KRACO_video.mp4",      label: "Original" },
      { src: "assets/projects/KRACO_cordless/KRACO_prod_video.mp4", label: "Product" }
    ],
    video: "",
    blurb: "A vintage KRACO phone modelled, textured and rendered entirely in Blender...",
    content: [
      {
        type: "intro",
        value: "My first proper modelling project in Blender — a vintage KRACO cordless phone built from reference, with textures from Substance Painter and custom stickers made in Photoshop."
      },
      {
        type: "text",
        value: "Added a smoke sim for the video, set within a desk-lamp and ashtray scene. Later reworked the lighting for a cleaner product-oriented version — a fun dive into lighting setups."
      },
      { type: "image", value: "assets/projects/KRACO_cordless/KRACO_prod_01.png" },
      { type: "image", value: "assets/projects/KRACO_cordless/KRACO_prod_02.png" },
      { type: "image", value: "assets/projects/KRACO_cordless/KRACO_1.png" },
      { type: "image", value: "assets/projects/KRACO_cordless/KRACO_2.png" },
      { type: "image", value: "assets/projects/KRACO_cordless/KRACO_3.png" },
      { type: "image", value: "assets/projects/KRACO_cordless/KRACO_4.png" },
      { type: "image", value: "assets/projects/KRACO_cordless/KRACO_5.png" }
    ],
    tags: ["Blender", "Substance Painter", "Photoshop"],
    link: ""
  }

  ,

  {
    title: "Nostromo",
    category: "3D Modelling | Texturing",
    year: "2024",
    thumbnail: "assets/projects/hypersleep_chamber/Hypersleep_render1(base).png",
    hoverColor: "rgb(175, 185, 195)",
    duration: "2 weeks",
    videoFile: "",
    video: "",
    blurb: "A recreation of the Nostromo's hypersleep chamber from Alien (1979), built entirely from movie references and screengrabs.",
    content: [
      {
        type: "intro",
        value: "A recreation of the Nostromo's hypersleep chamber from Alien (1979), built entirely from movie screengrabs — an ongoing cinephile side project."
      },
      {
        type: "text",
        value: "Most of the work went into the wall geometry and control panel lighting. Textures built across Substance Painter, Photoshop, After Effects, and Blender's shader nodes."
      },
      { type: "image", value: "assets/projects/hypersleep_chamber/Hypersleep_render1(base).png" }
    ],
    tags: ["Blender", "Substance Painter", "After Effects", "Photoshop"],
    link: ""
  }

  /* ← Add more projects here */

];
