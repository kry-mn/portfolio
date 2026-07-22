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
    title: "Cold Case",
    category: "Virtual Production | FX",
    year: "2026",
    thumbnail: "assets/projects/coldcase/coldcase_still2.png",
    hoverColor: "rgb(100, 160, 255)",
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

  ,

  {
    title: "Citrus Splash",
    category: "3D | Simulation",
    year: "2026",
    thumbnail: "assets/projects/citrus_splash/lemons_01.png",
    hoverColor: "rgb(240, 200, 50)",
    duration: "1 week",
    videoFile: "assets/projects/citrus_splash/lemons_video.mp4",
    blurb: "A study of FLIP fluids and object interaction, made entirely in Houdini.",
    content: [
      { type: "intro", value: "A close-up FLIP fluid simulation of lemons plunging into water, built in Houdini." },
      { type: "text", value: "Whitewater solver for bubble emissions with VEX-driven deformation — bubbles elongate under velocity and relax near the surface. Lemons modelled in Blender; murky early renders fixed through Karma's reflection/refraction limits." }
    ],
    tags: ["Blender", "Houdini"],
    link: ""
  } 

  ,

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
  /* ← Add more projects here */

];
