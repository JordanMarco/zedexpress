export interface Message {
  id: number;
  client: string;
  packageName: string;
  subject: string;
  content: string;
  status: 'RESOLVED' | 'PENDING';
}

export interface MessageListResponse {
  messages: Message[];
  total: number;
}

export interface MessageListParams {
  page: number;
  pageSize: number;
  search?: string;
}