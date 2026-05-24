import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const migration = readFileSync(
  resolve(
    process.cwd(),
    "supabase/migrations/20260422065859_582ac377-3635-4ecf-9e60-07cbad625fd6.sql",
  ),
  "utf8",
);

const adminMigration = readFileSync(
  resolve(
    process.cwd(),
    "supabase/migrations/20260422073426_92692b60-81bd-4bf3-8954-af43d09de6ad.sql",
  ),
  "utf8",
);

describe("Supabase RLS migrations", () => {
  it("enable RLS on leads and restrict reads to admins", () => {
    expect(migration).toContain("ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY");
    expect(migration).toContain("FOR INSERT");
    expect(migration).toContain("FOR SELECT");
    expect(migration).toContain("public.has_role(auth.uid(), 'admin')");
  });

  it("allow only admins to update leads", () => {
    expect(adminMigration).toContain('CREATE POLICY "Admins can update leads"');
    expect(adminMigration).toContain("FOR UPDATE");
    expect(adminMigration).toContain("WITH CHECK (public.has_role(auth.uid(), 'admin'))");
  });
});
