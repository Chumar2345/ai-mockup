import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

// Users table to store plan and usage information
export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull().unique(),
    plan: varchar('plan').notNull(), // free, basic, or pro
    mockUsed: integer('mockUsed').default(0), // Tracks used interviews
    mockLimit: integer('mockLimit'), // Null for unlimited
    createdAt: varchar('createdAt'),
    endDate: varchar('endDate'),
    paymentStatus: varchar('paymentStatus',{ length: 255 }).default('Null'),
});

// Existing MockInterview table
export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});

// Existing UserAnswer table
export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
});
