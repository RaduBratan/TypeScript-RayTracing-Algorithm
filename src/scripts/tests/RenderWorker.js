import RayTracer from "/scripts/tests/RayTracer";
import Scene from "/scripts/utils/Scene";
import Sphere from "/scripts/utils/Sphere";
import Vector3 from "/scripts/utils/Vector3";

let messageHandler = undefined;

onmessage = function(e) {
	if (messageHandler) {
		messageHandler(e);
	}
};

let scene = new Scene();
let backgroundColor = new Vector3(0, 0, 0);
let rendererWidth = 0;
let rendererHeight = 0;
let startY = 0;
let scanHeight = 0;

function rendererMessageHandler(e) {
	let action = e.data.action;
	let data = e.data.data;

	if (action == "elements") {
		scene.clear();
		let elements = data;
		for (let i = 0; i < elements.length; i++) {
			scene.add(Sphere.deserialize(elements[i]));
		}
	}
	else if (action == "backgroundColor") {
		backgroundColor.x = data[0];
		backgroundColor.y = data[1];
		backgroundColor.z = data[2];
	}
	else if (action == "dimensions") {
		rendererWidth = data[0];
		rendererHeight = data[1];
		startY = data[2];
		scanHeight = data[3];
	}
	else if (action == "render") {
		startRendering();
	}
}
messageHandler = rendererMessageHandler;

function startRendering() {
	let rayTracer = new RayTracer(backgroundColor, scene);
	let buffer = rayTracer.render(rendererWidth, rendererHeight, startY, scanHeight);

	let buf8 = new Uint8ClampedArray(buffer);
	postMessage({
		"action": "result",
		"data": buf8
	});
}