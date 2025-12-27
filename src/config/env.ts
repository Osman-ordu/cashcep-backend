import 'dotenv/config';
import { z } from 'zod';

const nodeEnv = process.env.NODE_ENV || 'development';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url({
    message: 'DATABASE_URL must be a valid URL (e.g., postgresql://user:password@localhost:5432/dbname)',
  }),
  JWT_SECRET: z
    .string()
    .min(nodeEnv === 'production' ? 32 : 16, {
      message: `JWT_SECRET must be at least ${nodeEnv === 'production' ? 32 : 16} characters long`,
    }),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Environment variables validation failed:');
    error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
    console.error('\n💡 Please check your .env file and ensure all required variables are set.');
    process.exit(1);
  }
  throw error;
}

export { env };
