export enum IconsNames {
  FOLDER_OUTLINED = 'folder-outline',
  FOLDER = 'folder',
  OPENFOLDER = 'folder-open',
  EDIT = 'pencil-outline',
  CLOSE = 'window-close',
  UNFOLD = 'unfold-more-horizontal',
  DELETE = 'delete-outline',
  ADD = 'plus',
  ADDFOLDER = 'folder-plus-outline',
  SEARCH = 'magnify',
  TASKS = 'view-list-outline',
  EMAIL = 'email-outline',
  LOCK = 'lock-outline',
  ACCOUNT = 'account-outline',
  CHECK = 'check',
  MORE_VERT = 'more-vert',
  CHEVRON_DOWM = 'chevron-down',
  ARROW_RIGHT = 'arrow-right',
}

export enum SortTaskParam {
  ALL = 'All',
  DONE = 'Done',
  ONGOING = 'Ongoing',
}

export enum SortCataloguesParam {
  ALL = 'All',
  ARCHIVED = 'Archived',
  CURRENT = 'Current',
}

export enum CollectionNames {
  Catalogues = 'tasks', //catalogues
  FOLDERS = 'folders',
}

export enum Logs {
  APP_MOUNTED = 'App mounted',
  EMAIL_CHANGED = 'Email successfuly changed!',
  PASSWORD_CHANGED = 'User successfuly changed password!',
  LOGGEDIN = 'User successfuly logged in!',
  SEND_EMAIL_PASSWORDRESET = 'Sended email to reset password',
  RESET_PASSWORD = 'Successfully changed password',
  SIGNOUT = 'User succssfuly signout',
  SIGNUP = 'User successfuly registered',
  DELETE_BY_ID = 'By ID deleted:',
  DELETE_COLLECTION = 'Deleted collection:',
}
