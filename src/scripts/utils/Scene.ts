import { HitPoint } from "./HitPoint";
import { Plane } from "./Plane";
import { Cube } from "./Cube";
import { PointLight } from "./PointLight";
import { Ray } from "./Ray";
import { Sphere } from "./Sphere";
import { Triangle } from "./Triangle";

export class Scene {
	shapes: Array<Sphere | Triangle | Plane | Cube>;
	lights: Array<PointLight>;

	// depth: number in constructor
	constructor () {
		this.shapes = [];
		this.lights = [];
	}

	createGeometry(shape: Sphere | Triangle | Plane | Cube): void {
		this.shapes.push(shape);
	}

	createLight(light: PointLight): void {
		this.lights.push(light);
	}

	intersectWith(ray: Ray): HitPoint {
		let closestHitPoint = this.shapes[0].intersectWith(ray);
		for (let i = 0; i < this.shapes.length; i++) {
			const currentHitPoint = this.shapes[i].intersectWith(ray);
			if (currentHitPoint.isHit && (!closestHitPoint.isHit || (closestHitPoint.distance > currentHitPoint.distance)))
				closestHitPoint = currentHitPoint;
		}
		return closestHitPoint;
	}
}
