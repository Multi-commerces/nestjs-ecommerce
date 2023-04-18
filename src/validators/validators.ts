import {
	ValidationOptions,
	registerDecorator,
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'isOptionalNotEmpty', async: false })
class IsOptionalNotEmptyConstraint implements ValidatorConstraintInterface {
	validate(value: any, _args: ValidationArguments): boolean | Promise<boolean> {
		if (value === null || value === undefined || (typeof value === 'string' && value.trim().length === 0)) {
			return false;
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		const [property] = args.constraints;
		if (args.value === null) {
			return `${property} must not be null`;
		}

		if (args.value === undefined) {
			return `${property} must not be undefined`;
		}

		return `${property} must not be empty`;
	}
}

export function IsOptionalNotEmpty(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'IsOptionalNotEmpty',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [propertyName],
			options: validationOptions,
			validator: IsOptionalNotEmptyConstraint
		});
	};
}
