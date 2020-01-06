## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|add_index|users|username|
|username|integer|null: false|
|email_adress|integer|null: false|
|password|integer|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|timestamp|integer|null: false|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|integer|null: false|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
