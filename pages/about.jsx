import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
// Three js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// Lib
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Components
// const DynamicAnimatedText = dynamic(() =>
//   import("../components/about/AnimatedText")
// );
import AnimatedText from "../components/about/AnimatedText";
// Style
import s from "../styles/About.module.scss";

export default function AboutSection(
  {
    //   about,
    //   scrollToSection,
    //   work,
  }
) {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  const textAnimation = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
  };

  const placeholderText = [
    { type: "aboutHeader", text: "Hello I am Erik", class: "about_header" },
    { type: "aboutName", text: "Harutyunyan Erik", class: "about_footer" },
  ];

  let aboutCanvasWrapper = useRef(false);
  const control = useAnimation();
  const [ref, inView] = useInView();
  const router = useRouter();

  useEffect(() => {
    if (aboutCanvasWrapper?.current?.children?.length === 0) {
      let renderer, scene, camera, spotLight, lightHelper;
      init();

      function init() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(render);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        aboutCanvasWrapper.current.appendChild(renderer.domElement);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          30,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );

        camera.rotation.set(-1.29, 1.2, 1.26);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 0;

        if (window.matchMedia("(max-width: 600px)").matches) {
          camera.position.set(120, 35, 9.5);
          controls.maxDistance = 180;
          controls.enableZoom = false;
          controls.enableRotate = false;
          controls.enablePan = false;
          controls.enabled = false;
          controls.noPan = true;
          controls.noKeys = true;
          controls.noRotate = true;
          controls.noZoom = true;
        } else if (window.matchMedia("(max-width: 850px)").matches) {
          camera.position.set(110, 35, 9.5);
          controls.maxDistance = 100;
        } else {
          camera.position.set(75, 35, 9.5);
        }
        controls.target.set(0, 18, 0);
        controls.minPolarAngle = 0.8;
        controls.maxPolarAngle = 1.5;

        controls.update();
        const ambient = new THREE.HemisphereLight(0xffffff, 0x444444, 0.05);
        scene.add(ambient);
        const loader = new THREE.TextureLoader().setPath("img/disturb.jpg");
        const filenames = "disturb.jpg";
        const textures = { none: null };
        const filename = filenames;
        const texture = loader.load(filename);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.encoding = THREE.sRGBEncoding;
        textures[filename] = texture;
        spotLight = new THREE.SpotLight(0xffc02e, 15);
        spotLight.position.set(25, 60, 25);
        spotLight.angle = Math.PI / 5;
        spotLight.penumbra = 1;
        spotLight.decay = 2;
        spotLight.distance = 200;
        spotLight.map = textures["disturb.jpg"];
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 200;
        spotLight.shadow.focus = 1;
        scene.add(spotLight);
        lightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(lightHelper);
        const geometry = new THREE.PlaneGeometry(1200, 1200);
        const material = new THREE.MeshLambertMaterial({ color: 0x191919 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -1, 0);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);
        new STLLoader().load("./model/robot.stl", function (geometry) {
          geometry.scale(0.35, 0.35, 0.23);
          geometry.computeVertexNormals();
          const material = new THREE.MeshLambertMaterial();
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.y = 0;
          mesh.rotation.set(Math.PI / 0.285, 0, 0.8);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          scene.add(mesh);
        });
        window.addEventListener("resize", onWindowResize);
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      function render() {
        const time = performance.now() / 3000;
        spotLight.position.x = Math.cos(time) * 25;
        spotLight.position.z = Math.sin(time) * 25;
        lightHelper.update();
        renderer.render(scene, camera);
      }
      //   aboutCanvasWrapper = false;
    }
  }, []);

  // useEffect(() => {
  //   if (inView) {
  //     control.start("visible");
  //   }
  // }, [control, inView]);

  return (
    <section
      // ref={about}
      className={s.about_section}
    >
      {/* <div className="bgr"></div> */}
      <div className={s.about_wrapper}>
        <motion.div
          className={s.about_text}
          initial="hidden"
          whileInView="visible"
          variants={container}
        >
          <span className={s.about_name}>
            {placeholderText?.map((item, index) => {
              return <AnimatedText s={s} {...item} key={index} />;
            })}
          </span>
          <motion.p className={s.about_info} variants={textAnimation}>
            I'm a Web Developer building the Front-end of Websites and Web
            Applications that leads to the success of the overall product. Check
            out some of my work in the Projects section. I also like sharing
            content related to the stuff that I have learned over the years in
            Web Development so it can help other people of the Dev Community.
            Feel free to Connect or Follow me on my Linkedin where I post useful
            content related to Web Development and Programming I'm open to Job
            opportunities where I can contribute, learn and grow. If you have a
            good opportunity that matches my skills and experience then don't
            hesitate to contact me.
          </motion.p>
        </motion.div>
        <div id={s.model_wrapper} ref={aboutCanvasWrapper}></div>
      </div>
      {/* <div className={s.scroll_down} onClick={() => scrollToSection(work)}>
        <div className={s.chevron}></div>
        <div className={s.chevron}></div>
        <div className={s.chevron}></div>
      </div> */}
      <span onClick={() => router.push("/")} className="back">
        &#60;
      </span>
    </section>
  );
}
