export type Task = {
  text: string;
  status: boolean;
  created: number;
  detailes?: string;
};

export type Folder = {
  title: string;
  id: string;
  userId: string;
  createdAt: number;
};

export type Data = {
  title: string;
  id: string;
  createdAt: number;
  userId: string;
  tasks: Array<Task>;
  displayName: string;
  folderId: string;
  archived: boolean;
};
