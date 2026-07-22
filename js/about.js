/* ============================================================
   ABOUT DATA
   ============================================================

   FIELD GUIDE:
   - name     : Your full name
   - role     : Your job title / one-liner
   - location : City, Country
   - photo    : Path to your profile photo
   - intro    : First line of the desktop bio (HTML allowed)
   - bio      : Body paragraphs shown on both desktop and mobile
                (plain text or HTML — <br> and <a> are fine)
   - links    : Contact / social buttons
                external: true opens in a new tab

   ============================================================ */

const ABOUT = {

  name:     "Kunsh Aryaman",
  role:     "FX Artist",
  location: "Bangalore, India",
  photo:    "assets/profile.jpg",

  intro: "I'm <strong>Kunsh Aryaman</strong>, an FX Artist.",

  bio: [
    "I'm from Bangalore, India. Currently, I'm a senior BFA student studying at SCAD for Visual Effects. I love working with textures, particle systems, simulations, and procedural workflows.",
    "I specialise in FX and simulation — building effects that are difficult or impossible to pull off practically. Most of my work involves pyro, FLIP fluids, dust, and destruction, primarily built in Houdini. Beyond Houdini, I primarily use Blender for modelling and rendering, and love to integrate the two softwares as much as I can within my pipelines.",
    "FX work appeals to me because it's where technical problem-solving and visual craft overlap. Getting a simulation to look exactly right takes both an understanding of the system and a clear sense of what it should feel like. That balance is what keeps me interested. I'm more interested in knowing why something works than getting lucky with the settings.",
    "If I'm not working on Houdini or Blender, you would find me watching movies, playing video games or googling Houdini errors at 2am.",
    "Please feel free to reach out for collaborations!"
  ],

  links: [
    { label: "EMAIL ✉",     href: "mailto:kunsharyaman09@gmail.com" },
    { label: "LINKEDIN ↗",  href: "https://www.linkedin.com/in/kunsh-aryaman-88839a26a/", external: true },
    { label: "INSTAGRAM ↗", href: "https://www.instagram.com/kunshsart/",                 external: true }
  ]

};
