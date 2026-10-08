import { env } from "@/config/environment";

type LogContext = Record<string, unknown>;

function write(level: "debug" | "info" | "warn" | "error", message: string, context?: LogContext) {
  const levels = { debug: 10, info: 20, warn: 30, error: 40 };
  if (levels[level] < levels[env.LOG_LEVEL]) return;

  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context ? { context } : {}),
  };

  const output = JSON.stringify(payload);
  if (level === "error") console.error(output);
  else if (level === "warn") console.warn(output);
  else console.log(output);
}

export const logger = Object.freeze({
  debug: (message: string, context?: LogContext) => write("debug", message, context),
  info: (message: string, context?: LogContext) => write("info", message, context),
  warn: (message: string, context?: LogContext) => write("warn", message, context),
  error: (message: string, context?: LogContext) => write("error", message, context),
});
