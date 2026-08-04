/* ============================================================
   BLOGS DATA — Edit this file to add/update blog posts
   ============================================================

   HOW TO ADD A BLOG POST:
   - Regular post: add an object with title, date, tags, excerpt, content
   - Updates-style post: add type:"updates" and an updates[] array instead of content

   CONTENT FORMATTING (HTML is supported in content fields):
   - <p>Paragraph</p>
   - <h2>Heading</h2>
   - <strong>Bold</strong>
   - <em>Highlighted text</em>  ← renders in accent color
   - <code>inline code</code>
   - <img src="assets/projects/img.jpg" />

   ============================================================ */

const BLOGS = [

  {
    id: "blog-01",
    title: "VFX-428 Final",
    date: "2026-01-10",
    type: "updates",
    tags: ["VFX", "Virtual Production"],
    excerpt: "Week-by-week updates from my VFX-428 final project.",
    updates: [
      {
        label: "Update 1",
        date: "2026-01-10",
        excerpt: "Reference video approval and initial workflow research.",
        content: `
          <ul>
            <li>Just chose a reference video for approval of this project.
              <video src="assets/blogs/vfx-428/update_1/bmw-m4-drift-reference.mp4" controls preload="metadata"></video>
            </li>
            <li>I also found a method through a YouTube video that I figured I could use — makes use of Attribute Transfer of the tire data to the ground data.<br>
              <a href="https://www.youtube.com/watch?v=KZfiyTiutpo" target="_blank" rel="noopener">https://www.youtube.com/watch?v=KZfiyTiutpo</a>
            </li>
          </ul>
        `
      },
      {
        label: "Update 2",
        date: "2026-01-17",
        excerpt: "Testing animation methods and working through the particle velocity issue.",
        content: `
          <ul>
            <li>Tested out 2 methods for animating the car — using the RBD Car Rig and using the Follow Path tool in the Constraints shelf.</li>
            <li>Car Rig was simple to establish, based on the data of the obj file I used of the car. I created separate groups for the wheels of the car which I had to upload to the node and Houdini did the rest.</li>
            <li>As much as I liked the Car Rig movement, it was very erratic and sometimes glitched out and didn't complete the movement around the entire track.</li>
          </ul>
          <img src="assets/blogs/vfx-428/update_2/Screenshot%202026-05-11%20073242.png" alt="Car Rig glitch" class="blog-img-sm" />
          <ul>
            <li>Instead of using the Car Rig, I used the Follow Path shelf tool. Just had to select the Car geo and the track and it followed the path. It wasn't as impressive as the Car Rig method, but it did the job without hiccups.</li>
          </ul>
          <div class="blog-media-row">
            <img src="assets/blogs/vfx-428/update_2/follow_path_shelf_tool.png" alt="Follow Path shelf tool setup" />
            <video src="assets/blogs/vfx-428/update_2/pass2_carmotion.mp4" controls preload="metadata"></video>
          </div>
          <ul>
            <li>With this method, I created two groups — one for the front wheels and one for the rear. Based on my reference, the burnout was primarily from the rear tires.</li>
            <li>By creating the rear wheel group, I used the geo to convert the data to points with the Scatter node. I used an attribute transfer of the color from the ground to the tires and separated the part of the wheel that came in contact with the ground.</li>
            <li>A big issue I'm running into with this method is regarding the particle velocity. The particle trail with the motion of the car doesn't become a trail — it sticks to the car instead. Tried redoing the whole setup from scratch but running into the same results.</li>
          </ul>
          <div class="blog-media-row">
            <video src="assets/blogs/vfx-428/update_2/smokeEmit_pass.mp4" controls preload="metadata"></video>
            <img src="assets/blogs/vfx-428/update_2/particle_vel_not_working.png" alt="Particle velocity issue" />
          </div>
          <ul>
            <li>Test tracks I used for the motion.</li>
          </ul>
          <div class="blog-media-row">
            <img src="assets/blogs/vfx-428/update_2/test_track-1.png" alt="Test track 1" />
            <img src="assets/blogs/vfx-428/update_2/test_track-2.png" alt="Test track 2" />
          </div>
          <ul>
            <li>Node network currently being used for the pyro smoke set-up.</li>
          </ul>
          <img src="assets/blogs/vfx-428/update_2/current_pyro_smoke_setup.png" alt="Pyro smoke node network" class="blog-img-sm" />
          <ul>
            <li>This is the node network created from the Car Rig set-up, along with the RBD Solver created to run the animation.</li>
          </ul>
          <img src="assets/blogs/vfx-428/update_2/car_rig_setup.png" alt="Car Rig node network and RBD Solver" class="blog-img-sm" />
          <ul>
            <li>There is also a tutorial by Alejandro Perez where he uses a box as a smoke source and attaches a Billowy Smoke DOPnet to the box. It's a method I'll be testing out soon to see if it works better.</li>
          </ul>
        `
      },
      {
        label: "Update 3",
        date: "2026-01-24",
        excerpt: "Switching to a Trail node approach and working through the Pyro solver setup.",
        content: `
          <ul>
            <li>From the last critique in class, general notes received were that the pyro effects need to be worked on and that I should refer to the Pyro Tips page on Dr Fowler's website as it covers the tire burnout effect.</li>
            <li>Till now I had been testing the Attribute Transfer node to register data from the tire to the ground, leading to the particle emission on contact.</li>
            <li>I changed my approach after going through the page, applying a Trail node instead to compute the velocity of the movement.</li>
          </ul>
          <ul>
            <li>This is a quick look at some of my node network, where I isolate the rear tires from the rest of the car and use movement from Transform nodes to create POPnets.</li>
            <li>Caching the POPnet data, we create a Pyro solver from this data and connect the collision data of the wheels to the Collision update input of the Pyro solver.</li>
          </ul>
          <div class="blog-media-row">
            <img src="assets/blogs/vfx-428/update_3/pop_nodenet.png" alt="POPnet node network" />
            <img src="assets/blogs/vfx-428/update_3/collision_update.png" alt="Collision update setup" />
          </div>
          <ul>
            <li>This is a look at the particles from the POPnet cache.</li>
          </ul>
          <video src="assets/blogs/vfx-428/update_3/pop_particles.mp4" controls preload="metadata"></video>
          <ul>
            <li>And using the data from this cache, this is a look at the Pyro cache.</li>
          </ul>
          <video src="assets/blogs/vfx-428/update_3/pop_pyro.mp4" controls preload="metadata"></video>
          <ul>
            <li>I realized that the buoyancy was too high on this pass and the dissipation too long-lasting as well, so I need to make changes to that.</li>
            <li>The mistake from the previous update is kind of repeating again, where the particle velocity for the smoke isn't a trail and ends up sticking to the car. I don't know how/what is going wrong with this.</li>
          </ul>
          <ul>
            <li>Changed the values and buoyancy = 0.3 and dissipation = 0.5 and this is the result.</li>
          </ul>
          <video src="assets/blogs/vfx-428/update_3/buoyancy_changes.mp4" controls preload="metadata"></video>
        `
      },
      {
        label: "Update 4",
        date: "2026-01-31",
        excerpt: "Reworked track, camera animation, and first colorless render.",
        content: `
          <ul>
            <li>Based on the previous feedback, I changed the track for the car to follow.</li>
            <li>Rather than doing a whole S-curve, I focused on just the end portion. Now it's a quick turn at the end.</li>
            <li>I lost some of my data from the last time I worked on the project file, so I had to re-cache the pyro sim.</li>
            <li>After some feedback, I reworked the pyro sim components. Initial feedback was that the buoyancy was too high, so knocked it down to 0.05.</li>
            <li>This was also the time I set the camera for the scene and animated it to follow the car.</li>
            <li>To animate the speed of the car, I went into the CHOPs network created by the Follow Path constraint and changed the values to animate its movement to the end of the curve.</li>
            <li>I created separate groups for the wheels, car body, and metallic components to make it easier to texture in the stage level.</li>
            <li>I need to rework my render. Having issues with the material library, I used the groups I created as a way to texture the car.</li>
            <li>When I set it to render, the frames took forever to render, it was averaging out at around 20 minutes a frame until frame 26, when it stopped rendering altogether.</li>
            <li>For now I've done a colorless render. I got a dome light in to act as my HDRI.</li>
            <li>The pyro material was interesting to work with, since the smoke visibility was really low. I played around with values of the Smoke and Shadow Density as well as the color values.</li>
          </ul>
        `
      },
      {
        label: "Update 5",
        date: "2026-02-07",
        excerpt: "Full project restart, velocity fix, and moving to Blender for rendering.",
        content: `
          <ul>
            <li>I reworked the entire project from scratch. It was pretty easy to catch up, but I also needed a fresh start and I wasn't able to process where I was going wrong.</li>
            <li>I switched back to the good old RBD Car Rig set-up. I really liked the animation and I knew there was a way to get it working with what I had planned to create.</li>
            <li>This time, instead of creating just 2 groups for the rear and front wheels, I created 4 separate groups for all the wheels. I felt this would just give me a greater level of control with the animation.</li>
            <li>While reworking my nodes, I realised my mistake from last time — I hadn't added a velocity attribute to my movement.</li>
            <li>That's why I wasn't able to leave a trail of smoke around the turns as well, and why the movement of the particles and smoke felt as rigid as it did.</li>
            <li>I added a Point Wrangle after my Attribute Transfer where I set my velocity attribute manually — I added a gentle upward velocity and random speed. I also tried to adjust the temperature and density settings from this node, but I'm not sure if that will translate how I would like it to.</li>
          </ul>
          <img src="assets/blogs/vfx-428/update_5/vel_vex_snippet.png" alt="VEX velocity snippet" class="blog-img-sm" />
          <ul>
            <li>Popnet looks good, birth rate = 5000 and cached really quick.</li>
            <li>Started caching the pyro out, but it's taking forever.</li>
            <li>After some painstaking amount of searching online, as well as making sure my download speeds and network issues were eradicated, still having issues with this pyro cache.</li>
            <li>Dropped the resolution down from 0.01 to 0.05 and it seems to be caching fine. Realised that with every frame, the 0.01 cache had to cache ~7.5 million points, so dropping resolution helped. Managing right now with 0.02, and caches out quicker.</li>
            <li>For rendering, I moved the project out to Blender. I'm personally more comfortable with the rendering system there, and there were some base textures for the car that I could apply through Blender directly than rebuild them entirely.</li>
          </ul>
          <video src="assets/blogs/vfx-428/update_5/afterburn_final.mp4" controls preload="metadata"></video>
        `
      }
    ]
  }

  ,

  {
    id: "blog-02",
    title: "Seaweed Project",
    date: "2026-06-25",
    type: "updates",
    tags: ["Houdini", "FX"],
    excerpt: "A kelp forest simulation exploring cloth sims in Houdini.",
    updates: [
      {
        label: "Update 1",
        date: "2026-06-25",
        excerpt: "Reference image and project motivation.",
        content: `
          <ul>
            <li>I got the idea for this project from this one image I had seen of a kelp forest, and decided to make a Houdini project out of it.</li>
          </ul>
          <img src="assets/blogs/seaweed/update_1/reference_image.webp" alt="Kelp forest reference" class="blog-img-sm" />
          <ul>
            <li>This was also kind of exciting for me since I had been meaning to test out cloth sims in Houdini.</li>
          </ul>
        `
      },
      {
        label: "Update 2",
        date: "2026-07-02",
        excerpt: "Cloth sims, L-systems, caustics setup, and Substance Designer texturing.",
        content: `
          <ul>
            <li>This was a much simpler project to complete, especially when after I figured out how to run cloth sims in Houdini.</li>
            <li>There were 2 types of seaweed I created to fill the scene - those made from cloth sims, and the background ones I created using L-systems (and to break up the pattern slightly).</li>
            <li>These are the variations of the cloth seaweed.
              <video src="assets/blogs/seaweed/update_2/cloth_variations.mp4" controls preload="metadata"></video>
            </li>
            <li>I had added a very slight attribute randomise for the pscale, and mostly changed the wind speeds and angle of the bend node.</li>
            <li>These are more or less the rules applied to all the L-system seaweed, with slight variations and randomised seed values applied later for more variation.
              <div class="blog-media-row">
                <img src="assets/blogs/seaweed/update_2/lsystem_rules.png" alt="L-system rules" />
                <img src="assets/blogs/seaweed/update_2/lsystem_var.png" alt="L-system variations" />
              </div>
            </li>
            <li>Stage level set-up of the scene
              <img src="assets/blogs/seaweed/update_2/stage_setup.png" alt="Stage level setup" class="blog-img-sm" />
            </li>
            <li>For the fish, I modelled a very basic fish in Blender and brought it into Houdini.</li>
            <li>From there, I set up a simple popnet with a POPCurveFollow and a slight point jitter applied.</li>
            <li>To animate the fish movement, I created a bend node and input an animated function for the wiggling movement of the fish.</li>
            <li>This is the movement pattern
              <video src="assets/blogs/seaweed/update_2/fish_movement.mp4" controls preload="metadata"></video>
            </li>
            <li>My biggest issue was regarding the caustics setting.</li>
            <li>I created a distant light that was the primary light source and angled it downwards.</li>
            <li>To mimic the caustics, I added a grid above the scene and applied an ocean spectrum node to it. Within the shader properties, I turned the transparency up and increased the chop value so it mimicked a flowy ocean caustic.</li>
            <li>After that I added a karma fogbox and composited a few layers of floating dust to mimic the ocean.</li>
            <li>Render times weren't as heavy as I packed all the geometry as I went.</li>
            <li>I decided to texture the leaves through Substance Designer, mostly since I wanted to learn the basics of the software.</li>
            <li>The shader set-up for the kelp leaves
              <img src="assets/blogs/seaweed/update_2/shader_setup.png" alt="Shader setup for kelp leaves" class="blog-img-sm" />
            </li>
            <li>These are how the final texture looked, but I had to turn them down significantly in the final render.
              <div class="blog-media-row">
                <img src="assets/blogs/seaweed/update_2/seaweed_base.png" alt="Base map" />
                <img src="assets/blogs/seaweed/update_2/seaweed_normal.png" alt="Normal map" />
                <img src="assets/blogs/seaweed/update_2/seaweed_roughness.png" alt="Roughness map" />
              </div>
            </li>
          </ul>
        `
      }
    ]
  }

  /* ← Add more blog posts here */

];
