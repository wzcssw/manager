
# Rails.application.config.session_store :cookie_store, key: '_txmanager_session'


require 'action_dispatch/middleware/session/dalli_store'
memcached_config = YAML.load_file(File.join(Rails.root, 'config', 'memcached.yml'))
Rails.application.config.session_store ActionDispatch::Session::CacheStore, cache: ActiveSupport::Cache::MemCacheStore.new(memcached_config[Rails.env],{
                                        :namespace => "sessions",
                                        :key => "_txmanager_session",
                                        :expire_after => 3.weeks,
                                        :compress => true
                                      })
