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
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const barbers = pgTable("barbers", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	image: text("image"),
	role: roleEnum("role").notNull(),
});

export const schedule = pgTable("schedule", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	barberId: uuid("barberId")
		.notNull()
		.references(() => barbers.id),
	date: timestamp("date").notNull(),
	type: text("type").notNull(),
	price: doublePrecision("price").notNull(),
	jobId: uuid("jobId")
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
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	price: doublePrecision("price").notNull(),
});

export const stock = pgTable("stock", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	quantity: integer("quantity").notNull(),
	unityPrice: doublePrecision("unityPrice").notNull(),
	image: text("image"),
});
