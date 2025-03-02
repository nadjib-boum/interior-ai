export type APIErrorParams = {
  message: string;
  details?: Record<string, any>[];
  status: 400 | 401 | 403 | 404 | 500;
  code: "INVALID_INPUT" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "SERVER_ERROR" | "INVALID_CREDENTIALS" | "DUPLICATE_RESOURCE";
}
  
export default class APIError extends Error  {
  
  public error: APIErrorParams & { timestamp: string }; 
  
  constructor ({ status, code, message, details = [] }: APIErrorParams) {
    
    super (message);
    
    this.error = { 
      status,
      code,
      message,
      details,
      timestamp: new Date().toISOString()
    }
    
  }
  
  public getError () {
    return this.error;
  }

}