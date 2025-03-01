CREATE TABLE `aluminio` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`precio` real NOT NULL,
	`tipo` text NOT NULL,
	`color` text NOT NULL,
	`linea` text NOT NULL,
	`empresaId` text NOT NULL,
	`estado` integer DEFAULT true NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`empresaId`) REFERENCES `empresa`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `aluminio_pk` ON `aluminio` (`id`);--> statement-breakpoint
CREATE INDEX `empresa_fk1` ON `aluminio` (`empresaId`);--> statement-breakpoint
CREATE TABLE `empresa` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`estado` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE INDEX `empresa_pk` ON `empresa` (`id`);--> statement-breakpoint
CREATE TABLE `vidrio` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`tipo` text NOT NULL,
	`precio` real NOT NULL,
	`color` text NOT NULL,
	`empresaId` text NOT NULL,
	`estado` integer DEFAULT true NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`empresaId`) REFERENCES `empresa`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `vidrio_pk` ON `vidrio` (`id`);--> statement-breakpoint
CREATE INDEX `empresa_fk2` ON `vidrio` (`empresaId`);