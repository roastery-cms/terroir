import { InfraException } from "@/exceptions/models";

export class DatabaseUnavailableException extends InfraException {
	public name: string = "Database Unavailable Exception";

	constructor(
		public source: string,
		public message: string = "The database is currently unavailable.",
	) {
		super(message);
	}
}
