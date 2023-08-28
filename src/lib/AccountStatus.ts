export type AccountStatus =
  'ACTIVE' |
  'DISABLED' |
  'REGISTERING' |
  'RECOVERING' |
  'CHANGINGMAIL'

export const AccountStatuses: {
  ACTIVE: AccountStatus
  DISABLED: AccountStatus
  REGISTERING: AccountStatus
  RECOVERING: AccountStatus
  CHANGINGMAIL: AccountStatus
} = {
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
  REGISTERING: 'REGISTERING',
  RECOVERING: 'RECOVERING',
  CHANGINGMAIL: 'CHANGINGMAIL'
}
