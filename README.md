# Kunsh Aryaman — Portfolio Site

Dark industrial × Win95 pixel aesthetic. Static HTML/CSS/JS — no build tools needed.

---

## File Structure

```
portfolio/
├── index.html          ← Home page (hero + demo reel)
├── projects.html       ← Projects grid + modal
├── about.html          ← Bio, skills, contact links
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── projects.js     ← ★ EDIT THIS to add/update projects
│   └── cursor.js       ← Custom crosshair cursor (don't touch)
└── assets/
    ├── resume.pdf      ← Drop your resume PDF here (keep filename as resume.pdf)
    └── projects/       ← Drop project images/videos here
```

---

## How to Add a Project

Open `js/projects.js` and add an entry to the `PROJECTS` array:

```js
{
  title: "My Project",
  category: "VFX | Compositing",   // appears in red; also used for filter buttons
  year: "2025",
  thumbnail: "assets/projects/myproject.jpg",   // leave "" for placeholder
  description: "What it was, your role, the result.",
  tags: ["Nuke", "After Effects"],
  link: "https://vimeo.com/...",    // leave "" if none
  video: "https://player.vimeo.com/video/VIDEO_ID"  // leave "" if none
}
```

That's it — the page rebuilds the grid automatically.

---

## How to Update Your Resume

1. Export your resume as a PDF
2. Name it `resume.pdf`
3. Drop it into the `assets/` folder (replace the existing one)

The RESUME link in the nav opens it in a new tab automatically.

---

## How to Add Your Demo Reel

Open `index.html` and find the comment `<!-- TO ADD YOUR DEMO REEL -->`.

**YouTube:** Replace the `.reel-placeholder` div with:
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        allowfullscreen title="Demo Reel"></iframe>
```

**Vimeo:**
```html
<iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
        allowfullscreen title="Demo Reel"></iframe>
```

**Local video file:**
```html
<video src="assets/reel.mp4" controls poster="assets/reel-poster.jpg"></video>
```

---

## How to Edit the About Page

Open `about.html`:
- **Bio** — edit the `<p>` tags inside `about-bio`
- **Skills** — change the `style="width: X%"` values and labels in the `.skill-row` blocks
- **Contact links** — update the `href` values in `.contact-links`

---

## Deploying for Free (GitHub Pages)

1. Create a free account at [github.com](https://github.com)
2. Create a new **public** repository named `yourusername.github.io`
3. Upload all files in this folder to that repo
4. Go to **Settings → Pages → Source: main branch / root**
5. Your site goes live at `https://yourusername.github.io`

### Custom Domain (optional)
- Buy a domain (Namecheap ~$10/yr, Porkbun ~$9/yr are cheapest)
- In GitHub Pages settings, add your custom domain
- Point your domain's DNS to GitHub's IPs (instructions in GitHub docs)

---

## Updating the Site Later

Just edit the files and re-upload (or push via git). Changes go live in ~1 minute.
