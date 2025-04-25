export type Result<T> ={
  isSuccess: boolean;
  message:string;
  data: T;
}
