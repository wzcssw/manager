class City < TxdiagModel
  self.table_name = "cities"
  has_many :hospitals

  enum maturity: %i(newarea half mature)
  scope :use, -> { where(state: true).order(:id) }

	class << self
		def cities_for_options
			use.try(:collect){|c| [c.name,c.id]}
		end
	end

  def state_zh
    if self.state
      state = "是"
    else
      state = "否"
    end
  end

  def state_number
    if self.state
      state = 1
    else
      state = 0
    end
  end

end
