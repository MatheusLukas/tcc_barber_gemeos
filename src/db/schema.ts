import { relations } from "drizzle-orm";
import {
	boolean,
	doublePrecision,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user", "collaborator"]);
export const paymentMethodEnum = pgEnum("paymentMethod", [
	"cash",
	"card",
	"pix",
]);

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	role: roleEnum("role").notNull(),
	emailVerified: boolean("emailVerified").notNull(),
	phoneNumber: text("phoneNumber"),
	phoneNumberVerified: boolean("phoneNumberVerified").notNull().default(false),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	expiresAt: timestamp("expiresAt"),
	password: text("password"),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
});

export const barbers = pgTable("barbers", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	role: roleEnum("role").notNull(),
});

export const schedule = pgTable("schedule", {
	id: uuid("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	barberId: text("barberId")
		.notNull()
		.references(() => barbers.id),
	date: timestamp("date").notNull(),
	type: text("type").notNull(),
	price: doublePrecision("price").notNull(),
	jobId: text("jobId")
		.notNull()
		.references(() => jobs.id),
	paymentMethod: text("paymentMethod").notNull(),
});

export const scheduleRelations = relations(schedule, ({ one }) => ({
	user: one(user, {
		fields: [schedule.userId],
		references: [user.id],
	}),
	barber: one(barbers, {
		fields: [schedule.barberId],
		references: [barbers.id],
	}),
	job: one(jobs, {
		fields: [schedule.jobId],
		references: [jobs.id],
	}),
}));

export const jobs = pgTable("jobs", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	price: doublePrecision("price").notNull(),
});

export const stock = pgTable("stock", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	quantity: integer("quantity").notNull(),
	unityPrice: doublePrecision("unityPrice").notNull(),
	image: text("image"),
});
