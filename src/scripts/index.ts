import { Material } from "./utils/Material";
import { Color } from "./utils/Color";
import { Vector3 } from "./utils/Vector3";
// import { Triangle } from "./utils/Triangle";
import { Sphere } from "./utils/Sphere";
import { Scene } from "./utils/Scene";
import { PointLight } from "./utils/PointLight";
import { RayTracer } from "./utils/RayTracer";
import { Plane } from "./utils/Plane";
// import { Cube } from "./utils/Cube";

const scene = new Scene();

// SECTION: materials
// const cement = new Material(new Color(0.56, 0.51, 0.46), new Color(0, 0, 0), false);
const mirror = new Material(new Color(0.56, 0.51, 0.46), new Color(0.2, 0.2, 0.2), true);
// const steel = new Material(new Color(0.7, 0.7, 0.7), new Color(0.3, 0.3, 0.3), true);
const aluminium = new Material(new Color(0, 0, 0), new Color(1, 1, 1), true);
// const plastic = new Material(new Color(0.56, 0.51, 0.46), new Color(0, 0, 0), false);

// SECTION: sphere and cube
scene.createGeometry(new Sphere(new Vector3(0, -1.2, -7), 1.2, aluminium));
// scene.createGeometry(new Cube(new Vector3(1, -2.5, -7), new Vector3(2, -1.5, -6), aluminium));

// SECTION: lights
scene.createLight(new PointLight(new Vector3(0, 2.25, -6.5), new Color(5, 5, 5), new Vector3(0, 0, 1)));
scene.createLight(new PointLight(new Vector3(0, 0, -1), new Color(5, 4.9, 4.8), new Vector3(0, 0, 1)));

// SECTION: floor
scene.createGeometry(new Plane(new Vector3(0, -2.5, 0),
	new Vector3(0, 1, 0),
	new Vector3(0, 0, 0),
	mirror));

// SECTION: ceiling
scene.createGeometry(new Plane(new Vector3(0, 2.5, 0),
	new Vector3(0, -1, 0),
	new Vector3(0, 0, 0),
	mirror));

// SECTION: back wall
scene.createGeometry(new Plane(new Vector3(0, 0, -10),
	new Vector3(0, 0, 1),
	new Vector3(0, 0, 0),
	mirror));

// SECTION: left wall
scene.createGeometry(new Plane(new Vector3(-2.5, 0, 0),
	new Vector3(1, 0, 0),
	new Vector3(0, 0, 0),
	mirror));

// SECTION: right wall
scene.createGeometry(new Plane(new Vector3(2.5, 0, 0),
	new Vector3(-1, 0, 0),
	new Vector3(0, 0, 0),
	mirror));

// SECTION: behind camera wall
scene.createGeometry(new Plane(new Vector3(0, 0, 2.5),
	new Vector3(0, 0, -1),
	new Vector3(0, 0, 0),
	mirror));

// SECTION: render
document.getElementById("start")!.addEventListener("click", () => {
	document.getElementById("result")!.innerHTML = "Render is loooooooading...";
	document.body.classList.add("loading");
	setTimeout(() => {
		const startTime = Date.now();
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		const width = canvas.width;
		const height = canvas.height;
		const context = canvas.getContext("2d") as CanvasRenderingContext2D;
		const raytracer = new RayTracer(1, 5);
		raytracer.renderSimple(width, height, context, scene);
		const totalDuration = (Date.now() - startTime) / 1000;
		document.getElementById("result")!.innerHTML = "Render completed in " + totalDuration + " seconds";
		document.body.classList.remove("loading");
		document.getElementById("start")!.style.cursor = "pointer";
	}, 200);
});

/* let buffer = raytracer.render(width, height, context, scene);
let buf8 = new Uint8ClampedArray(buffer);
let imageData = context.getImageData(0, 0, width, height);
imageData.data.set(buf8);
context.putImageData(imageData, 0, 0); */