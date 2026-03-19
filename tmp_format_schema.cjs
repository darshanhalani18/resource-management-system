const fs = require('fs');

let schema = fs.readFileSync('d:\\resource-management-system\\prisma\\schema.prisma', 'utf8');

// Remove @db.DateTime(0)
schema = schema.replace(/@db\.DateTime\(0\)/g, '');

// Change created_at DateTime? @default(now()) to created_at DateTime @default(now())
// and generally ensure DateTime @default(now())
schema = schema.replace(/DateTime\?\s+@default\(now\(\)\)/g, 'DateTime @default(now())');

// Also remove map: "..."
schema = schema.replace(/,\s*map:\s*"[^"]+"/g, '');
schema = schema.replace(/map:\s*"[^"]+"\)/g, ')');
schema = schema.replace(/\(@map:\s*"[^"]+"\)/g, '');
schema = schema.replace(/map:\s*"[^"]+"/g, '');

// The replacement above might leave `@@unique([cols])` which is valid.
// Wait, `@@index([cols])` without map is valid in Prisma.
// `@unique(map: "email")` -> `@unique()` -> `@unique`
schema = schema.replace(/@unique\(\)/g, '@unique');

fs.writeFileSync('d:\\resource-management-system\\prisma\\schema.prisma.new', schema, 'utf8');
console.log("Replaced!");
