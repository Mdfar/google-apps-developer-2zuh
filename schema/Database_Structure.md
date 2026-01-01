Golden Dataset Schema Definition
Table: Contacts_Golden

ContactID (Key: Text/UUID)

HubSpotContactID (Text, Hidden)

Name (Text)

Email (Email)

Phone (Phone)

LINE_ID (Text)

AssignedStaff (Ref: Users)

CreatedAt (DateTime)

UpdatedAt (DateTime)

Table: Subscriptions_Golden

SubscriptionID (Key: Text/UUID)

ContactID (Ref: Contacts_Golden)

ServiceType (Enum)

ExpiryDate (Date)

Status (Enum: Active, Expired, Pending)

UpdatedAt (DateTime)

Table: Tasks

TaskID (Key: Text/UUID)

ContactID (Ref: Contacts_Golden)

SubscriptionID (Ref: Subscriptions_Golden)

TaskType (Enum: Renewal, Winback, Referral)

DueDate (Date)

Status (Enum: Open, In Progress, Done, Skipped)

AssignedTo (Email)

DoneBy (Email, Read-Only)

DoneAt (DateTime, Read-Only)

Outcome (Enum)

Notes (LongText)

Table: MessageLog

LogID (Key: Text/UUID)

ContactID (Ref: Contacts_Golden)

EventType (Text)

Details (Text)

Timestamp (DateTime)