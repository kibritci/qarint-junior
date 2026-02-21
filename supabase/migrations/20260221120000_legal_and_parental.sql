-- Legal & parental: marketing email consent, parent birth date for lock
ALTER TABLE users_gamification
  ADD COLUMN IF NOT EXISTS marketing_emails_allowed BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS parent_birth_date DATE;

COMMENT ON COLUMN users_gamification.marketing_emails_allowed IS 'User consented to informational/promotional emails at registration';
COMMENT ON COLUMN users_gamification.parent_birth_date IS 'Parent date of birth; used to verify unlock of parental control';
