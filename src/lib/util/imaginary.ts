export class ComplexNumber {
	constructor(public real: number, public imaginary: number) {}

	add(other: ComplexNumber) {
		return new ComplexNumber(this.real + other.real, this.imaginary + other.imaginary);
	}

	multiply(other: ComplexNumber) {
		return new ComplexNumber(
			this.real * other.real - this.imaginary * other.imaginary,
			this.real * other.imaginary + this.imaginary * other.real
		);
	}

	abs() {
		return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.imaginary, 2));
	}
}

export class ComplexVector2 {
	constructor(public x: ComplexNumber, public y: ComplexNumber) {}

	add(other: ComplexVector2) {
		return new ComplexVector2(this.x.add(other.x), this.y.add(other.y));
	}

	multiply(n: number) {
		return new ComplexVector2(
			this.x.multiply(new ComplexNumber(n, 0)),
			this.y.multiply(new ComplexNumber(n, 0))
		);
	}

	multiplyComplex(n: ComplexNumber) {
		return new ComplexVector2(this.x.multiply(n), this.y.multiply(n));
	}

	subtract(other: ComplexVector2) {
		return this.add(other.multiply(-1));
	}

	length() {
		return Math.sqrt(Math.pow(this.x.abs(), 2) + Math.pow(this.y.abs(), 2));
	}

	distance(other: ComplexVector2) {
		return this.add(other.multiply(-1)).length();
	}

	normalized() {
		return this.multiply(1 / this.length());
	}
}
