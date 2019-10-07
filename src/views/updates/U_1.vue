<template>
  <div>
    <div class="center-title display-2 font-weight-thin" style="margin-bottom: 0">{{meta.title}}</div>
    <v-divider style="max-width: 250px; margin: auto; border-color: black"/>
    <div class="headline center-title font-weight-light" style="margin-top: 0">{{meta.date}} - {{meta.subtitle}}</div>

    
    <div class="update-text">
      <div class="display-1 font-weight-thin" style="margin-bottom: 15px"><span style="border-bottom: 1px solid black; ">Preface</span></div> 
      <div class="update-text">
        The basis for this project is <a href="https://twitter.com/mradfo21/status/1168647985455960065">this tweet</a> from early
        September 2019. Luckily the thread was quite active at the time, and a number of important hints about how the effect was
        created were left by the author. I've not worked extensively with particle systems up to this point, so a perfect
        recreation is quite ambitious, but I would like to produce a similar result! 
      </div>
      <div class="update-text">
        This update focuses primarily on summarizing the information I've gathered based on my initial investigation, and 
        a bit of of a gameplan. 
      </div>

      <div class="display-1 font-weight-thin" style="margin-bottom: 15px"><span style="border-bottom: 1px solid black; ">Analysis</span></div> 
      <div class="update-text">
        The author describes his system as a "hybrid 2.5D simulator with 2D volumetric lighting". So we have two significant components:
        (1) some sort of 2D fluid simulation that is rendered and/or affected in a way that gives it depth, and (2) a lighting component that
        is based off of the density described by the fluid simulation. After digging through the thread, I found some very interesting 
        breadcrumbs that I'll share my thoughts on. My goal is to build a clear enough picture of how it could've possibly been done, and 
        to then attempt it myself!
      </div>
      <div class="headline">Visual Analysis of The Tweet</div> 
      <div class="update-text">
        Given that I'm not an expert on the subject, I don't want to make any significant claims about how the author implemented the
        particle system just by looking at the end result. Rather, I would like to point out potentially important details. 
      </div>
      <div class="update-text">
        First and foremost, the work is encapsulated within a Unity Particle System component, and is running realtime on 
        a laptop. This seems to be a reasonable starting point for my scope: Unity, and OK Computer specs. It would really
        be a Let Down if my approach ran poorly, so lets hope that No Surprises arise that could lead to strange performance issues.
        That's enough puns for now. 
      </div>
      <div class="update-text">
        As I was looking for general behavior, I noticed that the simulation appears to run with varying levels of gravity. The smoke
        in the first part of the clip diffuses upward, while the second clip shows the smoke diffusing at more of a downward angle. Perhaps
        there is a gravity component?
      </div>
      <div class="update-text">
        3D particles play a significant role in the end result, and leave behind trails of smoke/fluid as they moves throughout the environment.
        Later in the video, it appears that this particle impacts some test sprites that the author is rendering in place of the simulation. 
        This leads me to believe that the "2.5D" aspect is somehow related to the use of 3D particles for impacting a 2D simulation. Additionally,
        the author claims that particle depth was essential for nailing the effect. 
      </div>
      <v-img src="../../assets/particle_effects.png" width="400px" style="margin: 20px auto"/>
      <div class="update-text">
        Between 0:22 and 0:26, you may notice that the cloud volume appears to remain behind the center pillars, until the camera turns to the 
        other side of the pillars. This reinforces my assumption that the fluid simulation is being run on a 2D plane and projected into 3D space,
        with the use of volumetric lighting for adding a little more feasibility to the end result. I'm curious as to whether or not the 2D plane 
        is always perpendicular to the camera, which is a traditional approach to making 2D sprites appear 3D-ish (though the illusion is quick to 
        dissipate).
      </div>
      <div class="update-text">
        I'm particularly curious about how the 2D planes are established, and if the simulation is consistent between them (ie: forces that reach
        the borders of simulation A then impact its neighboring simulations). 
      </div>
      <div class="headline">Note - Type of Fluid Sim</div> 
      <div class="update-text">
        I believe that many fluid simulations can be categorized as being based on particles, vector fields, or some combination of the two. 
        After doing a little bit of research, I ran into the Navier-Stokes equation as a means of simulation fluids. This looked to be exactly
        what I wanted, but it turns out that its pretty expensive. Luckily, Jos Stam published a paper over a decade ago titled 
        "<a href="https://pdfs.semanticscholar.org/847f/819a4ea14bd789aca8bc88e85e906cfc657c.pdf">Real-time Fluid Dynamics for Games</a>". 
        This paper presents an approach based on Navier Stokes that achieves pretty reasonable quality. I will make the firm assumption that
        a similar technique is being used by the author. 
      </div>
      <div class="update-text">
        Based on this paper, we can think of a fluid as being contained within some <span class="font-weight-bold">volume</span> with two 
        signficant components: <span class="font-weight-bold">density</span> and <span class="font-weight-bold">velocity</span>. At the end
        of the day, we apply a number of important steps to simulate the movement of the fluid's density throughout the volume according to 
        some vector field, which itself is prone to change over time. Each voxel of the volume has a density and a vector for describing the 
        strength/direction of fluid at that point. I say voxel/volume since this algorithm can easily be extended to 3D, according to the author. 
        I believe that the terms <span class="font-weight-bold">diffusion</span> and <span class="font-weight-bold">advection</span>
        are both quite important and perhaps closely related. The paper describes advection as a change in the fluid's density, and the vector field,
        by the vector field itself (the latter being self-advection). This'll come up again later. 
      </div>
      <div class="update-text">
        There are some really cool implementations of this paper for the web, as well! Check out <a href="https://github.com/mharrys/fluids-2d">Fluids-2D</a> and 
        <a href="https://github.com/PavelDoGreat/WebGL-Fluid-Simulation">WebGL-Fluid-Simulation</a>.
      </div>

      <div class="display-1 font-weight-thin" style="margin-bottom: 15px"><span style="border-bottom: 1px solid black; ">Breadcrumbs</span></div> 
      <div class="headline">Breadcrumb - ILM</div> 
      <div class="update-text">
        The author states that an inspiration for the work comes from work done around a decade ago by Industrial Light and Magic, a 
        Lucasfilm subsidiary focused on developing visual effects for movies. The video linked by the author describes an approach 
        whereby sprites were modified by a fluid simulation to create the end result. The technique appears to rely on 2D planes rotating
        in space, with (I assume) fluid simulations are running on each plane. There is also a more particle driven technique shown earlier
        that seems quite similar to how the author uses particles.
      </div>
      <v-img src="../../assets/ilm_planes.png" width="400px" style="margin: 20px auto"/>
      <v-img src="../../assets/ilm_particles.png" width="400px" style="margin: 20px auto"/>
      <div class="headline">Breadcrumb - Density Advection</div> 
      <div class="update-text">
        Someone left a reply asking "<a href="https://twitter.com/Niallhorn/status/1168705090770931712">2D Eulerian grid advecting 
        Particles I'm guessing?"</a>, to which the author responded by claiming that the simulation was not particle based, and that 
        it was "regular ol density advection". As a result, I'm pretty certain that he's using Jos Stam's approach or a similar 
        method based on 2D vector fields and densities. However, we also know that 3D particles are being used to impact the fluid simulation,
        so its quite possible that particles passing through the 2D plane or within some threshold distance have an impact on the
        density or vector field (or both). 
      </div>
      <div class="headline">Breadcrumb - Optical Flow</div> 
      <div class="update-text">
        There is a mention of "<a href="https://twitter.com/mradfo21/status/1168944585634172928">optical flow"</a>, or the use of 2D vectors
        for advecting force, but neither of them are implied to be apart of the simulation. I'll keep this in my pocket as an interesting 
        tidbit, but I'll explicitly avoid working with this for the time being. 
      </div>
      <div class="headline">Breadcrumb - Control</div> 
      <div class="update-text">
        <a href="https://twitter.com/BrianKaris/status/1168655351996006400">This comment</a> mentioned the 2019 Remedy game "Control" and 
        describes both that game's effects and the tweet as "screen space fluid effect[s]". With the author's reply, we gain some more
        light on his approach! The effect actually <span class="font-weight-bold">is</span> based on multiple simulations running in 
        parallel, but does not appear to involve re-projection based on camera depth/movement. This is interesting... could you run a 
        2D simulation and project it into 3D space? Perhaps! But not in scope. 
      </div>
      <div class="headline">Breadcrumb - Particle Depth Blitting</div>
      <div class="update-text">
        <a href="https://twitter.com/mradfo21/status/1168779163903217665">This comment</a> backs up my earlier claim that the density
        or vector fields are impacted by the 3D particles (let's just use "advected" as a shorthand). So, the particle depth is crucial
        to advecting the fluid. This is important!
      </div>
      <div class="headline">Breadcrumb - Unity Particle System</div>
      <div class="update-text">
        As mentioned earlier, the author appears to be using a Unity Particle System component. It is quite possible that the 3D particles 
        emit on command and collide with various bits of the environment, while a 2D simulation is run for the smoke volume. Could the planes 
        themselves be particles? 
      </div>

      <div class="display-1 font-weight-thin" style="margin-bottom: 15px"><span style="border-bottom: 1px solid black; ">Summary</span></div> 
      <div class="update-text">
        <div class="update-text">
          To review the approach taken in the tweet:
          <ul>
            <li>2D fluid simulation based on density advection and vector fields.</li>
            <li>Relies on the depth of 3D particles for additional advection.</li>
            <li>Uses 2D volumetric lighting when rendering the density.</li>
            <li>The overall simulation is built of multiple smaller simulations that appear to work together.</li>
          </ul>
        </div>
        <div class="update-text">
          As a result of the information I've gathered, I've started to look into the Unity Particle System to see what its
          capable of. Gravity and collision both seem to be parameterizable! I've got some notes written down for this as well.
          <a href="https://www.youtube.com/watch?v=FEA1wTMJAR0">Credit to Brackeys for his great tutorial on this!</a>
          <ul>
            <li>The emission module is responsible for particle spawning. Bursts are useful for explosions, and distance-rates are 
              useful for traveling effects. 
            </li>
            <li>The renderer module is used for describing how the particles look. </li>
            <li>Lifetime-based modules affect the simulation over the course of time. </li>
            <li>Particles can "drag" if we limit velocity over time.</li>
            <li>Collision makes things collide.</li>
            <li>Subemitters spawn particle emitters from particles, this seems important.</li>
            <li>Trails create trails. Might be key in getting smoke sims to follow particles.</li>
            <li>Perhaps triggers are used for particles impacting the 2D sim?</li>
            <li>Custom data allows for data to be passed down to shaders</li>
          </ul>
        </div>
        <div class="update-text">
          I also found an <a href="https://www.youtube.com/watch?v=rZynofJDMto">interesting video on lit particle systems</a>. 
          This may be important for getting the lighting working...
        </div>
      </div>

      <div class="display-1 font-weight-thin" style="margin-bottom: 15px"><span style="border-bottom: 1px solid black; ">Gameplan</span></div> 
      <div class="update-text">
        I'd like to first play around with some Unity Particle Systems, see what I can create and how certain modules work. 
        From there, I'd like to experiment with the real-time Navier Stokes equation. 
      </div>
    </div>



    

  </div>
</template>

<script>
import TestFluid from "../../components/TestFluid.vue";

export default {
  data() {
    return {
      meta: this.$store.state.updates_meta[0]
    };
  },
  components: { TestFluid },
};
</script>
