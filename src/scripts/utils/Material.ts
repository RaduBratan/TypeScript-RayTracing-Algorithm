import { Color } from "./Color";

export class Material {
	diffuse: Color;
	specular: Color;
	isSpecular: boolean;

	constructor (diffuse: Color, specular: Color, isSpecular: boolean) {
		this.diffuse = diffuse;
		this.specular = specular;
		this.isSpecular = isSpecular;
	}
}
