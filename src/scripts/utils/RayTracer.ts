import { Vector3 } from "./Vector3";
import { Color } from "./Color";
import { Ray } from "./Ray";
import { Scene } from "./Scene";

export class RayTracer {
	samples: number;
	depth: number;

	constructor (samples: number, depth: number) {
		this.samples = samples;
		this.depth = depth;
	}

	render(width: number, height: number, context: CanvasRenderingContext2D, scene: Scene): void {
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				let color = new Color(0, 0, 0);
				for (let sample = 0; sample < this.samples; sample++) {
					let rayDirection: Vector3;
					if (this.samples === 1)
						rayDirection = new Vector3(((x + 0.5) / width) - 0.5, 0.5 - ((y + 0.5) / height), - 1).normalize();
					else
						rayDirection = new Vector3(((x + Math.random()) / width) - 0.5, 0.5 - ((y + Math.random()) / height), -1).normalize();
					const ray = new Ray(new Vector3(0, 0, 0), rayDirection);
					color = color.colorSum((this.trace(ray, scene, this.depth)).clamp(0, 1).scalarDiv(this.samples));
				}
				context.fillStyle = "rgba(" + color.r * 255 + "," + color.g * 255 + "," + color.b * 255 + ", 1)";
				context.fillRect(x, y, 1, 1);
			}
		}
	}

	renderSimple(width: number, height: number, context: CanvasRenderingContext2D, scene: Scene): void {
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				let color = new Color(0, 0, 0); // color balance 1
				const rayDirection = new Vector3(((x + 0.5) / width) - 0.5, 0.5 - ((y + 0.5) / height), - 1).normalize();
				const ray = new Ray(new Vector3(0, 0, 0), rayDirection);
				color = color.colorSum((this.trace(ray, scene, this.depth)).clamp(0, 1).scalarDiv(this.samples));
				context.fillStyle = "rgba(" + color.r * 255 + "," + color.g * 255 + "," + color.b * 255 + ", 1)";
				context.fillRect(x, y, 1, 1);
			}
		}
	}

	trace(ray: Ray, scene: Scene, depth: number): Color {
		let color = new Color(0.025, 0.025, 0.025); // color balance 2
		const hitPoint = scene.intersectWith(ray);
		if (hitPoint.isHit && hitPoint.normal.vectorDot(ray.direction) < 0) {
			for (let i = 0; i < scene.lights.length; i++) {
				const directionToLight = scene.lights[i].position.vectorDiff(hitPoint.position).normalize();
				const shadowRay = new Ray(hitPoint.position.vectorSum(directionToLight.scalarMult(0.00001)), directionToLight);
				const shadowHitPoint = scene.intersectWith(shadowRay);
				if ((!shadowHitPoint.isHit || (shadowHitPoint.distance > scene.lights[i].distanceTo(hitPoint.position))) && (directionToLight.vectorDot(hitPoint.normal) > 0)) {
					const intensity = scene.lights[i].intensityAt(hitPoint.position);
					color = color.colorSum(intensity.colorMult(hitPoint.material.diffuse.scalarMult(hitPoint.normal.vectorDot(directionToLight))));
				}
			}
			if (depth > 1 && hitPoint.material.isSpecular) {
				const reflectedVector = ray.direction.vectorDiff(hitPoint.normal.scalarMult(2 * hitPoint.normal.vectorDot(ray.direction)));
				const reflectedRay = new Ray(hitPoint.position.vectorSum(hitPoint.normal.scalarMult(0.00001)), reflectedVector);
				const incomingLight = this.trace(reflectedRay, scene, depth - 1);
				color = color.colorSum(incomingLight.colorMult(hitPoint.material.specular));
			}
		}
		return color;
	}
}