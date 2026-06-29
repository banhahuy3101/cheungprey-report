alter table public.commune_evaluations
  -- Agriculture (Section 4.2)
  add column if not exists agricultural_households text default '',
  add column if not exists mechanized_farming_households text default '',
  add column if not exists has_agricultural_training text default '',
  add column if not exists has_seed_distribution text default '',
  add column if not exists seed_recipient_households text default '',
  add column if not exists rubber_communities text default '',
  add column if not exists livestock_farms text default '',
  add column if not exists agro_industry_establishments text default '',
  add column if not exists mining_community_participation text default '',
  add column if not exists has_received_mining_fund text default '',
  -- Livelihood & Tourism (Section 4.3)
  add column if not exists has_new_livelihood_projects_for_protected_areas text default '',
  add column if not exists new_livelihood_projects_details text default '',
  -- Border (Section 4.5)
  add column if not exists border_ministry_led_projects text default '',
  add column if not exists border_ministry_led_projects_details text default '',
  -- Social Protection (Section 5)
  add column if not exists has_disability_elderly_fund text default '',
  add column if not exists has_social_equity_needs_included text default '',
  add column if not exists social_equity_projects_count text default '',
  add column if not exists vulnerable_group_service_priority_details text default '',
  -- Legacy form fields
  add column if not exists farming_community_training text default '',
  add column if not exists has_drought_pumping text default '',
  add column if not exists has_support_infrastructure_for_disabled_elderly text default '';
