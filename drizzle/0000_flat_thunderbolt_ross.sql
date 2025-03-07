CREATE TABLE "roomsTable" (
	"roomType" varchar(255) NOT NULL,
	"designType" varchar(255) NOT NULL,
	"details" varchar(255),
	"originalImage" varchar(255) NOT NULL,
	"newImage" varchar(255) NOT NULL,
	"userId" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
