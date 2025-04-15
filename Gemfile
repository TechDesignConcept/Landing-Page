source "https://rubygems.org"

gem "jekyll", "~> 4.3.2"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.7"
  gem "jekyll-sitemap", "~> 1.4"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# For Ruby 3.3.0 and later, use webrick as a replacement for the built-in server
gem "webrick", "~> 1.8"

# Additional gems needed for Ruby 3.3+
gem "base64"
gem "bigdecimal"
gem "csv"

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]