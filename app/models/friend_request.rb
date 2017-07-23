class FriendRequest < ApplicationRecord
  validates :sender, :recipient, null: false

  belongs_to :sender,
    primary_key: :id,
    foreign_key: :sender_id,
    class_name: :User

  belongs_to :recipient,
    primary_key: :id,
    foreign_key: :recipient_id,
    class_name: :User


end
