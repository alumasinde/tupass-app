INSERT INTO organizations (name, slug, code, is_active, created_at, updated_at)
VALUES ('Demo Organization', 'demo', 'DEMO', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE name = VALUES(name), is_active = 1, updated_at = NOW();

INSERT INTO organization_domains (organization_id, hostname, is_primary, is_active, created_at, updated_at)
SELECT id, 'demo.tupass.localhost', 1, 1, NOW(), NOW()
FROM organizations WHERE slug = 'demo'
ON DUPLICATE KEY UPDATE organization_id = VALUES(organization_id), is_primary = 1, is_active = 1, updated_at = NOW();
