DO $install_extensions$
BEGIN

CREATE EXTENSION IF NOT EXISTS "dblink";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgagent";

END
$install_extensions$;