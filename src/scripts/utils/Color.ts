export class Color {
	r: number;
	g: number;
	b: number;

	constructor (r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	scalarMult(scalar: number): Color {
		return new Color(this.r * scalar, this.g * scalar, this.b * scalar);
	}

	scalarDiv(scalar: number): Color {
		return new Color(this.r / scalar, this.g / scalar, this.b / scalar);
	}

	colorSum(color: Color): Color {
		return new Color(this.r + color.r, this.g + color.g, this.b + color.b);
	}

	colorMult(color: Color): Color {
		return new Color(this.r * color.r, this.g * color.g, this.b * color.b);
	}

	clamp(min: number, max: number): Color {
		return new Color(Math.min(Math.max(this.r, min), max),
			Math.min(Math.max(this.g, min), max),
			Math.min(Math.max(this.b, min), max));
	}
}