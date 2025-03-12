import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function initDatabase() {
  try {
    console.log("🚀 Starting database initialization...");

    // 🔹 Policy: Suppression automatique des logs après 30 jours
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'delete_old_logs_technical') THEN
              CREATE POLICY delete_old_logs_technical
              ON log_technical
              FOR DELETE
              TO PUBLIC
              USING (timestamp < NOW() - INTERVAL '30 days');
          END IF;

          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'delete_old_logs_functional') THEN
              CREATE POLICY delete_old_logs_functional
              ON log_functional
              FOR DELETE
              TO PUBLIC
              USING (timestamp < NOW() - INTERVAL '30 days');
          END IF;
      END $$;
    `);

    console.log("✅ Log deletion policies applied.");

    // 🔹 Function: Suppression des logs après 30 jours
    await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION delete_old_logs_function()
      RETURNS TRIGGER AS $$
      BEGIN
          DELETE FROM log_technical WHERE timestamp < NOW() - INTERVAL '30 days';
          DELETE FROM log_functional WHERE timestamp < NOW() - INTERVAL '30 days';
          RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
    `);

    console.log("✅ Log deletion function created.");

    // 🔹 Trigger: Exécution de la suppression après chaque insertion
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'auto_delete_logs_technical') THEN
              CREATE TRIGGER auto_delete_logs_technical
              AFTER INSERT ON log_technical
              EXECUTE FUNCTION delete_old_logs_function();
          END IF;

          IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'auto_delete_logs_functional') THEN
              CREATE TRIGGER auto_delete_logs_functional
              AFTER INSERT ON log_functional
              EXECUTE FUNCTION delete_old_logs_function();
          END IF;
      END $$;
    `);

    console.log("✅ Triggers for automatic log deletion created.");

    console.log("🎉 Database initialization completed successfully.");
  } catch (error) {
    console.error("❌ Error during database setup:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
