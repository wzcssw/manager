class TxdiagModel < ApplicationRecord
  self.abstract_class = true
  begin
    if %w[production development staging test].include? Rails.env
      establish_connection(
          :adapter => TXDIAG_DATABASE["adapter"],
          :pool => TXDIAG_DATABASE["pool"],
          :timeout => TXDIAG_DATABASE["timeout"],
          :host => TXDIAG_DATABASE["host"],
          :database => TXDIAG_DATABASE["database"],
          :username => TXDIAG_DATABASE["username"],
          :password => TXDIAG_DATABASE["password"],
          :encoding => TXDIAG_DATABASE["encoding"])
    end
  rescue Exception => e
    Rails.logger.error("Failed to connect to #{TXDIAG_DATABASE["adapter"]}")
    Rails.logger.error(e.message)
    Rails.logger.error(e.backtrace.join("\n"))
  end
end
