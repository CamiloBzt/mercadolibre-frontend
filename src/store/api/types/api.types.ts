export interface ApiError {
  status: number;
  data: {
    message: string;
    error?: string;
  };
}

export interface PaginationParams {
  offset?: number;
  limit?: number;
}

export interface SearchParams extends PaginationParams {
  q: string;
}

export interface BaseResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
