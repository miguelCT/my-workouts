import { relations, sql } from 'drizzle-orm';
import {
	date,
	index,
	integer,
	pgTableCreator,
	primaryKey,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `my-workouts_${name}`);

export const users = createTable('user', {
	id: varchar('id', { length: 255 }).notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull(),
	emailVerified: timestamp('emailVerified', {
		mode: 'date',
		withTimezone: true,
	}).default(sql`CURRENT_TIMESTAMP`),
	image: varchar('image', { length: 255 }),
});

export const accounts = createTable(
	'account',
	{
		userId: varchar('userId', { length: 255 })
			.notNull()
			.references(() => users.id),
		type: varchar('type', { length: 255 })
			.$type<AdapterAccount['type']>()
			.notNull(),
		provider: varchar('provider', { length: 255 }).notNull(),
		providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: varchar('token_type', { length: 255 }),
		scope: varchar('scope', { length: 255 }),
		id_token: text('id_token'),
		session_state: varchar('session_state', { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index('account_userId_idx').on(account.userId),
	}),
);

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
	'session',
	{
		sessionToken: varchar('sessionToken', { length: 255 })
			.notNull()
			.primaryKey(),
		userId: varchar('userId', { length: 255 })
			.notNull()
			.references(() => users.id),
		expires: timestamp('expires', {
			mode: 'date',
			withTimezone: true,
		}).notNull(),
	},
	(session) => ({
		userIdIdx: index('session_userId_idx').on(session.userId),
	}),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
	'verificationToken',
	{
		identifier: varchar('identifier', { length: 255 }).notNull(),
		token: varchar('token', { length: 255 }).notNull(),
		expires: timestamp('expires', {
			mode: 'date',
			withTimezone: true,
		}).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export const routines = createTable(
	'routine',
	{
		id: uuid('id').defaultRandom().notNull().primaryKey(),
		name: varchar('name', { length: 256 }).notNull(),
		createdAt: date("date")
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updatedAt', { withTimezone: true }),
	},
	(example) => ({
		nameIndex: index('routine_name_idx').on(example.name),
	}),
);




export const exerciseTemplates = createTable(
	'exercise_template',
	{
		id: uuid('id').defaultRandom().notNull().primaryKey(),
		routine_id: uuid('routine_id').references(() => routines.id),
		name: varchar('name', { length: 256 }).notNull(),
		description: text('description'),
		group: varchar('group', { length: 256 }),
		series_max: integer('series_max'),
		series_min: integer('series_min').notNull(),
		repetition_max: integer('repetition_max'),
		repetition_min: integer('repetition_min').notNull(),
		createdAt: date("date")
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: date('updatedAt'),
	}
);


export const exerciseEntries = createTable(
	'exercise_entry',
	{
		id: uuid('id').defaultRandom().notNull().primaryKey(),
		template_id: uuid('template_id').references(() => exerciseTemplates.id),
		weight: integer('weight'),
		repetitions: integer('repetitions'),
		createdAt: date("created_at")
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }),
	},
);


// export const exercises = createTable(
// 	'exercise',
// 	{
// 		id: uuid('id').defaultRandom().notNull().primaryKey(),
// 		routine_id: uuid('routine_id').references(() => routines.id),
// 		template_id: uuid('template_id').references(() => exerciseTemplates.id).notNull(),
// 		entry_id: uuid('entry_id').references(() => exerciseEntries.id).notNull()
// 	},
// );